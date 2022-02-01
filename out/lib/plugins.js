"use strict";
/**
 * Contains all of the base wrapper plugins available by default in Humble,
 * as well as plugin builders for building pipelines of plugins at various
 * stages of the archiving process.
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
exports.buildFinalHtmlCreationPluginPipeline = exports.buildFinalDocumentCreationPluginPipeline = exports.buildFinalInlineModificationsPluginPipeline = exports.buildResourceModificationsPluginPipeline = exports.buildPostCssInlineRemovalsPluginPipeline = exports.buildPreCssInlineRemovalsPluginPipeline = exports.buildAfterInitialFetchPluginPipeline = void 0;
/* eslint-disable no-param-reassign */
const classIdMinifier = require("@assemblylanguage/class-id-minifier");
const sourceCodeMinifier = require("@assemblylanguage/source-code-minifier");
const contentSecurityPolicy = require("@assemblylanguage/content-security-policy");
const grayscaleCss = require("@assemblylanguage/grayscale-css");
const resource_1 = require("./resource");
const documentModifiers = require("./modifiers/document/index");
const imageModifiers = require("./modifiers/media/images/index");
const audioModifiers = require("./modifiers/media/audio/index");
const videoModifiers = require("./modifiers/media/video/index");
const fontModifiers = require("./modifiers/media/fonts/index");
const generalMediaModifiers = require("./modifiers/media/general/index");
const injectors = require("./injectors/index");
/**
 * A plugin wrapper for the `removeStylesTags` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeStylesTagsPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeStylesTags(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeAlternativeStylesTags` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeAlternativeStylesTagsPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeAlternativeStylesTags(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeInlineStyles` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeInlineStylesPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeInlineStyles(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeStyles` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeStylesPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeStyles(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeScriptTags` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeScriptTagsPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeScriptTags(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeNoscriptTags` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeNoscriptTagsPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeNoscriptTags(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeInlineScripts` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeInlineScriptsPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeInlineScripts(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeHrefScripts` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeHrefScriptsPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeHrefScripts(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeScripts` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeScriptsPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeScripts(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeImageSrcs` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeImageSrcsPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeImageSrcs(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeImageSrcsets` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeImageSrcsetsPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeImageSrcsets(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeImageAlts` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeImageAltsPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeImageAlts(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeImageAttributes` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeImageAttributesPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeImageAttributes(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeCssImages` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeCssImagesPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeCssImages(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeImages` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeImagesPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeImages(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeFrames` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeFramesPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeFrames(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeVideoSrcs` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeVideoSrcsPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeVideoSrcs(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeVideos` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeVideosPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeVideos(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeAudioSrcs` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeAudioSrcsPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeAudioSrcs(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeAudio` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeAudioPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeAudio(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeFonts` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeFontsPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeFonts(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeCursors` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeCursorsPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeCursors(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeFavicons` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeFaviconsPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeFavicons(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeCanvas` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeCanvasPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeCanvas(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeConditionalComments` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeConditionalCommentsPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeConditionalComments(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeNonConditionalComments` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeNonConditionalCommentsPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeNonConditionalComments(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeComments` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeCommentsPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeComments(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeForms` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeFormsPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeForms(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeFormAttributes` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeFormAttributesPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeFormAttributes(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeFormTagsOnly` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeFormTagsOnlyPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeFormTagsOnly(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeNonDisplayMetaTags` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeNonDisplayMetaTagsPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeNonDisplayMetaTags(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeNonDisplayLinkTags` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeNonDisplayLinkTagsPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeNonDisplayLinkTags(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeMetaRefreshTag` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeMetaRefreshTagPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeMetaRefreshTag(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeNonInlineAnchorHrefs` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeNonInlineAnchorHrefsPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeNonInlineAnchorHrefs(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeAnchorHrefs` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeAnchorHrefsPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeAnchorHrefs(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeDefaultAttributes` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeDefaultAttributesPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeDefaultAttributes(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeAriaAttributes` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeAriaAttributesPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeAriaAttributes(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeDataAttributes` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeDataAttributesPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeDataAttributes(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeIntegrityCheckAttributes` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeIntegrityCheckAttributesPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeIntegrityCheckAttributes(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeEmptyNonDisplayElements` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeEmptyNonDisplayElementsPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeEmptyNonDisplayElements(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeTrackingPixels` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeTrackingPixelsPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        const imageCache = humble.createSubCache(resource_1.ResourceType.IMAGE);
        yield imageModifiers.removeTrackingPixels(imageCache);
    });
}
/**
 * A plugin wrapper for the `removeHiddenElementsAndCss` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeHiddenElementsAndCssPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeHiddenElementsAndCss(humble.document);
    });
}
/**
 * A plugin wrapper for the `removeCustomTagsByName` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeCustomTagsByNamePlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        let customTagNames;
        // If a pipe-separated string was passed, constructing an array from the
        // pipe-separated string. Else, using the string array as is.
        if (typeof humble.options.removeCustomTagsByName === 'string') {
            customTagNames = humble.options.removeCustomTagsByName.split('|');
        }
        else {
            customTagNames = humble.options.removeCustomTagsByName;
        }
        yield documentModifiers.removeCustomTagsByName(humble.document, customTagNames);
    });
}
/**
 * A plugin wrapper for the `removeCustomTagsByCssSelector` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeCustomTagsByCssSelectorPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        let customCssSelectors;
        // If a pipe-separated string was passed, constructing an array from the
        // pipe-separated string. Else, using the string array as is.
        if (typeof humble.options.removeCustomTagsByCssSelector === 'string') {
            customCssSelectors = humble.options.removeCustomTagsByCssSelector
                .split('|');
        }
        else {
            customCssSelectors = humble.options.removeCustomTagsByCssSelector;
        }
        yield documentModifiers.removeCustomTagsByCssSelector(humble.document, customCssSelectors);
    });
}
/**
 * A plugin wrapper for the `removeUnusedCss` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeUnusedCssPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.removeUnusedCss(humble.document);
    });
}
/**
 * A plugin wrapper for the `collapseEmptyAttributes` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function collapseEmptyAttributesPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.collapseEmptyAttributes(humble.document.documentElement.outerHTML);
    });
}
/**
 * A plugin wrapper for the `beautifyHtml` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function beautifyHtmlPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        humble.html = yield documentModifiers.beautifyHtml(humble.html, humble.options.beautifyHtmlOptions);
    });
}
/**
 * A plugin wrapper for the `beautifyCss` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function beautifyCssPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.beautifyCss(humble.document, humble.options.beautifyCssOptions);
    });
}
/**
 * A plugin wrapper for the `beautifyJs` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function beautifyJsPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.beautifyJs(humble.document, humble.options.beautifyJsOptions);
    });
}
/**
 * A plugin wrapper for the `transpileEs6ToEs5` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function transpileEs6ToEs5Plugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield documentModifiers.transpileEs6ToEs5(humble.document, humble.options.transpileEs6ToEs5Options);
    });
}
/**
 * A plugin wrapper for the `convertImagesToSupportedImageFormats` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function convertImagesToSupportedImageFormatsPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        const imageCache = humble.createSubCache(resource_1.ResourceType.IMAGE);
        yield imageModifiers.convertImagesToSupportedImageFormats(humble.document, imageCache);
    });
}
/**
 * A plugin wrapper for the `minifyImages` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function minifyImagesPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        const imageCache = humble.createSubCache(resource_1.ResourceType.IMAGE);
        yield imageModifiers.minifyImages(humble.document, imageCache, humble.options.jpegQuality, humble.options.allowWebp, humble.options.webpQuality);
    });
}
/**
 * A plugin wrapper for the `minifyAudio` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function minifyAudioPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        const audioCache = humble.createSubCache(resource_1.ResourceType.AUDIO);
        yield audioModifiers.minifyAudio(audioCache);
    });
}
/**
 * A plugin wrapper for the `minifyVideos` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function minifyVideosPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        const videoCache = humble.createSubCache(resource_1.ResourceType.VIDEO);
        yield videoModifiers.minifyVideos(videoCache);
    });
}
/**
 * A plugin wrapper for the `minifyFonts` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function minifyFontsPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        const fontCache = humble.createSubCache(resource_1.ResourceType.FONT);
        yield fontModifiers.minifyFonts(humble.document, fontCache);
    });
}
/**
 * A plugin wrapper for the `removeMetadataFromResourceCache` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function removeMetadataFromResourceCachePlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield generalMediaModifiers.removeMetadataFromResourceCache(humble.resourceCache, humble.options.keepResourceIfLarger);
    });
}
/**
 * A plugin wrapper for the `grayscaleImages` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function grayscaleImagesPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        const imageCache = humble.createSubCache(resource_1.ResourceType.IMAGE);
        yield imageModifiers.grayscaleImages(humble.document, imageCache);
    });
}
/**
 * A plugin wrapper for the `grayscaleVideos` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function grayscaleVideosPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        const videoCache = humble.createSubCache(resource_1.ResourceType.VIDEO);
        yield videoModifiers.grayscaleVideos(videoCache);
    });
}
/**
 * A plugin wrapper for the `grayscale` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function grayscalePlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield grayscaleCss.plugins.grayscaleCssPlugin(humble);
        yield grayscaleImagesPlugin(humble);
        yield grayscaleVideosPlugin(humble);
    });
}
/**
 * A plugin wrapper for the `readabilityMode` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function readabilityModePlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        const readabilityDocument = documentModifiers.readabilityMode(humble.document);
        humble.document = readabilityDocument;
    });
}
/**
 * A plugin wrapper for the `purifyHtml` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function domPurifyPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        const sanitizedHtml = documentModifiers.purifyHtml(humble.html);
        humble.html = sanitizedHtml;
    });
}
/**
 * A plugin wrapper for the `injectCustomStyleSheet` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function injectCustomStyleSheetPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield injectors.injectCustomStyleSheet(humble.options.injectCustomStyleSheet, humble.document, {
            socksProxy: humble.options.socksProxy,
        });
    });
}
/**
 * A plugin wrapper for the `injectHtml5Polyfill` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function injectHtml5PolyfillPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield injectors.injectHtml5Polyfill(humble.document);
    });
}
/**
 * A plugin wrapper for the `injectCssFlexboxPolyfill` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function injectCssFlexboxPolyfillPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield injectors.injectCssFlexboxPolyfill(humble.document);
    });
}
/**
 * A plugin wrapper for the `injectMediaQueryPolyfill` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function injectMediaQueryPolyfillPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield injectors.injectMediaQueryPolyfill(humble.document);
    });
}
/**
 * A plugin wrapper for the `injectCanvasPolyfill` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function injectCanvasPolyfillPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield injectors.injectCanvasPolyfill(humble.document);
    });
}
/**
 * A plugin wrapper for the `injectHtml5MediaPolyfill` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function injectHtml5MediaPolyfillPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield injectors.injectHtml5MediaPolyfill(humble.document);
    });
}
/**
 * A plugin wrapper for the `injectEs5Polyfill` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function injectEs5PolyfillPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield injectors.injectEs5Polyfill(humble.document);
    });
}
/**
 * A plugin wrapper for the `injectFlashPlayer` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function injectFlashPlayerPlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield injectors.injectFlashPlayer(humble.document);
    });
}
/**
 * A plugin wrapper for the `injectCompiledPage` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
function injectCompiledPagePlugin(humble) {
    return __awaiter(this, void 0, void 0, function* () {
        yield injectors.injectCompiledPage(humble.document, humble.options.minifyHtml, humble.options.minifyHtmlOptions, humble.options.minifyJs, humble.options.minifyJsOptions);
    });
}
/**
 * Builds a pipeline of plugins that will run during the
 * `PreCssInlineRemovals` stage of the archiving process.
 *
 * @param humble a Humble object.
 */
