/**
 * Code minifying TIFF images.
 */
/// <reference types="node" />
/**
 * Possibly minifies a TIFF image buffer. This function runs through multiple
 * algorithms to attempt to reduce the size of a TIFF, including possible
 * conversion of the TIFF into different image formats so long as no features
 * of the TIFF are lost. If none of the minified images are smaller than the
 * original image buffer, the original buffer is returned.
 *
 * @param bytes a buffer containing an image.
 * @param options.jpegQuality the quality of the JPEG that the image will be
 * converted to.
 * @param options.allowWebp if true, allows the conversion of the TIFF to a
 * WEBP image.
 * @param options.webpQuality the quality of the WEBP that the image will be
 * converted to.
 * @returns either the original image buffer or minified image buffer.
 * @dependencies ImageMagick 6.
 * @todo add AVIF support.
 * @todo add JXL support.
 */
export declare function minifyTiff(bytes: Buffer, jpegQuality: number, allowWebp: boolean, webpQuality: number): Promise<Buffer>;
//# sourceMappingURL=tiff-minifiers.d.ts.map