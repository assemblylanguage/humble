"use strict";
/**
 * This file contains the source code for fetching resources using the `http:`
 * protocol.
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
exports.fetchHttpResource = void 0;
const axios_1 = require("axios");
const utilities = require("../utilities");
/**
 * Fetches a single resource at the given HTTP(S) URL.
 *
 * @param absoluteUrl the absolute URL of the resource that will be fetched.
 * @returns the bytes and status of the fetch.
 */
function fetchHttpResource(absoluteUrl, headers) {
    return __awaiter(this, void 0, void 0, function* () {
        // Trying to fetch a using at a give HTTP(S) URL. If the fetch fails, return
        // null bytes and a failed status.
        let response;
        try {
            response = yield axios_1.default.get(absoluteUrl, {
                responseType: 'arraybuffer',
                // Setting the headers for the request.
                headers,
            });
        }
        catch (error) {
            const bytes = null;
            const status = false;
            const statusCode = 404;
            return {
                bytes,
                status,
                statusCode,
            };
        }
        // If the fetch succeeded, check the HTTP status code to determine the bytes
        // were correctly fetched.
        const statusCode = response.status;
        const status = statusCode >= 200 && statusCode < 300;
        // If bytes were fetched, returning the fetched bytes.
        if (status === true) {
            const bytes = utilities.decompressResponse(response);
            return {
                bytes,
                status,
                statusCode,
            };
        }
        // If the bytes were not fetched and something failed, return null bytes and
        // a failed status.
        const bytes = null;
        return {
            bytes,
            status,
            statusCode,
        };
    });
}
exports.fetchHttpResource = fetchHttpResource;
//# sourceMappingURL=http-transport.js.map