function buildAfterInitialFetchPluginPipeline(humble) {
    const plugins = [];
    // Running the DOM purify plugin.
    if (humble.options.domPurify) {
        plugins.push(domPurifyPlugin);
    }
    return plugins;
}
exports.buildAfterInitialFetchPluginPipeline = buildAfterInitialFetchPluginPipeline;
/**
 * Builds a pipeline of plugins that will run during the
 * `PreCssInlineRemovals` stage of the archiving process.
 *
 * @param humble a Humble object.
 */
function buildPreCssInlineRemovalsPluginPipeline(humble) {
    const plugins = [];
    // Running the readability mode plugin.
    if (humble.options.readabilityMode) {
        plugins.push(readabilityModePlugin);
    }
    // Running the style removers if specified in the options.
    if (humble.options.removeStylesTags) {
        plugins.push(removeStylesTagsPlugin);
    }
    if (humble.options.removeAlternativeStylesTags) {
        plugins.push(removeAlternativeStylesTagsPlugin);
    }
    if (humble.options.removeInlineStyles) {
        plugins.push(removeInlineStylesPlugin);
    }
    if (humble.options.removeStyles) {
        plugins.push(removeStylesPlugin);
    }
    // Running the script removers if specified in the options.
    if (humble.options.removeScriptTags) {
        plugins.push(removeScriptTagsPlugin);
    }
    if (humble.options.removeNoscriptTags) {
        plugins.push(removeNoscriptTagsPlugin);
    }
    if (humble.options.removeInlineScripts) {
        plugins.push(removeInlineScriptsPlugin);
    }
    if (humble.options.removeHrefScripts) {
        plugins.push(removeHrefScriptsPlugin);
    }
    if (humble.options.removeScripts) {
        plugins.push(removeScriptsPlugin);
    }
    // Running the image removers if specified in the options.
    if (humble.options.removeImageSrcs) {
        plugins.push(removeImageSrcsPlugin);
    }
    if (humble.options.removeImageSrcsets) {
        plugins.push(removeImageSrcsetsPlugin);
    }
    if (humble.options.removeImageAlts) {
        plugins.push(removeImageAltsPlugin);
    }
    if (humble.options.removeImageAttributes) {
        plugins.push(removeImageAttributesPlugin);
    }
    // Running the frame removers if specified in the options.
    if (humble.options.removeFrames) {
        plugins.push(removeFramesPlugin);
    }
    // Running the video removers if specified in the options.
    if (humble.options.removeVideoSrcs) {
        plugins.push(removeVideoSrcsPlugin);
    }
    if (humble.options.removeVideos) {
        plugins.push(removeVideosPlugin);
    }
    // Running the audio removers if specified in the options.
    if (humble.options.removeAudioSrcs) {
        plugins.push(removeAudioSrcsPlugin);
    }
    if (humble.options.removeAudio) {
        plugins.push(removeAudioPlugin);
    }
    // Running the favicon removers if specified in the options.
    if (humble.options.removeFavicons) {
        plugins.push(removeFaviconsPlugin);
    }
    // Running the canvas removers if specified in the options.
    if (humble.options.removeCanvas) {
        plugins.push(removeCanvasPlugin);
    }
    // Running the comments removers if specified in the options.
    if (humble.options.removeConditionalComments) {
        plugins.push(removeConditionalCommentsPlugin);
    }
    if (humble.options.removeNonConditionalComments) {
        plugins.push(removeNonConditionalCommentsPlugin);
    }
    if (humble.options.removeComments) {
        plugins.push(removeCommentsPlugin);
    }
    // Running the form removers if specified in the options.
    if (humble.options.removeForms) {
        plugins.push(removeFormsPlugin);
    }
    if (humble.options.removeFormAttributes) {
        plugins.push(removeFormAttributesPlugin);
    }
    if (humble.options.removeFormTagsOnly) {
        plugins.push(removeFormTagsOnlyPlugin);
    }
    // Running the meta and link tag removers if specified in the options.
    if (humble.options.removeNonDisplayMetaTags) {
        plugins.push(removeNonDisplayMetaTagsPlugin);
    }
    if (humble.options.removeNonDisplayLinkTags) {
        plugins.push(removeNonDisplayLinkTagsPlugin);
    }
    if (humble.options.removeMetaRefreshTag) {
        plugins.push(removeMetaRefreshTagPlugin);
    }
    // Running the anchor link removers if specified in the options.
    if (humble.options.removeNonInlineAnchorHrefs) {
        plugins.push(removeNonInlineAnchorHrefsPlugin);
    }
    if (humble.options.removeAnchorHrefs) {
        plugins.push(removeAnchorHrefsPlugin);
    }
    // Running the general attribute removers if specified in the options.
    if (humble.options.removeDefaultAttributes) {
        plugins.push(removeDefaultAttributesPlugin);
    }
    if (humble.options.removeAriaAttributes) {
        plugins.push(removeAriaAttributesPlugin);
    }
    if (humble.options.removeDataAttributes) {
        plugins.push(removeDataAttributesPlugin);
    }
    if (humble.options.removeIntegrityCheckAttributes) {
        plugins.push(removeIntegrityCheckAttributesPlugin);
    }
    if (humble.options.removeEmptyNonDisplayElements) {
        plugins.push(removeEmptyNonDisplayElementsPlugin);
    }
    // Running the custom tag and selector removers if specified in the options.
    if (humble.options.removeCustomTagsByName) {
        plugins.push(removeCustomTagsByNamePlugin);
    }
    if (humble.options.removeCustomTagsByCssSelector) {
        plugins.push(removeCustomTagsByCssSelectorPlugin);
    }
    return plugins;
}
exports.buildPreCssInlineRemovalsPluginPipeline = buildPreCssInlineRemovalsPluginPipeline;
/**
 * Builds a pipeline of plugins that will run during the
 * `PostCssInlineRemovals` stage of the archiving process.
 *
 * @param humble a Humble object.
 */
