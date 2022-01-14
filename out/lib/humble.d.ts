/**
 * The core Humble class. All code used in the archiving process is connected
 * through this class.
 */
import { Browser } from 'puppeteer-core';
import { HumbleOptions, HumblePlugin } from './options/humble-options';
import { Resource, ResourceCache, ResourceType, TransportOptions } from './resource';
/**
 * The core Humble class. Represents a stateful bundle of a web page with all
 * the page resources.
 */
export declare class Humble {
    /**
     * Default options for the Humble instance.
     */
    readonly options: HumbleOptions;
    /**
     * The entry URL used to generate the single file.
     */
    readonly url: string;
    /**
     * The entry URL used to generate the single file, converted to an absolute
     * URL.
     */
    readonly absoluteUrl: string;
    /**
     * The protocol of the entry URL.
     */
    readonly protocol: string;
    /**
     * The base URL of the entry URL.
     */
    readonly baseUrl: string;
    /**
     * The resource of the entry URL.
     */
    entryResource: Resource;
    /**
     * If headless browser transport is specified, a puppeteer browser object
     * that will be used for all fetches.
     */
    browser: Browser;
    /**
     * Additional options provided to all resources.
     */
    transportOptions: TransportOptions;
    /**
     * The HTML of the entry URL.
     */
    html: string;
    /**
     * A JSDOM Document constructed from the entry URL HTML.
     */
    document: Document;
    /**
     * A cache of all the resources available within the document.
     */
    resourceCache: ResourceCache;
    /**
     * Constructor function for the Humble class.
     *
     * @param options options used to modify the archiving process.
     */
    constructor(options: HumbleOptions);
    /**
     * Gets the protocol from a given URL. If no protocol is found then the
     * protocol from the base URL is used.
     *
     * @param urL the URL whose protocol will be returned.
     * @returns the protocol of the given URL.
     */
    getProtocol(url: string): string;
    /**
     * Attempts to correct poorly formatted URLs. For example, some versions of
     * firefox incorrectly format URLs when downloading CSS files locally.
     *
     * @param url the URL that will be corrected.
     * @returns the corrected URL.
     */
    correctUrl(url: string): string;
    /**
     * Converts a URL into an absolute URL. For example, on the domain
     * `https://example.com`, the URL `/hello/world` will be converted to
     * `https://example.com/hello/world`.
     *
     * @param url the URL that will be converted to an absolute URL.
     * @returns the absolute URL.
     */
    resolveAbsoluteUrl(url: string): string;
    /**
     * Creates a new resource and adds that resource to the internal resource
     * cache.
     *
     * @param url the URL of the resource.
     * @param type the type of the resource.
     */
    createCacheResource(url: string, type: ResourceType): void;
    /**
     * Adds a new resource to the resource cache if the resource does not already
     * exist at the specified URL.
     *
     * @param resource the resource that will be added to the cache.
     */
    addResourceToCache(resource: Resource): void;
    /**
     * Gets a resource from the resource cache at the provided URL.
     *
     * @param url the URL of the resource.
     * @returns the resource at the provided URL.
     */
    getResourceFromCache(url: string): Resource;
    /**
     * Checks if the resource at the provided URL is in the resource cache.
     *
     * @param url the URL of the resource.
     * @returns true if the resource is in the cache, false otherwise.
     */
    isResourceInCache(url: string): boolean;
    /**
     * Fetches all resources of a specified type in the resource cache. If the
     * resource has already been successfully fetched, then no additional fetches
     * will be performed for that resource.
     *
     * @param type the type of resource that will be fetched.
     */
    fetchCachedResourceByType(type: ResourceType): Promise<void>;
    /**
     * Fetches all resources within the resource cache. If the resource has
     * already been successfully fetched, then no additional fetches will be
     * executed for that resource.
     */
    fetchAllCachedResources(): Promise<void>;
    /**
     * Creates a subcache of resources of the provided type.
     *
     * @param type the type of resource in the subcache.
     * @returns the subcache with all resources of the provided type.
     */
    createSubCache(type: ResourceType): ResourceCache;
    /**
     * Adds all CSS resources to the resource cache.
     */
    cacheCss(): void;
    /**
     * Adds all script resources to the resource cache.
     */
    cacheScripts(): void;
    /**
     * Adds all HTML image resources to the resource cache.
     */
    cacheHtmlImages(): void;
    /**
     * Adds all CSS image resources to the resource cache.
     */
    cacheCssImages(): void;
    /**
     * Adds all audio resources to the resource cache.
     */
    cacheAudio(): void;
    /**
     * Adds all video resources to the resource cache.
     */
    cacheVideos(): void;
    /**
     * Adds all font resources to the resource cache.
     */
    cacheFonts(): void;
    /**
     * Adds all cursor resources to the resource cache.
     */
    cacheCursors(): void;
    /**
     * Adds all favicon resources to the resource cache.
     */
    cacheFavicons(): void;
    /**
     * Adds all other resources to the resource cache, such as resources in
     * `<embed>` and `<object>` tags.
     */
    cacheOtherResources(): void;
    /**
     * Sets the URLs in all of the `url()` nodes in the CSS to the absolute URL
     * of that node, using the URL of the stylesheet itself as the base URL for
     * generating the absolute URLs.
     *
     * @param css the CSS code that will be modified.
     * @param baseUrl the base URL of that CSS code.
     * @returns the CSS code with rebased URLs.
     */
    rebaseCssUrlFunctions(css: string, baseUrl: string): string;
    /**
     * Recursively imports and inlines all CSS from each of the `@import` tags
     * within the provided CSS code.
     *
     * @param css the base CSS code that will be checked for import statements
     * and replaced with inline CSS imports.
     * @param baseUrl the base URL of the CSS stylesheet.
     */
    importCss(css: string, baseUrl: string): Promise<string>;
    /**
     * Importing all of the CSS `@import` statements in each of the CSS resources
     * in the resource cache.
     */
    importAllCss(): Promise<void>;
    /**
     * Inlines all CSS resources into the document from the resource cache.
     */
    inlineCss(): Promise<void>;
    /**
     * Inlines all script resources into the document from the resource cache.
     */
    inlineScripts(): Promise<void>;
    /**
     * Inlines all html image resources into the document from the resource cache.
     */
    inlineHtmlImages(): Promise<void>;
    /**
     * Inlines all audio resources into the document from the resource cache.
     */
    inlineAudio(): Promise<void>;
    /**
     * Inlines all video resources into the document from the resource cache.
     */
    inlineVideos(): Promise<void>;
    /**
     * Inlines all favicon resources into the document from the resource cache.
     */
    inlineFavicons(): Promise<void>;
    /**
     * Inlines all other resources into the document from the resource cache.
     */
    inlineOtherResources(): Promise<void>;
    /**
     * Inlines all CSS resources into the document from the resource cache.
     */
    inlineCssResources(): Promise<void>;
    /**
     * Runs all of the provided Humble plugins, passing in a reference to the
     * current Humble context into the plugins.
     *
     * @param humblePlugins an array of Humble plugins.
     */
    runPlugins(humblePlugins: HumblePlugin[]): Promise<void>;
    outputArchive(output: string): void;
    /**
     * Runs the archiving process, fetching the page and all resources,
     * modifying the page and resources, and creating a single HTML file bundle
     * of the page and resources.
     */
    archive(): Promise<void>;
}
//# sourceMappingURL=humble.d.ts.map