"use strict";
/**
 * This file contains the source code for checking which external dependencies
 * are installed on the platform and providing information to the user when
 * dependencies are missing.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkHumbleDependencies = exports.isFonttoolsInstalled = exports.getGif2WebpVersion = exports.isGif2WebpInstalled = exports.getImg2WebpVersion = exports.isImg2WebpInstalled = exports.getGifsicleVersion = exports.isGifsicleInstalled = exports.getPngquantVersion = exports.isPngquantInstalled = exports.getPngcrushVersion = exports.isPngcrushInstalled = exports.getImageMagickVersion = exports.isImageMagickInstalled = exports.isFfmpegInstalled = exports.getMat2Version = exports.isMat2Installed = exports.isDependencyInstalled = void 0;
/* eslint-disable @typescript-eslint/ban-ts-comment */
const childProcess = require("child_process");
const logger_1 = require("./logger");
/**
 * Checks if a dependency is installed on the host system and available on the
 * system PATH.
 *
 * @param executable the command line name of the executable program.
 * @returns returns true when the dependency is installed and available on the
 * platform, false otherwise.
 */
function isDependencyInstalled(executable) {
    switch (process.platform) {
        case 'win32': {
            return childProcess
                .spawnSync('where', [executable])
                .status === 0;
        }
        case 'darwin': {
            return childProcess
                .spawnSync('which', [executable])
                .status === 0;
        }
        case 'linux': {
            return childProcess
                .spawnSync('which', [executable])
                .status === 0;
        }
        case 'freebsd': {
            return childProcess
                .spawnSync('whereis', [executable])
                .status === 0;
        }
        case 'openbsd': {
            return childProcess
                .spawnSync('which', [executable])
                .status === 0;
        }
        // @ts-ignore
        case 'haiku': {
            return childProcess
                .spawnSync('which', [executable])
                .status === 0;
        }
        default: {
            return childProcess
                .spawnSync('which', [executable])
                .status === 0;
        }
    }
}
exports.isDependencyInstalled = isDependencyInstalled;
/**
 * Checks if Mat2 is installed and is found on the PATH.
 *
 * @returns return true if installed, false otherwise.
 */
function isMat2Installed() {
    return isDependencyInstalled('mat2');
}
exports.isMat2Installed = isMat2Installed;
/**
 * Gets the version string of Mat2 if it is installed.
 *
 * @returns the version string of the installed Mat2, or null if it is not
 * installed.
 */
function getMat2Version() {
    // Running Mat2 with the version flag.
    const mat2Process = childProcess.spawnSync('mat2', ['-v']);
    // If the Mat2 process was successful, parsing out the version number from
    // the process STDOUT.
    if (mat2Process.status === 0) {
        const mat2VersionString = mat2Process
            .stdout
            .toString()
            .trim()
            .split(' ')[1];
        return mat2VersionString;
    }
    return null;
}
exports.getMat2Version = getMat2Version;
/**
 * Checks if FFMPEG is installed and is found on the PATH.
 *
 * @returns return true if installed, false otherwise.
 */
function isFfmpegInstalled() {
    return isDependencyInstalled('ffmpeg');
}
exports.isFfmpegInstalled = isFfmpegInstalled;
/**
 * Checks if ImageMagick is installed and is found on the PATH.
 *
 * @returns return true if installed, false otherwise.
 */
function isImageMagickInstalled() {
    return isDependencyInstalled('convert');
}
exports.isImageMagickInstalled = isImageMagickInstalled;
/**
 * Gets the version string of ImageMagick if it is installed.
 *
 * @returns the version string of the installed ImageMagick, or null if it is
 * not installed.
 */
function getImageMagickVersion() {
    // Running ImageMagick with the version flag.
    const imageMagickProcess = childProcess.spawnSync('convert', ['-version']);
    // If the ImageMagick process was successful, parsing out the version number
    // from the process STDOUT.
    if (imageMagickProcess.status === 0) {
        const imageMagickVersionString = imageMagickProcess
            .stdout
            .toString()
            .trim()
            .split('\n')[0]
            .split('Version: ImageMagick ')[1]
            .split(' ')[0]
            .trim();
        return imageMagickVersionString;
    }
    return null;
}
exports.getImageMagickVersion = getImageMagickVersion;
/**
 * Checks if Pngcrush is installed and is found on the PATH.
 *
 * @returns return true if installed, false otherwise.
 */
