"use strict";
/**
 * Code for grayscaling images.
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
exports.grayscaleImages = exports.grayscaleImage = void 0;
const os = require("os");
const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");
const rimraf = require("rimraf");
const dependencies = require("../../../../dependencies");
/**
 * Grayscales an image using ImageMagick.
 *
 * @param bytes a buffer containing an image.
 * @param extension the extension of the input file image.
 * @returns a buffer of the grayscaled image.
 * @dependencies ImageMagick 6.
 */
function grayscaleImage(bytes, extension) {
    // Getting the path to and creating a new Humble temporary directory if
    // one does not already exist.
    const tempDir = path.join(os.tmpdir(), 'humble');
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
    }
    // Creating input and output file paths for the temporary file and writing
    // the image file to the temporary directory.
    const tempInputFilePath = path.join(tempDir, `temp.${extension}`);
    const tempOutputFilePath = path.join(tempDir, `temp.gray.${extension}`);
    fs.writeFileSync(tempInputFilePath, bytes);
    // Calling the ImageMagick command to grayscale the image file in the
    // temporary directory to a different format.
    const imageMagickProcess = childProcess.spawnSync('convert', [
        '-colorspace', 'Gray',
        tempInputFilePath,
        tempOutputFilePath,
    ]);
    // If the grayscaling was successful, reading the file to get the buffer, and
    // then deleting the temporary files and directory.
    if (imageMagickProcess.status === 0) {
        // Getting the grayscaled image buffer.
        const grayscaledImageBuffer = fs.readFileSync(tempOutputFilePath);
        // Deleting the temporary files and directory.
        rimraf.sync(tempDir);
        return grayscaledImageBuffer;
    }
    // If the process failed, simply delete the temporary files and directory to
    // clean up the resources, and return the original buffer.
    rimraf.sync(tempDir);
    return bytes;
}
exports.grayscaleImage = grayscaleImage;
/**
 * Converts all images in the provided image cache, as well as all inline SVG
 * images in the provided document, into grayscale images. The image types
 * currently supported by this function are as follows:
 *
 * * PNG
 * * JPEG
 * * GIF
 * * TIFF
 * * WEBP
 * * AVIF
 * * SVG
 *
 * @command **`--grayscale-images`**
 *
 * @param document the document that will be modified in place.
 * @param imageCache a resource cache of images that will be grayscaled.
 * @dependency ImageMagick 6.
 * @todo add JXL support.
 */
function grayscaleImages(document, imageCache) {
    return __awaiter(this, void 0, void 0, function* () {
        // Checks if ImageMagick is installed on the host system.
        const isImageMagickInstalled = dependencies
            .isImageMagickInstalled();
        // If ImageMagick is installed, grayscaling the all of the images in the
        // image cache.
        if (isImageMagickInstalled === true) {
            // Getting all of the inline `<svg>` tags.
            const svgElements = [...document.getElementsByTagName('svg')];
            for (const svgElement of svgElements) {
                // Converting the SVG into a buffer.
                const svgString = svgElement.outerHTML;
                const svgImageBuffer = Buffer.from(svgString);
                // Grayscaling the SVG and converting it back into a string.
                const grayscaleSvgImageBuffer = grayscaleImage(svgImageBuffer, 'svg');
                const grayscaleSvg = grayscaleSvgImageBuffer.toString();
                // Updating the `<svg>` element with the grayscaled SVG.
                svgElement.outerHTML = grayscaleSvg;
            }
        }
        // Grayscaling all of the images in the image cache.
        for (const url in imageCache) {
            // Getting the resource, bytes, file extension, MIME Type, and status.
            const resource = imageCache[url];
            const bytes = resource.bytes;
            const extension = resource.extension;
            const mimeType = resource.mimeType;
            const status = resource.status;
            // Grayscaling images of known supported ImageMagick types if the fetch was
            // successful.
            if (status === true) {
                switch (mimeType) {
                    case 'image/png':
                    case 'image/jpeg':
                    case 'image/gif':
                    case 'image/tiff':
                    case 'image/webp':
                    case 'image/avif':
                    case 'image/svg+xml': {
                        const grayscaledImageBuffer = grayscaleImage(bytes, extension);
                        resource.update(grayscaledImageBuffer);
                        break;
                    }
                    // @no-default
                }
            }
        }
    });
}
exports.grayscaleImages = grayscaleImages;
//# sourceMappingURL=image-grayscaler.js.map