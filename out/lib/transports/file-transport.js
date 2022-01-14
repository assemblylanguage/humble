"use strict";
/**
 * This file contains the source code for fetching resources using the `file:`
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
exports.fetchFileResource = void 0;
const fs = require("fs");
/**
 * Fetches a single resource at the given file URL.
 *
 * @param absoluteUrl the absolute URL of the resource that will be fetched.
 * @returns the bytes and status of the fetch.
 */
function fetchFileResource(absoluteUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        // Checking if the escaped file path exists on the system and if it is a
        // file, and if so reading the file and returning the bytes.
        if (fs.existsSync(absoluteUrl) && fs.lstatSync(absoluteUrl).isFile()) {
            const bytes = fs.readFileSync(absoluteUrl);
            const status = true;
            const statusCode = 200;
            return {
                bytes,
                status,
                statusCode,
            };
        }
        // If the escaped file path was not found, checking if the unescaped file
        // path is found and is a file, and if so reading the file and returning the
        // bytes.
        const unescapedFilePath = unescape(absoluteUrl);
        if (fs.existsSync(unescapedFilePath) && fs.lstatSync(absoluteUrl).isFile()) {
            const bytes = fs.readFileSync(unescape(absoluteUrl));
            const status = true;
            const statusCode = 200;
            return {
                bytes,
                status,
                statusCode,
            };
        }
        // If none of the files are found, the fetch fails and return null bytes and
        // a failed status.
        const bytes = null;
        const status = false;
        const statusCode = 404;
        return {
            bytes,
            status,
            statusCode,
        };
    });
}
exports.fetchFileResource = fetchFileResource;
//# sourceMappingURL=file-transport.js.map