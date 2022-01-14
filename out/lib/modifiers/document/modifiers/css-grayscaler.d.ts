/**
 * Code for converting colors in CSS source code into grayscale colors.
 */
/**
 * Converts all of the colors in the provided CSS code into grayscale colors.
 *
 * @param css the CSS code that will be grayscaled.
 * @returns the grayscaled CSS code.
 */
export declare function grayscaleStyleSheet(css: string): string;
/**
 * Converts all colors in the document in all `<style>` tags and `style`
 * attributes into grayscale colors.
 *
 * @command **`--grayscale-css`**
 * @example
 * ```typescript
 * // The HTML markup before grayscaling CSS colors in the document:
 * //
 * // <html>
 * //   <head>
 * //     <style>
 * //       p { color: red; }
 * //       b { color: green; }
 * //       i { color: #00f; }
 * //       u {
 * //           background-image: linear-gradient(
 * //             to right,
 * //             rgb(255, 0, 0),
 * //             green,
 * //             #0000ff00,
 * //             hsla(0, 100%, 50%, 1.0)
 * //           );
 * //         }
 * //     </style>
 * //   </head>
 * //   <body>
 * //     <p style="color: red;">Hello, World</p>
 * //   </body>
 * // </html>
 *
 * // Grayscaling all of the colors in the `<style>` tags in the document.
 * grayscaleCss(document);
 *
 * // The HTML markup after grayscaling CSS colors in the document:
 * //
 * // <html>
 * //   <head>
 * //     <style>
 * //       p { color: #4D4D4D; }
 * //       b { color: #4C4C4C; }
 * //       i { color: #1C1C1C; }
 * //       u {
 * //           background-image: linear-gradient(
 * //             to right,
 * //             #4D4D4D,
 * //             #4C4C4C,
 * //             #1C1C1C,
 * //             #4D4D4D
 * //           );
 * //         }
 * //     </style>
 * //   </head>
 * //   <body>
 * //     <p style="color: #4D4D4D;">Hello, World</p>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
export declare function grayscaleCss(document: Document): void;
//# sourceMappingURL=css-grayscaler.d.ts.map