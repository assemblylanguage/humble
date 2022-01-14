/**
 * Code for generic image minifiers through through lossy conversions.
 */

import * as Jimp from 'jimp/dist';
import * as dependencies from '../../../../dependencies';
import * as imageConverter from '../image-converter';
import { ImageExtension } from '../image-extensions';

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
export async function minifyImageToJpeg(
  bytes: Buffer,
  jpegQuality: number,
) : Promise<Buffer> {
  // Creating a Jimp image from the image buffer.
  const image: Jimp = await Jimp.read(bytes);

  // If the image does not contain transparency, then convert it to a JPEG at
  // the specified quality level. Else, return the original image buffer.
  if (!image.hasAlpha()) {
    const optimizedJpegImage: Jimp = image.quality(jpegQuality);
    const optimizedJpegImageBytes: Buffer = await optimizedJpegImage
      .getBufferAsync(Jimp.MIME_JPEG);

    return optimizedJpegImageBytes;
  }

  return bytes;
}

/**
 * Possibly converts an image buffer into a minified WEBP image buffer. If
 * ImageMagick is not installed, no conversion will occur and the original
 * image buffer will be returned.
 *
 * @param bytes a buffer containing an image.
 * @param inputExtension the extension of the input image buffer.
 * @param webpQuality the quality of the WEBP that the image will be converted
 * to.
 * @returns either the original image buffer or minified WEBP buffer.
 * @dependencies ImageMagick 6.
 */
export async function minifyImageToWebp(
  bytes: Buffer,
  inputExtension: ImageExtension,
  webpQuality: number,
) : Promise<Buffer> {
  // Checks if ImageMagick is installed on the host system.
  const isImageMagickInstalled: boolean = dependencies
    .isImageMagickInstalled();

  // If ImageMagick is installed, convert the image buffer to a WEBP, and
  // return the WEBP buffer. Else, return the original image buffer.
  if (isImageMagickInstalled === true) {
    const optimizedWebpImageBytes: Buffer = imageConverter.convertImage(
      bytes,
      webpQuality,
      inputExtension,
      ImageExtension.WEBP,
    );

    return optimizedWebpImageBytes;
  }

  return bytes;
}
