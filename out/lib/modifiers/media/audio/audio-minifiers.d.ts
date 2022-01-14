/**
 * Code for minifying audio resources. Currently supports these file types: MP3.
 */
/// <reference types="node" />
import { ResourceCache } from '../../../resource';
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
export declare function minifyMp3(bytes: Buffer): Buffer;
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
export declare function minifyAudio(audioCache: ResourceCache): void;
//# sourceMappingURL=audio-minifiers.d.ts.map