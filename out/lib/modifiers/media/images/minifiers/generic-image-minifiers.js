"use strict";
/**
 * Code for generic image minifiers through through lossy conversions.
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
exports.minifyImageToWebp = exports.minifyImageToJpeg = void 0;
const Jimp = require("jimp/dist");
const dependencies = require("../../../../dependencies");
const imageConverter = require("../image-converter");
const image_extensions_1 = require("../image-extensions");
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
function minifyImageToJpeg(bytes, jpegQuality) {
    return __awaiter(this, void 0, void 0, function* () {
        // Creating a Jimp image from the image buffer.
        const image = yield Jimp.read(bytes);
        // If the image does not contain transparency, then convert it to a JPEG at
        // the specified quality level. Else, return the original image buffer.
        if (!image.hasAlpha()) {
            const optimizedJpegImage = image.quality(jpegQuality);
            const optimizedJpegImageBytes = yield optimizedJpegImage
                .getBufferAsync(Jimp.MIME_JPEG);
            return optimizedJpegImageBytes;
        }
        return bytes;
    });
}
exports.minifyImageToJpeg = minifyImageToJpeg;
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
function minifyImageToWebp(bytes, inputExtension, webpQuality) {
    return __awaiter(this, void 0, void 0, function* () {
        // Checks if ImageMagick is installed on the host system.
        const isImageMagickInstalled = dependencies
            .isImageMagickInstalled();
        // If ImageMagick is installed, convert the image buffer to a WEBP, and
        // return the WEBP buffer. Else, return the original image buffer.
        if (isImageMagickInstalled === true) {
            const optimizedWebpImageBytes = imageConverter.convertImage(bytes, webpQuality, inputExtension, image_extensions_1.ImageExtension.WEBP);
            return optimizedWebpImageBytes;
        }
        return bytes;
    });
}
exports.minifyImageToWebp = minifyImageToWebp;
//# sourceMappingURL=generic-image-minifiers.js.map