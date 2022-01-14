/**
 * Code for beautifying source code throughout the document. Currently, this
 * file supports functions for minifying HTML, CSS, and JS.
 */
import { JSBeautifyOptions } from 'js-beautify';
import { CSSBeautifyOptions } from 'js-beautify';
import { HTMLBeautifyOptions } from 'js-beautify';
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
export declare function beautifyHtml(html: string, options: HTMLBeautifyOptions): string;
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
export declare function beautifyCss(document: Document, options: CSSBeautifyOptions): void;
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
export declare function beautifyJs(document: Document, options: JSBeautifyOptions): void;
//# sourceMappingURL=source-code-beautifiers.d.ts.map