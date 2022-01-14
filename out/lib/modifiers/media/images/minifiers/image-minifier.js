"use strict";
/**
 * Code minifying various images formats. Currently supports these image
 * formats: PNG, JPEG, GIF, TIFF, WEBP.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.minifyImages = void 0;
const pngMinifiers = require("./png-minifiers");
const jpegMinifiers = require("./jpeg-minifiers");
const gifMinifiers = require("./gif-minifiers");
const tiffMinifiers = require("./tiff-minifiers");
const webpMinifiers = require("./webp-minifiers");
const svgMinifiers = require("./svg-minifiers");
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
function minifyImages(document, imageCache, jpegQuality, allowWebp, webpQuality) {
    return __awaiter(this, void 0, void 0, function* () {
        // Minifying the inline SVG images.
        svgMinifiers.minifyInlineSvgs(document);
        // Minifying all images in the image cache.
        for (const url in imageCache) {
            // Getting the resource, bytes, and MIME Type.
            const resource = imageCache[url];
            const bytes = resource.bytes;
            const mimeType = resource.mimeType;
            // If the resource fetch was successful, performing the minification
            // depending on the MIME Type of the image, and then updating the
            // resource with the new image buffer if the new image buffer is
            // smaller than the original.
            if (resource.status === true) {
                switch (mimeType) {
                    case 'image/png': {
                        // Minifying the PNG image and updating the resource with the
                        // minified bytes.
                        const optimizedImageBytes = yield pngMinifiers.minifyPng(bytes, jpegQuality, allowWebp, webpQuality);
                        resource.update(optimizedImageBytes);
                        break;
                    }
                    case 'image/jpeg': {
                        // Minifying the JPEG image and updating the resource with the
                        // minified bytes.
                        const optimizedImageBytes = yield jpegMinifiers.minifyJpeg(bytes, jpegQuality, allowWebp, webpQuality);
                        resource.update(optimizedImageBytes);
                        break;
                    }
                    case 'image/gif': {
                        // Minifying the GIF image and updating the resource with the
                        // minified bytes.
                        const optimizedImageBytes = yield gifMinifiers.minifyGif(bytes, jpegQuality, allowWebp, webpQuality);
                        resource.update(optimizedImageBytes);
                        break;
                    }
                    case 'image/tiff': {
                        // Minifying the TIFF image and updating the resource with the
                        // minified bytes.
                        const optimizedImageBytes = yield tiffMinifiers.minifyTiff(bytes, jpegQuality, allowWebp, webpQuality);
                        resource.update(optimizedImageBytes);
                        break;
                    }
                    case 'image/webp': {
                        // Minifying the WEBP image and updating the resource with the
                        // minified bytes.
                        const optimizedImageBytes = yield webpMinifiers.minifyWebp(bytes, jpegQuality, allowWebp, webpQuality);
                        resource.update(optimizedImageBytes);
                        break;
                    }
                    case 'image/svg+xml': {
                        // Minifying the SVG image and updating the resource with the
                        // minified bytes.
                        const optimizedImageBytes = svgMinifiers.minifySvg(bytes);
                        resource.update(optimizedImageBytes);
                        break;
                    }
                    // @no-default
                }
            }
        }
    });
}
exports.minifyImages = minifyImages;
//# sourceMappingURL=image-minifier.js.map