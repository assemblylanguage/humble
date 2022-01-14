"use strict";
/**
 * Code for sanitizing HTML using the DOM Purify library.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.purifyHtml = void 0;
/* eslint-disable import/newline-after-import */
/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-var-requires */
const jsdom_1 = require("jsdom");
const createDOMPurify = require('dompurify');
/**
 * Sanitizes HTML using the DOM Purify library.
 *
 * @command **`--dom-purify`**
 * @example see `https://github.com/cure53/DOMPurify` for additional
 * information and examples of DOM Purify sanitizing.
 *
 * @param html the HTML that will be sanitized.
 * @returns the sanitized HTML.
 */
function purifyHtml(html) {
    // Sanitizing the HTML using DOM Purify.
    const { window } = new jsdom_1.JSDOM('');
    const DOMPurify = createDOMPurify(window);
    const sanitizedHtml = DOMPurify.sanitize(html);
    return sanitizedHtml;
}
exports.purifyHtml = purifyHtml;
//# sourceMappingURL=dom-purify.js.map