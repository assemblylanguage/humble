"use strict";
/**
 * Code for converting new image formats into older image formats that have
 * wider browser support.
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
exports.convertImagesToSupportedImageFormats = exports.convertTiffToSupportedType = void 0;
/* eslint-disable no-await-in-loop */
const Jimp = require("jimp/dist");
const utilities = require("../../../../utilities");
const dependencies = require("../../../../dependencies");
const imageConverter = require("../image-converter");
const image_extensions_1 = require("../image-extensions");
/**
 * Converts a TIFF image into a more browser supported image type. The
 * conversion algorithm is as follows:
 *
 * * TIFF with transparency    -> PNG
 * * Tiff without transparency -> JPEG
 *
 * @param bytes a buffer representing a TIFF image.
 */
function convertTiffToSupportedType(bytes) {
    return __awaiter(this, void 0, void 0, function* () {
        // Creating a Jimp TIFF image from the image buffer.
        const image = yield Jimp.read(bytes);
        // If the image has transparency, convert it to a PNG.
        if (image.hasAlpha()) {
            const pngBuffer = yield image.getBufferAsync(Jimp.MIME_PNG);
            return pngBuffer;
        }
        // If the image does not have transparency, convert it to a JPEG.
        const jpegBuffer = yield image.getBufferAsync(Jimp.MIME_JPEG);
        return jpegBuffer;
    });
}
exports.convertTiffToSupportedType = convertTiffToSupportedType;
/**
 * This function converts all of the images in the image cache, as well as all
 * inline SVGs in the document, to to either PNG, JPEG, or GIF, as these image
 * formats have the widest browser support. The algorithm used to determine the
 * conversion target is as follows:
 *
 * No Alpha Channel TIFF/WEBP   -> JPEG
 * TIFF/WEBP with Alpha Channel -> PNG
 * Animated WEBP                -> GIF
 * SVG                          -> PNG
 *
 * The image formats with the widest browser support are generally JPEG and
 * GIF, with PNG also having very wide support. TIFF images are converted as
 * they do not have supports in Firefox since they are not in a streamable
 * format. WEBP are converted as the format is newer and isn't supported in
 * older browser. Finally, SVG and inline SVG support is limited in older
 * browsers.
 *
 * @command **`--convert-images-to-supported-image-formats`**
 *
 * @param document the document that will be modified in place.
 * @param imageCache a resource cache of images that will be converted.
 * @dependency ImageMagick 6.
 * @todo add AVIF support.
 * @todo add JXL support.
 */
function convertImagesToSupportedImageFormats(document, imageCache) {
    return __awaiter(this, void 0, void 0, function* () {
        // Checks if ImageMagick is installed on the host system.
        const isImageMagickInstalled = dependencies
            .isImageMagickInstalled();
        // If ImageMagick is installed, convert the all of the inline SVGs into PNGs.
        if (isImageMagickInstalled === true) {
            // Getting all of the inline `<svg>` tags.
            const svgElements = [...document.getElementsByTagName('svg')];
            for (const svgElement of svgElements) {
                // Converting the SVG into a buffer, and running the conversion from SVG
                // to PNG.
                const svgString = svgElement.innerHTML;
                const svgImageBuffer = Buffer.from(svgString);
                const pngImageBuffer = imageConverter.convertImage(svgImageBuffer, 100, image_extensions_1.ImageExtension.SVG, image_extensions_1.ImageExtension.PNG);
                // Getting the MIME type of the converted buffer.
                const mimeType = yield utilities.determineMimeType('', pngImageBuffer);
                // If the image was successfully converted, replace the `<svg>` with an
                // `<img>` that has a Base64 encoded PNG string as the `src`.
                if (mimeType === 'image/png') {
                    // Encoding the PNG buffer into a base64 string.
                    const base64Png = `data:image/png;base64,${pngImageBuffer.toString('base64')}`;
                    // Creating a new image element with the encoded string, and replacing
                    // the `<svg>` with the `<img>` element.
                    const inlineImageElement = document.createElement('img');
                    inlineImageElement.setAttribute('src', base64Png);
                    svgElement.replaceWith(inlineImageElement);
                }
            }
        }
        // Converting all of the images in the image cache to a supported image
        // type.
        for (const url in imageCache) {
            // Getting the resource, bytes, file extension, and MIME Type.
            const resource = imageCache[url];
            const bytes = resource.bytes;
            const mimeType = resource.mimeType;
            // Converting images of different types to a supported image type.
            switch (mimeType) {
                case 'image/tiff': {
                    // Converting a TIFF image and updating the resource with the
                    // converted image buffer.
                    const supportedImageBuffer = yield convertTiffToSupportedType(bytes);
                    resource.update(supportedImageBuffer);
                    break;
                }
                case 'image/webp': {
                    // Converting a WEBP image to PNG and updating the resource with the
                    // converted image buffer. Skip the conversion if ImageMagick is not
                    // installed.
                    if (isImageMagickInstalled) {
                        const supportedImageBuffer = imageConverter.convertImage(bytes, 100, image_extensions_1.ImageExtension.WEBP, image_extensions_1.ImageExtension.PNG);
                        resource.update(supportedImageBuffer);
                    }
                    break;
                }
                case 'image/svg+xml': {
                    // Converting a SVG image to PNG and updating the resource with the
                    // converted image buffer. Skip the conversion if ImageMagick is not
                    // installed.
                    if (isImageMagickInstalled) {
                        const supportedImageBuffer = imageConverter.convertImage(bytes, 100, image_extensions_1.ImageExtension.SVG, image_extensions_1.ImageExtension.PNG);
                        resource.update(supportedImageBuffer);
                    }
                    break;
                }
                // @no-default
            }
        }
    });
}
exports.convertImagesToSupportedImageFormats = convertImagesToSupportedImageFormats;
//# sourceMappingURL=supported-image-type-converter.js.map