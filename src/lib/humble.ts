/**
 * The core Humble class. All code used in the archiving process is connected
 * through this class.
 */

/* eslint-disable no-await-in-loop */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable import/prefer-default-export */
/* eslint-disable prefer-destructuring */

import * as fs from 'fs';
import * as path from 'path';
import { ConstructorOptions, JSDOM } from 'jsdom';
import * as cssTree from 'css-tree';
import { CssNode } from 'css-tree';
import * as puppeteer from 'puppeteer-core';
import { Browser } from 'puppeteer-core';
import TurndownService from 'turndown';
import { logger } from './logger';
import {
  HumbleOptions,
  HumblePlugin,
  HumblePrebuiltOptions,
} from './options/humble-options';
import {
  Resource,
  ResourceCache,
  ResourceType,
  TransportOptions,
} from './resource';
import * as plugins from './plugins';
import * as utilities from './utilities';

/**
 * The core Humble class. Represents a stateful bundle of a web page with all
 * the page resources.
 */
export class Humble {
  /**
   * Default options for the Humble instance.
   */
  public readonly options: HumbleOptions;

  /**
   * The entry URL used to generate the single file.
   */
  public readonly url: string;

  /**
   * The entry URL used to generate the single file, converted to an absolute
   * URL.
   */
  public readonly absoluteUrl: string;

  /**
   * The protocol of the entry URL.
   */
  public readonly protocol: string;

  /**
   * The base URL of the entry URL.
   */
  public readonly baseUrl: string;

  /**
   * The resource of the entry URL.
   */
  public entryResource: Resource;

  /**
   * If headless browser transport is specified, a puppeteer browser object
   * that will be used for all fetches.
   */
  public browser: Browser;

  /**
   * Additional options provided to all resources.
   */
  public transportOptions: TransportOptions;

  /**
   * The HTML of the entry URL.
   */
  public html: string;

  /**
   * A JSDOM Document constructed from the entry URL HTML.
   */
  public document: Document;

  /**
   * A cache of all the resources available within the document.
   */
  public resourceCache: ResourceCache;

  /**
   * Constructor function for the Humble class.
   *
   * @param options options used to modify the archiving process.
   */
  constructor(
    options: HumbleOptions,
  ) {
    // Setting the Humble options. First, default Humble options are added. Then,
    // if prebuilt options were specified, overriding the default options with
    // the prebuilt options. Finally, overriding the default and prebuilt
    // options with options provided in the constructor.
    this.options = Object.assign(
      // Adding default Humble options.
      HumblePrebuiltOptions.DEFAULT,

      // Adding prebuilt Humble options.
      options.sanitize
        ? HumblePrebuiltOptions.SANITIZE
        : {},

      options.compatibility
        ? HumblePrebuiltOptions.COMPATIBILITY
        : {},

      options.beautify
        ? HumblePrebuiltOptions.BEAUTIFY
        : {},

      options.simpleMinification
        ? HumblePrebuiltOptions.SIMPLE_MINIFICATION
        : {},

      options.advancedMinification
        ? HumblePrebuiltOptions.ADVANCED_MINIFICATION
        : {},

      options.extremeMinification
        ? HumblePrebuiltOptions.EXTREME_MINIFICATION
        : {},

      // Adding the options provided in the constructor.
      options,
    );

    // Getting the URL, absolute URL, base URL, and protocol.
    this.url = this.options.url;
    this.absoluteUrl = this.resolveAbsoluteUrl(this.url);
    this.protocol = utilities.getProtocolFromUrl(this.url);
    this.baseUrl = utilities.getBaseUrl(
      this.absoluteUrl,
      this.protocol,
    );

    // Creating the resource cache.
    this.resourceCache = {};

    // Constructing the headers from the `header` option.
    const headers: { [header: string]: string } = {};

    // If the `header` was passed through the CLI as a pipe-delimited string,
    // reconstruct the individual headers and add them to the header map. Else
    // if the headers were passed as an object programmatically, simply add
    // the passed object keys and values into the header map.
    if (typeof this.options.headers === 'string') {
      // Splitting the PSV headers into separate headers.
      const headerArray: string[] = this.options.headers.split('|');

      // Adding all of the individual headers to the header map for the
      // request.
      for (const header of headerArray) {
        const headerKey: string = header.split(':')[0];
        const headerValue: string = header.split(':').slice(1).join(':');

        headers[headerKey] = headerValue;
      }
    } else {
      // Adding each of the individual headers into the header map.
      for (const headerKey in this.options.headers) {
        const headerValue: string = this.options.headers[headerKey];

        headers[headerKey] = headerValue;
      }
    }

    // Checking if no headers were set, and if so setting default headers.
    const isHeadersEmpty: boolean = Object.keys(headers).length === 0;

    if (isHeadersEmpty === true) {
      // Setting the headers to similar headers found in browsers.
      headers['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8';
      headers['Accept-Encoding'] = 'gzip, deflate, br';
      headers['Accept-Language'] = 'en-US,en;q=0.5';
      headers['Upgrade-Insecure-Requests'] = '1';
      headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; rv:78.0) Gecko/20100101 Firefox/78.0';
    }

    // Setting the transport options for resource fetches.
    this.transportOptions = {
      headlessBrowserTransport: this.options.headlessBrowserTransport,
      socksProxy: this.options.socksProxy,
      headers,
    };

    // If the silent option was passed, disabling debug output from the logger.
    if (this.options.silent === true) {
      logger.silent = true;
    }
  }

  /**
   * Gets the protocol from a given URL. If no protocol is found then the
   * protocol from the base URL is used.
   *
   * @param urL the URL whose protocol will be returned.
   * @returns the protocol of the given URL.
   */
  getProtocol(
    url: string,
  ) : string {
    const protocolRegex: RegExp = /^(([a-zA-Z0-9]*?:[/]{2})|(data:))/i;
    const hasProtocol: boolean = protocolRegex.test(url);

    if (hasProtocol) {
      return `${url.split(':')[0]}:`;
    }

    return this.protocol;
  }

