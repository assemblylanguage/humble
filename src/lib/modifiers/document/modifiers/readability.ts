/**
 * Code for converting HTML documents into readability mode using Mozilla's
 * readability library.
 */

import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';

/**
 * A type representing a readability parsed document.
 */
export type ParsedDocument = {
  title: string;
  byline: string;
  dir: string;
  content: string;
  textContent: string;
  length: number;
  excerpt: string;
  siteName: string;
}

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
export function readabilityMode(
  document: Document,
) : Document {
  // Creating a readability document from the JSDOM document and parsing it.
  const readabilityDocument: Readability = new Readability(document);
  const parsedDocument: ParsedDocument = readabilityDocument.parse();

  // Getting the readable HTML content and converting it into a new JSDOM
  // document.
  const readableHtml: string = parsedDocument.content;
  const readableDocument: Document = new JSDOM(readableHtml).window.document;

  // Adding the readability title to the new JSDOM document.
  const readableTitle: string = parsedDocument.title;
  const headElement: Element = readableDocument.querySelector('head');
  const titleElement: Element = readableDocument.createElement('title');

  titleElement.innerHTML = readableTitle;
  headElement.appendChild(titleElement);

  // Returning the new JSDOM document.
  return readableDocument;
}
