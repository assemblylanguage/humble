/**
 * Code for minifying all of the class names and IDs in the document.
 */
/**
 * Creates a valid minified class name or ID from a number by converting
 * the number into a base-26 number that is represented via the letters `A-Z`.
 *
 * @param num the number that will be converted to a 26-base number.
 * @returns a base-26 number represented with the letters A-Z.
 *
 * @todo improve the implementation, CSS allows for additional characters to be
 * included in the selectors, but some are disallowed as the first character.
 * Additionally, there is a small, non-destructive bug where the number after
 * `Z` will be calculated as `BA`, when it should be `AA`, but this won't have
 * any effect unless the number of CSS class names and IDs is greater than 650
 * (26 * 25), which I assume (and hope) for the majority of web pages is not
 * the case.
 */
export declare function createMinifiedNameFromNumber(base10Number: number): string;
/**
 * Minifies all of the class names within a document and all of the document's
 * inline style sheets.
 *
 * @command **`--minify-class-names`**
 * @example
 * ```typescript
 * // The unminified classes in the document and style sheets before running
 * // the minifier:
 * //
 * // <html>
 * //   <head>
 * //     <style>
 * //       .hello { color: #000; }
 * //     </style>
 * //   </head>
 * //   <body>
 * //     <p class="hello"></p>
 * //   </body>
 * // </html>
 *
 * // Minifying the document class names.
 * minifyClassNames(document);
 *
 * // After running the minifier, the classes in the document and style sheet
 * // will be minified:
 * //
 * // <html>
 * //   <head>
 * //     <style>
 * //       .a { color: #000; }
 * //     </style>
 * //   </head>
 * //   <body>
 * //     <p class="a"></p>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
export declare function minifyClassNames(document: Document): void;
/**
 * Minifies all of the IDs within a document and all of the document's inline
 * style sheets, as well as updating inline references with the new IDs.
 *
 * @command **`--minify-ids`**
 * @example
 * ```typescript
 * // The unminified IDs in the document and style sheets before running the
 * // minifier:
 * //
 * // <html>
 * //   <head>
 * //     <style>
 * //       #hello { color: #000; }
 * //     </style>
 * //   </head>
 * //   <body>
 * //     <p id="hello"></p>
 * //   </body>
 * // </html>
 *
 * // Minifying the document IDs.
 * minifyIDs(document);
 *
 * // After running the minifier, the IDs in the document and style sheet will
 * // be minified:
 * //
 * // <html>
 * //   <head>
 * //     <style>
 * //       .a { color: #000; }
 * //     </style>
 * //   </head>
 * //   <body>
 * //     <p id="a"></p>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
export declare function minifyIDs(document: Document): void;
/**
 * Minifies all of the class names and IDs within a document, using the same
 * minification methods as the `minifyClassNames` and `minifyIDs`, except that
 * class names and IDs are converted to minified empty HTML attributes. After
 * the minified empty attributes are added to the elements, the `class`
 * attribute and `id` attribute will be removed from the element (except for
 * `id` attributes that contain inline references), and the class and ID
 * selectors in all style sheets in the page will be updated with CSS3
 * attribute selectors.
 *
 * @command **`--minify-class-names-and-ids-to-attributes`**
 * @example
 * ```typescript
 * // The unminified classes and IDs in the document and style sheets before
 * // running the minifier:
 * //
 * // <html>
 * //   <head>
 * //     <style>
 * //       #hello { color: #000; }
 * //       .world { color: #000; }
 * //     </style>
 * //   </head>
 * //   <body>
 * //     <p id="hello" class="world"></p>
 * //   </body>
 * // </html>
 *
 * // Minifying the document class names and IDs into attributes.
 * minifyClassNamesAndIDsToAttributes(document);
 *
 * // After running the minifier, the classes and IDs in the document and style
 * // sheet will be minified:
 * //
 * // <html>
 * //   <head>
 * //     <style>
 * //       #a { color: #000; }
 * //       .b { color: #000; }
 * //     </style>
 * //   </head>
 * //   <body>
 * //     <p a b></p>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
export declare function minifyClassNamesAndIDsToAttributes(document: Document): void;
//# sourceMappingURL=class-id-minifier.d.ts.map