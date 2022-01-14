/**
 * Code for grayscaling images.
 */

import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import * as childProcess from 'child_process';
import { SpawnSyncReturns } from 'child_process';
import * as rimraf from 'rimraf';
import { Resource, ResourceCache } from '../../../../resource';
import * as dependencies from '../../../../dependencies';

/**
 * Grayscales an image using ImageMagick.
 *
 * @param bytes a buffer containing an image.
 * @param extension the extension of the input file image.
 * @returns a buffer of the grayscaled image.
 * @dependencies ImageMagick 6.
 */
export function grayscaleImage(
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
  // the image file to the temporary directory.
  const tempInputFilePath: string = path.join(tempDir, `temp.${extension}`);
  const tempOutputFilePath: string = path.join(tempDir, `temp.gray.${extension}`);

  fs.writeFileSync(tempInputFilePath, bytes);

  // Calling the ImageMagick command to grayscale the image file in the
  // temporary directory to a different format.
  const imageMagickProcess: SpawnSyncReturns<string> = childProcess.spawnSync(
    'convert',
    [
      '-colorspace', 'Gray',
      tempInputFilePath,
      tempOutputFilePath,
    ],
  );

  // If the grayscaling was successful, reading the file to get the buffer, and
  // then deleting the temporary files and directory.
  if (imageMagickProcess.status === 0) {
    // Getting the grayscaled image buffer.
    const grayscaledImageBuffer: Buffer = fs.readFileSync(tempOutputFilePath);

    // Deleting the temporary files and directory.
    rimraf.sync(tempDir);

    return grayscaledImageBuffer;
  }

  // If the process failed, simply delete the temporary files and directory to
  // clean up the resources, and return the original buffer.
  rimraf.sync(tempDir);

  return bytes;
}

/**
 * Converts all images in the provided image cache, as well as all inline SVG
 * images in the provided document, into grayscale images. The image types
 * currently supported by this function are as follows:
 *
 * * PNG
 * * JPEG
 * * GIF
 * * TIFF
 * * WEBP
 * * AVIF
 * * SVG
 *
 * @command **`--grayscale-images`**
 *
 * @param document the document that will be modified in place.
 * @param imageCache a resource cache of images that will be grayscaled.
 * @dependency ImageMagick 6.
 * @todo add JXL support.
 */
export async function grayscaleImages(
  document: Document,
  imageCache: ResourceCache,
) : Promise<void> {
  // Checks if ImageMagick is installed on the host system.
  const isImageMagickInstalled: boolean = dependencies
    .isImageMagickInstalled();

  // If ImageMagick is installed, grayscaling the all of the images in the
  // image cache.
  if (isImageMagickInstalled === true) {
    // Getting all of the inline `<svg>` tags.
    const svgElements: Element[] = [...document.getElementsByTagName('svg')];

    for (const svgElement of svgElements) {
      // Converting the SVG into a buffer.
      const svgString: string = svgElement.outerHTML;
      const svgImageBuffer: Buffer = Buffer.from(svgString);

      // Grayscaling the SVG and converting it back into a string.
      const grayscaleSvgImageBuffer: Buffer = grayscaleImage(
        svgImageBuffer,
        'svg',
      );

      const grayscaleSvg = grayscaleSvgImageBuffer.toString();

      // Updating the `<svg>` element with the grayscaled SVG.
      svgElement.outerHTML = grayscaleSvg;
    }
  }

  // Grayscaling all of the images in the image cache.
  for (const url in imageCache) {
    // Getting the resource, bytes, file extension, MIME Type, and status.
    const resource: Resource = imageCache[url];
    const bytes: Buffer = resource.bytes;
    const extension: string = resource.extension;
    const mimeType: string = resource.mimeType;
    const status: boolean = resource.status;

    // Grayscaling images of known supported ImageMagick types if the fetch was
    // successful.
    if (status === true) {
      switch (mimeType) {
        case 'image/png':
        case 'image/jpeg':
        case 'image/gif':
        case 'image/tiff':
        case 'image/webp':
        case 'image/avif':
        case 'image/svg+xml': {
          const grayscaledImageBuffer: Buffer = grayscaleImage(
            bytes,
            extension,
          );

          resource.update(grayscaledImageBuffer);

          break;
        }

        // @no-default
      }
    }
  }
}
