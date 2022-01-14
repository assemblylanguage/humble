"use strict";
/**
 * Code for injecting various resources and polyfills into the document.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectFlashPlayer = exports.injectEs5Polyfill = exports.injectHtml5MediaPolyfill = exports.injectCanvasPolyfill = exports.injectMediaQueryPolyfill = exports.injectCssFlexboxPolyfill = exports.injectHtml5Polyfill = exports.injectCustomStyleSheet = void 0;
const index_1 = require("../transports/index");
const utilities = require("../utilities");
const html5_polyfill_1 = require("./injections/html5-polyfill");
const css_flexbox_polyfill_1 = require("./injections/css-flexbox-polyfill");
const media_query_polyfill_1 = require("./injections/media-query-polyfill");
const canvas_polyfill_1 = require("./injections/canvas-polyfill");
const html5_media_polyfill_1 = require("./injections/html5-media-polyfill");
const es5_polyfill_1 = require("./injections/es5-polyfill");
const base64_flash_player_1 = require("./injections/base64-flash-player");
/**
 * Injects a custom style sheet into the document. The URL of the custom style
 * sheet may be a local resource or a network resource.
 *
 * @command **`--inject-custom-style-sheet`**
 *
 * @param url the URL of the custom style sheet.
 * @param document the document that will be modified in place.
 * @param options additional options used to modify the transport.
 */
function injectCustomStyleSheet(url, document, options) {
    return __awaiter(this, void 0, void 0, function* () {
        // Getting the protocol and base URL from the URL.
        const protocol = utilities.getProtocolFromUrl(url);
        const baseUrl = utilities.getBaseUrl(url, protocol);
        // Resolving the URL to an absolute URL.
        const absoluteUrl = utilities.resolveAbsoluteUrl(url, protocol, baseUrl);
        // Fetching the injectable CSS from the provided URL.
        const resourceResponse = yield index_1.fetchResource(absoluteUrl, protocol, options);
        // If the fetch was successful, injecting a new `<style>` tag in the `<head>`
        // of the document before any other elements.
        if (resourceResponse.status === true) {
            // Getting the CSS code from the fetch.
            const cssCode = resourceResponse.bytes.toString();
            // Injecting the CSS code at the top of the `<head>` tag.
            const headElement = document.querySelector('head');
            headElement.innerHTML = `<style>${cssCode}</style>${headElement.innerHTML}`;
        }
    });
}
exports.injectCustomStyleSheet = injectCustomStyleSheet;
/**
 * Injects Alexander Farkas's HTML5 Shiv library into the document for HTML5
 * support in older browsers.
 *
 * @command **`--inject-html5-polyfill`**
 *
 * @param document the document that will be modified in place.
 *
 * @see https://github.com/aFarkas/html5shiv
 */
function injectHtml5Polyfill(document) {
    // Creating a conditional comment that will hold the HTML5 shiv code. Note
    // the HTML5 shiv code will only execute for IE < 9 browsers.
    const conditionalHtml5PolyfillComment = `
    <!--[if lt IE 9]>
      <script type="text/javascript">
        ${html5_polyfill_1.default}
      </script>
    <![endif]-->
  `;
    // Injecting the HTML5 shiv code at the bottom of the `<head>` element.
    const headElement = document.querySelector('head');
    headElement.innerHTML += conditionalHtml5PolyfillComment;
}
exports.injectHtml5Polyfill = injectHtml5Polyfill;
/**
 * Injects Jonathan Neal's Flexibility Flexbox polyfill library into the
 * document for HTML5 support in older browsers.
 *
 * @command **`--inject-css-flexbox-polyfill`**
 *
 * @param document the document that will be modified in place.
 *
 * @see https://github.com/jonathantneal/flexibility
 */
function injectCssFlexboxPolyfill(document) {
    // Creating a conditional comment that will hold the flexbox polyfill code.
    // Note the flexbox polyfill code will only execute for IE < 9 browsers.
    const conditionalFlexboxPolyfillComment = `
    <!--[if IE]>
      <script type="text/javascript">
        ${css_flexbox_polyfill_1.default}
      </script>
    <![endif]-->
  `;
    // Injecting the flexbox polyfill code at the bottom of the `<head>` element.
    const headElement = document.querySelector('head');
    headElement.innerHTML += conditionalFlexboxPolyfillComment;
}
exports.injectCssFlexboxPolyfill = injectCssFlexboxPolyfill;
/**
 * Injects Scott Jehl's Respond.js library into the document for Media Query
 * support in older browsers.
 *
 * @command **`--inject-media-query-polyfill`**
 *
 * @param document the document that will be modified in place.
 *
 * @see https://github.com/scottjehl/Respond
 */
