"use strict";
/**
 * Code for minifying video resources. Currently supports these video formats:
 * MP4, WEBM.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.grayscaleVideos = exports.grayscaleVideo = void 0;
const os = require("os");
const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");
const rimraf = require("rimraf");
const dependencies = require("../../../dependencies");
/**
 * Possibly converts a video to grayscale. Conversion is done through FFMPEG,
 * and if not installed the original video buffer is returned.
 *
 * @param bytes a buffer containing a video file.
 * @returns either the original video buffer or grayscaled video buffer.
 * @dependencies FFMPEG.
 */
function grayscaleVideo(bytes, extension) {
    // Getting the path to and creating a new Humble temporary directory if
    // one does not already exist.
    const tempDir = path.join(os.tmpdir(), 'humble');
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
    }
    // Creating input and output file paths for the temporary file and writing
    // the video file to the temporary directory.
    const tempInputFilePath = path.join(tempDir, `temp.${extension}`);
    const tempOutputFilePath = path.join(tempDir, `temp.gray.${extension}`);
    fs.writeFileSync(tempInputFilePath, bytes);
    // Calling the FFMPEG command to grayscale the video file in the temporary
    // directory.
    const ffmpegProcess = childProcess.spawnSync('ffmpeg', [
        '-i', tempInputFilePath,
        '-filter:v', 'format=pix_fmts=gray',
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
exports.grayscaleVideo = grayscaleVideo;
/**
 * Converts all videos in the provided video cache into grayscale videos.
 *
 * @command **`--grayscale-videos`**
 *
 * @param videoCache a resource cache of videos that will be minified.
 * @dependencies FFMPEG.
 */
function grayscaleVideos(videoCache) {
    // Checking if FFMPEG is installed on the host system.
    const isFfmpegInstalled = dependencies.isFfmpegInstalled();
    if (isFfmpegInstalled === true) {
        // Grayscaling all videos in the video cache.
        for (const url in videoCache) {
            // Getting the resource, bytes, and MIME Type.
            const resource = videoCache[url];
            const bytes = resource.bytes;
            const extension = resource.extension;
            // If the resource fetch was successful, grayscaling the video, and then
            // updating the resource with the new grayscaled video buffer.
            if (resource.status === true) {
                const grayscaledVideoBuffer = grayscaleVideo(bytes, extension);
                resource.update(grayscaledVideoBuffer);
            }
        }
    }
}
exports.grayscaleVideos = grayscaleVideos;
//# sourceMappingURL=video-grayscaler.js.map