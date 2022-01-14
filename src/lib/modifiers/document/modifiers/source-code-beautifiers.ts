/**
 * Code for beautifying source code throughout the document. Currently, this
 * file supports functions for minifying HTML, CSS, and JS.
 */

/* eslint-disable camelcase */
/* eslint-disable no-multi-spaces */

import { JSBeautifyOptions, js as beautify_js } from 'js-beautify';
import { CSSBeautifyOptions, css as beautify_css } from 'js-beautify';
import { HTMLBeautifyOptions, html as beautify_html } from 'js-beautify';

/**
 * Beautifies HTML. The implementation is from the `js-beautify` library.
 *
 * @command **`--beautify-html`**
 * @example
 * ```typescript
 * // The unbeautified HTML before running the beautifier:
 * //
 * // <html><head></head><body><p>Hello, World</p></body></html>
 *
 * // Beautifying the document HTML.
 * beautifyHtml(html, options);
 *
 * // After running the beautifier, the HTML will be beautified:
 * //
 * // <html>
 * //   <head>
 * //   </head>
 * //   <body>
 * //     <p>Hello, World</p>
 * //   </body>
 * // </html>
 * ```
 *
 * @param html the html that will be minified.
 * @param options the options used within the `js-beautify` library.
 * @returns the beautified HTML.
 *
 * @see https://www.npmjs.com/package/js-beautify
 */
export function beautifyHtml(
  html: string,
  options: HTMLBeautifyOptions,
): string {
  return beautify_html(html, options);
}

/**
 * Beautifies CSS for all style tags and all inline styles in the document. The
 * implementation is from the `js-beautify` library.
 *
 * @command **`--beautify-css`**
 * @example
 * ```typescript
 * // The unbeautified CSS before running the beautifier:
 * //
 * // <html>
 * //   <head>
 * //     <style>.hello{color:#fff}</style>
 * //   </head>
 * // </html>
 *
 * // Beautifying the document CSS.
 * beautifyCss(document, options);
 *
 * // After running the beautifier, the CSS will be beautified:
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
 * @param document the document that will be modified in place.
 * @param options the options used within the `js-beautify` library.
 *
 * @see https://www.npmjs.com/package/clean-css
 */
export function beautifyCss(
  document: Document,
  options: CSSBeautifyOptions,
) : void {
  // Getting all of the `<style>` tags in the document.
  const styleElements: Element[] = [
    ...document.getElementsByTagName('style'),
  ];

  // Beautifying all the CSS in the `<style>` tags.
  for (const styleElement of styleElements) {
    const css: string = styleElement.innerHTML;
    const beautifiedCss: string = beautify_css(css, options);
    styleElement.innerHTML = beautifiedCss;
  }

  // Getting all the tags with a `style` attribute.
  const styleAttributeElements: Element[] = [
    ...document.querySelectorAll('[style]'),
  ];

  // Beautifying all the CSS in the inline `style` attributes.
  for (const styleAttributeElement of styleAttributeElements) {
    const css: string = styleAttributeElement.getAttribute('style');
    const beautifiedCss: string = beautify_css(css, options);
    styleAttributeElement.setAttribute('style', beautifiedCss);
  }
}

/**
 * Beautifies JS for all `<script>` tags and all inline scripts in the
 * document. The implementation is from the `js-beautify` library.
 *
 * @command **`--beautify-js`**
 * @example
 * ```typescript
 * // The unbeautified JS before running the beautifier:
 * //
 * // <html>
 * //   <head>
 * //     <script>console.log('Hello, World')</script>
 * //   </head>
 * // </html>
 *
 * // Beautifying the document JS.
 * beautifyJs(document, options);
 *
 * // After running the beautifier, the JS will be beautified:
 * //
 * // <html>
 * //   <head>
 * //     <script>
 * //       console.log(
 * //         'Hello, World'
 * //       );
 * //     </script>
 * //   </head>
 * // </html>
 *
 * @param document the document that will be modified in place.
 * @param options the options used within the `js-beautify` library.
 *
 * @see https://www.npmjs.com/package/js-beautify
 */
export function beautifyJs(
  document: Document,
  options: JSBeautifyOptions,
) : void {
  // Getting all of the `<script>` tags in the document.
  const scriptElements: Element[] = [
    ...document.getElementsByTagName('script'),
  ];

  // Beautifying all the scripts in the `<script>` tags.
  for (const scriptElement of scriptElements) {
    const beautifiedJs: string = beautify_js(scriptElement.innerHTML, options);

    scriptElement.innerHTML = beautifiedJs;
  }

  // Creating an array of all possible inline event listener attributes.
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

  // Getting all elements within the document.
  const allElements: Element[] = [
    ...document.getElementsByTagName('*'),
  ];

  // For each element in the document, if the element includes an attribute
  // within the array of inline event attributes, getting the script from that
  // attribute and beautifying it.
  for (const element of allElements) {
    for (const eventAttribute of eventAttributes) {
      if (element.hasAttribute(eventAttribute)) {
        const js: string = element.getAttribute(eventAttribute);
        const beautifiedJs: string = beautify_js(js, options);

        element.setAttribute(eventAttribute, beautifiedJs);
      }
    }
  }

  // Getting all elements within the document that have an `href` attribute.
  const hrefElements: Element[] = [
    ...document.querySelectorAll('[href]'),
  ];

  // For each element, if the protocol of the element is `javascript:`,
  // beautifying the inline javascript.
  for (const hrefElement of hrefElements) {
    const href: string = (hrefElement.getAttribute('href') ?? '').trim();

    if (/javascript:/gmi.test(href) === true) {
      const js: string = href.replace(/^javascript:/gmi, '');
      const beautifiedJs: string = beautify_js(js, options);
      const protocolJs: string = `javascript:${beautifiedJs}`;

      hrefElement.setAttribute('href', protocolJs);
    }
  }
}
