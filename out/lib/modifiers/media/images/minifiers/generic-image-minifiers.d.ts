/**
 * Code for generic image minifiers through through lossy conversions.
 */
/// <reference types="node" />
import { ImageExtension } from '../image-extensions';
/**
 * Possibly converts an image buffer into a minified JPEG image buffer. If
 * the image has transparency, no image conversion occurs and the original
 * buffer is returned.
 *
 * @param bytes a buffer containing an image.
 * @param jpegQuality the quality of the JPEG that the image will be converted
 * to.
 * @returns either the original image buffer or minified JPEG buffer.
 */
export declare function minifyImageToJpeg(bytes: Buffer, jpegQuality: number): Promise<Buffer>;
/**
 * Possibly converts an image buffer into a minified WEBP image buffer. If
 * ImageMagick is not installed, no conversion will occur and the original
 * image buffer will be returned.
 *
 * @param bytes a buffer containing an image.
 * @param inputExtension the extension of the input image buffer.
 * @param webpQuality the quality of the WEBP that the image will be converted
 * to.
 * @returns either the original image buffer or minified WEBP buffer.
 * @dependencies ImageMagick 6.
 */
export declare function minifyImageToWebp(bytes: Buffer, inputExtension: ImageExtension, webpQuality: number): Promise<Buffer>;
//# sourceMappingURL=generic-image-minifiers.d.ts.map