function buildPostCssInlineRemovalsPluginPipeline(humble) {
    const plugins = [];
    // Removing images in the CSS stylesheets.
    if (humble.options.removeCssImages) {
        plugins.push(removeCssImagesPlugin);
    }
    if (humble.options.removeImages) {
        plugins.push(removeImagesPlugin);
    }
    // Removing fonts from the document.
    if (humble.options.removeFonts) {
        plugins.push(removeFontsPlugin);
    }
    // Removing cursors from the document.
    if (humble.options.removeCursors) {
        plugins.push(removeCursorsPlugin);
    }
    // Removing any hidden elements from the document.
    if (humble.options.removeHiddenElements) {
        plugins.push(removeHiddenElementsAndCssPlugin);
    }
    return plugins;
}
exports.buildPostCssInlineRemovalsPluginPipeline = buildPostCssInlineRemovalsPluginPipeline;
/**
 * Builds a pipeline of plugins that will run during the
 * `ResourceModifications` stage of the archiving process.
 *
 * @param humble a Humble object.
 */
function buildResourceModificationsPluginPipeline(humble) {
    const plugins = [];
    // Removing any images considered as tracking pixels.
    if (humble.options.removeTrackingPixels) {
        plugins.push(removeTrackingPixelsPlugin);
    }
    // Converting images to supported image formats
    if (humble.options.convertImagesToSupportedImageFormats) {
        plugins.push(convertImagesToSupportedImageFormatsPlugin);
    }
    // Minifying images in the image cache.
    if (humble.options.minifyImages) {
        plugins.push(minifyImagesPlugin);
    }
    // Minifying audio in the audio cache.
    if (humble.options.minifyAudio) {
        plugins.push(minifyAudioPlugin);
    }
    // Minifying videos in the video cache.
    if (humble.options.minifyVideos) {
        plugins.push(minifyVideosPlugin);
    }
    // Minifying fonts in the font cache.
    if (humble.options.minifyFonts) {
        plugins.push(minifyFontsPlugin);
    }
    // Remove metadata from resources in the resource cache.
    if (humble.options.removeResourceMetadata) {
        plugins.push(removeMetadataFromResourceCachePlugin);
    }
    // Grayscaling CSS, images, and videos.
    if (humble.options.grayscaleCss) {
        plugins.push(grayscaleCssPlugin);
    }
    if (humble.options.grayscaleImages) {
        plugins.push(grayscaleImagesPlugin);
    }
    if (humble.options.grayscaleVideos) {
        plugins.push(grayscaleVideosPlugin);
    }
    if (humble.options.grayscale) {
        plugins.push(grayscalePlugin);
    }
    return plugins;
}
exports.buildResourceModificationsPluginPipeline = buildResourceModificationsPluginPipeline;
/**
 * Builds a pipeline of plugins that will run during the
 * `FinalInlineModifications` stage of the archiving process.
 *
 * @param humble a Humble object.
 */
