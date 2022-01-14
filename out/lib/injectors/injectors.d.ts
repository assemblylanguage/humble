/**
 * Code for injecting various resources and polyfills into the document.
 */
import { TransportOptions } from '../resource';
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
export declare function injectCustomStyleSheet(url: string, document: Document, options?: TransportOptions): Promise<void>;
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
export declare function injectHtml5Polyfill(document: Document): void;
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
export declare function injectCssFlexboxPolyfill(document: Document): void;
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
export declare function injectMediaQueryPolyfill(document: Document): void;
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
export declare function injectCanvasPolyfill(document: Document): void;
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
export declare function injectHtml5MediaPolyfill(document: Document): void;
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
export declare function injectEs5Polyfill(document: Document): void;
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
export declare function injectFlashPlayer(document: Document): void;
//# sourceMappingURL=injectors.d.ts.map