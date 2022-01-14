/**
 * Code minifying GIF images.
 */

import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import * as childProcess from 'child_process';
import { SpawnSyncReturns } from 'child_process';
import * as rimraf from 'rimraf';
import * as Jimp from 'jimp/dist';
import * as gifFrames from 'gif-frames';
import * as dependencies from '../../../../dependencies';

/* eslint-disable arrow-body-style */

/**
 * Checks if a GIF image has multiple frames.
 *
 * @param bytes a buffer containing a GIF image.
 * @returns true if the GIF image has multiple frames, false otherwise.
 */
export async function gifHasMultipleFrames(
  bytes: Buffer,
) : Promise<boolean> {
  // Getting all the frames from the GIF.
  const frames: any = await gifFrames({
    url: bytes,
    frames: 'all',
  });

  // Checking how many frames the GIF has.
  const hasMultipleFrames: boolean = frames.length > 1;

  return hasMultipleFrames;
}

/**
 * Checks if a GIF image has transparency.
 *
 * @param bytes a buffer containing a GIF image.
 * @returns true if the GIF image has transparency, false otherwise.
 */
export async function gifHasTransparency(
  bytes: Buffer,
) : Promise<boolean> {
  // Getting all the frames from the GIF.
  const frames: any = await gifFrames({
    url: bytes,
    frames: 'all',
  });

  // Getting the transparency index for each frame in the GIF.
  const frameTransparencies: number[] = frames.map((frame: any) => {
    return frame.frameInfo.transparent_index;
  });

  // Checking if all frames in the GIF have no transparency. If this is not
  // true, then at least 1 frame has transparency, indicating that the entire
  // gif has transparency.
  const hasNoTransparency: boolean = frameTransparencies
    .every((transparentIndex: number) => {
      return transparentIndex === 255;
    });

  return !hasNoTransparency;
}

/**
 * Creates an optimized GIF from an existing GIF using the `Gifsicle` library.
 *
 * @param bytes a buffer containing a GIF image.
 * @returns a gifsicle optimized GIF image.
 * @dependencies Gifsicle 1.9
 */
export function optimizeGif(
  bytes: Buffer,
) : Buffer {
  // Getting the path to and creating a new Humble temporary directory if
  // one does not already exist.
  const tempDir: string = path.join(os.tmpdir(), 'humble');

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  // Creating input and output file paths for the temporary file and writing
  // the image file to the temporary directory.
  const tempInputFilePath: string = path.join(tempDir, 'temp.gif');
  const tempOutputFilePath: string = path.join(tempDir, 'temp.opt.gif');

  fs.writeFileSync(tempInputFilePath, bytes);

  // Calling the Gifsicle command to optimize the GIF image file in the
  // temporary directory.
  const gifsicleProcess: SpawnSyncReturns<string> = childProcess.spawnSync(
    'gifsicle',
    [
      tempInputFilePath,
      '-o', tempOutputFilePath,
      '-O3',
      '--lossy=100',
    ],
  );

  // If the optimization was successful, reading the file to get the buffer,
  // and then deleting the temporary files and directory.
  if (gifsicleProcess.status === 0) {
    // Getting the optimized GIF buffer.
    const gifsicleImageBuffer: Buffer = fs.readFileSync(tempOutputFilePath);

    // Deleting the temporary files and directory.
    rimraf.sync(tempDir);

    return gifsicleImageBuffer;
  }

  // If the process failed, simply delete the temporary files and directory to
  // clean up the resources, and return the original buffer.
  rimraf.sync(tempDir);

  return bytes;
}

/**
 * Creates an optimized WEBP from an existing GIF using the `gif2webp` library.
 *
 * @param bytes a buffer containing a GIF image.
 * @returns an optimized WEBP image.
 * @dependencies gif2webp 1.2
 */
export function optimizeGifToWebp(
  bytes: Buffer,
  webpQuality: number,
) : Buffer {
  // Getting the path to and creating a new Humble temporary directory if
  // one does not already exist.
  const tempDir: string = path.join(os.tmpdir(), 'humble');

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  // Creating input and output file paths for the temporary file and writing
  // the image file to the temporary directory.
  const tempInputFilePath: string = path.join(tempDir, 'temp.gif');
  const tempOutputFilePath: string = path.join(tempDir, 'temp.opt.gif');

  fs.writeFileSync(tempInputFilePath, bytes);

  // Calling the Gif2Webp command to convert the GIF image file in the
  // temporary directory into a WEBP file.
  const gif2WebpProcess: SpawnSyncReturns<string> = childProcess.spawnSync(
    'gif2webp',
    [
      tempInputFilePath,
      '-o', tempOutputFilePath,
      '-lossy',
      '-q', webpQuality.toString(),
      '-m', '6',
      '-metadata', 'none',
      '-mt',
      '-v',
    ],
  );

  // If the conversion was successful, reading the file to get the buffer,
  // and then deleting the temporary files and directory.
  if (gif2WebpProcess.status === 0) {
    // Getting the converted WEBP buffer.
    const webpImageBuffer: Buffer = fs.readFileSync(tempOutputFilePath);

    // Deleting the temporary files and directory.
    rimraf.sync(tempDir);

    return webpImageBuffer;
  }

  // If the process failed, simply delete the temporary files and directory to
  // clean up the resources, and return the original buffer.
  rimraf.sync(tempDir);

  return bytes;
}

