"use strict";
/**
 * Code for beautifying source code throughout the document. Currently, this
 * file supports functions for minifying HTML, CSS, and JS.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.beautifyJs = exports.beautifyCss = exports.beautifyHtml = void 0;
/* eslint-disable camelcase */
/* eslint-disable no-multi-spaces */
const js_beautify_1 = require("js-beautify");
const js_beautify_2 = require("js-beautify");
const js_beautify_3 = require("js-beautify");
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
function beautifyHtml(html, options) {
    return js_beautify_3.html(html, options);
}
exports.beautifyHtml = beautifyHtml;
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
function beautifyCss(document, options) {
    // Getting all of the `<style>` tags in the document.
    const styleElements = [
        ...document.getElementsByTagName('style'),
    ];
    // Beautifying all the CSS in the `<style>` tags.
    for (const styleElement of styleElements) {
        const css = styleElement.innerHTML;
        const beautifiedCss = js_beautify_2.css(css, options);
        styleElement.innerHTML = beautifiedCss;
    }
    // Getting all the tags with a `style` attribute.
    const styleAttributeElements = [
        ...document.querySelectorAll('[style]'),
    ];
    // Beautifying all the CSS in the inline `style` attributes.
    for (const styleAttributeElement of styleAttributeElements) {
        const css = styleAttributeElement.getAttribute('style');
        const beautifiedCss = js_beautify_2.css(css, options);
        styleAttributeElement.setAttribute('style', beautifiedCss);
    }
}
exports.beautifyCss = beautifyCss;
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
function beautifyJs(document, options) {
    var _a;
    // Getting all of the `<script>` tags in the document.
    const scriptElements = [
        ...document.getElementsByTagName('script'),
    ];
    // Beautifying all the scripts in the `<script>` tags.
    for (const scriptElement of scriptElements) {
        const beautifiedJs = js_beautify_1.js(scriptElement.innerHTML, options);
        scriptElement.innerHTML = beautifiedJs;
    }
    // Creating an array of all possible inline event listener attributes.
    const eventAttributes = [
        'onabort', 'onanimationcancel', 'onanimationend',
        'onanimationiteration', 'onanimationstart', 'onauxclick',
        'onblur', 'onerror', 'onfocus',
        'oncancel', 'oncanplay', 'oncanplaythrough',
        'onchange', 'onclick', 'onclose',
        'oncontextmenu', 'oncuechange', 'ondblclick',
        'ondrag', 'ondragend', 'ondragenter',
        'ondragexit', 'ondragleave', 'ondragover',
        'ondragstart', 'ondrop', 'ondurationchange',
        'onemptied', 'onended', 'onformdata',
        'ongotpointercapture', 'oninput', 'oninvalid',
        'onkeydown', 'onkeypress', 'onkeyup',
        'onload', 'onloadeddata', 'onloadedmetadata',
        'onloadend', 'onloadstart', 'onlostpointercapture',
        'onmousedown', 'onmouseenter', 'onmouseleave',
        'onmousemove', 'onmouseout', 'onmouseover',
        'onmouseup', 'onmousewheel', 'onwheel',
        'onpause', 'onplay', 'onplaying',
        'onpointerdown', 'onpointermove', 'onpointerup',
        'onpointercancel', 'onpointerover', 'onpointerout',
        'onpointerenter', 'onpointerleave', 'onpointerlockchange',
        'onpointerlockerror', 'onprogress', 'onratechange',
        'onreset', 'onresize', 'onscroll',
        'onseeked', 'onseeking', 'onselect',
        'onselectstart', 'onselectionchange', 'onshow',
        'onsort', 'onstalled', 'onsubmit',
        'onsuspend', 'ontimeupdate', 'onvolumechange',
        'ontouchcancel', 'ontouchend', 'ontouchmove',
        'ontouchstart', 'ontransitioncancel', 'ontransitionend',
        'ontransitionrun', 'ontransitionstart', 'onwaiting',
    ];
    // Getting all elements within the document.
    const allElements = [
        ...document.getElementsByTagName('*'),
    ];
    // For each element in the document, if the element includes an attribute
    // within the array of inline event attributes, getting the script from that
    // attribute and beautifying it.
    for (const element of allElements) {
        for (const eventAttribute of eventAttributes) {
            if (element.hasAttribute(eventAttribute)) {
                const js = element.getAttribute(eventAttribute);
                const beautifiedJs = js_beautify_1.js(js, options);
                element.setAttribute(eventAttribute, beautifiedJs);
            }
        }
    }
    // Getting all elements within the document that have an `href` attribute.
    const hrefElements = [
        ...document.querySelectorAll('[href]'),
    ];
    // For each element, if the protocol of the element is `javascript:`,
    // beautifying the inline javascript.
    for (const hrefElement of hrefElements) {
        const href = ((_a = hrefElement.getAttribute('href')) !== null && _a !== void 0 ? _a : '').trim();
        if (/javascript:/gmi.test(href) === true) {
            const js = href.replace(/^javascript:/gmi, '');
            const beautifiedJs = js_beautify_1.js(js, options);
            const protocolJs = `javascript:${beautifiedJs}`;
            hrefElement.setAttribute('href', protocolJs);
        }
    }
}
exports.beautifyJs = beautifyJs;
//# sourceMappingURL=source-code-beautifiers.js.map