function injectMediaQueryPolyfill(document) {
    // Creating a conditional comment that will hold the Media Query shim code.
    // Note the Media Query polyfill code will only execute for IE < 9 browsers.
    const conditionalMediaQueryShimComment = `
    <!--[if lt IE 9]>
      <script type="text/javascript">
        ${media_query_polyfill_1.default}
      </script>
    <![endif]-->
  `;
    // Injecting the Media Query shim code at the end of the `<body>` tag.
    const bodyElement = document.querySelector('body');
    bodyElement.innerHTML += conditionalMediaQueryShimComment;
}
exports.injectMediaQueryPolyfill = injectMediaQueryPolyfill;
/**
 * Injects Google's ExplorerCanvas library into the document for canvas support
 * in Internet Explorer, with Adobe Flash fallback.
 *
 * @command **`--inject-canvas-polyfill`**
 *
 * @param document the document that will be modified in place.
 *
 * @see https://github.com/arv/explorercanvas
 */
function injectCanvasPolyfill(document) {
    // Creating a conditional comment that will hold the ExplorerCanvas polyfill
    // code. Note the ExplorerCanvas shim code will only execute for IE browsers.
    const conditionalCanvasShimComment = `
    <!--[if IE]>
      <script type="text/javascript">
        ${canvas_polyfill_1.default}
      </script>
    <![endif]-->
  `;
    // Injecting the ExplorerCanvas shim code at the bottom of the `<head>`
    // element.
    const headElement = document.querySelector('head');
    headElement.innerHTML += conditionalCanvasShimComment;
}
exports.injectCanvasPolyfill = injectCanvasPolyfill;
/**
 * Injects Dave Hall's HTML5 Media library into the document for `<audio>` and
 * `<video>` support in Internet Explorer, with Adobe Flash fallbacks.
 *
 * @command **`--inject-html5-media-polyfill`**
 *
 * @param document the document that will be modified in place.
 *
 * @see https://github.com/etianen/html5media
 */
function injectHtml5MediaPolyfill(document) {
    // Creating a conditional comment that will hold the HTML Media polyfill
    // code. Note the HTML Media polyfill code will only execute for IE browsers.
    const conditionalVideoAudioComment = `
    <!--[if IE]>
      <script type="text/javascript">
        ${html5_media_polyfill_1.default}
      </script>
    <![endif]-->
  `;
    // Injecting the HTML Media polyfill code at the bottom of the `<head>`
    // element.
    const headElement = document.querySelector('head');
    headElement.innerHTML += conditionalVideoAudioComment;
}
exports.injectHtml5MediaPolyfill = injectHtml5MediaPolyfill;
/**
 * Injects Kristopher Michael Kowal's ES5 Shim polyfill library into the
 * document for polyfilling some ES5 functions into ES3.
 *
 * @command **`--inject-es5-polyfill`**
 *
 * @param document the document that will be modified in place.
 *
 * @see https://github.com/es-shims/es5-shim
 */
function injectEs5Polyfill(document) {
    // Creating a `<script>` tag that will hold the ES5 polyfill code.
    const es5PolyfillScript = `
    <script type="text/javascript">
      ${es5_polyfill_1.default}
    </script>
  `;
    // Injecting the ES5 shim code at the bottom of the `<head>` element.
    const headElement = document.querySelector('head');
    headElement.innerHTML += es5PolyfillScript;
}
exports.injectEs5Polyfill = injectEs5Polyfill;
/**
 * Injects a Ruffle Flash Player into the document that will automatically run
 * any SWF files found in the document.
 *
 * @command **`--inject-flash-player`**
 *
 * @param document the document that will be modified in place.
 *
 * @see https://ruffle.rs/
 * @see https://github.com/ruffle-rs/ruffle
 * @see https://github.com/ruffle-rs/ruffle/releases/tag/nightly-2021-05-13
 */
function injectFlashPlayer(document) {
    // Converting the ruffle flash player and loader code bundle from base64 into
    // a utf8 encoded string.
    const flashPlayer = Buffer.from(base64_flash_player_1.default, 'base64').toString();
    // Creating a `<script>` tag that will hold the ruffle player and loader code.
    const flashPlayerScript = `
    <script type="text/javascript">
      ${flashPlayer}
    </script>
  `;
    // Injecting the ruffle player and loader code at the bottom of the `<head>`
    // element.
    const headElement = document.querySelector('head');
    headElement.innerHTML += flashPlayerScript;
}
exports.injectFlashPlayer = injectFlashPlayer;
//# sourceMappingURL=injectors.js.map