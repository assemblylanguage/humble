/**
 * Code for converting HTML documents into readability mode using Mozilla's
 * readability library.
 */
/**
 * A type representing a readability parsed document.
 */
export declare type ParsedDocument = {
    title: string;
    byline: string;
    dir: string;
    content: string;
    textContent: string;
    length: number;
    excerpt: string;
    siteName: string;
};
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
export declare function readabilityMode(document: Document): Document;
//# sourceMappingURL=readability.d.ts.map