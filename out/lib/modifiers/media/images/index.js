"use strict";
/**
 * Importing and re-exporting the image modifier code.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertImagesToSupportedImageFormats = exports.grayscaleImages = exports.removeTrackingPixels = exports.minifyImages = void 0;
const image_minifier_1 = require("./minifiers/image-minifier");
Object.defineProperty(exports, "minifyImages", { enumerable: true, get: function () { return image_minifier_1.minifyImages; } });
const remove_tracking_pixels_1 = require("./removers/remove-tracking-pixels");
Object.defineProperty(exports, "removeTrackingPixels", { enumerable: true, get: function () { return remove_tracking_pixels_1.removeTrackingPixels; } });
const image_grayscaler_1 = require("./modifiers/image-grayscaler");
Object.defineProperty(exports, "grayscaleImages", { enumerable: true, get: function () { return image_grayscaler_1.grayscaleImages; } });
const supported_image_type_converter_1 = require("./modifiers/supported-image-type-converter");
Object.defineProperty(exports, "convertImagesToSupportedImageFormats", { enumerable: true, get: function () { return supported_image_type_converter_1.convertImagesToSupportedImageFormats; } });
//# sourceMappingURL=index.js.map