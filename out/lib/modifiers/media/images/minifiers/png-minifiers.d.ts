/**
 * Code minifying PNG images.
 */
/// <reference types="node" />
/**
 * Creates an optimized PNG from an existing PNG using the Pngquant and
 * Pngcrush libraries.
 *
 * @param bytes a buffer containing a PNG image.
 * @returns a pngquant and pngcrushed optimized PNG image.
 * @dependencies Pngquant 2.12, Pngcrush 1.8.
 */
export declare function optimizePng(bytes: Buffer): Buffer;
/**
 * Possibly minifies a PNG image buffer. This function runs through multiple
 * algorithms to attempt to reduce the size of a PNG, including possible
 * conversion of the PNG into different image formats so long as no features
 * of the PNG are lost. If none of the minified images are smaller than the
 * original image buffer, the original buffer is returned.
 *
 * @param bytes a buffer containing an image.
 * @param options.jpegQuality the quality of the JPEG that the image will be
 * converted to.
 * @param options.allowWebp if true, allows the conversion of the PNG to a
 * WEBP image.
 * @param options.webpQuality the quality of the WEBP that the image will be
 * converted to.
 * @returns either the original image buffer or minified image buffer.
 * @dependencies ImageMagick 6, Pngquant 2.12, Pngcrush 1.8
 * @todo add AVIF support.
 * @todo add JXL support.
 */
export declare function minifyPng(bytes: Buffer, jpegQuality: number, allowWebp: boolean, webpQuality: number): Promise<Buffer>;
//# sourceMappingURL=png-minifiers.d.ts.map