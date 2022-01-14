"use strict";
/**
 * This file contains the source code for fetching resources using the `data:`
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
exports.fetchDataResource = void 0;
/**
 * "Fetches" a single resource at the given data URI. Since a data URI is both
 * a URI and a resource itself, this function essentially just converts the
 * data URI into a buffer with a successful status.
 *
 * @param absoluteUrl the absolute URL of the resource that will be fetched.
 * @returns the bytes and status of the fetch.
 */
function fetchDataResource(absoluteUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        // Converts the data URI into a buffer with a successful status.
        const bytes = Buffer.from(absoluteUrl);
        const status = true;
        const statusCode = 200;
        return {
            bytes,
            status,
            statusCode,
        };
    });
}
exports.fetchDataResource = fetchDataResource;
//# sourceMappingURL=data-transport.js.map