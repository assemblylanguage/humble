/**
 * Code for minifying source code throughout the document. Currently, this
 * file supports functions for minifying HTML, CSS, and JS.
 */
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
export declare function collapseEmptyAttributes(html: string): string;
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
export declare function minifyHtml(html: string, options: any): string;
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
export declare function minifyCss(document: Document, options: any): void;
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
export declare function minifyJs(document: Document, options: any): Promise<void>;
/**
 * Replaces a specified Type selector in all inline stylesheets in the
 * document.
 *
 * @param oldType the old type selector.
 * @param newType the new type selector.
 * @param document the document that will be modified in place.
 */
export declare function replaceCssTypeSelectors(oldType: string, newType: string, document: Document): void;
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
export declare function minifyGenericTagNames(document: Document): void;
//# sourceMappingURL=source-code-minifiers.d.ts.map