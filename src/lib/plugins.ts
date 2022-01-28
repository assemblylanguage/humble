/**
 * Contains all of the base wrapper plugins available by default in Humble,
 * as well as plugin builders for building pipelines of plugins at various
 * stages of the archiving process.
 */

/* eslint-disable no-param-reassign */

import * as classIdMinifier from '@assemblylanguage/class-id-minifier';
import * as sourceCodeMinifier from '@assemblylanguage/source-code-minifier';
import * as contentSecurityPolicy from '@assemblylanguage/content-security-policy';
import * as grayscaleCss from '@assemblylanguage/grayscale-css';
import { Humble } from './humble';
import { HumblePlugin } from './options/humble-options';
import { ResourceCache, ResourceType } from './resource';
import * as documentModifiers from './modifiers/document/index';
import * as imageModifiers from './modifiers/media/images/index';
import * as audioModifiers from './modifiers/media/audio/index';
import * as videoModifiers from './modifiers/media/video/index';
import * as fontModifiers from './modifiers/media/fonts/index';
import * as generalMediaModifiers from './modifiers/media/general/index';
import * as injectors from './injectors/index';

/**
 * A plugin wrapper for the `removeStylesTags` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeStylesTagsPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeStylesTags(humble.document);
}

/**
 * A plugin wrapper for the `removeAlternativeStylesTags` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeAlternativeStylesTagsPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeAlternativeStylesTags(humble.document);
}

/**
 * A plugin wrapper for the `removeInlineStyles` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeInlineStylesPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeInlineStyles(humble.document);
}

/**
 * A plugin wrapper for the `removeStyles` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeStylesPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeStyles(humble.document);
}

/**
 * A plugin wrapper for the `removeScriptTags` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeScriptTagsPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeScriptTags(humble.document);
}

/**
 * A plugin wrapper for the `removeNoscriptTags` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeNoscriptTagsPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeNoscriptTags(humble.document);
}

/**
 * A plugin wrapper for the `removeInlineScripts` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeInlineScriptsPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeInlineScripts(humble.document);
}

/**
 * A plugin wrapper for the `removeHrefScripts` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeHrefScriptsPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeHrefScripts(humble.document);
}

/**
 * A plugin wrapper for the `removeScripts` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeScriptsPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeScripts(humble.document);
}

/**
 * A plugin wrapper for the `removeImageSrcs` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeImageSrcsPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeImageSrcs(humble.document);
}

/**
 * A plugin wrapper for the `removeImageSrcsets` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeImageSrcsetsPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeImageSrcsets(humble.document);
}

/**
 * A plugin wrapper for the `removeImageAlts` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeImageAltsPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeImageAlts(humble.document);
}

/**
 * A plugin wrapper for the `removeImageAttributes` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeImageAttributesPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeImageAttributes(humble.document);
}

/**
 * A plugin wrapper for the `removeCssImages` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeCssImagesPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeCssImages(humble.document);
}

/**
 * A plugin wrapper for the `removeImages` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeImagesPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeImages(humble.document);
}

/**
 * A plugin wrapper for the `removeFrames` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeFramesPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeFrames(humble.document);
}

/**
 * A plugin wrapper for the `removeVideoSrcs` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeVideoSrcsPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeVideoSrcs(humble.document);
}

/**
 * A plugin wrapper for the `removeVideos` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeVideosPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeVideos(humble.document);
}

/**
 * A plugin wrapper for the `removeAudioSrcs` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeAudioSrcsPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeAudioSrcs(humble.document);
}

/**
 * A plugin wrapper for the `removeAudio` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeAudioPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeAudio(humble.document);
}

/**
 * A plugin wrapper for the `removeFonts` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeFontsPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeFonts(humble.document);
}

/**
 * A plugin wrapper for the `removeCursors` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeCursorsPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeCursors(humble.document);
}

/**
 * A plugin wrapper for the `removeFavicons` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeFaviconsPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeFavicons(humble.document);
}

/**
 * A plugin wrapper for the `removeCanvas` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeCanvasPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeCanvas(humble.document);
}

/**
 * A plugin wrapper for the `removeConditionalComments` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeConditionalCommentsPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeConditionalComments(humble.document);
}

/**
 * A plugin wrapper for the `removeNonConditionalComments` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeNonConditionalCommentsPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeNonConditionalComments(humble.document);
}

/**
 * A plugin wrapper for the `removeComments` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeCommentsPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeComments(humble.document);
}

/**
 * A plugin wrapper for the `removeForms` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeFormsPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeForms(humble.document);
}

/**
 * A plugin wrapper for the `removeFormAttributes` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeFormAttributesPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeFormAttributes(humble.document);
}

/**
 * A plugin wrapper for the `removeFormTagsOnly` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeFormTagsOnlyPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeFormTagsOnly(humble.document);
}

/**
 * A plugin wrapper for the `removeNonDisplayMetaTags` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeNonDisplayMetaTagsPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeNonDisplayMetaTags(humble.document);
}

/**
 * A plugin wrapper for the `removeNonDisplayLinkTags` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeNonDisplayLinkTagsPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeNonDisplayLinkTags(humble.document);
}

/**
 * A plugin wrapper for the `removeMetaRefreshTag` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeMetaRefreshTagPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeMetaRefreshTag(humble.document);
}

/**
 * A plugin wrapper for the `removeNonInlineAnchorHrefs` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeNonInlineAnchorHrefsPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeNonInlineAnchorHrefs(humble.document);
}

/**
 * A plugin wrapper for the `removeAnchorHrefs` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeAnchorHrefsPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeAnchorHrefs(humble.document);
}

/**
 * A plugin wrapper for the `removeDefaultAttributes` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeDefaultAttributesPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeDefaultAttributes(humble.document);
}

/**
 * A plugin wrapper for the `removeAriaAttributes` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeAriaAttributesPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeAriaAttributes(humble.document);
}

/**
 * A plugin wrapper for the `removeDataAttributes` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeDataAttributesPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeDataAttributes(humble.document);
}

/**
 * A plugin wrapper for the `removeIntegrityCheckAttributes` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeIntegrityCheckAttributesPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeIntegrityCheckAttributes(humble.document);
}

/**
 * A plugin wrapper for the `removeEmptyNonDisplayElements` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeEmptyNonDisplayElementsPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeEmptyNonDisplayElements(humble.document);
}

/**
 * A plugin wrapper for the `removeTrackingPixels` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeTrackingPixelsPlugin(
  humble: Humble,
) : Promise<void> {
  const imageCache: ResourceCache = humble.createSubCache(
    ResourceType.IMAGE,
  );

  await imageModifiers.removeTrackingPixels(imageCache);
}

/**
 * A plugin wrapper for the `removeHiddenElementsAndCss` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeHiddenElementsAndCssPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeHiddenElementsAndCss(humble.document);
}

/**
 * A plugin wrapper for the `removeCustomTagsByName` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeCustomTagsByNamePlugin(
  humble: Humble,
) : Promise<void> {
  let customTagNames: string[];

  // If a pipe-separated string was passed, constructing an array from the
  // pipe-separated string. Else, using the string array as is.
  if (typeof humble.options.removeCustomTagsByName === 'string') {
    customTagNames = humble.options.removeCustomTagsByName.split('|');
  } else {
    customTagNames = humble.options.removeCustomTagsByName;
  }

  await documentModifiers.removeCustomTagsByName(
    humble.document,
    customTagNames,
  );
}

/**
 * A plugin wrapper for the `removeCustomTagsByCssSelector` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeCustomTagsByCssSelectorPlugin(
  humble: Humble,
) : Promise<void> {
  let customCssSelectors: string[];

  // If a pipe-separated string was passed, constructing an array from the
  // pipe-separated string. Else, using the string array as is.
  if (typeof humble.options.removeCustomTagsByCssSelector === 'string') {
    customCssSelectors = humble.options.removeCustomTagsByCssSelector
      .split('|');
  } else {
    customCssSelectors = humble.options.removeCustomTagsByCssSelector;
  }

  await documentModifiers.removeCustomTagsByCssSelector(
    humble.document,
    customCssSelectors,
  );
}

/**
 * A plugin wrapper for the `removeUnusedCss` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeUnusedCssPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.removeUnusedCss(humble.document);
}

/**
 * A plugin wrapper for the `collapseEmptyAttributes` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function collapseEmptyAttributesPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.collapseEmptyAttributes(
    humble.document.documentElement.outerHTML,
  );
}

/**
 * A plugin wrapper for the `beautifyHtml` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function beautifyHtmlPlugin(
  humble: Humble,
) : Promise<void> {
  humble.html = await documentModifiers.beautifyHtml(
    humble.html,
    humble.options.beautifyHtmlOptions,
  );
}

/**
 * A plugin wrapper for the `beautifyCss` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function beautifyCssPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.beautifyCss(
    humble.document,
    humble.options.beautifyCssOptions,
  );
}

/**
 * A plugin wrapper for the `beautifyJs` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function beautifyJsPlugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.beautifyJs(
    humble.document,
    humble.options.beautifyJsOptions,
  );
}

/**
 * A plugin wrapper for the `transpileEs6ToEs5` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function transpileEs6ToEs5Plugin(
  humble: Humble,
) : Promise<void> {
  await documentModifiers.transpileEs6ToEs5(
    humble.document,
    humble.options.transpileEs6ToEs5Options,
  );
}

/**
 * A plugin wrapper for the `convertImagesToSupportedImageFormats` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function convertImagesToSupportedImageFormatsPlugin(
  humble: Humble,
) : Promise<void> {
  const imageCache: ResourceCache = humble.createSubCache(
    ResourceType.IMAGE,
  );

  await imageModifiers.convertImagesToSupportedImageFormats(
    humble.document,
    imageCache,
  );
}

/**
 * A plugin wrapper for the `minifyImages` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function minifyImagesPlugin(
  humble: Humble,
) : Promise<void> {
  const imageCache: ResourceCache = humble.createSubCache(
    ResourceType.IMAGE,
  );

  await imageModifiers.minifyImages(
    humble.document,
    imageCache,
    humble.options.jpegQuality,
    humble.options.allowWebp,
    humble.options.webpQuality,
  );
}

/**
 * A plugin wrapper for the `minifyAudio` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function minifyAudioPlugin(
  humble: Humble,
) : Promise<void> {
  const audioCache: ResourceCache = humble.createSubCache(
    ResourceType.AUDIO,
  );

  await audioModifiers.minifyAudio(audioCache);
}

/**
 * A plugin wrapper for the `minifyVideos` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function minifyVideosPlugin(
  humble: Humble,
) : Promise<void> {
  const videoCache: ResourceCache = humble.createSubCache(
    ResourceType.VIDEO,
  );

  await videoModifiers.minifyVideos(videoCache);
}

/**
 * A plugin wrapper for the `minifyFonts` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function minifyFontsPlugin(
  humble: Humble,
) : Promise<void> {
  const fontCache: ResourceCache = humble.createSubCache(
    ResourceType.FONT,
  );

  await fontModifiers.minifyFonts(
    humble.document,
    fontCache,
  );
}

/**
 * A plugin wrapper for the `removeMetadataFromResourceCache` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function removeMetadataFromResourceCachePlugin(
  humble: Humble,
) : Promise<void> {
  await generalMediaModifiers.removeMetadataFromResourceCache(
    humble.resourceCache,
    humble.options.keepResourceIfLarger,
  );
}

/**
 * A plugin wrapper for the `grayscaleImages` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function grayscaleImagesPlugin(
  humble: Humble,
) : Promise<void> {
  const imageCache: ResourceCache = humble.createSubCache(
    ResourceType.IMAGE,
  );

  await imageModifiers.grayscaleImages(
    humble.document,
    imageCache,
  );
}

/**
 * A plugin wrapper for the `grayscaleVideos` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function grayscaleVideosPlugin(
  humble: Humble,
) : Promise<void> {
  const videoCache: ResourceCache = humble.createSubCache(
    ResourceType.VIDEO,
  );

  await videoModifiers.grayscaleVideos(
    videoCache,
  );
}

/**
 * A plugin wrapper for the `grayscale` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function grayscalePlugin(
  humble: Humble,
) : Promise<void> {
  await grayscaleCss.plugins.grayscaleCssPlugin(humble);
  await grayscaleImagesPlugin(humble);
  await grayscaleVideosPlugin(humble);
}

/**
 * A plugin wrapper for the `readabilityMode` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function readabilityModePlugin(
  humble: Humble,
) : Promise<void> {
  const readabilityDocument: Document = documentModifiers.readabilityMode(
    humble.document,
  );

  humble.document = readabilityDocument;
}

/**
 * A plugin wrapper for the `purifyHtml` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function domPurifyPlugin(
  humble: Humble,
) : Promise<void> {
  const sanitizedHtml: string = documentModifiers.purifyHtml(
    humble.html,
  );

  humble.html = sanitizedHtml;
}

/**
 * A plugin wrapper for the `injectCustomStyleSheet` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function injectCustomStyleSheetPlugin(
  humble: Humble,
) : Promise<void> {
  await injectors.injectCustomStyleSheet(
    humble.options.injectCustomStyleSheet,
    humble.document,
    {
      socksProxy: humble.options.socksProxy,
    },
  );
}

/**
 * A plugin wrapper for the `injectHtml5Polyfill` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function injectHtml5PolyfillPlugin(
  humble: Humble,
) : Promise<void> {
  await injectors.injectHtml5Polyfill(humble.document);
}

/**
 * A plugin wrapper for the `injectCssFlexboxPolyfill` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function injectCssFlexboxPolyfillPlugin(
  humble: Humble,
) : Promise<void> {
  await injectors.injectCssFlexboxPolyfill(humble.document);
}

/**
 * A plugin wrapper for the `injectMediaQueryPolyfill` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function injectMediaQueryPolyfillPlugin(
  humble: Humble,
) : Promise<void> {
  await injectors.injectMediaQueryPolyfill(humble.document);
}

/**
 * A plugin wrapper for the `injectCanvasPolyfill` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function injectCanvasPolyfillPlugin(
  humble: Humble,
) : Promise<void> {
  await injectors.injectCanvasPolyfill(humble.document);
}

/**
 * A plugin wrapper for the `injectHtml5MediaPolyfill` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function injectHtml5MediaPolyfillPlugin(
  humble: Humble,
) : Promise<void> {
  await injectors.injectHtml5MediaPolyfill(humble.document);
}

/**
 * A plugin wrapper for the `injectEs5Polyfill` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function injectEs5PolyfillPlugin(
  humble: Humble,
) : Promise<void> {
  await injectors.injectEs5Polyfill(humble.document);
}

/**
 * A plugin wrapper for the `injectFlashPlayer` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function injectFlashPlayerPlugin(
  humble: Humble,
) : Promise<void> {
  await injectors.injectFlashPlayer(humble.document);
}

/**
 * A plugin wrapper for the `injectCompiledPage` function.
 *
 * @param humble a Humble object that will be modified in place.
 */
