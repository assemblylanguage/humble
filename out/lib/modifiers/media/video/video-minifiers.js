"use strict";
/**
 * Code for minifying video resources. Currently supports the video formats:
 * MP4, WEBM.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.minifyVideos = exports.minifyWebm = exports.minifyMp4 = void 0;
const os = require("os");
const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");
const rimraf = require("rimraf");
const dependencies = require("../../../dependencies");
/**
 * Possibly minifies an MP4 video buffer. This function minifies the MP4 file
 * by reducing the bitrate and the quality of the file to reduce its size.
 * Conversion is done through FFMPEG, and if not installed the original video
 * buffer is returned.
 *
 * @param bytes a buffer containing an MP4 file.
 * @returns either the original video buffer or minified video buffer if FFMPEG
 * is installed.
 * @dependencies FFMPEG.
 */
function minifyMp4(bytes) {
    // Getting the path to and creating a new Humble temporary directory if
    // one does not already exist.
    const tempDir = path.join(os.tmpdir(), 'humble');
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
    }
    // Creating input and output file paths for the temporary file and writing
    // the MP4 file to the temporary directory.
    const tempInputFilePath = path.join(tempDir, 'temp.mp4');
    const tempOutputFilePath = path.join(tempDir, 'temp.opt.mp4');
    fs.writeFileSync(tempInputFilePath, bytes);
    // Calling the FFMPEG command to minify the MP4 file in the temporary
    // directory.
    const ffmpegProcess = childProcess.spawnSync('ffmpeg', [
        '-y',
        '-i', tempInputFilePath,
        '-qmin', '30',
        '-qmax', '60',
        '-crf', '30',
        '-c:v', 'libx264',
        '-b:v', '600k',
        '-c:a', 'aac',
        '-ar', '48000',
        '-b:a', '128k',
        tempOutputFilePath,
    ]);
    // If the conversion was successful, reading the file to get the buffer, and
    // then deleting the temporary files and directories.
    if (ffmpegProcess.status === 0) {
        const videoBuffer = fs.readFileSync(tempOutputFilePath);
        // Deleting the temporary files and directory.
        rimraf.sync(tempDir);
        return videoBuffer;
    }
    // If the process failed, simply delete the temporary files and directory to
    // clean up the resources, and return the original buffer.
    rimraf.sync(tempDir);
    return bytes;
}
exports.minifyMp4 = minifyMp4;
/**
 * Possibly minifies a WEBM video buffer. This function minifies the WEBM file
 * by reducing the bitrate and the quality of the file to reduce its size.
 * Conversion is done through FFMPEG, and if not installed the original video
 * buffer is returned.
 *
 * @param bytes a buffer containing an WEBM file.
 * @returns either the original video buffer or minified video buffer if FFMPEG
 * is installed.
 * @dependencies FFMPEG.
 */
function minifyWebm(bytes) {
    // Getting the path to and creating a new Humble temporary directory if
    // one does not already exist.
    const tempDir = path.join(os.tmpdir(), 'humble');
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
    }
    // Creating input and output file paths for the temporary file and writing
    // the WEBM file to the temporary directory.
    const tempInputFilePath = path.join(tempDir, 'temp.webm');
    const tempOutputFilePath = path.join(tempDir, 'temp.opt.webm');
    fs.writeFileSync(tempInputFilePath, bytes);
    // Calling the FFMPEG command to minify the WEBM file in the temporary
    // directory.
    const ffmpegProcess = childProcess.spawnSync('ffmpeg', [
        '-y',
        '-i', tempInputFilePath,
        '-qmin', '30',
        '-qmax', '60',
        '-crf', '30',
        '-c:v', 'libvpx',
        '-b:v', '600k',
        '-c:a', 'libvorbis',
        '-ar', '48000',
        '-b:a', '128k',
        tempOutputFilePath,
    ]);
    // If the conversion was successful, reading the file to get the buffer, and
    // then deleting the temporary files and directories.
    if (ffmpegProcess.status === 0) {
        const videoBuffer = fs.readFileSync(tempOutputFilePath);
        // Deleting the temporary files and directory.
        rimraf.sync(tempDir);
        return videoBuffer;
    }
    // If the process failed, simply delete the temporary files and directory to
    // clean up the resources, and return the original buffer.
    rimraf.sync(tempDir);
    return bytes;
}
exports.minifyWebm = minifyWebm;
/**
 * Minifies all videos in the provided video cache using a series of video
 * minification and conversion algorithms. The algorithm used for conversions
 * and minifications is as follows. Note that among each video type, the
 * smallest video from the minifications will become the new video buffer for
 * the resource in the given URL.
 *
 * * MP4
 *   - MP4 -> MP4 (with reduced bitrate and quality using FFMPEG)
 * * WEBM
 *   - WEBM -> WEBM (with reduced bitrate and quality using FFMPEG)
 *
 * @command **`--minify-videos`**
 *
 * @param videoCache a resource cache of videos that will be minified.
 * @dependencies FFMPEG.
 * @todo Add support for more video formats and codecs.
 */
function minifyVideos(videoCache) {
    // Minifying all videos in the video cache.
    for (const url in videoCache) {
        // Getting the resource, bytes, and MIME Type.
        const resource = videoCache[url];
        const bytes = resource.bytes;
        const mimeType = resource.mimeType;
        // Checking if FFMPEG is installed on the host system.
        const isFfmpegInstalled = dependencies.isFfmpegInstalled();
        // If the resource fetch was successful, performing the minification
        // depending on the MIME Type of the video, and then updating the
        // resource with the new video buffer if the new video buffer is
        // smaller than the original.
        if (resource.status === true) {
            switch (mimeType) {
                case 'video/mp4': {
                    // If FFMPEG is installed, minifying the MP4 video and updating the
                    // resource with the minified bytes.
                    if (isFfmpegInstalled) {
                        const optimizedVideoBytes = minifyMp4(bytes);
                        if (optimizedVideoBytes.length < bytes.length) {
                            resource.update(optimizedVideoBytes);
                        }
                    }
                    break;
                }
                case 'video/webm': {
                    // If FFMPEG is installed, minifying the WEBM video and updating the
                    // resource with the minified bytes.
                    if (isFfmpegInstalled) {
                        const optimizedVideoBytes = minifyWebm(bytes);
                        if (optimizedVideoBytes.length < bytes.length) {
                            resource.update(optimizedVideoBytes);
                        }
                    }
                    break;
                }
                // @no-default
            }
        }
    }
}
exports.minifyVideos = minifyVideos;
//# sourceMappingURL=video-minifiers.js.map