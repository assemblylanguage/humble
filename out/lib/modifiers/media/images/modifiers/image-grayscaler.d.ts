/**
 * Code for grayscaling images.
 */
/// <reference types="node" />
import { ResourceCache } from '../../../../resource';
/**
 * Grayscales an image using ImageMagick.
 *
 * @param bytes a buffer containing an image.
 * @param extension the extension of the input file image.
 * @returns a buffer of the grayscaled image.
 * @dependencies ImageMagick 6.
 */
export declare function grayscaleImage(bytes: Buffer, extension: string): Buffer;
/**
 * Converts all images in the provided image cache, as well as all inline SVG
 * images in the provided document, into grayscale images. The image types
 * currently supported by this function are as follows:
 *
 * * PNG
 * * JPEG
 * * GIF
 * * TIFF
 * * WEBP
 * * AVIF
 * * SVG
 *
 * @command **`--grayscale-images`**
 *
 * @param document the document that will be modified in place.
 * @param imageCache a resource cache of images that will be grayscaled.
 * @dependency ImageMagick 6.
 * @todo add JXL support.
 */
export declare function grayscaleImages(document: Document, imageCache: ResourceCache): Promise<void>;
//# sourceMappingURL=image-grayscaler.d.ts.map