  /**
   * Attempts to correct poorly formatted URLs. For example, some versions of
   * firefox incorrectly format URLs when downloading CSS files locally.
   *
   * @param url the URL that will be corrected.
   * @returns the corrected URL.
   */
  correctUrl(
    url: string,
  ) : string {
    // Replacing pairs of backslashes with forward slashes. Browsers allow
    // forward slashes at the start of a URL and corrects these to forward
    // slashes.
    if (url.startsWith('\\\\')) {
      return `//${url.slice(2)}`;
    }

    // Correcting cases where only a single forward slash is used after the
    // protocol. This scenario sometimes occurs when saving HTML files from
    // older versions of Firefox.
    if (utilities.hasProtocol(url)) {
      const protocol: string = this.getProtocol(url);

      if (
        !url.startsWith(`${protocol}//`)
        && url.startsWith(`${protocol}/`)
      ) {
        return url.split(':')[1];
      }

      return url;
    }

    return url;
  }

  /**
   * Converts a URL into an absolute URL. For example, on the domain
   * `https://example.com`, the URL `/hello/world` will be converted to
   * `https://example.com/hello/world`.
   *
   * @param url the URL that will be converted to an absolute URL.
   * @returns the absolute URL.
   */
  resolveAbsoluteUrl(
    url: string,
  ) : string {
    // Attempting to correct broken URLs.
    url = this.correctUrl(url);

    // Check if the URL has a protocol or if it is found on the file system,
    // as this would likely indicate that the URL is already an absolute URL.
    if (utilities.hasProtocol(url) || fs.existsSync(url)) {
      return url;
    }

    // Getting the protocol of the URL. If undefined is returned, the protocol
    // is currently not set (indicating this function is resolving the entry
    // URL and that the URL is a local file path), and the `file:` protocol
    // will be used.
    const protocol: string = this.getProtocol(url) === undefined
      ? 'file:'
      : this.getProtocol(url);

    // Returning the absolute URL depending on the type of protocol used.
    switch (protocol) {
      case 'file:': {
        if (this.baseUrl === undefined) {
          return path.join(process.cwd(), url);
        }

        return path.join(this.baseUrl, url);
      }

      case 'http:':
      case 'https:': {
        if (this.baseUrl === undefined) {
          return url;
        }

        return new URL(url, this.baseUrl).href;
      }

      case 'data:': {
        return url;
      }

      default: {
        return url;
      }
    }
  }

  /**
   * Creates a new resource and adds that resource to the internal resource
   * cache.
   *
   * @param url the URL of the resource.
   * @param type the type of the resource.
   */
  createCacheResource(
    url: string,
    type: ResourceType,
  ) : void {
    // Getting the absolute URL and protocol of the resource.
    const absoluteUrl: string = this.resolveAbsoluteUrl(url);
    const protocol: string = this.getProtocol(url);

    // Creating the new resource.
    const resource: Resource = new Resource(
      url,
      absoluteUrl,
      protocol,
      type,
      this.transportOptions,
    );

    // Adding the resource to the resource cache.
    this.addResourceToCache(resource);
  }

  /**
   * Adds a new resource to the resource cache if the resource does not already
   * exist at the specified URL.
   *
   * @param resource the resource that will be added to the cache.
   */
  addResourceToCache(
    resource: Resource,
  ) : void {
    if (!(resource.url in this.resourceCache)) {
      this.resourceCache[resource.url] = resource;
    }
  }

  /**
   * Gets a resource from the resource cache at the provided URL.
   *
   * @param url the URL of the resource.
   * @returns the resource at the provided URL.
   */
  getResourceFromCache(
    url: string,
  ) : Resource {
    return this.resourceCache[url];
  }

  /**
   * Checks if the resource at the provided URL is in the resource cache.
   *
   * @param url the URL of the resource.
   * @returns true if the resource is in the cache, false otherwise.
   */
  isResourceInCache(
    url: string,
  ) : boolean {
    return (url in this.resourceCache);
  }

  /**
   * Fetches all resources of a specified type in the resource cache. If the
   * resource has already been successfully fetched, then no additional fetches
   * will be performed for that resource.
   *
   * @param type the type of resource that will be fetched.
   */
  async fetchCachedResourceByType(
    type: ResourceType,
  ) : Promise<void> {
    // Getting a subcache of only the provided resource type.
    const subCache: ResourceCache = this.createSubCache(type);

    // Fetching all of the resources within the sub cache.
    const fetchPromises: Promise<void>[] = [];

    for (const url in subCache) {
      const resource: Resource = this.resourceCache[url];

      if (resource.status === null) {
        fetchPromises.push(resource.fetch());
      }
    }

    await Promise.all(fetchPromises);
  }

  /**
   * Fetches all resources within the resource cache. If the resource has
   * already been successfully fetched, then no additional fetches will be
   * executed for that resource.
   */
  async fetchAllCachedResources() : Promise<void> {
    // Fetching all of the resources within the resource cache.
    const fetchPromises: Promise<void>[] = [];

    for (const url in this.resourceCache) {
      const resource: Resource = this.resourceCache[url];

      if (resource.status === null) {
        fetchPromises.push(resource.fetch());
      }
    }

    await Promise.all(fetchPromises);
  }

  /**
   * Creates a subcache of resources of the provided type.
   *
   * @param type the type of resource in the subcache.
   * @returns the subcache with all resources of the provided type.
   */
  createSubCache(
    type: ResourceType,
  ) : ResourceCache {
    const subCache: ResourceCache = {};

    for (const url in this.resourceCache) {
      const resource: Resource = this.resourceCache[url];

      if (resource.type === type) {
        subCache[url] = resource;
      }
    }

    return subCache;
  }

  /**
   * Adds all CSS resources to the resource cache.
   */
  cacheCss() : void {
    // Getting all the CSS resource elements.
    const linkStyleElements: Element[] = [
      ...this.document.querySelectorAll('link[rel="stylesheet"][href]'),
    ];

    // Adding each CSS resource to the resource cache.
    for (const linkStyleElement of linkStyleElements) {
      const url: string = linkStyleElement.getAttribute('href');
      const type: ResourceType = ResourceType.CSS;

      this.createCacheResource(url, type);
    }
  }

  /**
   * Adds all script resources to the resource cache.
   */
  cacheScripts() : void {
    // Getting all the script resource elements.
    const scriptElements: Element[] = [
      ...this.document.querySelectorAll('script[src]'),
    ];

    // Adding each script resource to the resource cache.
    for (const scriptElement of scriptElements) {
      const url: string = scriptElement.getAttribute('src');
      const type: ResourceType = ResourceType.SCRIPT;

      this.createCacheResource(url, type);
    }
  }

