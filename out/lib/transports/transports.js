"use strict";
/**
 * This file contains the source code for fetching resources using a variety
 * of different protocols and transport options.
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
exports.fetchResource = void 0;
const logger_1 = require("../logger");
const file_transport_1 = require("./file-transport");
const http_transport_1 = require("./http-transport");
const headless_browser_transport_1 = require("./headless-browser-transport");
const socks_transport_1 = require("./socks-transport");
const data_transport_1 = require("./data-transport");
/**
 * Creates a shortened version of a URL for logging purposes.
 *
 * @param url the URL that may be shortened.
 * @returns either a shortened URL or the original URL if it is already short.
 */
function createShortenedUrl(url) {
    // Checking the URL is too long (often the case with data URIs).
    const isUrlLong = url.length >= 300;
    // Creating a shortened URL if it is too long.
    if (isUrlLong) {
        const shortenedUrl = `${url.slice(0, 300)}...`;
        return shortenedUrl;
    }
    // Or returning the original URL if it is not too long.
    return url;
}
/**
 * Fetches a single resource at a given URL using the protocol specified.
 *
 * @param absoluteUrl the absolute URL of the resource that will be fetched.
 * @param protocol the protocol of the resource that will be fetched.
 * @param options additional options used to modify the transport.
 */
function fetchResource(absoluteUrl, protocol, options) {
    return __awaiter(this, void 0, void 0, function* () {
        // Creating the empty resource response.
        let response;
        // Fetching the resource using the protocol and options specified. If a case
        // for the protocol is not found, a default failed status and null bytes will
        // be returned.
        switch (protocol) {
            case 'file:': {
                response = yield file_transport_1.fetchFileResource(absoluteUrl);
                break;
            }
            case 'http:':
            case 'https:': {
                if (options.headlessBrowserTransport) {
                    response = yield headless_browser_transport_1.fetchHeadlessBrowserResource(options.browser, absoluteUrl);
                }
                else if (options.socksProxy) {
                    response = yield socks_transport_1.fetchSocksResource(absoluteUrl, options.headers, options.socksProxy);
                }
                else {
                    response = yield http_transport_1.fetchHttpResource(absoluteUrl, options.headers);
                }
                break;
            }
            case 'data:': {
                response = yield data_transport_1.fetchDataResource(absoluteUrl);
                break;
            }
            default: {
                const bytes = null;
                const status = false;
                const statusCode = 404;
                response = {
                    bytes,
                    status,
                    statusCode,
                };
            }
        }
        // Creating a URL that will be displayed by the logger, shortening the
        // absolute URL if it is too long for logging purposes.
        const displayUrl = createShortenedUrl(absoluteUrl);
        // Logging the result of the fetch to the logger.
        if (response.status === true) {
            logger_1.logger.log('ok', `Fetched (${response.statusCode}) => ${displayUrl}`, { depth: 1 });
        }
        else {
            logger_1.logger.log('error', `Failed  (${response.statusCode}) => ${displayUrl}`, { depth: 1 });
        }
        return response;
    });
}
exports.fetchResource = fetchResource;
//# sourceMappingURL=transports.js.map