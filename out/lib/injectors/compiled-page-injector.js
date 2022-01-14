"use strict";
/**
 * Compiles HTML pages into a self-decoding, self-extracting, and self-rebuilding
 * minified version of the page. See the `injectCompiledPage` function for more
 * information on the compilation algorithm used.
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
exports.injectCompiledPage = void 0;
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-inferrable-types */
const html_minifier_1 = require("../modules/html-minifier/html-minifier");
const terser_1 = require("terser");
const lzma_1 = require("../modules/lzma/lzma");
const z85_1 = require("../modules/z85/z85");
const z85_decoder_1 = require("./injections/z85-decoder");
const lzma_decompressor_1 = require("./injections/lzma-decompressor");
const base64_decoder_1 = require("./injections/base64-decoder");
/**
 * The type of encoding used in an HTML page.
 */
var EncodingType;
(function (EncodingType) {
    EncodingType[EncodingType["UTF8"] = 0] = "UTF8";
    EncodingType[EncodingType["BASE64"] = 1] = "BASE64";
})(EncodingType || (EncodingType = {}));
/**
 * Creates an intermediate representation of a compiled HTML page from an array
 * of HTML fragments.
 *
 * @param htmlFragments fragments of an HTML page broken up into either base64
 * encoded resources and all other utf8 encoded resources.
 * @returns an unoptimized intermediate version of the compiled page.
 */
function createIntermediateCompiledPage(htmlFragments) {
    // Setting the initial starting and ending indexes. These represent the
    // indexes where each individual byte segment starts and ends.
    let startingIndex = 0;
    let endingIndex = 0;
    // Creating an empty buffer array to hold the individual byte segments and an
    // empty source map tuple that can be used to reconstruct the compiled page
    // from the byte segments.
    const byteSegments = [];
    const sourceMap = [];
    // For each HTML fragment, decoding the fragment using either base64 decoding
    // or utf8 decoding depending on the type of fragment, added the decoded
    // buffer to the byte segment array, and adding details in the source map
    // used to correctly locate and decode the buffer.
    for (const htmlFragment of htmlFragments) {
        // If the HTML fragment starts with the `data:` protocol, use base64
        // decoding to decode the base64 contents, and utf8 to decode the MIME
        // type information.
        if (htmlFragment.startsWith('data:')) {
            // Splitting the HTML fragment into MIME type information and the base64
            // encoded contents.
            const base64Segments = htmlFragment.split(',');
            // Getting the utf8 segment from the base64 resource, and decoding it
            // using utf8 decoding.
            const utf8Segment = `${base64Segments[0]},`;
            const utf8bytes = Buffer.from(utf8Segment);
            // Offsetting the ending index by the length of the utf8 segment bytes +
            // the prior starting index.
            endingIndex = startingIndex + utf8bytes.length;
            // Adding the utf8 bytes to the byte segment array and adding the
            // starting index, ending index, and encoding type to the source map.
            byteSegments.push(utf8bytes);
            sourceMap.push([
                EncodingType.UTF8,
                startingIndex,
                endingIndex,
            ]);
            // Setting the starting index to the new ending index for the next run.
            startingIndex = endingIndex;
            // Getting the base64 segment from the base64 resource, and decoding it
            // using base64 decoding.
            const base64Segment = base64Segments[1];
            const base64bytes = Buffer.from(base64Segment, 'base64');
            // Offsetting the ending index by the length of the base64 bytes + the
            // prior starting index.
            endingIndex = startingIndex + base64bytes.length;
            // Adding the base64 bytes to the byte segment array and adding the
            // starting index, ending index, and encoding type to the source map.
            byteSegments.push(base64bytes);
            sourceMap.push([
                EncodingType.BASE64,
                startingIndex,
                endingIndex,
            ]);
            // Setting the starting index to the new ending index for the next run.
            startingIndex = endingIndex;
            // If the HTML fragment does not start with the `data:` protocol, assume it
            // is not a base64 encoded resource and simply decode the entire fragment
            // using utf8 decoding.
        }
        else {
            // Decoding the utf8 string from the HTML fragment.
            const bytes = Buffer.from(htmlFragment);
            // Offsetting the ending index by the length of the base64 bytes + the
            // prior starting index.
            endingIndex = startingIndex + bytes.length;
            // Adding the utf8 bytes to the byte segment array and adding the
            // starting index, ending index, and encoding type to the source map.
            byteSegments.push(bytes);
            sourceMap.push([
                EncodingType.UTF8,
                startingIndex,
                endingIndex,
            ]);
            // Setting the starting index to the new ending index for the next run.
            startingIndex = endingIndex;
        }
    }
    // Creating the intermediate compiled page from the byte segments and the
    // source map and returning it.
    const intermediateCompiledPage = {
        byteSegments,
        sourceMap,
    };
    return intermediateCompiledPage;
}
/**
 * Optimizes an intermediate representation of the compiled page by combining
 * adjacent byte segments that have the same encoding type, as well as
 * updating the source map with the new indexes.
 *
 * @param intermediateCompiledPage an intermediate representation of the
 * compiled page.
 * @returns an optimized intermediate version of the compiled page.
 */
