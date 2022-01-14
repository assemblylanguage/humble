/**
 * Code for minifying source code throughout the document. Currently, this
 * file supports functions for minifying HTML, CSS, and JS.
 */

/* eslint-disable camelcase */
/* eslint-disable no-script-url */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-multi-spaces */

import { minify as minifyHtmlCode } from '../../../modules/html-minifier/html-minifier';
import * as CleanCSS from 'clean-css';
import { minify as minifyJsCode } from 'terser';
import * as cssTree from 'css-tree';
import { CssNode } from 'css-tree';

/**
 * Removes empty attributes in all of the opening tags in the provided HTML
 * string.
 *
 * @example
 * ```typescript
 * // The uncollapsed attributes before running the minifier:
 * //
 * // <html>
 * //   <body>
 * //     <p hello=""></p>
 * //   </body>
 * // </html>
 *
 * // Collapsing the empty attributes.
 * collapseEmptyAttributes(html);
 *
 * // After running the minifier, the empty HTML attributes will be collapsed:
 * //
 * // <html>
 * //   <body>
 * //     <p hello></p>
 * //   </body>
 * // </html>
 * ```
 *
 * @param html the html that will be minified.
 * @returns the minified HTML with collapsed attributes.
 */
export function collapseEmptyAttributes(
  html: string,
): string {
  // Creating a regular expression to get all opening tags in the HTML string.
  const openingTagRegex: RegExp = /<[a-zA-Z0-9-_]*?\s*?[a-zA-Z0-9-_]*?=('|"){2}.*?>/gmis;

  // Getting all of the opening tags in the HTML string.
  const openingTags: string[] = html.match(openingTagRegex);

  // For each opening tag, getting all of the attributes in the tag, and for
  // each attribute that has an empty attribute value, removing the empty
  // attribute value.
  for (const openingTag of openingTags) {
    // Creating a regular expression to get all attributes in the opening tag
    // that have no value (empty attributes).
    const emptyAttributeRegex: RegExp = /[a-zA-Z-_]*?=('|"){2}/gmi;

    // Getting all of the empty attributes in the opening tag.
    const emptyAttributes: string[] = openingTag.match(emptyAttributeRegex);

    // Creating a minified version of the opening tag, by removing all of the
    // unnecessary empty values from the empty attributes.
    let minifiedOpeningTag: string = openingTag;

    for (const emptyAttribute of emptyAttributes) {
      // Getting the empty attribute without the unnecessary attribute value.
      const emptyAttributeName: string = emptyAttribute.split('=')[0];

      // Replacing the empty attribute with only the empty attribute name to
      // remove the unnecessary empty value.
      minifiedOpeningTag = minifiedOpeningTag
        .split(emptyAttribute)
        .join(emptyAttributeName);
    }

    // If the opening tag was modified (at least one of the empty attributes was
    // successfully minified), then replacing the opening tag with the minified
    // opening tag in the HTML string.
    if (openingTag !== minifiedOpeningTag) {
      html = html.split(openingTag).join(minifiedOpeningTag);
    }
  }

  return html;
}

/**
 * Minifies HTML. The implementation is from the `html-minifier` library.
 *
 * @command **`--minify-html`**
 * @example
 * ```typescript
 * // The unminified HTML before running the minifier:
 * //
 * // <html>
 * //   <head>
 * //   </head>
 * //   <body>
 * //     <p>Hello, World</p>
 * //   </body>
 * // </html>
 *
 * // Minifying the document HTML.
 * minifyHtml(html, options);
 *
 * // After running the minifier, the HTML will be minified:
 * //
 * // <html><head></head><body><p>Hello, World</p></body></html>
 * ```
 *
 * @param html the html that will be minified.
 * @param options the options used within the `html-minifier` library.
 * @returns the minified HTML.
 *
 * @see https://www.npmjs.com/package/html-minifier
 */
export function minifyHtml(
  html: string,
  options: any,
) : string {
  if (options.collapseEmptyAttributes === true) {
    return collapseEmptyAttributes(minifyHtmlCode(html, options));
  }

  return minifyHtmlCode(html, options);
}

/**
 * Minifies the CSS in all `<style>` tags and all inline `style` attributes in
 * the document. The implementation is from the `clean-css` library.
 *
 * @command **`--minify-css`**
 * @example
 * ```typescript
 * // The unminified CSS before running the minifier:
 * //
 * // <html>
 * //   <head>
 * //     <style>
 * //       .hello {
 * //         color: #fff;
 * //       }
 * //     </style>
 * //   </head>
 * // </html>
 *
 * // Minifying the document CSS.
 * minifyCss(document, options);
 *
 * // After running the minifier, the CSS will be minified:
 * //
 * // <html>
 * //   <head>
 * //     <style>.hello{color:#fff}</style>
 * //   </head>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 * @param options the options used within the `clean-css` library.
 *
 * @see https://www.npmjs.com/package/clean-css
 */
export function minifyCss(
  document: Document,
  options: any,
) : void {
  // Minifying all of the CSS in the `<style>` tags.
  const styleElements: Element[] = [
    ...document.getElementsByTagName('style'),
  ];

  for (const styleElement of styleElements) {
    const css: string = styleElement.innerHTML;
    const minifiedCss: string = new CleanCSS(options).minify(css).styles;
    styleElement.innerHTML = minifiedCss;
  }

  // Minifying all of the CSS in the inline `style` attributes.
  const styleAttributeElements: Element[] = [
    ...document.querySelectorAll('[style]'),
  ];

  for (const styleAttributeElement of styleAttributeElements) {
    const css: string = styleAttributeElement.getAttribute('style');
    const minifiedCss: string = new CleanCSS(options).minify(css).styles;
    styleAttributeElement.setAttribute('style', minifiedCss);
  }
}

/**
 * Minifies the JavaScript in all `<script>` tags, in all inline script
 * attributes in the document, and all `javascript:` protocols. The
 * implementation is from the `terser` library.
 *
 * @command **`--minify-js`**
 * @example
 * ```typescript
 * // The unminified JS before running the minifier:
 * //
 * // <html>
 * //   <head>
 * //     <script>
 * //       console.log(
 * //         'Hello, World'
 * //       );
 * //     </script>
 * //   </head>
 * // <html>
 *
 * // Minifying the document JS.
 * minifyJs(document, options);
 *
 * // After running the minifier, the JS will be minified:
 * //
 * // <html>
 * //   <script>console.log('Hello, World')</script>
 * // <html>
 * ```
 *
 * @param document the document that will be modified in place.
 * @param options the options used within the `terser` library.
 *
 * @see https://www.npmjs.com/package/terser
 */
export async function minifyJs(
  document: Document,
  options: any,
) : Promise<void> {
  // Minifying all of the JavaScript in the `<script>` tags
  const scriptElements: Element[] = [
    ...document.getElementsByTagName('script'),
  ];

  for (const scriptElement of scriptElements) {
    // Getting the JavaScript code and minifying it.
    const js: string = scriptElement.innerHTML;
    const result: any = await minifyJsCode(js, options);

    // If the minifier was successful, setting the minified code in the
    // innerHTML of the element.
    if (!result.error) {
      scriptElement.innerHTML = result.code;
    }
  }

  // Minifying all of the JavaScript in the inline script attributes.
  const eventAttributes: string[] = [
    'onabort',              'onanimationcancel',  'onanimationend',
    'onanimationiteration', 'onanimationstart',   'onauxclick',
    'onblur',               'onerror',            'onfocus',
    'oncancel',             'oncanplay',          'oncanplaythrough',
    'onchange',             'onclick',            'onclose',
    'oncontextmenu',        'oncuechange',        'ondblclick',
    'ondrag',               'ondragend',          'ondragenter',
    'ondragexit',           'ondragleave',        'ondragover',
    'ondragstart',          'ondrop',             'ondurationchange',
    'onemptied',            'onended',            'onformdata',
    'ongotpointercapture',  'oninput',            'oninvalid',
    'onkeydown',            'onkeypress',         'onkeyup',
    'onload',               'onloadeddata',       'onloadedmetadata',
    'onloadend',            'onloadstart',        'onlostpointercapture',
    'onmousedown',          'onmouseenter',       'onmouseleave',
    'onmousemove',          'onmouseout',         'onmouseover',
    'onmouseup',            'onmousewheel',       'onwheel',
    'onpause',              'onplay',             'onplaying',
    'onpointerdown',        'onpointermove',      'onpointerup',
    'onpointercancel',      'onpointerover',      'onpointerout',
    'onpointerenter',       'onpointerleave',     'onpointerlockchange',
    'onpointerlockerror',   'onprogress',         'onratechange',
    'onreset',              'onresize',           'onscroll',
    'onseeked',             'onseeking',          'onselect',
    'onselectstart',        'onselectionchange',  'onshow',
    'onsort',               'onstalled',          'onsubmit',
    'onsuspend',            'ontimeupdate',       'onvolumechange',
    'ontouchcancel',        'ontouchend',         'ontouchmove',
    'ontouchstart',         'ontransitioncancel', 'ontransitionend',
    'ontransitionrun',      'ontransitionstart',  'onwaiting',
  ];

  const allElements: Element[] = [
    ...document.getElementsByTagName('*'),
  ];

  // For each element in the document, if the element has one of the `on*`
  // event attributes, minifying the JavaScript code in that attribute.
  for (const element of allElements) {
    for (const eventAttribute of eventAttributes) {
      if (element.hasAttribute(eventAttribute)) {
        // Getting the JavaScript code and minifying it.
        const js: string = element.getAttribute(eventAttribute);
        const result: any = await minifyJsCode(js, options);

        // If the minifier was successful, setting the minified code in the
        // event attribute of the element.
        if (!result.error) {
          element.setAttribute(eventAttribute, result.code);
        }
      }
    }
  }

  // Minifying the JavaScript in all inline `href` attributes using the
  // `javascript:` protocol.
  const hrefElements: Element[] = [
    ...document.querySelectorAll('[href]'),
  ];

  for (const element of hrefElements) {
    const href: string = element.getAttribute('href') ?? '';

    if (/javascript:/gmi.test(href) === true) {
      // Getting the JavaScript code and minifying it.
      const js: string = element.getAttribute('href')
        .split('javascript:')
        .slice(1)
        .join('javascript:');

      const result: any = await minifyJsCode(js, options);

      // If the minifier was successful, setting the minified code in the
      // `href` attribute of the element.
      if (!result.error) {
        element.setAttribute('href', `javascript:${result.code}`);
      }
    }
  }
}

/**
 * Replaces a specified Type selector in all inline stylesheets in the
 * document.
 *
 * @param oldType the old type selector.
 * @param newType the new type selector.
 * @param document the document that will be modified in place.
 */
export function replaceCssTypeSelectors(
  oldType: string,
  newType: string,
  document: Document,
) : void {
  // For each of the inline `<style>` tags, walking through the AST, updating
  // the type selector, generating new CSS code, and finally setting the
  // innerHTML with the new code.
  const styleElements: Element[] = [...document.getElementsByTagName('style')];

  for (const styleElement of styleElements) {
    const css: string = styleElement.innerHTML;
    const cssAst: CssNode = cssTree.parse(css);

    // Walking through all the type nodes in the CSS AST and replacing the old
    // type name with the new type name.
    cssTree.walk(cssAst, {
      visit: 'TypeSelector',
      enter: (typeNode) => {
        if (typeNode.name === oldType) {
          typeNode.name = newType;
        }
      },
    });

    // Generating new CSS code from the modified AST.
    styleElement.innerHTML = cssTree.generate(cssAst);
  }
}

/**
 * Minifies generic tag names that have no HTML semantic meaning. Currently the
 * algorithm used to minify generic tag names minifies the following tags:
 *
 * * `<div>`  -> `<d>`
 * * `<span>` -> `<n>`
 *
 * @command **`--minify-generic-tag-names`**
 * @example
 * ```typescript
 * // The unminified HTML before running the minifier:
 * //
 * // <html>
 * //   <body>
 * //     <div></div>
 * //     <span></div>
 * //   </body>
 * // </html>
 *
 * // Minifying the document generic tag names.
 * minifyGenericTagNames(document);
 *
 * // After running the minifier, generic tag names will be minified:
 * //
 * // <html>
 * //   <body>
 * //     <d></d>
 * //     <n></n>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified inplace.
 */
export function minifyGenericTagNames(
  document: Document,
) : void {
  // Replacing the `<span>` tag and updating all references to `<span>` in all
  // of the style sheets.
  const spanElements: Element[] = [...document.getElementsByTagName('span')];

  // For each `<span>` tag, replace the tag with the `<n>` tag.
  for (const spanElement of spanElements) {
    const elementOuterHTML: string = spanElement.outerHTML.trim();
    const minifiedTagOuterHTML: string = `<n${elementOuterHTML.substr(5, elementOuterHTML.length - 10)}n>`;

    spanElement.outerHTML = minifiedTagOuterHTML;

    // Replacing all references to `<span>` with the minified `<n>` tag in all
    // of the style sheets,
    replaceCssTypeSelectors('span', 'n', document);
  }

  // Replacing the `<div>` tag and updating all references to `<div>` in all
  // of the style sheets.
  const divElements: Element[] = [...document.getElementsByTagName('div')];

  // For each `<div>` tag, replace the tag with the `<d>` tag.
  for (const element of divElements) {
    const elementOuterHTML: string = element.outerHTML.trim();
    const minifiedTagOuterHTML: string = `<d${elementOuterHTML.substr(4, elementOuterHTML.length - 8)}d>`;

    element.outerHTML = minifiedTagOuterHTML;
  }

  // Replacing all references to `<div>` with the minified `<d>` tag in all
  // of the style sheets,
  replaceCssTypeSelectors('div', 'd', document);

  // Adding a new style tag at the top of the `<head>` tag with the default
  // styles found on the `<div>` tag based on the implementation in browsers.
  const headElement: Element = document.querySelector('head');
  headElement.innerHTML = `<style>d{display:block}</style>${headElement.innerHTML}`;
}
