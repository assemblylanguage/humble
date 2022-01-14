"use strict";
/**
 * Code for converting HTML documents into readability mode using Mozilla's
 * readability library.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.readabilityMode = void 0;
const jsdom_1 = require("jsdom");
const readability_1 = require("@mozilla/readability");
/**
 * Converts a document into a readability mode document.
 *
 * @command **`--readability-mode`**
 * @example see `https://github.com/mozilla/readability` for additional
 * information and examples of readability mode documents.
 *
 * @param document the document that will be used to construct a readability
 * document.
 * @returns a document that has been modified to be more easily readable.
 */
function readabilityMode(document) {
    // Creating a readability document from the JSDOM document and parsing it.
    const readabilityDocument = new readability_1.Readability(document);
    const parsedDocument = readabilityDocument.parse();
    // Getting the readable HTML content and converting it into a new JSDOM
    // document.
    const readableHtml = parsedDocument.content;
    const readableDocument = new jsdom_1.JSDOM(readableHtml).window.document;
    // Adding the readability title to the new JSDOM document.
    const readableTitle = parsedDocument.title;
    const headElement = readableDocument.querySelector('head');
    const titleElement = readableDocument.createElement('title');
    titleElement.innerHTML = readableTitle;
    headElement.appendChild(titleElement);
    // Returning the new JSDOM document.
    return readableDocument;
}
exports.readabilityMode = readabilityMode;
//# sourceMappingURL=readability.js.map