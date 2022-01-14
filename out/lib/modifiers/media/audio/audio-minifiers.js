"use strict";
/**
 * Code for minifying audio resources. Currently supports these file types: MP3.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.minifyAudio = exports.minifyMp3 = void 0;
const os = require("os");
const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");
const rimraf = require("rimraf");
const dependencies = require("../../../dependencies");
/**
 * Possibly minifies an MP3 audio buffer. This function minifies the MP3 file
 * by reducing the bitrate of the file to reduce its size. Conversion is done
 * through FFMPEG.
 *
 * @param bytes a buffer containing an MP3 file.
 * @returns either the original audio buffer or minified audio buffer if the
 * FFMPEG process was successful.
 * @dependencies FFMPEG.
 */
function minifyMp3(bytes) {
    // Getting the path to and creating a new Humble temporary directory if
    // one does not already exist.
    const tempDir = path.join(os.tmpdir(), 'humble');
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
    }
    // Creating input and output file paths for the temporary file and writing
    // the MP3 file to the temporary directory.
    const tempInputFilePath = path.join(tempDir, 'temp.mp3');
    const tempOutputFilePath = path.join(tempDir, 'temp.opt.mp3');
    fs.writeFileSync(tempInputFilePath, bytes);
    // Calling the FFMPEG command to minify the MP3 file in the temporary
    // directory.
    const ffmpegProcess = childProcess.spawnSync('ffmpeg', [
        '-i', tempInputFilePath,
        '-codec:a', 'libmp3lame',
        '-b:a', '96k',
        tempOutputFilePath,
    ]);
    // If the conversion was successful, reading the file to get the buffer, and
    // then deleting the temporary files and directories.
    if (ffmpegProcess.status === 0) {
        const audioBuffer = fs.readFileSync(tempOutputFilePath);
        // Deleting the temporary files and directory.
        rimraf.sync(tempDir);
        return audioBuffer;
    }
    // If the process failed, simply delete the temporary files and directory to
    // clean up the resources, and return the original buffer.
    rimraf.sync(tempDir);
    return bytes;
}
exports.minifyMp3 = minifyMp3;
/**
 * Minifies all audio in the provided audio cache using a series of audio
 * minification and conversion algorithms. The algorithm used for conversions
 * and minifications is as follows. Note that among each audio type, the
 * smallest audio from the minifications will become the new audio buffer for
 * the resource in the given URL. If FFMPEG is not installed, no minifications
 * will occur when run.
 *
 * * MP3
 *   - MP3 -> MP3 (with reduced bitrate using FFMPEG)
 *
 * @command **`--minify-audio`**
 *
 * @param audioCache a resource cache of audio that will be minified.
 * @dependencies FFMPEG.
 * @todo add OGG support.
 * @todo add FLAC support.
 */
function minifyAudio(audioCache) {
    // Minifying all audio in the audio cache.
    for (const url in audioCache) {
        // Getting the resource, bytes, and MIME Type.
        const resource = audioCache[url];
        const bytes = resource.bytes;
        const mimeType = resource.mimeType;
        // Checking if FFMPEG is installed on the host system.
        const isFfmpegInstalled = dependencies.isFfmpegInstalled();
        // If the resource fetch was successful, performing the minification
        // depending on the MIME Type of the audio, and then updating the
        // resource with the new audio buffer if the new audio buffer is
        // smaller than the original.
        if (resource.status === true) {
            switch (mimeType) {
                case 'audio/mpeg': {
                    // If FFMPEG is installed, minifying the MP3 audio and updating the
                    // resource with the minified bytes.
                    if (isFfmpegInstalled) {
                        const optimizedAudioBytes = minifyMp3(bytes);
                        if (optimizedAudioBytes.length < bytes.length) {
                            resource.update(optimizedAudioBytes);
                        }
                        break;
                    }
                }
                // @no-default
            }
        }
    }
}
exports.minifyAudio = minifyAudio;
//# sourceMappingURL=audio-minifiers.js.map