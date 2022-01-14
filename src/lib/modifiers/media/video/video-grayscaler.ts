/**
 * Code for minifying video resources. Currently supports these video formats:
 * MP4, WEBM.
 */

import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import * as childProcess from 'child_process';
import { SpawnSyncReturns } from 'child_process';
import * as rimraf from 'rimraf';
import * as dependencies from '../../../dependencies';
import { Resource, ResourceCache } from '../../../resource';

/**
 * Possibly converts a video to grayscale. Conversion is done through FFMPEG,
 * and if not installed the original video buffer is returned.
 *
 * @param bytes a buffer containing a video file.
 * @returns either the original video buffer or grayscaled video buffer.
 * @dependencies FFMPEG.
 */
export function grayscaleVideo(
  bytes: Buffer,
  extension: string,
) : Buffer {
  // Getting the path to and creating a new Humble temporary directory if
  // one does not already exist.
  const tempDir: string = path.join(os.tmpdir(), 'humble');

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  // Creating input and output file paths for the temporary file and writing
  // the video file to the temporary directory.
  const tempInputFilePath: string = path.join(tempDir, `temp.${extension}`);
  const tempOutputFilePath: string = path.join(tempDir, `temp.gray.${extension}`);

  fs.writeFileSync(tempInputFilePath, bytes);

  // Calling the FFMPEG command to grayscale the video file in the temporary
  // directory.
  const ffmpegProcess: SpawnSyncReturns<string> = childProcess.spawnSync(
    'ffmpeg',
    [
      '-i', tempInputFilePath,
      '-filter:v', 'format=pix_fmts=gray',
      tempOutputFilePath,
    ],
  );

  // If the conversion was successful, reading the file to get the buffer, and
  // then deleting the temporary files and directories.
  if (ffmpegProcess.status === 0) {
    const videoBuffer: Buffer = fs.readFileSync(tempOutputFilePath);

    // Deleting the temporary files and directory.
    rimraf.sync(tempDir);

    return videoBuffer;
  }

  // If the process failed, simply delete the temporary files and directory to
  // clean up the resources, and return the original buffer.
  rimraf.sync(tempDir);

  return bytes;
}

/**
 * Converts all videos in the provided video cache into grayscale videos.
 *
 * @command **`--grayscale-videos`**
 *
 * @param videoCache a resource cache of videos that will be minified.
 * @dependencies FFMPEG.
 */
export function grayscaleVideos(
  videoCache: ResourceCache,
) : void {
  // Checking if FFMPEG is installed on the host system.
  const isFfmpegInstalled: boolean = dependencies.isFfmpegInstalled();

  if (isFfmpegInstalled === true) {
    // Grayscaling all videos in the video cache.
    for (const url in videoCache) {
      // Getting the resource, bytes, and MIME Type.
      const resource: Resource = videoCache[url];
      const bytes: Buffer = resource.bytes;
      const extension: string = resource.extension;

      // If the resource fetch was successful, grayscaling the video, and then
      // updating the resource with the new grayscaled video buffer.
      if (resource.status === true) {
        const grayscaledVideoBuffer: Buffer = grayscaleVideo(
          bytes,
          extension,
        );

        resource.update(grayscaledVideoBuffer);
      }
    }
  }
}