function buildFinalInlineModificationsPluginPipeline(humble) {
    const plugins = [];
    // Minifying tag names of generic elements.
    if (humble.options.minifyGenericTagNames) {
        plugins.push(sourceCodeMinifier.plugins.minifyGenericTagNamesPlugin);
    }
    // Injects a custom CSS style sheet into the page.
    if (humble.options.injectCustomStyleSheet) {
        plugins.push(injectCustomStyleSheetPlugin);
    }
    // Injects an HTML5 polyfill into the page.
    if (humble.options.injectHtml5Polyfill) {
        plugins.push(injectHtml5PolyfillPlugin);
    }
    // Injects an HTML5 polyfill into the page.
    if (humble.options.injectHtml5Polyfill) {
        plugins.push(injectHtml5PolyfillPlugin);
    }
    // Injects a CSS Flexbox polyfill into the page.
    if (humble.options.injectCssFlexboxPolyfill) {
        plugins.push(injectCssFlexboxPolyfillPlugin);
    }
    // Injects a media query polyfill into the HTML page.
    if (humble.options.injectMediaQueryPolyfill) {
        plugins.push(injectMediaQueryPolyfillPlugin);
    }
    // Injects a `<video>` and `<audio>` tag polyfill into the HTML page.
    if (humble.options.injectHtml5MediaPolyfill) {
        plugins.push(injectHtml5MediaPolyfillPlugin);
    }
    // Injects a `<canvas>` tag polyfill into the HTML page.
    if (humble.options.injectCanvasPolyfill) {
        plugins.push(injectCanvasPolyfillPlugin);
    }
    // Injects an ES5 shim polyfill into the HTML page.
    if (humble.options.injectEs5Polyfill) {
        plugins.push(injectEs5PolyfillPlugin);
    }
    // Injects an ES3 shim polyfill into the page.
    if (humble.options.injectFlashPlayer) {
        plugins.push(injectFlashPlayerPlugin);
    }
    // Remove unused CSS code.
    if (humble.options.removeUnusedCss) {
        plugins.push(removeUnusedCssPlugin);
    }
    // Collapse empty HTML attributes.
    if (humble.options.collapseEmptyAttributes) {
        plugins.push(collapseEmptyAttributesPlugin);
    }
    // Minifying CSS class names.
    if (humble.options.minifyClassNames) {
        plugins.push(classIdMinifier.plugins.minifyClassNamesPlugin);
    }
    // Minifying CSS IDs.
    if (humble.options.minifyIDs) {
        plugins.push(classIdMinifier.plugins.minifyIDsPlugin);
    }
    // Minifying CSS class names and IDs to attributes.
    if (humble.options.minifyClassNamesAndIDsToAttributes) {
        plugins.push(classIdMinifier.plugins.minifyClassNamesAndIDsToAttributesPlugin);
    }
    // Minifying CSS code.
    if (humble.options.minifyCss) {
        plugins.push(sourceCodeMinifier.plugins.minifyCssPlugin);
    }
    // Beautifying CSS code.
    if (humble.options.beautifyCss) {
        plugins.push(beautifyCssPlugin);
    }
    // Transpiling JS code to ES5 syntax.
    if (humble.options.transpileEs6ToEs5) {
        plugins.push(transpileEs6ToEs5Plugin);
    }
    // Minifying JS code.
    if (humble.options.minifyJs) {
        plugins.push(sourceCodeMinifier.plugins.minifyJsPlugin);
    }
    // Minifying JS code.
    if (humble.options.beautifyJs) {
        plugins.push(beautifyJsPlugin);
    }
    return plugins;
}
exports.buildFinalInlineModificationsPluginPipeline = buildFinalInlineModificationsPluginPipeline;
/**
 * Builds a pipeline of plugins that will run during the
 * `FinalDocumentCreation` stage of the archiving process.
 *
 * @param humble a Humble object.
 */
