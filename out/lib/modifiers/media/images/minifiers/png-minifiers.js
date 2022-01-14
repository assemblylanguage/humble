"use strict";
/**
 * Code minifying PNG images.
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
exports.minifyPng = exports.optimizePng = void 0;
/* eslint-disable arrow-body-style */
const os = require("os");
const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");
const rimraf = require("rimraf");
const genericImageMinifiers = require("./generic-image-minifiers");
const dependencies = require("../../../../dependencies");
const image_extensions_1 = require("../image-extensions");
/**
 * Creates an optimized PNG from an existing PNG using the Pngquant and
 * Pngcrush libraries.
 *
 * @param bytes a buffer containing a PNG image.
 * @returns a pngquant and pngcrushed optimized PNG image.
 * @dependencies Pngquant 2.12, Pngcrush 1.8.
 */
function optimizePng(bytes) {
    // Getting the path to and creating a new Humble temporary directory if
    // one does not already exist.
    const tempDir = path.join(os.tmpdir(), 'humble');
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
    }
    // Creating input and output file paths for the temporary file and writing
    // the image file to the temporary directory.
    const tempInputFilePath = path.join(tempDir, 'temp.png');
    const tempQuantOutputFilePath = path.join(tempDir, 'temp.quant.png');
    const tempQuantCrushedOutputFilePath = path.join(tempDir, 'temp.quant.crushed.png');
    fs.writeFileSync(tempInputFilePath, bytes);
    // Calling the Pngquant command to quantize the image file in the temporary
    // directory.
    const pngquantProcess = childProcess.spawnSync('pngquant', [
        tempInputFilePath,
        '--output', tempQuantOutputFilePath,
        '--speed', '1',
        '--strip',
        '--verbose',
    ]);
    // If the quantization was successful, running the Pngcrush process to
    // further optimize the PNG image.
    if (pngquantProcess.status === 0) {
        const pngcrushProcess = childProcess.spawnSync('pngcrush', [
            '-brute',
            '-v',
            tempQuantOutputFilePath,
            tempQuantCrushedOutputFilePath,
        ]);
        // If the Pngcrush process was also successful, reading the file to get
        // the buffer, and then deleting the temporary files and directory.
        if (pngcrushProcess.status === 0) {
            // Getting the optimized PNG buffer.
            const pngquantAndCrushedImageBuffer = fs.readFileSync(tempQuantCrushedOutputFilePath);
            // Deleting the temporary files and directory.
            rimraf.sync(tempDir);
            return pngquantAndCrushedImageBuffer;
        }
    }
    // If the either process failed, simply delete the temporary files and
    // directory to clean up the resources, and return the original buffer.
    rimraf.sync(tempDir);
    return bytes;
}
exports.optimizePng = optimizePng;
/**
 * Creates an optimized PNG from an existing PNG using the Pngquant and
 * Pngcrush libraries. If either of these libraries are not installed on the
 * system, the original PNG buffer will be returned.
 *
 * @param bytes a buffer containing a PNG image.
 * @returns a pngquant and pngcrushed optimized PNG image.
 * @dependencies Pngquant 2.12, Pngcrush 1.8.
 */
function minifyPngToPng(bytes) {
    return __awaiter(this, void 0, void 0, function* () {
        // Checking if Pngquant and Pngcrush are installed on the host system.
        const isPngcrushInstalled = dependencies.isPngcrushInstalled();
        const isPngquantInstalled = dependencies.isPngquantInstalled();
        // If Pngquant and Pngcrush are installed, optimize the PNG image using
        // Pngquant and Pngcrush. Else, return the original PNG image buffer.
        if (isPngcrushInstalled === true && isPngquantInstalled === true) {
            const optimizedPngImageBytes = optimizePng(bytes);
            return optimizedPngImageBytes;
        }
        return bytes;
    });
}
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
function minifyPng(bytes, jpegQuality, allowWebp, webpQuality) {
    return __awaiter(this, void 0, void 0, function* () {
        // Creating an array of minified image buffers.
        const minifiedImages = [];
        // Adding the original image bytes to the minified image array.
        minifiedImages.push(bytes);
        // Creating a minified PNG from the original PNG and adding it to the image
        // array.
        const minifiedPngBytes = yield minifyPngToPng(bytes);
        minifiedImages.push(minifiedPngBytes);
        // Creating a minified JPEG from the original PNG and adding it to the image
        // array.
        const minifiedJpegBytes = yield genericImageMinifiers
            .minifyImageToJpeg(bytes, jpegQuality);
        minifiedImages.push(minifiedJpegBytes);
        // Creating a minified WEBP from the original PNG and adding it to the image
        // array.
        if (allowWebp === true) {
            const minifiedWebpBytes = yield genericImageMinifiers
                .minifyImageToWebp(bytes, image_extensions_1.ImageExtension.PNG, webpQuality);
            minifiedImages.push(minifiedWebpBytes);
        }
        // Getting the smallest image buffer and returning it.
        const smallestImage = minifiedImages
            .sort((imageBytesA, imageBytesB) => {
            return imageBytesA.length > imageBytesB.length ? 1 : -1;
        })
            .shift();
        return smallestImage;
    });
}
exports.minifyPng = minifyPng;
//# sourceMappingURL=png-minifiers.js.map