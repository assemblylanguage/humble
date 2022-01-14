"use strict";
/**
 * Code for converting image formats.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertImage = void 0;
const os = require("os");
const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");
const rimraf = require("rimraf");
/**
 * Converts an image from one image type to another image type using
 * ImageMagick. All image types supported by ImageMagick are able to be
 * converted, including the following image types:
 *
 * * PNG
 * * JPEG
 * * GIF
 * * TIFF
 * * WEBP
 * * SVG
 *
 * @param bytes a buffer containing an image.
 * @param quality the quality of converted image if applicable.
 * @param inputExtension the extension of the input file image (the image type
 * that will be converted from).
 * @param outputExtension the extension of the output file image (the image type
 * that will be converted to).
 * @returns a buffer of the converted image.
 * @dependencies ImageMagick.
 */
function convertImage(bytes, quality, inputExtension, outputExtension) {
    // Getting the path to and creating a new Humble temporary directory if
    // one does not already exist.
    const tempDir = path.join(os.tmpdir(), 'humble');
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
    }
    // Creating input and output file paths for the temporary file and writing
    // the image file to the temporary directory.
    const tempInputFilePath = path.join(tempDir, `temp.${inputExtension}`);
    const tempOutputFilePath = path.join(tempDir, `temp.${outputExtension}`);
    fs.writeFileSync(tempInputFilePath, bytes);
    // Calling the ImageMagick command to convert the image file in the temporary
    // directory to a different format.
    const imageMagickProcess = childProcess.spawnSync('convert', [
        '-quality',
        quality.toString(),
        tempInputFilePath,
        tempOutputFilePath,
    ]);
    // If the conversion was successful, reading the file to get the buffer, and
    // then deleting the temporary files and directory.
    if (imageMagickProcess.status === 0) {
        // Getting the converted image buffer.
        const convertedImageBuffer = fs.readFileSync(tempOutputFilePath);
        // Deleting the temporary files and directory.
        rimraf.sync(tempDir);
        return convertedImageBuffer;
    }
    // If the process failed, simply delete the temporary files and directory to
    // clean up the resources, and return the original buffer.
    rimraf.sync(tempDir);
    return bytes;
}
exports.convertImage = convertImage;
//# sourceMappingURL=image-converter.js.map