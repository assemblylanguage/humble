/**
 * Code for minifying fonts. Currently supports these font types: TTF, OTF,
 * WOFF, and WOFF2.
 */
/// <reference types="node" />
import { ResourceCache } from '../../../resource';
import { FontExtension } from './font-extensions';
/**
 * Converts a TTF or OTF font to WOFF2 format. Conversion is done through
 * Fonttools.
 *
 * @param bytes a buffer containing a TTF or OTF font file.
 * @param inputExtension the extension of the input file font (the font type
 * that will be converted from).
 * @returns a buffer of the font converted to WOFF2 format.
 * @dependencies Fonttools 4.
 */
export declare function convertTtfAndOtfToWoff2(bytes: Buffer, inputExtension: FontExtension): Buffer;
/**
 * Subsets a font to only the glyphs that are found in the document text, with
 * all other glyphs not found in the document text removed.
 *
 * @param bytes a buffer containing a font file.
 * @param inputExtension the extension of the input file font (the font type
 * that will be subsetted).
 * @returns a buffer of the subsetted font.
 * @dependencies Fonttools 4.
 */
export declare function subsetFont(bytes: Buffer, inputExtension: FontExtension, document: Document): Buffer;
/**
 * Minifies all fonts in the provided font cache using a series of font
 * minification and conversion algorithms. The algorithm used for conversions
 * and minifications is as follows:
 *
 * * TTF -> WOFF2 -> Subsetted WOFF2 (using Fonttools)
 * * OTF -> WOFF2 -> Subsetted WOFF2 (using Fonttools)
 * * WOFF -> WOFF2 -> Subsetted WOFF2 (using Fonttools)
 * * WOFF2 -> Subsetted WOFF2 (using Fonttools)
 *
 * @command **`--minify-fonts`**
 *
 * @param document the document that contains text content used for the
 * font subsetting process.
 * @param fontCache a resource cache of fonts that will be minified.
 * @dependencies Fonttools 4.
 */
export declare function minifyFonts(document: Document, fontCache: ResourceCache): void;
//# sourceMappingURL=font-minifiers.d.ts.map