async function injectCompiledPagePlugin(
  humble: Humble,
) : Promise<void> {
  await injectors.injectCompiledPage(
    humble.document,
    humble.options.minifyHtml,
    humble.options.minifyHtmlOptions,
    humble.options.minifyJs,
    humble.options.minifyJsOptions,
  );
}

/**
 * Builds a pipeline of plugins that will run during the
 * `PreCssInlineRemovals` stage of the archiving process.
 *
 * @param humble a Humble object.
 */
export function buildAfterInitialFetchPluginPipeline(
  humble: Humble,
) : HumblePlugin[] {
  const plugins: HumblePlugin[] = [];

  // Running the DOM purify plugin.
  if (humble.options.domPurify) {
    plugins.push(domPurifyPlugin);
  }

  return plugins;
}

/**
 * Builds a pipeline of plugins that will run during the
 * `PreCssInlineRemovals` stage of the archiving process.
 *
 * @param humble a Humble object.
 */
export function buildPreCssInlineRemovalsPluginPipeline(
  humble: Humble,
) : HumblePlugin[] {
  const plugins: HumblePlugin[] = [];

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

/**
 * Builds a pipeline of plugins that will run during the
 * `PostCssInlineRemovals` stage of the archiving process.
 *
 * @param humble a Humble object.
 */
export function buildPostCssInlineRemovalsPluginPipeline(
  humble: Humble,
) : HumblePlugin[] {
  const plugins: HumblePlugin[] = [];

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

/**
 * Builds a pipeline of plugins that will run during the
 * `ResourceModifications` stage of the archiving process.
 *
 * @param humble a Humble object.
 */
export function buildResourceModificationsPluginPipeline(
  humble: Humble,
) : HumblePlugin[] {
  const plugins: HumblePlugin[] = [];

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

/**
 * Builds a pipeline of plugins that will run during the
 * `FinalInlineModifications` stage of the archiving process.
 *
 * @param humble a Humble object.
 */
export function buildFinalInlineModificationsPluginPipeline(
  humble: Humble,
) : HumblePlugin[] {
  const plugins: HumblePlugin[] = [];

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
    plugins.push(
      classIdMinifier.plugins.minifyClassNamesAndIDsToAttributesPlugin,
    );
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

/**
 * Builds a pipeline of plugins that will run during the
 * `FinalDocumentCreation` stage of the archiving process.
 *
 * @param humble a Humble object.
 */
export function buildFinalDocumentCreationPluginPipeline(
  humble: Humble,
) : HumblePlugin[] {
  const plugins: HumblePlugin[] = [];

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

/**
 * Builds a pipeline of plugins that will run during the
 * `FinalHtmlCreation` stage of the archiving process.
 *
 * @param humble a Humble object.
 */
export function buildFinalHtmlCreationPluginPipeline(
  humble: Humble,
) : HumblePlugin[] {
  const plugins: HumblePlugin[] = [];

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
