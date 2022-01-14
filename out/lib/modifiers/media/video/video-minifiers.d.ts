/**
 * Code for minifying video resources. Currently supports the video formats:
 * MP4, WEBM.
 */
/// <reference types="node" />
import { ResourceCache } from '../../../resource';
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
export declare function minifyMp4(bytes: Buffer): Buffer;
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
export declare function minifyWebm(bytes: Buffer): Buffer;
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
export declare function minifyVideos(videoCache: ResourceCache): void;
//# sourceMappingURL=video-minifiers.d.ts.map