function buildFinalDocumentCreationPluginPipeline(humble) {
    const plugins = [];
    // Adding Content-Security-Policies to the page to block the loading or
    // executing of page resources.
    if (humble.options.addStyleCSP) {
        plugins.push(contentSecurityPolicy.plugins.addStyleCSPPlugin);
    }
    if (humble.options.addScriptCSP) {
        plugins.push(contentSecurityPolicy.plugins.addScriptCSPPlugin);
    }
    if (humble.options.addImageCSP) {
        plugins.push(contentSecurityPolicy.plugins.addImageCSPPlugin);
    }
    if (humble.options.addFrameCSP) {
        plugins.push(contentSecurityPolicy.plugins.addFrameCSPPlugin);
    }
    if (humble.options.addVideoCSP) {
        plugins.push(contentSecurityPolicy.plugins.addVideoCSPPlugin);
    }
    if (humble.options.addAudioCSP) {
        plugins.push(contentSecurityPolicy.plugins.addAudioCSPPlugin);
    }
    if (humble.options.addFontCSP) {
        plugins.push(contentSecurityPolicy.plugins.addFontCSPPlugin);
    }
    // Injecting a compiled page into the document.
    if (humble.options.injectCompiledPage) {
        plugins.push(injectCompiledPagePlugin);
    }
    return plugins;
}
exports.buildFinalDocumentCreationPluginPipeline = buildFinalDocumentCreationPluginPipeline;
/**
 * Builds a pipeline of plugins that will run during the
 * `FinalHtmlCreation` stage of the archiving process.
 *
 * @param humble a Humble object.
 */
function buildFinalHtmlCreationPluginPipeline(humble) {
    const plugins = [];
    // Minifying the page HTML.
    if (humble.options.minifyHtml) {
        plugins.push(sourceCodeMinifier.plugins.minifyHtmlPlugin);
    }
    // Beautifying the page HTML.
    if (humble.options.beautifyHtml) {
        plugins.push(beautifyHtmlPlugin);
    }
    return plugins;
}
exports.buildFinalHtmlCreationPluginPipeline = buildFinalHtmlCreationPluginPipeline;
//# sourceMappingURL=plugins.js.map