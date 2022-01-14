/**
 * Code minifying various images formats. Currently supports these image
 * formats: PNG, JPEG, GIF, TIFF, WEBP.
 */

/* eslint-disable no-await-in-loop */

import { Resource, ResourceCache } from '../../../../resource';
import * as pngMinifiers from './png-minifiers';
import * as jpegMinifiers from './jpeg-minifiers';
import * as gifMinifiers from './gif-minifiers';
import * as tiffMinifiers from './tiff-minifiers';
import * as webpMinifiers from './webp-minifiers';
import * as svgMinifiers from './svg-minifiers';

/**
 * Minifies all images in the provided image cache using a series of image
 * minification and conversion algorithms. The algorithm used for conversions
 * and minifications is as follows. Note that among each image type, the
 * smallest image from the minifications will become the new image buffer for
 * the resource in the given URL.
 *
 * * PNG
 *   - PNG -> Optimized PNG (using Pngquant and Pngcrush)
 *   - PNG (no transparency) -> JPEG (default 40 quality)
 *   - PNG -> WEBP (default 20 quality)
 * * JPEG
 *   - JPEG -> JPEG (default 40 quality)
 *   - JPEG -> WEBP (default 20 quality)
 * * GIF
 *   - GIF -> Optimized GIF (using Gifsicle)
 *   - GIF -> JPEG (when the GIF has 1 frame, no transparency, default 40
 *     quality JPEG)
 *   - GIF -> WEBP (when the GIF has 1 frame, no transparency, default 40
 *     quality WEBP)
 * * TIFF
 *   - TIFF -> JPEG (default 40 quality)
 *   - TIFF -> WEBP (default 20 quality)
 * * WEBP
 *   - WEBP -> WEBP (default 20 quality)
 *
 * @command **`--minify-images`**
 *
 * @param document the document that will be modified in place.
 * @param imageCache a resource cache of images that will be minified.
 * @param options.jpegQuality the quality of the JPEG images from the
 * conversion.
 * @param options.allowWebp if true, allows the conversion of images to WEBP.
 * @param options.webpQuality the quality of the WEBP images from the
 * conversion.
 * @dependencies ImageMagick 6, Pngquant 2.12, Pngcrush 1.8, Gifsicle 1.9,
 * Gif2Webp 1.2.
 * @todo add AVIF support.
 * @todo add JXL support.
 */
export async function minifyImages(
  document: Document,
  imageCache: ResourceCache,
  jpegQuality: number,
  allowWebp: boolean,
  webpQuality: number,
) : Promise<void> {
  // Minifying the inline SVG images.
  svgMinifiers.minifyInlineSvgs(document);

  // Minifying all images in the image cache.
  for (const url in imageCache) {
    // Getting the resource, bytes, and MIME Type.
    const resource: Resource = imageCache[url];
    const bytes: Buffer = resource.bytes;
    const mimeType: string = resource.mimeType;

    // If the resource fetch was successful, performing the minification
    // depending on the MIME Type of the image, and then updating the
    // resource with the new image buffer if the new image buffer is
    // smaller than the original.
    if (resource.status === true) {
      switch (mimeType) {
        case 'image/png': {
          // Minifying the PNG image and updating the resource with the
          // minified bytes.
          const optimizedImageBytes: Buffer = await pngMinifiers.minifyPng(
            bytes,
            jpegQuality,
            allowWebp,
            webpQuality,
          );

          resource.update(optimizedImageBytes);

          break;
        }

        case 'image/jpeg': {
          // Minifying the JPEG image and updating the resource with the
          // minified bytes.
          const optimizedImageBytes: Buffer = await jpegMinifiers.minifyJpeg(
            bytes,
            jpegQuality,
            allowWebp,
            webpQuality,
          );

          resource.update(optimizedImageBytes);

          break;
        }

        case 'image/gif': {
          // Minifying the GIF image and updating the resource with the
          // minified bytes.
          const optimizedImageBytes: Buffer = await gifMinifiers.minifyGif(
            bytes,
            jpegQuality,
            allowWebp,
            webpQuality,
          );

          resource.update(optimizedImageBytes);

          break;
        }

        case 'image/tiff': {
          // Minifying the TIFF image and updating the resource with the
          // minified bytes.
          const optimizedImageBytes: Buffer = await tiffMinifiers.minifyTiff(
            bytes,
            jpegQuality,
            allowWebp,
            webpQuality,
          );

          resource.update(optimizedImageBytes);

          break;
        }

        case 'image/webp': {
          // Minifying the WEBP image and updating the resource with the
          // minified bytes.
          const optimizedImageBytes: Buffer = await webpMinifiers.minifyWebp(
            bytes,
            jpegQuality,
            allowWebp,
            webpQuality,
          );

          resource.update(optimizedImageBytes);

          break;
        }

        case 'image/svg+xml': {
          // Minifying the SVG image and updating the resource with the
          // minified bytes.
          const optimizedImageBytes: Buffer = svgMinifiers.minifySvg(bytes);
          resource.update(optimizedImageBytes);

          break;
        }

        // @no-default
      }
    }
  }
}
