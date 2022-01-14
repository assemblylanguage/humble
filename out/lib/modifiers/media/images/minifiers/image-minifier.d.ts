/**
 * Code minifying various images formats. Currently supports these image
 * formats: PNG, JPEG, GIF, TIFF, WEBP.
 */
import { ResourceCache } from '../../../../resource';
/**
 * Minifies all images in the provided image cache using a series of image
 * minification and conversion algorithms. The algorithm used for conversions
 * and minifications is as follows. Note that among each image type, the
 * smallest image from the minifications will become the new image buffer for
 * the resource in the given URL.
 *
 * * PNG
 *   - PNG -> Optimized PNG (using Pngquant and Pngcrush)
 *   - PNG (no transparency) -> JPEG (default 40 quality)
 *   - PNG -> WEBP (default 20 quality)
 * * JPEG
 *   - JPEG -> JPEG (default 40 quality)
 *   - JPEG -> WEBP (default 20 quality)
 * * GIF
 *   - GIF -> Optimized GIF (using Gifsicle)
 *   - GIF -> JPEG (when the GIF has 1 frame, no transparency, default 40
 *     quality JPEG)
 *   - GIF -> WEBP (when the GIF has 1 frame, no transparency, default 40
 *     quality WEBP)
 * * TIFF
 *   - TIFF -> JPEG (default 40 quality)
 *   - TIFF -> WEBP (default 20 quality)
 * * WEBP
 *   - WEBP -> WEBP (default 20 quality)
 *
 * @command **`--minify-images`**
 *
 * @param document the document that will be modified in place.
 * @param imageCache a resource cache of images that will be minified.
 * @param options.jpegQuality the quality of the JPEG images from the
 * conversion.
 * @param options.allowWebp if true, allows the conversion of images to WEBP.
 * @param options.webpQuality the quality of the WEBP images from the
 * conversion.
 * @dependencies ImageMagick 6, Pngquant 2.12, Pngcrush 1.8, Gifsicle 1.9,
 * Gif2Webp 1.2.
 * @todo add AVIF support.
 * @todo add JXL support.
 */
export declare function minifyImages(document: Document, imageCache: ResourceCache, jpegQuality: number, allowWebp: boolean, webpQuality: number): Promise<void>;
//# sourceMappingURL=image-minifier.d.ts.map