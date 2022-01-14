"use strict";
/**
 * Code for minifying SVG images.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.minifySvg = exports.minifyInlineSvgs = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
const { optimize } = require('svgo');
/**
 * Minifies all inline `<svg>` elements throughout the document.
 *
 * @param document the document that will be modified in place.
 */
function minifyInlineSvgs(document) {
    return __awaiter(this, void 0, void 0, function* () {
        // Getting all of the inline SVG elements.
        const svgElements = [...document.getElementsByTagName('svg')];
        // For each inline SVG, create a new node with the minified SVG contents.
        for (const svgElement of svgElements) {
            // Getting the SVG and optimizing the SVG contents.
            const svgXml = svgElement.outerHTML;
            const minifiedSvgImage = optimize(svgXml);
            const minifiedSvgString = minifiedSvgImage.data;
            // Creating a new SVG with the minified SVG contents.
            const minifiedSvgElement = document.createElement('svg');
            minifiedSvgElement.outerHTML = minifiedSvgString;
            // Replacing the unminified SVG node with the minified node.
            svgElement.replaceWith(minifiedSvgElement);
        }
    });
}
exports.minifyInlineSvgs = minifyInlineSvgs;
/**
 * Minifies an SVG image and returns the minified SVG buffer.
 *
 * @param bytes a buffer containing an SVG image.
 */
function minifySvg(bytes) {
    // Converting the SVG buffer into a string, a then optimizing it using the
    // SVGO library.
    const svgXml = bytes.toString();
    const minifiedSvgImage = optimize(svgXml).data;
    // Converting the optimized SVG into a buffer and returning it.
    const minifiedSvgBuffer = Buffer.from(minifiedSvgImage);
    return minifiedSvgBuffer;
}
exports.minifySvg = minifySvg;
//# sourceMappingURL=svg-minifiers.js.map