function optimizeIntermediateCompiledPage(intermediateCompiledPage) {
    // Getting the unoptimized byte segment array and source map.
    const unoptimizedByteSegments = intermediateCompiledPage.byteSegments;
    const unoptimizedSourceMap = intermediateCompiledPage.sourceMap;
    // Creating an empty buffer array to hold the individual byte segments and an
    // empty source map tuple that can be used to reconstruct the compiled page
    // from the byte segments.
    const byteSegments = [];
    const sourceMap = [];
    // Looping through all of the segments in the source map, checking if two
    // adjacent byte segments use the same encoding, and if so combining those
    // segments and updating the source map.
    for (let bufferIndex = 0; bufferIndex < unoptimizedByteSegments.length; bufferIndex += 1) {
        // Getting the current and next byte segments.
        const currentByteSegment = unoptimizedByteSegments[bufferIndex];
        const nextByteSegment = unoptimizedByteSegments[bufferIndex + 1];
        // Getting the current and next source map segments.
        const currentSourceMapSegment = unoptimizedSourceMap[bufferIndex];
        const nextSourceMapSegment = unoptimizedSourceMap[bufferIndex + 1];
        // If the loop is currently on the final segment (indicated by a missing
        // next byte segment), simply add the current byte segment and source map
        // segment and break the iteration.
        if (nextByteSegment === undefined) {
            // Getting the current encoding type, starting index, and ending index.
            const currentEncodingType = currentSourceMapSegment[0];
            const currentStartingIndex = currentSourceMapSegment[1];
            const currentEndingIndex = currentSourceMapSegment[2];
            // Adding the current bytes to the byte segment array and adding the
            // starting index, ending index, and encoding type to the source map.
            byteSegments.push(currentByteSegment);
            sourceMap.push([
                currentEncodingType,
                currentStartingIndex,
                currentEndingIndex,
            ]);
            break;
        }
        // Getting the encoding type of the current and next source maps
        // corresponding to the current and next byte segments.
        const currentEncodingType = currentSourceMapSegment[0];
        const nextEncodingType = nextSourceMapSegment[0];
        // If the encoding type is the same for the current and next byte segments,
        // combine both of the segments together and update the starting and ending
        // indexes to start at the beginning of the current byte segment, and end
        // at the end of the next byte segment.
        if (currentEncodingType === nextEncodingType) {
            // Combining the two byte segments into a single byte segment.
            const combinedByteSegment = Buffer.concat([
                currentByteSegment,
                nextByteSegment,
            ]);
            // Getting the new starting and ending indexes for the updated source map
            // segment from the current and next segments.
            const combinedStartingIndex = currentSourceMapSegment[1];
            const combinedEndingIndex = nextSourceMapSegment[2];
            // Adding the combined bytes to the byte segment array and adding the
            // starting index, ending index, and encoding type to the source map.
            byteSegments.push(combinedByteSegment);
            sourceMap.push([
                currentEncodingType,
                combinedStartingIndex,
                combinedEndingIndex,
            ]);
            // Incrementing the buffer index by 1 to skip the next iteration of byte
            // segments is combined with the current iteration.
            bufferIndex += 1;
            // If the encoding type differs for the current and next byte segments,
            // simply add the current byte segment and source map segment and continue
            // to the next iteration.
        }
        else {
            // Getting the current starting index and ending index.
            const currentStartingIndex = currentSourceMapSegment[1];
            const currentEndingIndex = currentSourceMapSegment[2];
            // Adding the current bytes to the byte segment array and adding the
            // starting index, ending index, and encoding type to the source map.
            byteSegments.push(currentByteSegment);
            sourceMap.push([
                currentEncodingType,
                currentStartingIndex,
                currentEndingIndex,
            ]);
        }
    }
    // Creating the optimized intermediate compiled page from the byte segments
    // and the source map and returning it.
    const optimizedIntermediateCompiledPage = {
        byteSegments,
        sourceMap,
    };
    return optimizedIntermediateCompiledPage;
}
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
function injectCompiledPage(document, minifyHtml = false, minifyHtmlOptions = {}, minifyJs = false, minifyJsOptions = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        // Getting all of the HTML content under the `<html>` tag, and minifying it
        // if specified.
        const documentHtml = (minifyHtml === true)
            ? html_minifier_1.minify(document.documentElement.innerHTML, minifyHtmlOptions)
            : document.documentElement.innerHTML;
        // Splitting the HTML content into an array of utf8 and base64 page
        // fragments.
        const base64Regex = /(?:(data[:].*?base64,(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?))/gms;
        const htmlFragments = documentHtml.split(base64Regex);
        // Creating an intermediate representation of the compiled page from the HTML
        // fragments. The intermediate representation includes byte segments for
        // utf8 and base64 encoded segments of the page, as well as a source map that
        // indicates the starting and ending index of the byte segments in a combined
        // buffer, as well as the encoding type for each segment.
        const unoptimizedIntermediatePage = createIntermediateCompiledPage(htmlFragments);
        // Optimizing the intermediate representation by combining adjacent segments
        // that use the same encoding type together into a single segment, as well as
        // updating the respective source map.
        const optimizedIntermediatePage = optimizeIntermediateCompiledPage(unoptimizedIntermediatePage);
        // Getting the byte segments and source map from the optimized intermediate
        // representation.
        const byteSegments = optimizedIntermediatePage.byteSegments;
        const sourceMap = optimizedIntermediatePage.sourceMap;
        // Combining all of the byte segments into a single combined page buffer.
        const combinedBuffer = Buffer.concat(byteSegments);
        // Compressing the combined buffer using the LZMA compression algorithm at
        // the maximum level of compression.
        const compressedDocumentInnerHtml = lzma_1.LZMA.compress(combinedBuffer, 9);
        // Creating a Z85 encoder and encoding the compiled page.
        const z85 = new z85_1.Z85();
        const z85encodedHtml = z85.encode(compressedDocumentInnerHtml);
        // Creating the script that injects the compiled page, all libraries needed
        // to extract, decode, and rebuild the compiled page, and the code that will
        // run the self rebuilding process when the page is opened in the browser.
        let compiledPageInjectionScript;
        // Getting boolean values that will check if the compiled HTML page includes
        // only a single utf8 encoded byte segment.
        const containsOnly1ByteSegment = sourceMap.length === 1;
        const isFirstByteSegmentUtf8 = sourceMap[0][0] === EncodingType.UTF8;
        // If the compiled HTML page includes only a single utf8 encoded byte
        // segment, a lighter version of the injection script will be injected that
        // excludes the base64 decoder and the rebuilding code (the code skips
        // straight to injection after the decompression).
        if (containsOnly1ByteSegment === true
            && isFirstByteSegmentUtf8 === true) {
            compiledPageInjectionScript = `
    // Injecting the z85 decoder library into the page. The decoder is based off of
    // the implementation by CometD, and is licensed under the Apache-2.0 license
    // (https://github.com/cometd/cometd-Z85).
    ${z85_decoder_1.default}

    // Injecting the LZMA decompression library into the page. The decompressor is
    // based off of the implementation by Nathan Rugg, and is licensed under the MIT
    // license (https://github.com/LZMA-JS/LZMA-JS/blob/master/LICENSE).
    ${lzma_decompressor_1.default}

      // Decoding the z85 encoded HTML page.
      const z85DecodedHtmlBuffer = decode('${z85encodedHtml}');

      // Converted the decoded array buffer into a Uint8Array.
      const uint8DecodedHtmlBuffer = new Uint8Array(z85DecodedHtmlBuffer);

      // Setting the source map which includes instructions for rebuilding the page.
      const sourceMap = ${JSON.stringify(sourceMap)}

      // Running the LZMA decompression algorithm on the decoded page to decompress
      // the page into a Uint8Array.
      LZMA.decompress(uint8DecodedHtmlBuffer, (result, error) => {
        // Injecting the rebuilt HTML into the document.
        document.documentElement.innerHTML = result;
      });
    `;
        }
        else {
            compiledPageInjectionScript = `
      // Injecting the z85 decoder library into the page. The decoder is based off of
      // the implementation by CometD, and is licensed under the Apache-2.0 license
      // (https://github.com/cometd/cometd-Z85).
      ${z85_decoder_1.default}

      // Injecting the LZMA decompression library into the page. The decompressor is
      // based off of the implementation by Nathan Rugg, and is licensed under the MIT
      // license (https://github.com/LZMA-JS/LZMA-JS/blob/master/LICENSE).
      ${lzma_decompressor_1.default}

      // Injecting the base64 decoder library into the page. The decoder is based off
      // of the implementation by Egor Nepomnyaschih, and is licensed under the MIT license
      // (https://github.com/enepomnyaschih/byte-base64/blob/master/LICENSE).
      ${base64_decoder_1.default}

      // Decoding the z85 encoded HTML page.
      const z85DecodedHtmlBuffer = decode('${z85encodedHtml}');

      // Converted the decoded array buffer into a Uint8Array.
      const uint8DecodedHtmlBuffer = new Uint8Array(z85DecodedHtmlBuffer);

      // Setting the source map which includes instructions for rebuilding the page.
      const sourceMap = ${JSON.stringify(sourceMap)}

      // Running the LZMA decompression algorithm on the decoded page to decompress
      // the page into a Uint8Array.
      LZMA.decompress(uint8DecodedHtmlBuffer, (result, error) => {
        // Rebuilding the HTML page from the combined page buffer and the source map.
        let rebuiltHtml = '';

        // Creating an enum to represent the different encoding types available in
        // the source map.
        const EncodingType = {
          UTF8: 0,
          BASE64: 1,
        }
      
        // For each source map segment in the source map, get the encoding type,
        // starting index, and ending index, using the starting and ending index to
        // get the respective slice of the combined buffer corresponding to the
        // segment of the source map, encoding the slice using the respective
        // encoding algorithm, and adding the encoded string to the rebuilt HTML
        // string.
        for (const sourceMapSegment of sourceMap) {
          // Getting the encoding type, starting index, and ending index.
          const encodingType = sourceMapSegment[0];
          const startingIndex = sourceMapSegment[1];
          const endingIndex = sourceMapSegment[2];
      
          // Getting the byte segment from the combined buffer corresponding to the
          // starting and ending indexes of source map segment
          const byteSegment = result.slice(startingIndex, endingIndex);
          const uint8ByteSegment = new Uint8Array(byteSegment);

          // Creating a text decoder and decoding for decoding the segments.
          const utf8TextDecoder = new TextDecoder();

          // Encoding the array buffer using the respective encoding algorithm.
          if (encodingType === EncodingType.UTF8) {
            // Decoding the utf8 segment and adding it to the rebuilt HTML page.
            rebuiltHtml += utf8TextDecoder.decode(uint8ByteSegment);
          } else if (encodingType === EncodingType.BASE64) {
            // Decoding the base64 segment and adding it to the rebuilt HTML
            // page.
            rebuiltHtml += bytesToBase64(uint8ByteSegment);
          }
        }

        // Injecting the rebuilt HTML into the document.
        document.documentElement.innerHTML = rebuiltHtml;
      });
    `;
        }
        // If the JS minification flag is provided, minifying the injected compiled
        // page code.
        if (minifyJs === true) {
            // Minifying the JS injection script code.
            const result = yield terser_1.minify(compiledPageInjectionScript, minifyJsOptions);
            // If the minifier was successful, setting the minified code in the
            // innerHTML of the element.
            if (!result.error) {
                compiledPageInjectionScript = result.code;
            }
        }
        // Creating the licensing comment for the decompressing and decoding libraries
        // injected into the document, depending on which libraries are injected.
        let licensingComment = '/*';
        // If the compiled HTML page includes only a single utf8 encoded byte
        // segment, the base64 encoder and license will not be added.
        if (containsOnly1ByteSegment === true
            && isFirstByteSegmentUtf8 === true) {
            licensingComment += 'LZMA License (MIT): https://github.com/LZMA-JS/LZMA-JS/blob/master/LICENSE;';
            licensingComment += 'Z85 License (Apache-2.0): https://github.com/cometd/cometd-Z85/blob/master/LICENSE;';
        }
        else {
            licensingComment += 'LZMA License (MIT): https://github.com/LZMA-JS/LZMA-JS/blob/master/LICENSE;';
            licensingComment += 'Z85 License (Apache-2.0): https://github.com/cometd/cometd-Z85/blob/master/LICENSE;';
            licensingComment += 'Base64 License (MIT): https://github.com/enepomnyaschih/byte-base64/blob/master/LICENSE;';
        }
        licensingComment += '*/';
        // Setting the document innerHTML to the compiled injection script, and
        // including links to all libraries used for the decoding and decompression
        // process.
        document.documentElement.innerHTML = `<script>${licensingComment}${compiledPageInjectionScript}</script>`;
    });
}
exports.injectCompiledPage = injectCompiledPage;
//# sourceMappingURL=compiled-page-injector.js.map