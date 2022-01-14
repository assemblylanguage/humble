/**
 * Code for converting image formats.
 */
/// <reference types="node" />
import { ImageExtension } from './image-extensions';
/**
 * Converts an image from one image type to another image type using
 * ImageMagick. All image types supported by ImageMagick are able to be
 * converted, including the following image types:
 *
 * * PNG
 * * JPEG
 * * GIF
 * * TIFF
 * * WEBP
 * * SVG
 *
 * @param bytes a buffer containing an image.
 * @param quality the quality of converted image if applicable.
 * @param inputExtension the extension of the input file image (the image type
 * that will be converted from).
 * @param outputExtension the extension of the output file image (the image type
 * that will be converted to).
 * @returns a buffer of the converted image.
 * @dependencies ImageMagick.
 */
export declare function convertImage(bytes: Buffer, quality: number, inputExtension: ImageExtension, outputExtension: ImageExtension): Buffer;
//# sourceMappingURL=image-converter.d.ts.map