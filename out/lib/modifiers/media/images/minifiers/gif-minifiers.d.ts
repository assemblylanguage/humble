/**
 * Code minifying GIF images.
 */
/// <reference types="node" />
/**
 * Checks if a GIF image has multiple frames.
 *
 * @param bytes a buffer containing a GIF image.
 * @returns true if the GIF image has multiple frames, false otherwise.
 */
export declare function gifHasMultipleFrames(bytes: Buffer): Promise<boolean>;
/**
 * Checks if a GIF image has transparency.
 *
 * @param bytes a buffer containing a GIF image.
 * @returns true if the GIF image has transparency, false otherwise.
 */
export declare function gifHasTransparency(bytes: Buffer): Promise<boolean>;
/**
 * Creates an optimized GIF from an existing GIF using the `Gifsicle` library.
 *
 * @param bytes a buffer containing a GIF image.
 * @returns a gifsicle optimized GIF image.
 * @dependencies Gifsicle 1.9
 */
export declare function optimizeGif(bytes: Buffer): Buffer;
/**
 * Creates an optimized WEBP from an existing GIF using the `gif2webp` library.
 *
 * @param bytes a buffer containing a GIF image.
 * @returns an optimized WEBP image.
 * @dependencies gif2webp 1.2
 */
export declare function optimizeGifToWebp(bytes: Buffer, webpQuality: number): Buffer;
/**
 * Creates an optimized GIF from an existing GIF using the `Gifsicle` library.
 * If Gifsicle is not installed on the system, the original GIF buffer will be
 * returned.
 *
 * @param bytes a buffer containing a GIF image.
 * @returns a gifsicle optimized GIF image.
 * @dependencies Gifsicle 1.9.
 */
export declare function minifyGifToGif(bytes: Buffer): Promise<Buffer>;
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
export declare function minifyGifToJpeg(bytes: Buffer, jpegQuality: number): Promise<Buffer>;
/**
 * Possibly minifies a GIF image buffer. This function runs through multiple
 * algorithms to attempt to reduce the size of a GIF, including possible
 * conversion of the GIF into different image formats so long as no features
 * of the GIF are lost. If none of the minified images are smaller than the
 * original image buffer, the original buffer is returned.
 *
 * @param bytes a buffer containing an image.
 * @param options[jpegQuality] the quality of the JPEG that the image will be
 * converted to.
 * @param options[allowWebp] if true, allows the conversion of the GIF to a
 * WEBP image.
 * @param options[webpQuality] the quality of the WEBP that the image will be
 * converted to.
 * @returns either the original image buffer or minified image buffer.
 * @dependencies Gifsicle 1.9
 * @todo add AVIF support.
 * @todo add JXL support.
 */
export declare function minifyGif(bytes: Buffer, jpegQuality?: number, allowWebp?: boolean, webpQuality?: number): Promise<Buffer>;
//# sourceMappingURL=gif-minifiers.d.ts.map