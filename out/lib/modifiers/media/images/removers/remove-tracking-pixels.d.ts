/**
 * Code for detecting tracking pixels in a resource cache and removing them to
 * reduce document size.
 */
import { ResourceCache } from '../../../../resource';
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
export declare function removeTrackingPixels(imageCache: ResourceCache): Promise<void>;
//# sourceMappingURL=remove-tracking-pixels.d.ts.map