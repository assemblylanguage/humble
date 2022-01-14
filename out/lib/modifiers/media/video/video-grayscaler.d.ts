/**
 * Code for minifying video resources. Currently supports these video formats:
 * MP4, WEBM.
 */
/// <reference types="node" />
import { ResourceCache } from '../../../resource';
/**
 * Possibly converts a video to grayscale. Conversion is done through FFMPEG,
 * and if not installed the original video buffer is returned.
 *
 * @param bytes a buffer containing a video file.
 * @returns either the original video buffer or grayscaled video buffer.
 * @dependencies FFMPEG.
 */
export declare function grayscaleVideo(bytes: Buffer, extension: string): Buffer;
/**
 * Converts all videos in the provided video cache into grayscale videos.
 *
 * @command **`--grayscale-videos`**
 *
 * @param videoCache a resource cache of videos that will be minified.
 * @dependencies FFMPEG.
 */
export declare function grayscaleVideos(videoCache: ResourceCache): void;
//# sourceMappingURL=video-grayscaler.d.ts.map