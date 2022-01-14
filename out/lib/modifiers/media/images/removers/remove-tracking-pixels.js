"use strict";
/**
 * Code for detecting tracking pixels in a resource cache and removing them to
 * reduce document size.
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
exports.removeTrackingPixels = void 0;
/* eslint-disable no-await-in-loop */
const Jimp = require("jimp/dist");
const imageConverter = require("../image-converter");
const image_extensions_1 = require("../image-extensions");
/**
 * Removes all 1x1 images in the image cache that have an alpha channel. These
 * images are often used as tracking pixels that don't add any content to the
 * page and can be removed without having an effect on page display.
 *
 * @command **`--remove-tracking-pixels`**
 *
 * @param imageCache a resource cache of images that will be modified.
 * @dependencies ImageMagick 6.
 * @todo add SVG support.
 */
function removeTrackingPixels(imageCache) {
    return __awaiter(this, void 0, void 0, function* () {
        // Setting the bytes to null in all 1x1 images with transparency.
        for (const url in imageCache) {
            // Getting the resource and the MIME Type.
            const resource = imageCache[url];
            const mimeType = resource.mimeType;
            switch (mimeType) {
                case 'image/png':
                case 'image/jpeg':
                case 'image/gif':
                case 'image/tiff':
                case 'image/webp': {
                    let bytes = resource.bytes;
                    // If the image is a WEBP, converting it into a PNG so that it can be
                    // used with Jimp.
                    if (mimeType === 'image/webp') {
                        bytes = imageConverter.convertImage(bytes, 100, image_extensions_1.ImageExtension.WEBP, image_extensions_1.ImageExtension.PNG);
                    }
                    // Creating a Jimp image from the buffer, and getting the image width,
                    // height, and transparency.
                    const image = yield Jimp.read(bytes);
                    const width = image.bitmap.width;
                    const height = image.bitmap.height;
                    const hasTransparency = image.hasAlpha();
                    // If the image is a 1x1 image with transparency, updates the bytes to
                    // null.
                    if (width === 1
                        && height === 1
                        && hasTransparency) {
                        yield resource.update(null);
                    }
                    break;
                }
                // no default
            }
        }
    });
}
exports.removeTrackingPixels = removeTrackingPixels;
//# sourceMappingURL=remove-tracking-pixels.js.map