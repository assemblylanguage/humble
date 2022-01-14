/**
 * Code for detecting tracking pixels in a resource cache and removing them to
 * reduce document size.
 */

/* eslint-disable no-await-in-loop */

import * as Jimp from 'jimp/dist';
import * as imageConverter from '../image-converter';
import { ImageExtension } from '../image-extensions';
import { Resource, ResourceCache } from '../../../../resource';

/**
 * Removes all 1x1 images in the image cache that have an alpha channel. These
 * images are often used as tracking pixels that don't add any content to the
 * page and can be removed without having an effect on page display.
 *
 * @command **`--remove-tracking-pixels`**
 *
 * @param imageCache a resource cache of images that will be modified.
 * @dependencies ImageMagick 6.
 * @todo add SVG support.
 */
export async function removeTrackingPixels(
  imageCache: ResourceCache,
) : Promise<void> {
  // Setting the bytes to null in all 1x1 images with transparency.
  for (const url in imageCache) {
    // Getting the resource and the MIME Type.
    const resource: Resource = imageCache[url];
    const mimeType: string = resource.mimeType;

    switch (mimeType) {
      case 'image/png':
      case 'image/jpeg':
      case 'image/gif':
      case 'image/tiff':
      case 'image/webp': {
        let bytes: Buffer = resource.bytes;

        // If the image is a WEBP, converting it into a PNG so that it can be
        // used with Jimp.
        if (mimeType === 'image/webp') {
          bytes = imageConverter.convertImage(
            bytes,
            100,
            ImageExtension.WEBP,
            ImageExtension.PNG,
          );
        }

        // Creating a Jimp image from the buffer, and getting the image width,
        // height, and transparency.
        const image: Jimp = await Jimp.read(bytes);
        const width: number = image.bitmap.width;
        const height: number = image.bitmap.height;
        const hasTransparency: boolean = image.hasAlpha();

        // If the image is a 1x1 image with transparency, updates the bytes to
        // null.
        if (
          width === 1
          && height === 1
          && hasTransparency
        ) {
          await resource.update(null);
        }

        break;
      }

      // no default
    }
  }
}