  /**
   * Adds all HTML image resources to the resource cache.
   */
  cacheHtmlImages() : void {
    // Selecting the resource type that will be added to the resource cache.
    const type: ResourceType = ResourceType.IMAGE;

    // Caching all image URLs in the `src` attribute of `<img>` and
    // `<picture>/<source>` tags.
    const imageSrcElements: Element[] = [
      ...this.document.querySelectorAll('img[src]'),
      ...this.document.querySelectorAll('picture[src]'),
      ...this.document.querySelectorAll('picture source[src]'),
    ];

    for (const imageSrcElement of imageSrcElements) {
      const url: string = imageSrcElement.getAttribute('src');

      this.createCacheResource(url, type);
    }

    // Caching all image URLs in the `srcset` attribute of `<img>` and
    // `<picture>/<source>` tags.
    const imageSrcsetElements: Element[] = [
      ...this.document.querySelectorAll('img[srcset]'),
      ...this.document.querySelectorAll('picture[srcset]'),
      ...this.document.querySelectorAll('picture source[srcset]'),
    ];

    for (const imageSrcsetElement of imageSrcsetElements) {
      const srcset: string = imageSrcsetElement.getAttribute('srcset');
      const urls: string[] = utilities.parseSrcsetUrls(srcset);

      for (const url of urls) {
        this.createCacheResource(url, type);
      }
    }

    // Caching all of the `poster` thumbnail images from `<video>` tags.
    const videoPosterTagElements: Element[] = [
      ...this.document.querySelectorAll('video[poster]'),
    ];

    for (const videoPosterTagElement of videoPosterTagElements) {
      const url: string = videoPosterTagElement.getAttribute('poster');

      this.createCacheResource(url, type);
    }
  }