/**
 * Creates an optimized GIF from an existing GIF using the `Gifsicle` library.
 * If Gifsicle is not installed on the system, the original GIF buffer will be
 * returned.
 *
 * @param bytes a buffer containing a GIF image.
 * @returns a gifsicle optimized GIF image.
 * @dependencies Gifsicle 1.9.
 */
export async function minifyGifToGif(
  bytes: Buffer,
) : Promise<Buffer> {
  // Checks if Gifsicle is installed on the host system.
  const isGifsicleInstalled: boolean = dependencies
    .isGifsicleInstalled();

  // If Gifsicle is installed, optimize the GIF image using Gifsicle. Else,
  // return the original GIF image buffer.
  if (isGifsicleInstalled === true) {
    const optimizedGifImageBytes: Buffer = optimizeGif(bytes);

    return optimizedGifImageBytes;
  }

  return bytes;
}

/**
 * Possibly converts an image buffer into a minified JPEG image buffer. If
 * the image has transparency, no image conversion occurs and the original
 * buffer is returned.
 *
 * @param bytes a buffer containing an image.
 * @param jpegQuality the quality of the JPEG that the image will be converted
 * to.
 * @returns either the original image buffer or minified JPEG buffer.
 */
export async function minifyGifToJpeg(
  bytes: Buffer,
  jpegQuality: number,
) : Promise<Buffer> {
  // Creating a Jimp image from the image buffer.
  const image: Jimp = await Jimp.read(bytes);

  // Checking if the GIF has both:
  //   1) No transparency
  //   2) Only a single frame
  // And if both of these are true, converting the GIF to an optimized JPEG.
  const hasTransparency: boolean = await gifHasTransparency(bytes);
  const hasMultipleFrames: boolean = await gifHasMultipleFrames(bytes);

  if (hasMultipleFrames === false && hasTransparency === false) {
    // Converting the GIF to a reduced quality JPEG.
    const optimizedJpegImage: Jimp = image.quality(jpegQuality);

    // Getting the minified JPEG buffer and returning it.
    const optimizedJpegImageBytes: Buffer = await optimizedJpegImage
      .getBufferAsync(Jimp.MIME_JPEG);

    return optimizedJpegImageBytes;
  }

  return bytes;
}

/**
 * Possibly minifies a GIF image buffer. This function runs through multiple
 * algorithms to attempt to reduce the size of a GIF, including possible
 * conversion of the GIF into different image formats so long as no features
 * of the GIF are lost. If none of the minified images are smaller than the
 * original image buffer, the original buffer is returned.
 *
 * @param bytes a buffer containing an image.
 * @param options[jpegQuality] the quality of the JPEG that the image will be
 * converted to.
 * @param options[allowWebp] if true, allows the conversion of the GIF to a
 * WEBP image.
 * @param options[webpQuality] the quality of the WEBP that the image will be
 * converted to.
 * @returns either the original image buffer or minified image buffer.
 * @dependencies Gifsicle 1.9
 * @todo add AVIF support.
 * @todo add JXL support.
 */
export async function minifyGif(
  bytes: Buffer,
  jpegQuality?: number,
  allowWebp?: boolean,
  webpQuality?: number,
) : Promise<Buffer> {
  // Creating an array of minified image buffers.
  const minifiedImages: Buffer[] = [];

  // Adding the original image bytes to the minified image array.
  minifiedImages.push(bytes);

  // Creating a minified GIF from the original GIF and adding it to the image
  // array.
  const minifiedGifBytes: Buffer = await minifyGifToGif(bytes);

  minifiedImages.push(minifiedGifBytes);

  // Creating a minified JPEG from the original GIF and adding it to the image
  // array.
  const minifiedJpegBytes: Buffer = await minifyGifToJpeg(
    bytes,
    jpegQuality,
  );

  minifiedImages.push(minifiedJpegBytes);

  // Creating a minified WEBP from the original GIF and adding it to the image
  // array.
  if (allowWebp === true) {
    const minifiedWebpBytes: Buffer = optimizeGifToWebp(
      bytes,
      webpQuality,
    );

    minifiedImages.push(minifiedWebpBytes);
  }

  // Getting the smallest image buffer and returning it.
  const smallestImage: Buffer = minifiedImages
    .sort((imageBytesA, imageBytesB) => {
      return imageBytesA.length > imageBytesB.length ? 1 : -1;
    })
    .shift();

  return smallestImage;
}
