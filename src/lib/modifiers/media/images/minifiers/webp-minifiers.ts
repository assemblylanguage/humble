/**
 * Code minifying WEBP images.
 */

/* eslint-disable arrow-body-style */

import * as genericImageMinifiers from './generic-image-minifiers';
import { ImageExtension } from '../image-extensions';

/**
 * Possibly minifies a WEBP image buffer. This function runs through multiple
 * algorithms to attempt to reduce the size of a WEBP, including possible
 * conversion of the WEBP into different image formats so long as no features
 * of the WEBP are lost. If none of the minified images are smaller than the
 * original image buffer, the original buffer is returned.
 *
 * @param bytes a buffer containing an image.
 * @param options.jpegQuality the quality of the JPEG that the image will be
 * converted to.
 * @param options.allowWebp if true, allows the conversion of the WEBP to a
 * WEBP image.
 * @param options.webpQuality the quality of the WEBP that the image will be
 * converted to.
 * @returns either the original image buffer or minified image buffer.
 * @dependencies ImageMagick 6.
 * @todo add AVIF support.
 * @todo add JXL support.
 */
export async function minifyWebp(
  bytes: Buffer,
  jpegQuality: number,
  allowWebp: boolean,
  webpQuality: number,
) : Promise<Buffer> {
  // Creating an array of minified image buffers.
  const minifiedImages: Buffer[] = [];

  // Adding the original image bytes to the minified image array.
  minifiedImages.push(bytes);

  // Creating a minified JPEG from the original TIFF and adding it to the image
  // array.
  const minifiedJpegBytes: Buffer = await genericImageMinifiers
    .minifyImageToJpeg(
      bytes,
      jpegQuality,
    );

  minifiedImages.push(minifiedJpegBytes);

  // Creating a minified WEBP from the original PNG and adding it to the image
  // array.
  if (allowWebp === true) {
    const minifiedWebpBytes: Buffer = await genericImageMinifiers
      .minifyImageToWebp(
        bytes,
        ImageExtension.WEBP,
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
