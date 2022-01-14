/**
 * Code for converting new image formats into older image formats that have
 * wider browser support.
 */
/// <reference types="node" />
import { ResourceCache } from '../../../../resource';
/**
 * Converts a TIFF image into a more browser supported image type. The
 * conversion algorithm is as follows:
 *
 * * TIFF with transparency    -> PNG
 * * Tiff without transparency -> JPEG
 *
 * @param bytes a buffer representing a TIFF image.
 */
export declare function convertTiffToSupportedType(bytes: Buffer): Promise<Buffer>;
/**
 * This function converts all of the images in the image cache, as well as all
 * inline SVGs in the document, to to either PNG, JPEG, or GIF, as these image
 * formats have the widest browser support. The algorithm used to determine the
 * conversion target is as follows:
 *
 * No Alpha Channel TIFF/WEBP   -> JPEG
 * TIFF/WEBP with Alpha Channel -> PNG
 * Animated WEBP                -> GIF
 * SVG                          -> PNG
 *
 * The image formats with the widest browser support are generally JPEG and
 * GIF, with PNG also having very wide support. TIFF images are converted as
 * they do not have supports in Firefox since they are not in a streamable
 * format. WEBP are converted as the format is newer and isn't supported in
 * older browser. Finally, SVG and inline SVG support is limited in older
 * browsers.
 *
 * @command **`--convert-images-to-supported-image-formats`**
 *
 * @param document the document that will be modified in place.
 * @param imageCache a resource cache of images that will be converted.
 * @dependency ImageMagick 6.
 * @todo add AVIF support.
 * @todo add JXL support.
 */
export declare function convertImagesToSupportedImageFormats(document: Document, imageCache: ResourceCache): Promise<void>;
//# sourceMappingURL=supported-image-type-converter.d.ts.map