function isPngcrushInstalled() {
    return isDependencyInstalled('pngcrush');
}
exports.isPngcrushInstalled = isPngcrushInstalled;
/**
 * Gets the version string of Pngcrush if it is installed.
 *
 * @returns the version string of the installed Pngcrush, or null if it is not
 * installed.
 */
function getPngcrushVersion() {
    // Running Pngcrush with the version flag.
    const pngcrushProcess = childProcess.spawnSync('pngcrush', ['-version']);
    // If the Pngcrush process was successful, parsing out the version number
    // from the process STDOUT.
    if (pngcrushProcess.status === 0) {
        const pngcrushVersionString = pngcrushProcess
            .stdout
            .toString()
            .trim()
            .split('pngcrush')[1]
            .split(',')[0]
            .trim();
        return pngcrushVersionString;
    }
    return null;
}
exports.getPngcrushVersion = getPngcrushVersion;
/**
 * Checks if Pngquant is installed and is found on the PATH.
 *
 * @returns return true if installed, false otherwise.
 */
function isPngquantInstalled() {
    return isDependencyInstalled('pngquant');
}
exports.isPngquantInstalled = isPngquantInstalled;
/**
 * Gets the version string of Pngquant if it is installed.
 *
 * @returns the version string of the installed Pngquant, or null if it is not
 * installed.
 */
function getPngquantVersion() {
    // Running Pngquant with the version flag.
    const pngquantProcess = childProcess.spawnSync('pngquant', ['-version']);
    // If the Pngquant process was successful, parsing out the version number
    // from the process STDOUT.
    if (pngquantProcess.status === 0) {
        const pngquantVersionString = pngquantProcess
            .stdout
            .toString()
            .match(/([0-9][.]){3}/gm)[0];
        return pngquantVersionString;
    }
    return null;
}
exports.getPngquantVersion = getPngquantVersion;
/**
 * Checks if Gifsicle is installed and is found on the PATH.
 *
 * @returns return true if installed, false otherwise.
 */
function isGifsicleInstalled() {
    return isDependencyInstalled('gifsicle');
}
exports.isGifsicleInstalled = isGifsicleInstalled;
/**
 * Gets the version string of Gifsicle if it is installed.
 *
 * @returns the version string of the installed Gifsicle, or null if it is not
 * installed.
 */
function getGifsicleVersion() {
    // Running Gifsicle with the version flag.
    const gifsicleProcess = childProcess.spawnSync('gifsicle', ['--version']);
    // If the Gifsicle process was successful, parsing out the version number
    // from the process STDOUT.
    if (gifsicleProcess.status === 0) {
        const gifsicleVersionString = gifsicleProcess
            .stdout
            .toString()
            .match(/[0-9][.][0-9]{1,2}/gm)[0];
        return gifsicleVersionString;
    }
    return null;
}
exports.getGifsicleVersion = getGifsicleVersion;
/**
 * Checks if Img2Webp is installed and is found on the PATH.
 *
 * @returns return true if installed, false otherwise.
 */
function isImg2WebpInstalled() {
    return isDependencyInstalled('img2webp');
}
exports.isImg2WebpInstalled = isImg2WebpInstalled;
/**
 * Gets the version string of Img2Web if it is installed.
 *
 * @returns the version string of the installed Img2Web, or null if it is not
 * installed.
 */
function getImg2WebpVersion() {
    // Running Img2Webp with the version flag.
    const img2WebpProcess = childProcess.spawnSync('img2webp', ['-version']);
    // If the Img2Webp process was successful, parsing out the version number
    // from the process STDOUT.
    if (img2WebpProcess.status === 0) {
        const img2WebpVersionString = img2WebpProcess
            .stdout
            .toString()
            .trim()
            .split('version: ')[1]
            .split('\n')[0];
        return img2WebpVersionString;
    }
    return null;
}
exports.getImg2WebpVersion = getImg2WebpVersion;
/**
 * Checks if Gif2Webp is installed and is found on the PATH.
 *
 * @returns return true if installed, false otherwise.
 */
function isGif2WebpInstalled() {
    return isDependencyInstalled('gif2webp');
}
exports.isGif2WebpInstalled = isGif2WebpInstalled;
/**
 * Gets the version string of Gif2Web if it is installed.
 *
 * @returns the version string of the installed Gif2Web, or null if it is not
 * installed.
 */
