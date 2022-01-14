/**
 * Code for removing any hidden elements within the document.
 */
/**
 * Removes all elements from the document and all rules from the inline
 * stylesheets with `display: none` CSS declarations.
 *
 * @command **`--remove-hidden-elements-and-css`**
 * @example
 * ```typescript
 * // The HTML markup before removing hidden elements in the document:
 * //
 * // <html>
 * //   <head>
 * //     <style>
 * //       p { display: none; }
 * //     </style>
 * //   </head>
 * //   <body>
 * //     <p>Hello, World</p>
 * //     <div style="display: none;">Hello, World</div>
 * //   </body>
 * // </html>
 *
 * // Removing the hidden elements in the document.
 * removeHiddenElementsAndCss(document);
 *
 * // The HTML markup after removing hidden elements in the document:
 * //
 * // <html>
 * //   <head>
 * //     <style>
 * //       p { display: none; }
 * //     </style>
 * //   </head>
 * //   <body>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
export declare function removeHiddenElementsAndCss(document: Document): void;
//# sourceMappingURL=hidden-element-remover.d.ts.map