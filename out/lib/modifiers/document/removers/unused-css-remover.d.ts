/**
 * Code for removing unused CSS from all of the style sheets in the document.
 */
/**
 * Removes all unused CSS code from the document. For example, if the selector
 * `p { color: #000 }` is found in a style sheet, but there are no `<p>` tags
 * on the page, the `p { color: #000 }` will be removed from the style sheet.
 *
 * @command **`--remove-unused-css`**
 * @example
 * ```typescript
 * // The HTML markup before removing unused CSS in the document:
 * //
 * // <html>
 * //   <head>
 * //     <style>
 * //       p { color: #000; }
 * //       b { color: #000; }
 * //       i { color: #000; }
 * //       u { color: #000; }
 * //     </style>
 * //   </head>
 * //   <body>
 * //     <p>Hello, World</p>
 * //   </body>
 * // </html>
 *
 * // Removing the unused CSS in the document.
 * removeHiddenElementsAndCss(document);
 *
 * // The HTML markup after removing unused CSS in the document:
 * //
 * // <html>
 * //   <head>
 * //     <style>
 * //       p { color: #000; }
 * //     </style>
 * //   </head>
 * //   <body>
 * //     <p>Hello, World</p>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
export declare function removeUnusedCss(document: Document): void;
//# sourceMappingURL=unused-css-remover.d.ts.map