function getGif2WebpVersion() {
    // Running Gif2Webp with the version flag.
    const gif2WebpProcess = childProcess.spawnSync('gif2webp', ['-version']);
    // If the Gif2Webp process was successful, parsing out the version number
    // from the process STDOUT.
    if (gif2WebpProcess.status === 0) {
        const gif2WebpVersionString = gif2WebpProcess
            .stdout
            .toString()
            .trim()
            .split('version: ')[1]
            .split('\n')[0];
        return gif2WebpVersionString;
    }
    return null;
}
exports.getGif2WebpVersion = getGif2WebpVersion;
/**
 * Checks if Fonttools is installed and is found on the PATH.
 *
 * @returns return true if installed, false otherwise.
 */
function isFonttoolsInstalled() {
    return isDependencyInstalled('fonttools');
}
exports.isFonttoolsInstalled = isFonttoolsInstalled;
/**
 * Checks which optional dependencies are installed, and displays messages to
 * the user if these dependencies are missing or available on the platform.
 */
function checkHumbleDependencies() {
    // Logging info to the console to let the user know the dependency check is
    // in progress.
    logger_1.logger.log('info', 'Checking Humble dependencies.');
    // Checking if MAT2 is installed, and logging the status of the dependency.
    if (!isMat2Installed()) {
        logger_1.logger.log('warn', 'Mat2 is not installed, skipping Mat2 functions.', { depth: 1 });
    }
    else {
        logger_1.logger.log('ok', 'Mat2 is installed, Mat2 functions are available.', { depth: 1 });
    }
    // Checking if FFMPEG is installed, and logging the status of the
    // dependency.
    if (!isFfmpegInstalled()) {
        logger_1.logger.log('warn', 'FFMPEG is not installed, skipping FFMPEG functions', { depth: 1 });
    }
    else {
        logger_1.logger.log('ok', 'FFMPEG is installed, FFMPEG functions are available.', { depth: 1 });
    }
    // Checking if ImageMagick is installed, and logging the status of the
    // dependency.
    if (!isImageMagickInstalled()) {
        logger_1.logger.log('warn', 'ImageMagick is not installed, skipping ImageMagick functions.', { depth: 1 });
    }
    else {
        logger_1.logger.log('ok', 'ImageMagick is installed, ImageMagick functions are available.', { depth: 1 });
    }
    // Checking if Pngcrush is installed, and logging the status of the
    // dependency.
    if (!isPngcrushInstalled()) {
        logger_1.logger.log('warn', 'Pngcrush is not installed, skipping Pngcrush functions.', { depth: 1 });
    }
    else {
        logger_1.logger.log('ok', 'Pngcrush is installed, Pngcrush functions are available.', { depth: 1 });
    }
    // Checking if Pngquant is installed, and logging the status of the
    // dependency.
    if (!isPngquantInstalled()) {
        logger_1.logger.log('warn', 'Pngquant is not installed, skipping Pngquant functions.', { depth: 1 });
    }
    else {
        logger_1.logger.log('ok', 'Pngquant is installed, Pngquant functions are available.', { depth: 1 });
    }
    // Checking if Gifsicle is installed, and logging the status of the
    // dependency.
    if (!isGifsicleInstalled()) {
        logger_1.logger.log('warn', 'Gifsicle is not installed, skipping Gifsicle functions.', { depth: 1 });
    }
    else {
        logger_1.logger.log('ok', 'Gifsicle is installed, Gifsicle functions are available.', { depth: 1 });
    }
    // Checking if Img2Webp is installed, and logging the status of the
    // dependency.
    if (!isImg2WebpInstalled()) {
        logger_1.logger.log('warn', 'Img2Webp is not installed, skipping Img2Webp functions.', { depth: 1 });
    }
    else {
        logger_1.logger.log('ok', 'Img2Webp is installed, Img2Webp functions are available.', { depth: 1 });
    }
    // Checking if Gif2Webp is installed, and logging the status of the
    // dependency.
    if (!isGif2WebpInstalled()) {
        logger_1.logger.log('warn', 'Gif2Webp is not installed, skipping Gif2Webp functions.', { depth: 1 });
    }
    else {
        logger_1.logger.log('ok', 'Gif2Webp is installed, Gif2Webp functions are available.', { depth: 1 });
    }
}
exports.checkHumbleDependencies = checkHumbleDependencies;
//# sourceMappingURL=dependencies.js.map