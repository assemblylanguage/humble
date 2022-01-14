"use strict";
/**
 * This file contains the source code for fetching resources using a headless
 * browser.
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
exports.fetchHeadlessBrowserResource = void 0;
function fetchHeadlessBrowserResource(browser, absoluteUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const page = yield browser.newPage();
        const response = yield page.goto(absoluteUrl, {
            waitUntil: 'networkidle0',
        });
        const bytes = yield response.buffer();
        const statusCode = yield response.status();
        const status = statusCode >= 200 && statusCode < 300;
        return {
            bytes,
            status,
            statusCode,
        };
    });
}
exports.fetchHeadlessBrowserResource = fetchHeadlessBrowserResource;
//# sourceMappingURL=headless-browser-transport.js.map