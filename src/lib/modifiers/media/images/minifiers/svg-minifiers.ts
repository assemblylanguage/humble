/**
 * Code for minifying SVG images.
 */

/* eslint-disable @typescript-eslint/no-var-requires */

const { optimize } = require('svgo');

/**
 * Minifies all inline `<svg>` elements throughout the document.
 *
 * @param document the document that will be modified in place.
 */
export async function minifyInlineSvgs(
  document: Document,
) : Promise<void> {
  // Getting all of the inline SVG elements.
  const svgElements: Element[] = [...document.getElementsByTagName('svg')];

  // For each inline SVG, create a new node with the minified SVG contents.
  for (const svgElement of svgElements) {
    // Getting the SVG and optimizing the SVG contents.
    const svgXml: string = svgElement.outerHTML;
    const minifiedSvgImage: any = optimize(svgXml);
    const minifiedSvgString: string = minifiedSvgImage.data;

    // Creating a new SVG with the minified SVG contents.
    const minifiedSvgElement: Element = document.createElement('svg');
    minifiedSvgElement.outerHTML = minifiedSvgString;

    // Replacing the unminified SVG node with the minified node.
    svgElement.replaceWith(minifiedSvgElement);
  }
}

/**
 * Minifies an SVG image and returns the minified SVG buffer.
 *
 * @param bytes a buffer containing an SVG image.
 */
export function minifySvg(
  bytes: Buffer,
) : Buffer {
  // Converting the SVG buffer into a string, a then optimizing it using the
  // SVGO library.
  const svgXml: string = bytes.toString();
  const minifiedSvgImage: string = optimize(svgXml).data;

  // Converting the optimized SVG into a buffer and returning it.
  const minifiedSvgBuffer: Buffer = Buffer.from(minifiedSvgImage);

  return minifiedSvgBuffer;
}