  /**
   * Adds all CSS image resources to the resource cache.
   */
  cacheCssImages() : void {
    // Selecting the resource type that will be added to the resource cache.
    const type: ResourceType = ResourceType.IMAGE;

    // Getting all of the `<style>` elements in the document.
    const styleElements: Element[] = [
      ...this.document.getElementsByTagName('style'),
    ];

    // For each of the `<style>` elements, walking through their AST and
    // getting the URL of all the images in the CSS.
    for (const styleElement of styleElements) {
      // Getting the CSS and creating the AST.
      const css: string = styleElement.innerHTML;
      const cssAst: CssNode = cssTree.parse(css);

      // Setting a list of CSS properties to check for image resource URLs.
      const imageUrls: string[] = [];
      const imageProperties: string[] = [
        'background-image',
        'list-style-image',
        'content',
        'border-image-source',
        'mask-image',
        'background',
        'border-image',
      ];

      // Walking through all the declaration nodes in the CSS AST and getting
      // all of the URLs from these nodes.
      cssTree.walk(cssAst, {
        visit: 'Declaration',
        enter: (declarationNode) => {
          // Checking if the property name is in the array of image property
          // names, and if it is, adding the URL to an array of image URLs.
          const propertyName: string = declarationNode.property.toLowerCase();

          if (imageProperties.includes(propertyName)) {
            cssTree.walk(declarationNode, {
              visit: 'Url',
              enter: (urlNode) => {
                // Adding the URL to the array of image URLs.
                const url: string = urlNode.value.value.replace(/("|')/gm, '');

                imageUrls.push(url);
              },
            });
          }
        },
      });

      // Creating a new resource for each of the CSS images found.
      for (const imageUrl of imageUrls) {
        this.createCacheResource(imageUrl, type);
      }
    }
  }

  /**
   * Adds all audio resources to the resource cache.
   */
  cacheAudio() : void {
    // Selecting the resource type that will be added to the resource cache.
    const type: ResourceType = ResourceType.AUDIO;

    // Caching all image URLs in the `src` attribute of `<audio>` and
    // `<audio>/<source>` tags.
    const audioElements: Element[] = [
      ...this.document.querySelectorAll('audio[src]'),
      ...this.document.querySelectorAll('audio source[src]'),
    ];

    for (const audioElement of audioElements) {
      const url: string = audioElement.getAttribute('src');

      this.createCacheResource(url, type);
    }
  }

  /**
   * Adds all video resources to the resource cache.
   */
  cacheVideos() : void {
    // Selecting the resource type that will be added to the resource cache.
    const type: ResourceType = ResourceType.VIDEO;

    // Caching all image URLs in the `src` attribute of `<video>` and
    // `<video>/<source>` tags.
    const videoElements: Element[] = [
      ...this.document.querySelectorAll('video[src]'),
      ...this.document.querySelectorAll('video source[src]'),
    ];

    for (const videoElement of videoElements) {
      const url: string = videoElement.getAttribute('src');

      this.createCacheResource(url, type);
    }
  }

  /**
   * Adds all font resources to the resource cache.
   */
  cacheFonts() : void {
    // Selecting the resource type that will be added to the resource cache.
    const type: ResourceType = ResourceType.FONT;

    // Caching all of the font URLs in the inline style sheets.
    const styleElements: Element[] = [
      ...this.document.getElementsByTagName('style'),
    ];

    for (const styleElement of styleElements) {
      // Getting the CSS and creating the AST.
      const css: string = styleElement.innerHTML;
      const cssAst: CssNode = cssTree.parse(css);
      const fontUrls: string[] = [];

      // Walking through all the atrule nodes in the CSS AST and getting
      // all of the URLs from these nodes.
      cssTree.walk(cssAst, {
        visit: 'Atrule',
        enter: (atruleNode: any) => {
          // Checking if the atrule name is `font-face`, and if it is, adding
          // the URL to an array of font URLs.
          const atruleName: string = atruleNode.name.toLowerCase();

          if (atruleName === 'font-face') {
            cssTree.walk(atruleNode, {
              visit: 'Url',
              enter: (urlNode: any) => {
                // Adding the URL to the array of font URLs.
                const url: string = urlNode.value.value.replace(/("|')/gm, '');

                fontUrls.push(url);
              },
            });
          }
        },
      });

      // Creating a new resource for each of the CSS fonts found.
      for (const url of fontUrls) {
        this.createCacheResource(url, type);
      }
    }
  }

  /**
   * Adds all cursor resources to the resource cache.
   */
  cacheCursors() : void {
    // Selecting the resource type that will be added to the resource cache.
    const type: ResourceType = ResourceType.CURSOR;

    // Caching all of the cursor URLs in the inline style sheets.
    const styleElements: Element[] = [
      ...this.document.getElementsByTagName('style'),
    ];

    for (const styleElement of styleElements) {
      // Getting the CSS and creating the AST.
      const css: string = styleElement.innerHTML;
      const cssAst: CssNode = cssTree.parse(css);
      const cursorUrls: string[] = [];

      // Walking through all the declaration nodes in the CSS AST and getting
      // all of the URLs from these nodes.
      cssTree.walk(cssAst, {
        visit: 'Declaration',
        enter: (declarationNode) => {
          // Checking if the declaration name is `cursor`, and if it is, adding
          // the URL to an array of font URLs.
          const propertyName: string = declarationNode.property.toLowerCase();

          if (propertyName === 'cursor') {
            cssTree.walk(declarationNode, {
              visit: 'Url',
              enter: (urlNode: any) => {
                // Adding the URL to the array of cursor URLs.
                const url: string = urlNode.value.value.replace(/("|')/gm, '');

                cursorUrls.push(url);
              },
            });
          }
        },
      });

      // Creating a new resource for each of the CSS cursors found.
      for (const url of cursorUrls) {
        this.createCacheResource(url, type);
      }
    }
  }

  /**
   * Adds all favicon resources to the resource cache.
   */
  cacheFavicons() : void {
    // Selecting the resource type that will be added to the resource cache.
    const type: ResourceType = ResourceType.FAVICON;

    // Caching all favicon URLs in the `<link>` tags.
    const faviconLinkElements: Element[] = [
      ...this.document.querySelectorAll(
        'link[rel="icon"][href]',
      ),
      ...this.document.querySelectorAll(
        'link[rel="shortcut icon"][href]',
      ),
      ...this.document.querySelectorAll(
        'link[rel="mask-icon"][href]',
      ),
      ...this.document.querySelectorAll(
        'link[rel="apple-touch-icon"][href]',
      ),
      ...this.document.querySelectorAll(
        'link[rel="apple-touch-startup-image"][href]',
      ),
      ...this.document.querySelectorAll(
        'link[rel="apple-touch-icon-precomposed"][href]',
      ),
    ];

    // Creating a new resource for each of the favicons found.
    for (const faviconLinkElement of faviconLinkElements) {
      const url: string = faviconLinkElement.getAttribute('href');

      this.createCacheResource(url, type);
    }

    // Caching all favicon URLs in the `<meta>` tags.
    const faviconMetaElements: Element[] = [
      ...this.document.querySelectorAll(
        'meta[name="msapplication-TileImage"][content]',
      ),
    ];

    // Creating a new resource for each of the favicons found.
    for (const faviconMetaElement of faviconMetaElements) {
      const url: string = faviconMetaElement.getAttribute('content');

      this.createCacheResource(url, type);
    }
  }

  /**
   * Adds all other resources to the resource cache, such as resources in
   * `<embed>` and `<object>` tags.
   */
  cacheOtherResources() : void {
    // Selecting the resource type that will be added to the resource cache.
    const type: ResourceType = ResourceType.OTHER;

    // Caching all resources in the the `<embed>` tags.
    const embedElements: Element[] = [
      ...this.document.querySelectorAll('embed[src]'),
    ];

    // Creating a new resource for each of the resources found in the `<embed>`
    // tags.
    for (const embedElement of embedElements) {
      const url: string = embedElement.getAttribute('src');

      this.createCacheResource(url, type);
    }

    // Caching all resources in the the `<object>` tags.
    const objectElements: Element[] = [
      ...this.document.querySelectorAll('object[data]'),
    ];

    // Creating a new resource for each of the resources found in the
    // `<object>` tags.
    for (const objectElement of objectElements) {
      const url: string = objectElement.getAttribute('data');

      this.createCacheResource(url, type);
    }
  }

  /**
   * Sets the URLs in all of the `url()` nodes in the CSS to the absolute URL
   * of that node, using the URL of the stylesheet itself as the base URL for
   * generating the absolute URLs.
   *
   * @param css the CSS code that will be modified.
   * @param baseUrl the base URL of that CSS code.
   * @returns the CSS code with rebased URLs.
   */
  rebaseCssUrlFunctions(
    css: string,
    baseUrl: string,
  ) : string {
    // Creating the CSS AST.
    const cssAst: CssNode = cssTree.parse(css);

    // Walking through all the url nodes in the CSS AST, generating an absolute
    // URL using the CSS's base URL as the base, and setting the URL in the URL
    // node to the generated URL.
    cssTree.walk(cssAst, {
      visit: 'Url',
      enter: (urlNode) => {
        // Getting the URL and creating an absolute URL.
        const url: string = urlNode.value.value.replace(/("|')/gm, '');
        const protocol: string = this.getProtocol(url);
        const absoluteUrl: string = utilities.resolveAbsoluteUrl(
          url,
          protocol,
          baseUrl,
        );

        // Setting the URL node with the generated absolute URL.
        urlNode.value.value = absoluteUrl;
      },
    });

    // Generating new CSS code from the modified AST.
    const rebasedCss: string = cssTree.generate(cssAst);

    return rebasedCss;
  }

  /**
   * Recursively imports and inlines all CSS from each of the `@import` tags
   * within the provided CSS code.
   *
   * @param css the base CSS code that will be checked for import statements
   * and replaced with inline CSS imports.
   * @param baseUrl the base URL of the CSS stylesheet.
   */
  async importCss(
    css: string,
    baseUrl: string,
  ): Promise<string> {
    // Getting an array of all `@import` statements in the CSS.
    const importRegex: RegExp = /[@]import\s.*?([;]|\n)/gmis;
    const cssImports: RegExpMatchArray = css.match(importRegex) ?? [];

    // For each of the import statements, fetching and inlining the CSS from
    // the import.
    for (const cssImport of cssImports) {
      // Getting the URL, protocol, and absolute URL from the import statement.
      const importUrl: string = cssImport
        .replace(/([@]import\s*?|url\(|\)|["';])/gmis, '')
        .trim();

      const importProtocol: string = this.getProtocol(importUrl);
      const importAbsoluteUrl: string = utilities.resolveAbsoluteUrl(
        importUrl,
        importProtocol,
        baseUrl,
      );

      // Creating a new CSS resource from the import. Note that this resource
      // will not be added to the resource cache, as it effectively will become
      // part of the provide CSS resource.
      const resource: Resource = new Resource(
        importUrl,
        importAbsoluteUrl,
        importProtocol,
        ResourceType.CSS,
        this.transportOptions,
      );

      // Fetching the CSS resource.
      await resource.fetch();

      const status: boolean = resource.status;
      const bytes: Buffer = resource.bytes;

      // If the fetch was successful, rebasing all of the URLs in the
      // stylesheet.
      if (status === true) {
        // Getting the import CSS and rebasing the URLs.
        const importCss: string = bytes.toString();
        const rebasedCss: string = this.rebaseCssUrlFunctions(
          importCss,
          baseUrl,
        );

        // Adding the imported and rebased CSS to the base CSS.
        css = css.split(cssImport).join(rebasedCss);

        if (css.includes('@import')) {
          const importBaseUrl: string = utilities.getBaseUrl(
            importAbsoluteUrl,
            importProtocol,
          );

          css = await this.importCss(css, importBaseUrl);
        }
      }
    }

    return css;
  }

  /**
   * Importing all of the CSS `@import` statements in each of the CSS resources
   * in the resource cache.
   */
  async importAllCss() : Promise<void> {
    // Fetching all CSS resources in the resource cache that have not yet been
    // fetched.
    await this.fetchCachedResourceByType(ResourceType.CSS);

    // Creating a CSS resource subcache.
    const styleResources: ResourceCache = this.createSubCache(ResourceType.CSS);

    // For each CSS resource in the subcache, rebasing the CSS and importing
    // all of the `@import` statement CSS code.
    for (const url in styleResources) {
      // Getting the resource and rebasing the URLs.
      const resource: Resource = styleResources[url];
      const status: boolean = resource.status;

      // If the resource fetch failed, skipping the rebasing and importing
      // process.
      if (status === true) {
        const baseUrl: string = resource.baseUrl;
        let css: string = resource.bytes.toString();
        css = this.rebaseCssUrlFunctions(css, baseUrl);

        // Importing all of the CSS from the import statements.
        while (css.includes('@import')) {
          const importedCss: string = await this.importCss(css, baseUrl);
          css = importedCss;
        }

        // Updating the CSS resource with the modified CSS containing all of the
        // import statement CSS code inlined.
        const bytes: Buffer = Buffer.from(css);
        resource.update(bytes);
      }
    }
  }

  /**
   * Inlines all CSS resources into the document from the resource cache.
   */
  async inlineCss() : Promise<void> {
    // Fetching all CSS resources in the resource cache that have not yet been
    // fetched.
    await this.fetchCachedResourceByType(ResourceType.CSS);

    // For each external `<link>` element, creating a new `<style>` element and
    // setting the `innerHTML` to the resource's CSS.
    const linkStyleElements: Element[] = [
      ...this.document.querySelectorAll("link[rel='stylesheet'][href]"),
    ];

    for (const linkStyleElement of linkStyleElements) {
      const url: string = linkStyleElement.getAttribute('href');

      // If the resource is in the cache for this link element, inline the CSS.
      // Otherwise, remove the link element.
      if (this.isResourceInCache(url)) {
        const resource: Resource = this.getResourceFromCache(url);
        const status: boolean = resource.status;

        // If the resource fetch failed, skipping the inlining and removing the
        // link element.
        if (status === true) {
          const newStyleElement = this.document.createElement('style');
          newStyleElement.innerHTML = resource.bytes.toString();
          linkStyleElement.replaceWith(newStyleElement);
        } else {
          linkStyleElement.remove();
        }
      } else {
        linkStyleElement.remove();
      }
    }
  }

  /**
   * Inlines all script resources into the document from the resource cache.
   */
  async inlineScripts() : Promise<void> {
    // Fetching all script resources in the resource cache that have not yet
    // been fetched.
    await this.fetchCachedResourceByType(ResourceType.SCRIPT);

    // For each external `<script>` element, creating a new `<script>` element
    // and setting the `innerHTML` to the resource's script.
    const scriptElements: Element[] = [
      ...this.document.querySelectorAll('script[src]'),
    ];

    for (const scriptElement of scriptElements) {
      // Getting the resource and the script.
      const url: string = scriptElement.getAttribute('src');
      const resource: Resource = this.getResourceFromCache(url);
      const status: boolean = resource.status;

      // If the resource fetch failed, skipping the inlining and removing the
      // script element.
      if (status === true) {
        // Inlining the script and removing the `src` attribute.
        const script: string = resource.bytes.toString();
        scriptElement.removeAttribute('src');
        scriptElement.innerHTML = script;
      } else {
        scriptElement.remove();
      }
    }
  }

  /**
   * Inlines all html image resources into the document from the resource cache.
   */
  async inlineHtmlImages() : Promise<void> {
    // Fetching all image resources in the resource cache that have not yet
    // been fetched.
    await this.fetchCachedResourceByType(ResourceType.IMAGE);

    // For each `<img>` and `<picture>/<source>` element, inlining the `src`
    // attribute image as a base64 encoded image.
    const imageSrcElements: Element[] = [
      ...this.document.querySelectorAll('img[src]'),
      ...this.document.querySelectorAll('picture[src]'),
      ...this.document.querySelectorAll('picture source[src]'),
    ];

    for (const imageSrcElement of imageSrcElements) {
      // Setting the base64 encoded image as the `src` attribute.
      const url: string = imageSrcElement.getAttribute('src');
      const resource: Resource = this.getResourceFromCache(url);
      const base64Resource: string = resource.toBase64();

      imageSrcElement.setAttribute('src', base64Resource);
    }

    // For each `<img>` and `<picture>/<source>` element, inlining the `srcset`
    // attribute images as a base64 encoded image.
    const imageSrcsetElements: Element[] = [
      ...this.document.querySelectorAll('img[srcset]'),
      ...this.document.querySelectorAll('picture[srcset]'),
      ...this.document.querySelectorAll('picture source[srcset]'),
    ];

    for (const imageSrcsetElement of imageSrcsetElements) {
      // Getting the `srcset` attribute and parsing the URLs from the
      // attribute.
      let srcset: string = imageSrcsetElement.getAttribute('srcset');
      const urls: string[] = utilities.parseSrcsetUrls(srcset);

      for (const url of urls) {
        // Inlining the base64 encoded images into the `srcset` attribute.
        const resource: Resource = this.getResourceFromCache(url);
        const base64Resource: string = resource.toBase64();

        srcset = srcset.split(url).join(base64Resource);
      }

      // Setting the `srcset` attribute with the base64 encoded image.
      imageSrcsetElement.setAttribute('srcset', srcset);
    }

    // For each `<video>` element, inlining the `poster` attribute images as
    // a base64 encoded image.
    const videoPosterElements: Element[] = [
      ...this.document.querySelectorAll('video[poster]'),
    ];

    for (const videoPosterElement of videoPosterElements) {
      // Inlining the base64 encoded images into the `poster` attribute.
      const url: string = videoPosterElement.getAttribute('poster');
      const resource: Resource = this.getResourceFromCache(url);
      const base64Resource: string = resource.toBase64();

      videoPosterElement.setAttribute('poster', base64Resource);
    }
  }

  /**
   * Inlines all audio resources into the document from the resource cache.
   */
  async inlineAudio() : Promise<void> {
    // Fetching all audio resources in the resource cache that have not yet
    // been fetched.
    await this.fetchCachedResourceByType(ResourceType.AUDIO);

    // For each `<audio>` and `<audio>/<source>` element, inlining the `src`
    // attribute image as a base64 encoded image.
    const audioElements: Element[] = [
      ...this.document.querySelectorAll('audio[src]'),
      ...this.document.querySelectorAll('audio source[src]'),
    ];

    for (const audioElement of audioElements) {
      // Inlining the base64 encoded audio into the `src` attribute.
      const url: string = audioElement.getAttribute('src');
      const resource: Resource = this.getResourceFromCache(url);
      const base64Resource: string = resource.toBase64();

      audioElement.setAttribute('src', base64Resource);
    }
  }

  /**
   * Inlines all video resources into the document from the resource cache.
   */
  async inlineVideos() : Promise<void> {
    // Fetching all video resources in the resource cache that have not yet
    // been fetched.
    await this.fetchCachedResourceByType(ResourceType.VIDEO);

    // For each `<video>` and `<video>/<source>` element, inlining the `src`
    // attribute image as a base64 encoded image.
    const videoElements: Element[] = [
      ...this.document.querySelectorAll('video[src]'),
      ...this.document.querySelectorAll('video source[src]'),
    ];

    for (const videoElement of videoElements) {
      // Inlining the base64 encoded video into the `src` attribute.
      const url: string = videoElement.getAttribute('src');
      const resource: Resource = this.getResourceFromCache(url);
      const base64Resource: string = resource.toBase64();

      videoElement.setAttribute('src', base64Resource);
    }
  }

  /**
   * Inlines all favicon resources into the document from the resource cache.
   */
  async inlineFavicons() : Promise<void> {
    // Fetching all favicon resources in the resource cache that have not yet
    // been fetched.
    await this.fetchCachedResourceByType(ResourceType.IMAGE);

    // For each favicon `<link>` element, inlining the `src` attribute icon
    // as a base64 encoded image.
    const faviconLinkElements: Element[] = [
      ...this.document.querySelectorAll(
        'link[rel="icon"][href]',
      ),
      ...this.document.querySelectorAll(
        'link[rel="shortcut icon"][href]',
      ),
      ...this.document.querySelectorAll(
        'link[rel="mask-icon"][href]',
      ),
      ...this.document.querySelectorAll(
        'link[rel="apple-touch-icon"][href]',
      ),
      ...this.document.querySelectorAll(
        'link[rel="apple-touch-startup-image"][href]',
      ),
      ...this.document.querySelectorAll(
        'link[rel="apple-touch-icon-precomposed"][href]',
      ),
    ];

    for (const faviconLinkElement of faviconLinkElements) {
      // Inlining the base64 encoded favicon into the `src` attribute.
      const url: string = faviconLinkElement.getAttribute('href');
      const resource: Resource = this.getResourceFromCache(url);
      const base64Resource: string = resource.toBase64();

      faviconLinkElement.setAttribute('href', base64Resource);
    }

    // For each favicon `<meta>` element, inlining the `content` attribute icon
    // as a base64 encoded image.
    const faviconMetaElements: Element[] = [
      ...this.document.querySelectorAll(
        'meta[name="msapplication-TileImage"][content]',
      ),
    ];

    for (const faviconMetaElement of faviconMetaElements) {
      // Inlining the base64 encoded favicon into the `content` attribute.
      const url: string = faviconMetaElement.getAttribute('content');
      const resource: Resource = this.getResourceFromCache(url);
      const base64Resource: string = resource.toBase64();

      faviconMetaElement.setAttribute('content', base64Resource);
    }
  }

  /**
   * Inlines all other resources into the document from the resource cache.
   */
  async inlineOtherResources() : Promise<void> {
    // Fetching all other resources in the resource cache that have not yet
    // been fetched.
    await this.fetchCachedResourceByType(ResourceType.OTHER);

    // For each `<embed>` and `<object>` elements, inlining the the resource in
    // in the `src` and `data` attributes respectively as base64 encoded
    // resources. Additionally, as many of these resources require a MIME type
    // to be specified in order for plugins to correctly detect them, adding
    // the `type` attribute if one does not exist.
    const embedElements: Element[] = [
      ...this.document.querySelectorAll('embed[src]'),
    ];

    for (const embedElement of embedElements) {
      // Getting the resource and MIME type, and base64 encoding the resource.
      const url: string = embedElement.getAttribute('src');
      const resource: Resource = this.getResourceFromCache(url);
      const base64Resource: string = resource.toBase64();
      const mimeType: string = resource.mimeType;

      // Inlining the base64 encoded resource into the `src` attribute, and
      // setting the `type` attribute to the MIME type if the element does not
      // already have a MIME type.
      embedElement.setAttribute('src', base64Resource);

      if (!embedElement.hasAttribute('type')) {
        embedElement.setAttribute('type', mimeType);
      }
    }

    const objectElements: Element[] = [
      ...this.document.querySelectorAll('object[data]'),
    ];

    for (const objectElement of objectElements) {
      // Getting the resource and MIME type, and base64 encoding the resource.
      const url: string = objectElement.getAttribute('data');
      const resource: Resource = this.getResourceFromCache(url);
      const base64Resource: string = resource.toBase64();
      const mimeType: string = resource.mimeType;

      // Inlining the base64 encoded resource into the `data` attribute, and
      // setting the `type` attribute to the MIME type if the element does not
      // already have a MIME type.
      objectElement.setAttribute('data', base64Resource);

      if (!objectElement.hasAttribute('type')) {
        objectElement.setAttribute('type', mimeType);
      }
    }
  }

  /**
   * Inlines all CSS resources into the document from the resource cache.
   */
  async inlineCssResources(): Promise<void> {
    // Fetching all resources in the resource cache that have not yet been
    // fetched.
    await this.fetchAllCachedResources();

    // For each `<style>` element, inlining all of the resources in `url()`
    // functions into base64 encoded resources.
    const styleElements: Element[] = [
      ...this.document.getElementsByTagName('style'),
    ];

    for (const styleElement of styleElements) {
      // Getting the CSS and creating the AST.
      const css: string = styleElement.innerHTML;
      const cssAst: any = cssTree.parse(css);

      // Walking through all the URL nodes in the CSS AST and getting all of
      // the URLs from these nodes.
      cssTree.walk(cssAst, {
        visit: 'Url',
        enter: (urlNode) => {
          // Getting the URL and inlining the base64 encoded resource.
          const url: string = urlNode.value.value.replace(/("|')/gm, '');
          const resource: Resource = this.getResourceFromCache(url);

          urlNode.value.value = `"${resource.toBase64()}"`;
        },
      });

      // Generating new CSS code from the modified AST, and setting the CSS for
      // the style element to the new code.
      const resourceInlinedCss: string = cssTree.generate(cssAst);
      styleElement.innerHTML = resourceInlinedCss;
    }
  }

  /**
   * Runs all of the provided Humble plugins, passing in a reference to the
   * current Humble context into the plugins.
   *
   * @param humblePlugins an array of Humble plugins.
   */
  async runPlugins(
    humblePlugins: HumblePlugin[],
  ) : Promise<void> {
    for (const humblePlugin of humblePlugins) {
      await humblePlugin(this);
    }
  }

  outputArchive(
    output: string,
  ) : void {
    // If the `out` and `useTitle` options are provided, create an output path
    // using both the `out` path and document title.
    if (this.options.out && this.options.useTitle) {
      const fileName: string = utilities.createFileNameFromTitle(
        this.document,
      );

      const outputPath: string = path.join(
        this.options.out,
        fileName,
      );

      logger.log('info', `Bundle written to: ${outputPath}.`);
      fs.writeFileSync(this.options.out, output);

    // If only the `useTitle` option is provided, writing the bundle in the
    // current directory using the document title name as the file path.
    } else if (this.options.useTitle) {
      const fileName: string = utilities.createFileNameFromTitle(
        this.document,
      );

      logger.log('info', `Bundle written to: ${fileName}.`);
      fs.writeFileSync(fileName, output);

    // If only the `out` option is provided, writing the bundle to the `out`
    // path.
    } else if (this.options.out) {
      logger.log('info', `Bundle written to: ${this.options.out}.`);
      fs.writeFileSync(this.options.out, output);

    // Else, write out the bundle to STDOUT.
    } else {
      logger.log('info', 'Writing bundle to STDOUT.');
      console.log(output);
    }
  }

  /**
   * Runs the archiving process, fetching the page and all resources,
   * modifying the page and resources, and creating a single HTML file bundle
   * of the page and resources.
   */
  async archive() : Promise<void> {
    // Creating an empty resource for the initial HTML page, and getting the
    // resource.
    this.createCacheResource(this.url, ResourceType.HTML);
    this.entryResource = this.getResourceFromCache(this.url);

    // If headless browser transport is specified, creating a puppeteer browser
    // that will be used for the transport.
    if (this.options.headlessBrowserTransport) {
      // Getting the browser arguments, and splitting them into individual
      // arguments if a string was provided (as opposed to string array).
      let browserArgs: string[];
      if (typeof this.options.headlessBrowserArgs === 'string') {
        browserArgs = this.options.headlessBrowserArgs.split('|');
      } else {
        browserArgs = this.options.headlessBrowserArgs;
      }

      // If socks5 transport is specified, adding the proxy argument to the
      // browser arguments.
      if (this.options.socksProxy) {
        browserArgs.push(`--proxy-server=${this.options.socksProxy}`);
      }

      // Launching the browser at the provided executable path using the
      // provided command line arguments.
      this.browser = await puppeteer.launch({
        executablePath: this.options.headlessBrowserExecutablePath,
        args: browserArgs,
      });

      // Adding the launched browser reference to the transport options.
      this.transportOptions.browser = this.browser;
    }

    // Running the `beforeInitialFetch` plugins.
    logger.log('info', 'Running the `beforeInitialFetch` plugins.');
    await this.runPlugins(this.options.plugins.beforeInitialFetch);

    // Fetching the HTML page resource.
    logger.log('info', 'Fetching the entry URL page.');
    await this.entryResource.fetch();

    // Setting the HTML property to the fetched page.
    logger.log('info', 'Building the initial document.');
    this.html = this.entryResource.bytes.toString();

    // If markdown conversion option was provided, convert to markdown and
    // short-circuit the rest of the process.
    if (this.options.markdown) {
      const turndownService: any = new TurndownService();
      const markdown: string = turndownService.turndown(this.html);

      this.outputArchive(markdown);

      return null;
    }

    // Running the `afterInitialFetch` plugins.
    logger.log('info', 'Running the `afterInitialFetch` plugins.');
    await this.runPlugins(
      plugins.buildAfterInitialFetchPluginPipeline(this),
    );

    // Creating JSDOM options from the Humble options, and using the options
    // and HTML page to create a JSDOM document.
    const jsdomOptions: ConstructorOptions = this.protocol === 'file:'
      ? {}
      : { url: this.absoluteUrl };

    this.document = new JSDOM(this.html, jsdomOptions)
      .window
      .document;

    // Running the `beforePreCssInlineRemoval` plugins.
    logger.log('info', 'Running the `beforePreCssInlineRemoval` plugins.');
    await this.runPlugins(this.options.plugins.beforePreCssInlineRemoval);

    // Running the pre CSS inline removals.
    logger.log('info', 'Running pre CSS inline removal functions.');
    await this.runPlugins(
      plugins.buildPreCssInlineRemovalsPluginPipeline(this),
    );

    // Running the `afterPreCssInlineRemoval` and `beforeCssInlines` plugins.
    logger.log('info', 'Running the `afterPreCssInlineRemoval` plugins.');
    await this.runPlugins(this.options.plugins.afterPreCssInlineRemoval);

    logger.log('info', 'Running the `beforeCssInlines` plugins.');
    await this.runPlugins(this.options.plugins.beforeCssInlines);

    // Caching and importing all of the CSS code, completed inlined CSS is
    // needed for other inliners, such as the image inliners.
    logger.log('info', 'Caching all CSS style sheets and imports.');
    this.cacheCss();

    logger.log('info', 'Fetching and inlining CSS style sheets.');
    await this.importAllCss();

    logger.log('info', 'Inlining CSS style sheets.');
    await this.inlineCss();

    // Running the `afterCssInlines` and `beforePostCssInlineRemoval` plugins.
    logger.log('info', 'Running the `afterCssInlines` plugins.');
    await this.runPlugins(this.options.plugins.afterCssInlines);

    logger.log('info', 'Running the `beforePostCssInlineRemoval` plugins.');
    await this.runPlugins(this.options.plugins.beforePostCssInlineRemoval);

    // Running the post CSS inline removal plugins.
    logger.log('info', 'Running post CSS inline removal functions.');
    await this.runPlugins(
      plugins.buildPostCssInlineRemovalsPluginPipeline(this),
    );

    // Running the `afterPostCssInlineRemoval` plugins.
    logger.log('info', 'Running the `afterPostCssInlineRemoval` plugins.');
    await this.runPlugins(this.options.plugins.afterPostCssInlineRemoval);

    // Caching the remaining resources in the document.
    logger.log('info', 'Caching all script resource URLs.');
    this.cacheScripts();

    logger.log('info', 'Caching all HTML resource URLs.');
    this.cacheHtmlImages();

    logger.log('info', 'Caching all CSS resource URLs.');
    this.cacheCssImages();

    logger.log('info', 'Caching all audio resource URLs.');
    this.cacheAudio();

    logger.log('info', 'Caching all video resource URLs.');
    this.cacheVideos();

    logger.log('info', 'Caching all font resource URLs.');
    this.cacheFonts();

    logger.log('info', 'Caching all cursor resource URLs.');
    this.cacheCursors();

    logger.log('info', 'Caching all favicon resource URLs.');
    this.cacheFavicons();

    logger.log('info', 'Caching other resource URLs.');
    this.cacheOtherResources();

    // Running the `beforePostCssInlineResourceFetch` plugins.
    logger.log('info', 'Running the `beforePostCssInlineResourceFetch` plugins.');
    await this.runPlugins(
      this.options.plugins.beforePostCssInlineResourceFetch,
    );

    // Fetching all the cached resources
    logger.log('info', 'Fetching all cache resources.');
    await this.fetchAllCachedResources();

    // Running the `afterPostCssInlineResourceFetch` and
    // `beforeResourceModifications` plugins.
    logger.log('info', 'Running the `afterPostCssInlineResourceFetch` plugins.');
    await this.runPlugins(this.options.plugins.afterPostCssInlineResourceFetch);

    logger.log('info', 'Running the `beforeResourceModifications` plugins.');
    await this.runPlugins(this.options.plugins.beforeResourceModifications);

    // Running the resource modifications plugins.
    logger.log('info', 'Running resource modification functions.');
    await this.runPlugins(
      plugins.buildResourceModificationsPluginPipeline(this),
    );

    // Running the `afterResourceModifications` and
    // `beforeResourceInlines` plugins.
    logger.log('info', 'Running the `afterResourceModifications` plugins.');
    await this.runPlugins(this.options.plugins.afterResourceModifications);

    logger.log('info', 'Running the `beforeResourceInlines` plugins.');
    await this.runPlugins(this.options.plugins.beforeResourceInlines);

    // Inlining the remaining resources
    logger.log('info', 'Inlining scripts.');
    await this.inlineScripts();

    logger.log('info', 'Inlining HTML images.');
    await this.inlineHtmlImages();

    logger.log('info', 'Inlining audio resources.');
    await this.inlineAudio();

    logger.log('info', 'Inlining video resources.');
    await this.inlineVideos();

    logger.log('info', 'Inlining favicons resources.');
    await this.inlineFavicons();

    logger.log('info', 'Inlining CSS URL resources.');
    await this.inlineCssResources();

    logger.log('info', 'Inlining other resources.');
    await this.inlineOtherResources();

    // Running the `afterResourceInlines` and `beforeFinalInlineModifications`
    // plugins.
    logger.log('info', 'Running the `afterResourceInlines` plugins.');
    await this.runPlugins(this.options.plugins.afterResourceInlines);

    logger.log('info', 'Running the `beforeFinalInlineModifications` plugins.');
    await this.runPlugins(this.options.plugins.beforeFinalInlineModifications);

    // Running the final inline modifications plugins.
    logger.log('info', 'Running final inline modifications functions.');
    await this.runPlugins(
      plugins.buildFinalInlineModificationsPluginPipeline(this),
    );

    // Running the `afterFinalInlineModifications` and `beforeFinalHtmlCreation`
    // plugins.
    logger.log('info', 'Running the `afterFinalInlineModifications` plugins.');
    await this.runPlugins(this.options.plugins.afterFinalInlineModifications);

    logger.log('info', 'Running the `beforeFinalHtmlCreation` plugins.');
    await this.runPlugins(this.options.plugins.beforeFinalHtmlCreation);

    // Running the final document creation plugins.
    logger.log('info', 'Running final inline modifications functions.');
    await this.runPlugins(
      plugins.buildFinalDocumentCreationPluginPipeline(this),
    );

    // Updating the HTML to the single page modified and bundled HTML.
    this.html = this.document.documentElement.outerHTML;

    // Running the final HTML page creation plugins.
    logger.log('info', 'Running HTML page bundling functions.');
    await this.runPlugins(
      plugins.buildFinalHtmlCreationPluginPipeline(this),
    );

    // Recreating the DOCTYPE and adding it to the final HTML page bundle.
    const doctype: string = utilities.getDoctype(this.document);
    const outHtml: string = `${doctype}${this.html}`;

    // Running the `afterFinalHtmlCreation` plugins.
    logger.log('info', 'Running the `afterFinalHtmlCreation` plugins.');
    await this.runPlugins(this.options.plugins.afterFinalHtmlCreation);

    // If headless browser transport is specified, cleaning up the prior
    // browser instance and closing the browser.
    if (this.options.headlessBrowserTransport) {
      logger.log('info', 'Closing headless browser.');
      await this.browser.close();
    }

    // Outputting the archive file.
    this.outputArchive(outHtml);
  }
}
