/**
 * Code for transpiling JS source code throughout the document.
 */
/**
 * Transpiles the JavaScript in all `<script>` tags, in all inline script
 * attributes in the document, and all `javascript:` protocols. The
 * implementation is from the `@babel/core` library.
 *
 * @command **`--transpile-es6-to-es5`**
 * @example
 * ```typescript
 * // The untranspiled JS before running the transpiler:
 * //
 * // <html>
 * //   <head>
 * //     <script>
 * //       let hello = 'world';
 * //     </script>
 * //   </head>
 * // </html>
 *
 * // Transpiling the document JS.
 * transpileEs6ToEs5(document, options);
 *
 * // After running the transpiler, the ES6+ JS will be transpiled to ES5:
 * //
 * // <html>
 * //   <head>
 * //     <script>
 * //       var hello = 'world';
 * //     </script>
 * //   </head>
 * // </html>
 *
 * @param document the document that will be modified in place.
 * @param options the options used within the `@babel/core` library.
 *
 * @see https://babeljs.io/
 */
export declare function transpileEs6ToEs5(document: Document, options: any): void;
//# sourceMappingURL=source-code-transpilers.d.ts.map