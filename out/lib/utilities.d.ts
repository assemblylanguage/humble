/**
 * Various general utility functions used throughout the program.
 */
/// <reference types="node" />
import { AxiosResponse } from 'axios';
/**
 * Checks if the given URL includes a protocol.
 *
 * @param url the given URL.
 * @returns true if the URL has a protocol, false otherwise.
 */
export declare function hasProtocol(url: string): boolean;
/**
 * Resolves a URL to an absolute URL given the base URL and protocol.
 *
 * @param url the URL that will be resolved into an absolute URL.
 * @param protocol the protocol of the URL. Currently the following protocols
 * are supported:
 * * http:
 * * https:
 * * file:
 * * data:
 * @param baseUrl the base URL of the provided URL.
 * @returns the resolved absolute URL.
 */
export declare function resolveAbsoluteUrl(url: string, protocol: string, baseUrl: string): string;
/**
 * Gets the protocol from a given URL. If no protocol is found, assumes the
 * protocol is the `file:` protocol and returns it.
 *
 * @param url the given URL.
 * @returns the protocol from the URL.
 */
export declare function getProtocolFromUrl(url: string): string;
/**
 * Gets the base URL from the given URL. For example, if the URL is
 * `https://example.com/hello/world`, then the base URL is
 * `https://example.com/`.
 *
 * @param url the given URL.
 * @param protocol the protocol of the URL. Currently the following protocols
 * are supported:
 *   * `file:`
 *   * `http:`
 *   * `https:`
 * @returns the base URL of the given URL.
 */
export declare function getBaseUrl(url: string, protocol: string): string;
/**
 * Guesses the MIME Type from a given URL and Buffer, using a combination of
 * file contents, magic numbers, and URL extension.
 *
 * @param url the URL associated with the binary data provided in the `bytes`
 * parameter.
 * @param bytes the binary data used to check for magic numbers.
 * @returns returns a MIME Type associated with the provided `bytes` and `url`.
 */
export declare function determineMimeType(url: string, bytes: Buffer): Promise<string>;
/**
 * Gets a file extension from a given MIME Type.
 *
 * @param mimeType the given MIME Type.
 * @returns and extension, such as `.png` for MIME Type `image/png`
 */
export declare function getExtensionFromMimeType(mimeType: string): string;
/**
 * Parses out the URLs from a `srcset` attribute.
 *
 * @param srcset a given srcset.
 * @returns a list of all URLs from the srcset.
 */
export declare function parseSrcsetUrls(srcset: string): string[];
/**
 * Recreates the `DOCTYPE` from a given document.
 *
 * @param document the given document.
 * @returns the correct `DOCTYPE` from a given document.
 * @see https://stackoverflow.com/questions/6088972/get-doctype-of-an-html-as-string-with-javascript
 */
export declare function getDoctype(document: Document): string;
/**
 * Decompresses an axios response data if the response data is brotli
 * compressed. If not brotli compressed, returns the original response data
 * (as axios by default handles gzip and deflate compression formats).
 *
 * @param response an axios response.
 * @returns the decompressed buffer from the response.
 */
export declare function decompressResponse(response: AxiosResponse): Buffer;
/**
 * Creates a path-safe file name from a string.
 *
 * @param fileName the file name that will be converted.
 * @returns a path-safe file name
 */
export declare function createPathSafeFileName(fileName: string): string;
/**
 * Creates a file name from the title of the document. If no title is found in
 * the document, the generic file name `archive.html` is returned.
 *
 * @param document the document with a title that will be converted to a file
 * name.
 * @returns a path-safe file name.
 */
export declare function createFileNameFromTitle(document: Document): string;
//# sourceMappingURL=utilities.d.ts.map