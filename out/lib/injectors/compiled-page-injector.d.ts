/**
 * Compiles HTML pages into a self-decoding, self-extracting, and self-rebuilding
 * minified version of the page. See the `injectCompiledPage` function for more
 * information on the compilation algorithm used.
 */
/**
 * Injects a compiled version of the HTML page into the document. The compiled
 * version fo the page is a extremely minified version that is created and
 * rebuilt using the following algorithm:
 *
 * 1. The page is chunked up into utf8 and base64 encoded segments, and a
 * source map is created that provides instructions on the decoding algorithm
 * and length of each segment.
 * 2. Utf8 and base64 segments are encoded into buffers using utf8 and base64
 * algorithms respectively.
 * 3. All byte segments are compiled into a single buffer.
 * 4. The combined buffer is compressed using LZMA compression at the maximum
 * level of compression (level 9).
 * 5. The compressed buffer is encoded into a string using the z85 encoding
 * algorithm.
 * 6. A z85 decoder, LZMA decompressor, and base64 encoder library, as well as
 * the source map used to reconstruct the page and the z85 encoded page itself,
 * are injected into the page in place of the page contents.
 * 7. When the page is opened in the browser, the chain will unravel,
 * decoding the z85 encoded HTML page into a buffer, decompressing the buffer
 * using the LZMA algorithm, chunking the buffer into utf8 and base64 encoded
 * segments using the source map, encoding the segments into strings using utf8
 * and base64 encoding depending on the encoding type in the source map, and
 * then combining all of the strings into a single HTML string and injecting it
 * into the document element's innerHTML.
 *
 * @command **`--inject-compiled-page`**
 *
 * @param document the document that will be modified in place.
 * @param minifyHtml when true, will minify the HTML page before running the
 * compilation algorithm.
 * @param minifyHtmlOptions the options used within the `html-minifier` library.
 * @param minifyJs when true, will minify the injectable JavaScript code with
 * the compiled page, as well as the injected libraries used to rebuild the
 * page.
 * @param minifyJsOptions the options used within the `terser` library.
 */
export declare function injectCompiledPage(document: Document, minifyHtml?: boolean, minifyHtmlOptions?: any, minifyJs?: boolean, minifyJsOptions?: any): Promise<void>;
//# sourceMappingURL=compiled-page-injector.d.ts.map