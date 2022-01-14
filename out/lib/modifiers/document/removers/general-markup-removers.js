"use strict";
/**
 * Code for removing various elements, attributes, source code, and other
 * markup throughout the document.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCustomTagsByCssSelector = exports.removeCustomTagsByName = exports.removeEmptyNonDisplayElements = exports.removeIntegrityCheckAttributes = exports.removeDataAttributes = exports.removeAriaAttributes = exports.removeDefaultAttributes = exports.removeAnchorHrefs = exports.removeNonInlineAnchorHrefs = exports.removeMetaRefreshTag = exports.removeNonDisplayLinkTags = exports.removeNonDisplayMetaTags = exports.removeFormTagsOnly = exports.removeFormAttributes = exports.removeForms = exports.removeComments = exports.removeNonConditionalComments = exports.removeConditionalComments = exports.removeCanvas = exports.removeFavicons = exports.removeCursors = exports.removeFonts = exports.removeAudio = exports.removeAudioSrcs = exports.removeVideos = exports.removeVideoSrcs = exports.removeFrames = exports.removeImages = exports.removeCssImages = exports.removeImageAttributes = exports.removeImageAlts = exports.removeImageSrcsets = exports.removeImageSrcs = exports.removeScripts = exports.removeHrefScripts = exports.removeInlineScripts = exports.removeNoscriptTags = exports.removeScriptTags = exports.removeStyles = exports.removeInlineStyles = exports.removeAlternativeStylesTags = exports.removeStylesTags = exports.removeElementsByCssSelector = exports.removeElementsByTagName = void 0;
/* eslint-disable no-cond-assign */
/* eslint-disable no-loop-func */
/* eslint-disable no-multi-spaces */
/* eslint-disable arrow-body-style */
const cssTree = require("css-tree");
/**
 * Removes all tags by a given tag name from the Document.
 *
 * @example
 * ```typescript
 * // The HTML markup before removing the tags:
 * //
 * // <html>
 * //   <body>
 * //     <p>Hello, World</p>
 * //   </body>
 * // </html>
 *
 * // Removing the `<p>` tags from the document.
 * removeElementsByTagName(document, 'p');
 *
 * // The HTML markup after removing the tags:
 * //
 * // <html>
 * //   <body>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 * @param tagName the name of the tag that will be all removed from the
 * document.
 */
function removeElementsByTagName(document, tagName) {
    const elements = [...document.getElementsByTagName(tagName)];
    for (const element of elements) {
        element.remove();
    }
}
exports.removeElementsByTagName = removeElementsByTagName;
/**
 * Removes all tags by a given CSS selector from the document.
 *
 * @example
 * ```typescript
 * // The HTML markup before removing the tags:
 * //
 * // <html>
 * //   <body>
 * //     <p id="hello">Hello, World</p>
 * //   </body>
 * // </html>
 *
 * // Removing the tags with the ID `hello` from the document.
 * removeElementsByCssSelector(document, '#hello');
 *
 * // The HTML markup after removing the tags:
 * //
 * // <html>
 * //   <body>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 * @param cssSelector the CSS selector that will be used to find elements to
 * remove.
 */
function removeElementsByCssSelector(document, cssSelector) {
    const elements = [...document.querySelectorAll(cssSelector)];
    for (const element of elements) {
        element.remove();
    }
}
exports.removeElementsByCssSelector = removeElementsByCssSelector;
/**
 * Removes all styles-related tags from the document, including the `<link>`
 * stylesheet tags and the `<style>` tag.
 *
 * @command **`--remove-styles-tags`**
 * @example
 * ```typescript
 * // The HTML markup before removing the style tags:
 * //
 * // <html>
 * //   <head>
 * //     <link rel="stylesheet" href="./styles.css">
 * //     <link rel="alternative stylesheet" href="./alt-styles.css">
 * //     <style>
 * //       .hello { color: #000; }
 * //     </style>
 * //   </head>
 * // </html>
 *
 * // Removing the style tags from the document.
 * removeStylesTags(document);
 *
 * // The HTML markup after removing the style tags:
 * //
 * // <html>
 * //   <head>
 * //   </head>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function removeStylesTags(document) {
    // Removing the common style elements from the document.
    removeElementsByCssSelector(document, 'link[rel="stylesheet"]');
    removeElementsByCssSelector(document, 'link[rel="alternate stylesheet"]');
    removeElementsByCssSelector(document, 'link[href$=".css"]');
    removeElementsByCssSelector(document, 'style');
}
exports.removeStylesTags = removeStylesTags;
/**
 * Removes all alternative stylesheet `<link>` tags from the document.
 *
 * @command **`--remove-alternative-styles-tags`**
 * @example
 * ```typescript
 * // The HTML markup before removing the style tags:
 * //
 * // <html>
 * //   <head>
 * //     <link rel="alternative stylesheet" href="./alt-styles.css">
 * //   </head>
 * // </html>
 *
 * // Removing the alternative stylesheet tags from the document.
 * removeAlternativeStylesTags(document);
 *
 * // The HTML markup after removing the style tags:
 * //
 * // <html>
 * //   <head>
 * //   </head>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function removeAlternativeStylesTags(document) {
    // Removing the alternative stylesheets `<link>` tags.
    removeElementsByCssSelector(document, 'link[rel="alternate stylesheet"]');
}
exports.removeAlternativeStylesTags = removeAlternativeStylesTags;
/**
 * Removes all inline style attributes from the document.
 *
 * @command **`--remove-inline-styles`**
 * @example
 * ```typescript
 * // The HTML markup before removing the inline styles:
 * //
 * // <html>
 * //   <body>
 * //     <p style="color: #000">Hello, World</p>
 * //   </body>
 * // </html>
 *
 * // Removing the inline styles from the document.
 * removeInlineStyles(document);
 *
 * // The HTML markup after removing the inline styles:
 * //
 * // <html>
 * //   <body>
 * //     <p>Hello, World</p>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function removeInlineStyles(document) {
    // Removing inline `style` attributes from all elements.
    const styleAttributeElements = [
        ...document.querySelectorAll('[style]'),
    ];
    for (const element of styleAttributeElements) {
        element.removeAttribute('style');
    }
}
exports.removeInlineStyles = removeInlineStyles;
/**
 * Removes all styles from the document, including external style sheets,
 * internal style sheets, alternative style sheets, and inline styles.
 *
 * @command **`--remove-styles`**
 * @example
 * ```typescript
 * // The HTML markup before removing the document styles:
 * //
 * // <html>
 * //   <head>
 * //     <link rel="stylesheet" href="./styles.css">
 * //     <link rel="alternative stylesheet" href="./alt-styles.css">
 * //     <style>
 * //       .hello { color: #000; }
 * //     </style>
 * //   </head>
 * //   <body>
 * //     <p style="color: #000">Hello, World</p>
 * //   </body>
 * // </html>
 *
 * // Removing all the styles from the document.
 * removeStyles(document);
 *
 * // The HTML markup after removing the inline styles:
 * //
 * // <html>
 * //   <head>
 * //   </head>
 * //   <body>
 * //     <p>Hello, World</p>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function removeStyles(document) {
    removeStylesTags(document);
    removeInlineStyles(document);
}
exports.removeStyles = removeStyles;
/**
 * Removes all `<script>` tags from the document.
 *
 * @command **`--remove-script-tags`**
 * @example
 * ```typescript
 * // The HTML markup before removing the `<script>` tags:
 * //
 * // <html>
 * //   <head>
 * //     <script>
 * //       console.log('Hello, World');
 * //     </script>
 * //   </head>
 * // </html>
 *
 * // Removing the `<script>` tags from the document.
 * removeScriptTags(document);
 *
 * // The HTML markup after removing the `<script>` tags:
 * //
 * // <html>
 * //   <head>
 * //   </head>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function removeScriptTags(document) {
    // Removing the `<script>` tags from the document.
    removeElementsByTagName(document, 'script');
}
exports.removeScriptTags = removeScriptTags;
/**
 * Removes all `<noscript>` tags from the document.
 *
 * @command **`--remove-noscript-tags`**
 * @example
 * ```typescript
 * // The HTML markup before removing the `<noscript>` tags:
 * //
 * // <html>
 * //   <body>
 * //     <noscript>
 * //       <p>Hello, World</p>
 * //     </noscript>
 * //   </body>
 * // </html>
 *
 * // Removing the `<noscript>` tags from the document.
 * removeNoscriptTags(document);
 *
 * // The HTML markup after removing the `<noscript>` tags:
 * //
 * // <html>
 * //   <body>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function removeNoscriptTags(document) {
    // Removing the `<noscript>` tags from the document.
    removeElementsByTagName(document, 'noscript');
}
exports.removeNoscriptTags = removeNoscriptTags;
/**
 * Removes all inline scripts (in the `on*` event handler attributes) from the
 * document.
 *
 * @command **`--remove-inline-scripts`**
 * @example
 * ```typescript
 * // The HTML markup before removing inline scripts:
 * //
 * // <html>
 * //   <body>
 * //     <p onclick="console.log('Hello, World')">Hello, World</p>
 * //   </body>
 * // </html>
 *
 * // Removing the inline scripts from the document.
 * removeInlineScripts(document);
 *
 * // The HTML markup after removing the inline scripts:
 * //
 * // <html>
 * //   <body>
 * //     <p>Hello, World</p>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function removeInlineScripts(document) {
    // Creating an array of all inline event handlers attributes (the `on*`
    // attributes).
    const inlineEventHandlerAttributes = [
        'onabort', 'onanimationcancel', 'onanimationend',
        'onanimationiteration', 'onanimationstart', 'onauxclick',
        'onblur', 'onerror', 'onfocus',
        'oncancel', 'oncanplay', 'oncanplaythrough',
        'onchange', 'onclick', 'onclose',
        'oncontextmenu', 'oncuechange', 'ondblclick',
        'ondrag', 'ondragend', 'ondragenter',
        'ondragexit', 'ondragleave', 'ondragover',
        'ondragstart', 'ondrop', 'ondurationchange',
        'onemptied', 'onended', 'onformdata',
        'ongotpointercapture', 'oninput', 'oninvalid',
        'onkeydown', 'onkeypress', 'onkeyup',
        'onload', 'onloadeddata', 'onloadedmetadata',
        'onloadend', 'onloadstart', 'onlostpointercapture',
        'onmousedown', 'onmouseenter', 'onmouseleave',
        'onmousemove', 'onmouseout', 'onmouseover',
        'onmouseup', 'onmousewheel', 'onwheel',
        'onpause', 'onplay', 'onplaying',
        'onpointerdown', 'onpointermove', 'onpointerup',
        'onpointercancel', 'onpointerover', 'onpointerout',
        'onpointerenter', 'onpointerleave', 'onpointerlockchange',
        'onpointerlockerror', 'onprogress', 'onratechange',
        'onreset', 'onresize', 'onscroll',
        'onseeked', 'onseeking', 'onselect',
        'onselectstart', 'onselectionchange', 'onshow',
        'onsort', 'onstalled', 'onsubmit',
        'onsuspend', 'ontimeupdate', 'onvolumechange',
        'ontouchcancel', 'ontouchend', 'ontouchmove',
        'ontouchstart', 'ontransitioncancel', 'ontransitionend',
        'ontransitionrun', 'ontransitionstart', 'onwaiting',
    ];
    // Removing any instance of an inline event handler from the document.
    const allElements = [...document.getElementsByTagName('*')];
    for (const element of allElements) {
        for (const inlineAttribute of inlineEventHandlerAttributes) {
            element.removeAttribute(inlineAttribute);
        }
    }
}
exports.removeInlineScripts = removeInlineScripts;
/**
 * Removes all scripts from the `href` attributes.
 *
 * @command **`--remove-href-scripts`**
 * @example
 * ```typescript
 * // The HTML markup before removing the href scripts:
 * //
 * // <html>
 * //   <body>
 * //     <a href="javascript:console.log('Hello, World')">Hello</a>
 * //     <a href="./index.html">World</a>
 * //   </body>
 * // </html>
 *
 * // Removing the href scripts from the document.
 * removeHrefScripts(document);
 *
 * // The HTML markup after removing the href scripts:
 * //
 * // <html>
 * //   <body>
 * //     <a>Hello</a>
 * //     <a href="./index.html">World</a>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function removeHrefScripts(document) {
    var _a;
    // Removing any instance of an inline `href` using the `javascript:`
    // protocol.
    const hrefElements = [...document.querySelectorAll('[href]')];
    for (const element of hrefElements) {
        const href = (_a = element.getAttribute('href')) !== null && _a !== void 0 ? _a : '';
        if (/javascript:/gmi.test(href) === true) {
            element.removeAttribute('href');
        }
    }
}
exports.removeHrefScripts = removeHrefScripts;
/**
 * Removes all `<script>` tags, `<noscript>` tags, inline event handler
 * attributes (the `on*` attributes), and `href` attributes with the
 * `javascript:` protocol from all elements in the document.
 *
 * @command **`--remove-scripts`**
 * @example
 * ```typescript
 * // The HTML markup before removing all of the scripts:
 * //
 * // <html>
 * //   <head>
 * //     <script src="./script.js"></script>
 * //     <script>
 * //       console.log('Hello, World');
 * //     </script>
 * //   </head>
 * //   <body>
 * //     <a onclick="console.log('Hello, World')">Hello</a>
 * //     <a href="javascript:console.log('Hello, World')">World</a>
 * //   </body>
 * // </html>
 *
 * // Removing all of the scripts from the document.
 * removeScripts(document);
 *
 * // The HTML markup after removing all of the scripts:
 * //
 * // <html>
 * //   <head>
 * //   </head>
 * //   <body>
 * //     <a>Hello</a>
 * //     <a href="./index.html">World</a>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function removeScripts(document) {
    removeScriptTags(document);
    removeNoscriptTags(document);
    removeInlineScripts(document);
    removeHrefScripts(document);
}
exports.removeScripts = removeScripts;
/**
 * Removes all `src` attributes from all image tags (`<img>`, `<picture>`) in
 * the document.
 *
 * @command **`--remove-image-srcs`**
 * @example
 * ```typescript
 * // The HTML markup before removing the `src` attributes from image tags:
 * //
 * // <html>
 * //   <body>
 * //     <img src="./image.png">
 * //     <picture src="./image.png"></picture>
 * //     <picture>
 * //       <img src="./image.png">
 * //       <source src="./image.png">
 * //     </picture>
 * //   </body>
 * // </html>
 *
 * // Removing all of `src` attributes from image tags.
 * removeImageSrcs(document);
 *
 * // The HTML markup after removing all of the `src` attributes from image
 * // tags:
 * //
 * // <html>
 * //   <body>
 * //     <img>
 * //     <picture></picture>
 * //     <picture>
 * //       <img>
 * //       <source>
 * //     </picture>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function removeImageSrcs(document) {
    // Removing the `<img>` and `<picture>` tag `src` attributes.
    const imageElements = [
        ...document.querySelectorAll('img[src]'),
        ...document.querySelectorAll('picture[src]'),
        ...document.querySelectorAll('picture source[src]'),
    ];
    for (const imageElement of imageElements) {
        imageElement.removeAttribute('src');
    }
}
exports.removeImageSrcs = removeImageSrcs;
/**
 * Removes all `srcset` attributes from all image tags (`<img>`, `<picture>`)
 * in the document.
 *
 * @command **`--remove-image-srcsets`**
 * @example
 * ```typescript
 * // The HTML markup before removing the `srcset` attributes from image tags:
 * //
 * // <html>
 * //   <body>
 * //     <img srcset="./image.png 1x">
 * //     <picture srcset="./image.png 1x"></picture>
 * //     <picture>
 * //       <img srcset="./image.png 1x">
 * //       <source srcset="./image.png 1x">
 * //     </picture>
 * //   </body>
 * // </html>
 *
 * // Removing all of `srcset` attributes from image tags.
 * removeImageSrcsets(document);
 *
 * // The HTML markup after removing all of the `srcset` attributes from image
 * // tags:
 * //
 * // <html>
 * //   <body>
 * //     <img>
 * //     <picture></picture>
 * //     <picture>
 * //       <img>
 * //       <source>
 * //     </picture>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function removeImageSrcsets(document) {
    // Removing the `<img>` and `<picture>` tag `srcset` attributes.
    const imageElements = [
        ...document.querySelectorAll('img[srcset]'),
        ...document.querySelectorAll('picture[srcset]'),
        ...document.querySelectorAll('picture source[srcset]'),
    ];
    for (const imageElement of imageElements) {
        imageElement.removeAttribute('srcset');
    }
}
exports.removeImageSrcsets = removeImageSrcsets;
/**
 * Removes all `alt` attributes from all image tags (`<img>`, `<picture>`) in
 * the document.
 *
 * @command **`--remove-image-alts`**
 * @example
 * ```typescript
 * // The HTML markup before removing the `alt` attributes from image tags:
 * //
 * // <html>
 * //   <body>
 * //     <img alt="hello">
 * //     <picture alt="hello"></picture>
 * //     <picture>
 * //       <img alt="hello">
 * //       <source alt="hello">
 * //     </picture>
 * //   </body>
 * // </html>
 *
 * // Removing all of `alt` attributes from image tags.
 * removeImageAlts(document);
 *
 * // The HTML markup after removing all of the `alt` attributes from image
 * // tags:
 * //
 * // <html>
 * //   <body>
 * //     <img>
 * //     <picture></picture>
 * //     <picture>
 * //       <img>
 * //       <source>
 * //     </picture>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 *
 * @note always consider keeping the `alt` attributes for people who use
 * assistive technologies. This function is mainly used to see how much
 * minification can be done. You should consider `alt` attributes on image
 * tags as vital pieces of content on the document and avoid removing them.
 */
function removeImageAlts(document) {
    // Removing the `<img>` and `<picture>` tag `alt` attributes.
    const imageElements = [
        ...document.querySelectorAll('img[alt]'),
        ...document.querySelectorAll('picture[alt]'),
        ...document.querySelectorAll('picture source[alt]'),
    ];
    for (const imageElement of imageElements) {
        imageElement.removeAttribute('alt');
    }
}
exports.removeImageAlts = removeImageAlts;
/**
 * Removes `src`, `srcset`, and `alt` attributes on all image tags (`<img>`,
 * `<picture>`) in the document.
 *
 * @command **`--remove-image-attributes`**
 * @example
 * ```typescript
 * // The HTML markup before removing all of the attributes from image tags:
 * //
 * // <html>
 * //   <body>
 * //     <img src="./image.png" srcset="./image.png 1x" alt="hello">
 * //     <picture src="./image.png" srcset="./image.png 1x" alt="hello"></picture>
 * //     <picture>
 * //       <img src="./image.png" srcset="./image.png 1x" alt="hello">
 * //       <source src="./image.png" srcset="./image.png 1x" alt="hello">
 * //     </picture>
 * //   </body>
 * // </html>
 *
 * // Removing all of the attributes from image tags.
 * removeImageAttributes(document);
 *
 * // The HTML markup after removing all of the attributes from image tags:
 * //
 * // <html>
 * //   <body>
 * //     <img>
 * //     <picture></picture>
 * //     <picture>
 * //       <img>
 * //       <source>
 * //     </picture>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function removeImageAttributes(document) {
    removeImageSrcs(document);
    removeImageSrcsets(document);
    removeImageAlts(document);
}
exports.removeImageAttributes = removeImageAttributes;
/**
 * Removes all image in all of the CSS stylesheets the document.
 *
 * @command **`--remove-css-images`**
 * @example
 * ```typescript
 * // The HTML markup before removing all of the images in the style sheets:
 * //
 * // <html>
 * //   <head>
 * //     <style>
 * //       .hello {
 * //         background-image: url("./image.png");
 * //       }
 * //     </style>
 * //   </head>
 * // </html>
 *
 * // Removing all of the images in the style sheets.
 * removeCssImages(document);
 *
 * // The HTML markup after removing all of the images in the style sheets:
 * //
 * // <html>
 * //   <head>
 * //     <style>
 * //       .hello {
 * //         background-image: url("");
 * //       }
 * //     </style>
 * //   </head>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function removeCssImages(document) {
    // Getting all `<style>` elements in the document.
    const styleElements = [...document.getElementsByTagName('style')];
    // For each `<style>` element, removing all of the images by replacing the
    // URL nodes in the CSS AST with empty URLs.
    for (const styleElement of styleElements) {
        // Getting the CSS and creating the AST.
        const css = styleElement.innerHTML;
        const cssAst = cssTree.parse(css);
        // Creating an array of image attributes that may have a URL node.
        const imageProperties = [
            'background-image',
            'list-style-image',
            'content',
            'border-image-source',
            'mask-image',
            'background',
            'border-image',
        ];
        // Walking through all the URL nodes in the CSS AST and setting all of
        // the URLs from these nodes to an empty URL.
        cssTree.walk(cssAst, {
            visit: 'Declaration',
            enter: (declarationNode) => {
                if (imageProperties.includes(declarationNode.property.toLowerCase())) {
                    cssTree.walk(declarationNode, {
                        visit: 'Url',
                        enter: (urlNode) => {
                            // Setting the URL to an empty URL.
                            urlNode.value.value = '""';
                        },
                    });
                }
            },
        });
        // Generating new CSS code from the modified AST, and setting the CSS for
        // the style element to the new code.
        const removedCss = cssTree.generate(cssAst);
        styleElement.innerHTML = removedCss;
    }
}
exports.removeCssImages = removeCssImages;
/**
 * Removes all images from the document, including in the style sheets.
 *
 * @command **`--remove-images`**
 * @example
 * ```typescript
 * // The HTML markup before removing all of the images in the document and
 * // style sheets:
 * //
 * // <html>
 * //   <head>
 * //     <style>
 * //       .hello {
 * //         background-image: url("./image.png");
 * //       }
 * //     </style>
 * //   </head>
 * //   <body>
 * //     <img src="./image.png" srcset="./image.png 1x" alt="hello">
 * //     <picture src="./image.png" srcset="./image.png 1x" alt="hello"></picture>
 * //     <picture>
 * //       <img src="./image.png" srcset="./image.png 1x" alt="hello">
 * //       <source src="./image.png" srcset="./image.png 1x" alt="hello">
 * //     </picture>
 * //   </body>
 * // </html>
 *
 * // Removing all of the images in the document and style sheets.
 * removeImages(document);
 *
 * // The HTML markup after removing all of the images in the document and
 * // style sheets:
 * //
 * // <html>
 * //   <head>
 * //     <style>
 * //       .hello {
 * //         background-image: url("");
 * //       }
 * //     </style>
 * //   </head>
 * //   <body>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function removeImages(document) {
    // Removing the `<img>` and `<picture>` tags.
    removeElementsByTagName(document, 'img');
    removeElementsByTagName(document, 'picture');
    // Removing the images in the inline `<style>` tags.
    removeCssImages(document);
}
exports.removeImages = removeImages;
/**
 * Removes all frame tags (`<frame>`, `<frameset>`, `<iframe>`, and `<portal>`)
 * from the document.
 *
 * @command **`--remove-frames`**
 * @example
 * ```typescript
 * // The HTML markup before removing all of the frames in the document:
 * //
 * // <html>
 * //   <body>
 * //     <frame>
 * //     <frameset></frameset>
 * //     <iframe></iframe>
 * //     <portal></portal>
 * //   </body>
 * // </html>
 *
 * // Removing all of the frames in the document.
 * removeFrames(document);
 *
 * // The HTML markup after removing all of the frames in the document:
 * //
 * // <html>
 * //   <body>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function removeFrames(document) {
    // Creating a list of all embedable frame tags.
    const frameTags = [
        'frame',
        'frameset',
        'iframe',
        'portal',
    ];
    // Removing all of the frame tags.
    for (const frameTag of frameTags) {
        removeElementsByTagName(document, frameTag);
    }
}
exports.removeFrames = removeFrames;
/**
 * Removes all `src` attributes from all video tags (`<video>`) in the document.
 *
 * @command **`--remove-video-srcs`**
 * @example
 * ```typescript
 * // The HTML markup before removing the `src` attributes from video tags:
 * //
 * // <html>
 * //   <body>
 * //     <video src="./video.webm"></picture>
 * //     <video>
 * //       <source src="./video.mkv">
 * //     </video>
 * //   </body>
 * // </html>
 *
 * // Removing all of `src` attributes from video tags.
 * removeVideoSrcs(document);
 *
 * // The HTML markup after removing all of the `src` attributes from video
 * // tags:
 * //
 * // <html>
 * //   <body>
 * //     <video></video>
 * //     <video>
 * //       <source>
 * //     </video>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function removeVideoSrcs(document) {
    // Removing the `<video>` tag `src` attributes.
    const videoElements = [
        ...document.querySelectorAll('video[src]'),
        ...document.querySelectorAll('video source[src]'),
    ];
    for (const videoElement of videoElements) {
        videoElement.removeAttribute('src');
    }
}
exports.removeVideoSrcs = removeVideoSrcs;
/**
 * Removes all videos from the document.
 *
 * @command **`--remove-videos`**
 * @example
 * ```typescript
 * // The HTML markup before removing all of the videos in the document:
 * //
 * // <html>
 * //   <body>
 * //     <video src="./video.webm"></picture>
 * //     <video>
 * //       <source src="./video.mkv">
 * //     </video>
 * //   </body>
 * // </html>
 *
 * // Removing all of the videos in the document.
 * removeVideos(document);
 *
 * // The HTML markup after removing all of the videos in the document:
 * //
 * // <html>
 * //   <body>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function removeVideos(document) {
    // Removing the `<video>` tags from the document.
    removeElementsByTagName(document, 'video');
}
exports.removeVideos = removeVideos;
/**
 * Removes all `src` attributes from all audio tags (`<audio>`) in the document.
 *
 * @command **`--remove-audio-srcs`**
 * @example
 * ```typescript
 * // The HTML markup before removing the `src` attributes from audio tags:
 * //
 * // <html>
 * //   <body>
 * //     <audio src="./audio.ogg"></picture>
 * //     <audio>
 * //       <source src="./audio.ogg">
 * //     </audio>
 * //   </body>
 * // </html>
 *
 * // Removing all of `src` attributes from audio tags.
 * removeAudioSrcs(document);
 *
 * // The HTML markup after removing all of the `src` attributes from audio
 * // tags:
 * //
 * // <html>
 * //   <body>
 * //     <audio></audio>
 * //     <audio>
 * //       <source>
 * //     </audio>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function removeAudioSrcs(document) {
    // Removing the `<audio>` tag `src` attributes.
    const audioElements = [
        ...document.querySelectorAll('audio[src]'),
        ...document.querySelectorAll('audio source[src]'),
    ];
    for (const audioElement of audioElements) {
        audioElement.removeAttribute('src');
    }
}
exports.removeAudioSrcs = removeAudioSrcs;
/**
 * Removes all audio tags (`<audio>`) from the document.
 *
 * @command **`--remove-audio`**
 * @example
 * ```typescript
 * // The HTML markup before removing all of the audio in the document:
 * //
 * // <html>
 * //   <body>
 * //     <audio src="./audio.ogg"></picture>
 * //     <audio>
 * //       <source src="./audio.ogg">
 * //     </audio>
 * //   </body>
 * // </html>
 *
 * // Removing all of the audio in the document.
 * removeAudio(document);
 *
 * // The HTML markup after removing all of the audio in the document:
 * //
 * // <html>
 * //   <body>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function removeAudio(document) {
    // Removing the `<audio>` tags from the document.
    removeElementsByTagName(document, 'audio');
}
exports.removeAudio = removeAudio;
/**
 * Removes all external fonts from the document.
 *
 * @command **`--remove-fonts`**
 * @example
 * ```typescript
 * // The HTML markup before removing all of the fonts in the style sheets:
 * //
 * // <html>
 * //   <head>
 * //     <style>
 * //       @font-face {
 * //         src: url("./font.woff2");
 * //       }
 * //     </style>
 * //   </head>
 * // </html>
 *
 * // Removing all of the fonts in the style sheets.
 * removeFonts(document);
 *
 * // The HTML markup after removing all of the fonts in the style sheets:
 * //
 * // <html>
 * //   <head>
 * //     <style>
 * //     </style>
 * //   </head>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function removeFonts(document) {
    // Getting all `<style>` elements in the document.
    const styleElements = [...document.getElementsByTagName('style')];
    // For each `<style>` element, removing all of the `font-face` rules by
    // replacing the URL nodes in the CSS AST with empty URLs.
    for (const styleElement of styleElements) {
        // Getting the CSS and creating the AST.
        const css = styleElement.innerHTML;
        const cssAst = cssTree.parse(css);
        // Walking through all the Atrule nodes in the CSS AST and removing all of
        // the `@font-face` rules.
        cssTree.walk(cssAst, {
            visit: 'Atrule',
            enter: (atruleNode, atruleItem, atruleList) => {
                const atRuleName = atruleNode.name.toLowerCase();
                if (atRuleName === 'font-face') {
                    atruleList.remove(atruleItem);
                }
            },
        });
        // Generating new CSS code from the modified AST, and setting the CSS for
        // the style element to the new code.
        const removedCss = cssTree.generate(cssAst);
        styleElement.innerHTML = removedCss;
    }
}
exports.removeFonts = removeFonts;
/**
 * Removes all cursors from the document.
 *
 * @command **`--remove-cursors`**
 * @example
 * ```typescript
 * // The HTML markup before removing all of the cursors in the style sheets:
 * //
 * // <html>
 * //   <head>
 * //     <style>
 * //       .hello {
 * //         cursor: url("./cursor.png");
 * //       }
 * //     </style>
 * //   </head>
 * // </html>
 *
 * // Removing all of the cursors in the style sheets.
 * removeCursors(document);
 *
 * // The HTML markup after removing all of the cursors in the style sheets:
 * //
 * // <html>
 * //   <head>
 * //     <style>
 * //       .hello {
 * //         cursor: url("");
 * //       }
 * //     </style>
 * //   </head>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function removeCursors(document) {
    // Getting all `<style>` elements in the document.
    const styleElements = [...document.getElementsByTagName('style')];
    // For each `<style>` element, removing all of the `font-face` rules by
    // replacing the URL nodes in the CSS AST with empty URLs.
    for (const styleElement of styleElements) {
        // Getting the CSS and creating the AST.
        const css = styleElement.innerHTML;
        const cssAst = cssTree.parse(css);
        // Walking through all the declaration nodes in the CSS AST and removing
        // any cursor nodes.
        cssTree.walk(cssAst, {
            visit: 'Declaration',
            enter: (declarationNode, declarationItem, declarationList) => {
                // Checking if the declaration name is `cursor`, and if it is, removing
                // the declaration from the AST.
                const propertyName = declarationNode.property.toLowerCase();
                if (propertyName === 'cursor') {
                    declarationList.remove(declarationItem);
                }
            },
        });
        // Generating new CSS code from the modified AST, and setting the CSS for
        // the style element to the new code.
        const removedCss = cssTree.generate(cssAst);
        styleElement.innerHTML = removedCss;
    }
}
exports.removeCursors = removeCursors;
/**
 * Removes all favicons from the document.
 *
 * @command **`--remove-favicons`**
 * @example
 * ```typescript
 * // The HTML markup before removing all of the favicons in the document:
 * //
 * // <html>
 * //   <head>
 * //     <link rel="icon" href="">
 * //     <link rel="shortcut icon" href="">
 * //     <link rel="apple-touch-icon" href="">
 * //     <link rel="apple-touch-icon-precomposed" href="">
 * //     <link rel="apple-touch-startup-image" href="">
 * //     <meta name="msapplication-TileImage" content="">
 * //     <meta name="msapplication-TileColor">
 * //     <meta name="msapplication-config">
 * //   </head>
 * // </html>
 *
 * // Removing all of the favicons in the document.
 * removeFavicons(document);
 *
 * // The HTML markup after removing all of the favicons in the document:
 * //
 * // <html>
 * //   <head>
 * //   </head>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function removeFavicons(document) {
    // Creating an array of all favicon CSS selectors.
    const faviconCssSelectors = [
        // Traditional web favicons selectors.
        'link[rel="icon"]',
        'link[rel="shortcut icon"]',
        // iPhone favicons selectors.
        'link[rel="apple-touch-icon"]',
        'link[rel="apple-touch-icon-precomposed"]',
        'link[rel="apple-touch-startup-image"]',
        // Windows 8/8.1 and IE 10/11 favicons selectors.
        'meta[name="msapplication-TileImage"]',
        'meta[name="msapplication-TileColor"]',
        'meta[name="msapplication-config"]',
    ];
    // Removing all of the favicons elements.
    for (const faviconCssSelector of faviconCssSelectors) {
        removeElementsByCssSelector(document, faviconCssSelector);
    }
}
exports.removeFavicons = removeFavicons;
/**
 * Removes all canvas elements from the document.
 *
 * @command **`--remove-canvas`**
 * @example
 * ```typescript
 * // The HTML markup before removing all of the canvases in the document:
 * //
 * // <html>
 * //   <body>
 * //     <canvas></canvas>
 * //   </body>
 * // </html>
 *
 * // Removing all of the canvases in the document.
 * removeCanvas(document);
 *
 * // The HTML markup after removing all of the canvases in the document:
 * //
 * // <html>
 * //   <body>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function removeCanvas(document) {
    removeElementsByTagName(document, 'canvas');
}
exports.removeCanvas = removeCanvas;
/**
 * Removes all IE conditional comments from the document.
 *
 * @command **`--remove-conditional-comments`**
 * @example
 * ```typescript
 * // The HTML markup before removing all of the conditional comments in the
 * // document:
 * //
 * // <html>
 * //   <body>
 * //     <!--Hello-->
 * //     <!--[if IE]>World<![endif]-->
 * //   </body>
 * // </html>
 *
 * // Removing all of the conditional comments in the document.
 * removeConditionalComments(document);
 *
 * // The HTML markup after removing all of the conditional comments in the
 * // document:
 * //
 * // <html>
 * //   <body>
 * //     <!--Hello-->
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function removeConditionalComments(document) {
    // A constant representing comments in the node iterator.
    const SHOW_COMMENT = 128;
    // Creating a node iterator of only comments and looping through the
    // iterator.
    const nodeIterator = document.createNodeIterator(document.documentElement, SHOW_COMMENT);
    // For each of the comment nodes in the document, if the comment node is a
    // IE conditional comment, removing the conditional comment.
    let currentCommentNode;
    while (currentCommentNode = nodeIterator.nextNode()) {
        // Checking if the comment is a conditional comment.
        const isConditionalComment = (currentCommentNode.textContent.startsWith('[if')
            && currentCommentNode.textContent.endsWith('![endif]'));
        // Removing the comment if conditional.
        if (isConditionalComment) {
            currentCommentNode.parentNode.removeChild(currentCommentNode);
        }
    }
}
exports.removeConditionalComments = removeConditionalComments;
/**
 * Removes all non-IE conditional comments from the document.
 *
 * @command **`--remove-non-conditional-comments`**
 * @example
 * ```typescript
 * // The HTML markup before removing all of the non-conditional comments in
 * // the document:
 * //
 * // <html>
 * //   <body>
 * //     <!--Hello-->
 * //     <!--[if IE]>World<![endif]-->
 * //   </body>
 * // </html>
 *
 * // Removing all of the non-conditional comments in the document.
 * removeNonConditionalComments(document);
 *
 * // The HTML markup after removing all of the non-conditional comments in the
 * // document:
 * //
 * // <html>
 * //   <body>
 * //     <!--[if IE]>World<![endif]-->
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function removeNonConditionalComments(document) {
    // A constant representing comments in the node iterator.
    const SHOW_COMMENT = 128;
    // Creating a node iterator of only comments and looping through the
    // iterator.
    const nodeIterator = document.createNodeIterator(document.documentElement, SHOW_COMMENT);
    // For each of the comment nodes in the document, if the comment node is not
    // a IE conditional comment, removing the conditional comment.
    let currentCommentNode;
    while (currentCommentNode = nodeIterator.nextNode()) {
        // Checking if the comment is a conditional comment.
        const isConditionalComment = (currentCommentNode.textContent.startsWith('[if')
            && currentCommentNode.textContent.endsWith('![endif]'));
        // Removing the comment if not conditional.
        if (!isConditionalComment) {
            currentCommentNode.parentNode.removeChild(currentCommentNode);
        }
    }
}
exports.removeNonConditionalComments = removeNonConditionalComments;
/**
 * Removes all comments from the document.
 *
 * @command **`--remove-comments`**
 * @example
 * ```typescript
 * // The HTML markup before removing all of the comments in the document:
 * //
 * // <html>
 * //   <body>
 * //     <!--Hello-->
 * //     <!--[if IE]>World<![endif]-->
 * //   </body>
 * // </html>
 *
 * // Removing all of the comments in the document.
 * removeComments(document);
 *
 * // The HTML markup after removing all of the comments in the document:
 * //
 * // <html>
 * //   <body>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function removeComments(document) {
    // A constant representing comments in the node iterator.
    const SHOW_COMMENT = 128;
    // Creating a node iterator of only comments and looping through the
    // iterator.
    const nodeIterator = document.createNodeIterator(document.documentElement, SHOW_COMMENT);
    // Removing all comments in the document.
    let currentCommentNode;
    while (currentCommentNode = nodeIterator.nextNode()) {
        currentCommentNode.parentNode.removeChild(currentCommentNode);
    }
}
exports.removeComments = removeComments;
/**
 * Removes all `<form>` elements from the document.
 *
 * @command **`--remove-forms`**
 * @example
 * ```typescript
 * // The HTML markup before removing all of the `<form>` tags in the document:
 * //
 * // <html>
 * //   <body>
 * //     <form method="POST">
 * //       <input type="submit">
 * //     </form>
 * //   </body>
 * // </html>
 *
 * // Removing all of the `<form>` tags in the document.
 * removeForms(document);
 *
 * // The HTML markup after removing all of the `<form>` tags in the document:
 * //
 * // <html>
 * //   <body>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function removeForms(document) {
    removeElementsByTagName(document, 'form');
}
exports.removeForms = removeForms;
/**
 * Removes all attributes from the `<form>` elements from the document.
 *
 * @command **`--remove-forms-attributes`**
 * @example
 * ```typescript
 * // The HTML markup before removing all of the `<form>` tag attributes in the
 * // document:
 * //
 * // <html>
 * //   <body>
 * //     <form method="POST">
 * //       <input type="submit">
 * //     </form>
 * //   </body>
 * // </html>
 *
 * // Removing all of the `<form>` tag attributes in the document.
 * removeFormAttributes(document);
 *
 * // The HTML markup after removing all of the `<form>` tag attributes in the
 * // document:
 * //
 * // <html>
 * //   <body>
 * //     <form>
 * //       <input type="submit">
 * //     </form>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function removeFormAttributes(document) {
    // Getting all of the `<form>` elements in the document.
    const formElements = [...document.getElementsByTagName('form')];
    // For all of the `<form>` elements, removing all of the attributes on the
    // element.
    for (const formElement of formElements) {
        const attributes = formElement.getAttributeNames();
        for (const attribute of attributes) {
            formElement.removeAttribute(attribute);
        }
    }
}
exports.removeFormAttributes = removeFormAttributes;
/**
 * Removes all `<form>` tags from forms, but does not remove the child elements
 * of the form, keeping the child elements in place.
 *
 * @command **`--remove-form-tags-only`**
 * @example
 * ```typescript
 * // The HTML markup before removing all of the `<form>` tags, but none of the
 * // child tags, in the document:
 * //
 * // <html>
 * //   <body>
 * //     <form method="POST">
 * //       <input type="submit">
 * //     </form>
 * //   </body>
 * // </html>
 *
 * // Removing all of the `<form>` tags, but none of the child tags, in the
 * // document.
 * removeFormTagsOnly(document);
 *
 * // The HTML markup after removing all of the `<form>` tags, but none of the
 * // child tags, in the document:
 * //
 * // <html>
 * //   <body>
 * //       <input type="submit">
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function removeFormTagsOnly(document) {
    // Getting all of the `<form>` elements in the document.
    const formElements = [...document.getElementsByTagName('form')];
    // Essentially deleting the form tag by replacing it's outerHTML with it's
    // innerHTML.
    for (const formElement of formElements) {
        formElement.outerHTML = formElement.innerHTML;
    }
}
exports.removeFormTagsOnly = removeFormTagsOnly;
/**
 * Removes all `<meta>` tags from the document that don't have an effect on the
 * document's rendering or security features.
 *
 * @command **`--remove-non-display-meta-tags`**
 * @example
 * ```typescript
 * // The HTML markup before removing all of the non-display `<meta>` tags in
 * // the document:
 * //
 * // <html>
 * //   <head>
 * //     <meta charset="utf8">
 * //     <meta hello="world">
 * //   </head>
 * // </html>
 *
 * // Removing all of the non-display `<meta>` tags in the document.
 * removeNonDisplayMetaTags(document);
 *
 * // The HTML markup after removing all of the non-display `<meta>` tags in
 * // the document:
 * //
 * // <html>
 * //   <head>
 * //     <meta charset="utf8">
 * //   </head>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function removeNonDisplayMetaTags(document) {
    // Getting an array of CSS selectors for `<meta>` tags that should be kept
    // in the document.
    const metaCssSelectorAllowlist = [
        'meta[viewport]',
        'meta[charset]',
        "meta[http-equiv='content-security-policy']",
        "meta[http-equiv='content-type']",
        "meta[http-equiv='default-style']",
    ];
    // Creating a set of all `<meta>` elements whose selector is included in the
    // allow list.
    const allowedElementsSet = new Set();
    for (const metaCssSelector of metaCssSelectorAllowlist) {
        const metaSelectorElements = [
            ...document.querySelectorAll(metaCssSelector),
        ];
        for (const element of metaSelectorElements) {
            allowedElementsSet.add(element);
        }
    }
    // Getting all of the `<meta>` elements in the document, and removing every
    // one that is not in the allow list.
    const allowedElementsArray = [...allowedElementsSet];
    const metaElements = [...document.getElementsByTagName('meta')];
    for (const metaElement of metaElements) {
        if (!allowedElementsArray.includes(metaElement)) {
            metaElement.remove();
        }
    }
}
exports.removeNonDisplayMetaTags = removeNonDisplayMetaTags;
/**
 * Removes all `<link>` tags from the document that don't have an effect on the
 * document's rendering or security features.
 *
 * @command **`--remove-non-display-link-tags`**
 * @example
 * ```typescript
 * // The HTML markup before removing all of the non-display `<link>` tags in
 * // the document:
 * //
 * // <html>
 * //   <head>
 * //     <link rel="stylesheet" href="./styles.css">
 * //     <link rel="canonical" href="">
 * //   </head>
 * // </html>
 *
 * // Removing all of the non-display `<link>` tags in the document.
 * removeNonDisplayLinkTags(document);
 *
 * // The HTML markup after removing all of the non-display `<link>` tags in
 * // the document:
 * //
 * // <html>
 * //   <head>
 * //     <link rel="stylesheet" href="./styles.css">
 * //   </head>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function removeNonDisplayLinkTags(document) {
    // Getting an array of CSS selectors for `<link>` tags that should be kept
    // in the document.
    const linkCssSelectorAllowlist = [
        "link[rel='stylesheet']",
        "link[rel='alternate stylesheet']",
        "link[rel='icon']",
        "link[rel='shortcut icon']",
        "link[rel='apple-touch-icon']",
        "link[rel='apple-touch-startup-image']",
    ];
    // Creating a set of all `<link>` elements whose selector is included in the
    // allow list.
    const allowedElementsSet = new Set();
    for (const linkCssSelector of linkCssSelectorAllowlist) {
        const linkSelectorElements = [
            ...document.querySelectorAll(linkCssSelector),
        ];
        for (const linkElement of linkSelectorElements) {
            allowedElementsSet.add(linkElement);
        }
    }
    // Getting all of the `<link>` elements in the document, and removing every
    // one that is not in the allow list.
    const allowedElementsArray = [...allowedElementsSet];
    const linkElements = [...document.getElementsByTagName('link')];
    for (const linkElement of linkElements) {
        if (!allowedElementsArray.includes(linkElement)) {
            linkElement.remove();
        }
    }
}
exports.removeNonDisplayLinkTags = removeNonDisplayLinkTags;
/**
 * Removes all `<meta>` tags with embedded page refresh instructions.
 *
 * @command **`--remove-meta-refresh-tag`**
 * @example
 * ```typescript
 * // The HTML markup before removing the refresh `<meta>` tag in the document:
 * //
 * // <html>
 * //   <head>
 * //     <meta http-equiv="refresh">
 * //   </head>
 * // </html>
 *
 * // Removing the refresh `<meta>` tag in the document.
 * removeMetaRefreshTag(document);
 *
 * // The HTML markup after removing the refresh `<meta>` tag in the document:
 * //
 * // <html>
 * //   <head>
 * //   </head>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function removeMetaRefreshTag(document) {
    // Removing the `<meta>` tags with attributes that refresh the page.
    removeElementsByCssSelector(document, 'meta[http-equiv="refresh"]');
}
exports.removeMetaRefreshTag = removeMetaRefreshTag;
/**
 * Removes all `href` attributes from the `<a>` tags from the document, except
 * for `href` attributes that reference inline elements in the document.
 *
 * @command **`--remove-non-inline-anchor-hrefs`**
 * @example
 * ```typescript
 * // The HTML markup before removing the non-inline anchor `href` attributes
 * // in the document:
 * //
 * // <html>
 * //   <body>
 * //     <a href="http://example.com">Hello</a>
 * //     <a href="#hello">World</a>
 * //     <p id="hello">Hello, World</p>
 * //   </body>
 * // </html>
 *
 * // Removing the non-inline anchor `href` attributes in the document.
 * removeNonInlineAnchorHrefs(document);
 *
 * // The HTML markup after removing the non-inline anchor `href` attributes
 * // in the document:
 * //
 * // <html>
 * //   <body>
 * //     <a>Hello</a>
 * //     <a href="#hello">World</a>
 * //     <p id="hello">Hello, World</p>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function removeNonInlineAnchorHrefs(document) {
    var _a;
    // Getting all of the anchor `<a>` elements.
    const anchorElements = [...document.getElementsByTagName('a')];
    // For each anchor element, removing `href` attributes that contain links to
    // that are not internal links (links to sections within the page).
    for (const anchorElement of anchorElements) {
        // Getting the `href` attribute and checking if it contains an inline link
        // hash.
        const href = (_a = anchorElement.getAttribute('href')) !== null && _a !== void 0 ? _a : '';
        const containsInlineHash = href.includes('#');
        // If the `href` doesn't contain an inline hash, simply remove this
        // attribute from the document.
        if (!containsInlineHash) {
            anchorElement.removeAttribute('href');
        }
        // If the `href` does include an inline hash, get the hash, check if an
        // element exists with a corresponding ID, and if so, set the `href` to that
        // ID. Otherwise, remove the `href` attribute altogether.
        if (containsInlineHash) {
            // Getting the ID from the hash and getting the element by that ID.
            const id = href.split('#')[1];
            const element = document.getElementById(id);
            // If no element in the document contains that ID, remove the `href`
            // attribute. Otherwise, set the `href` attribute to link to that
            // element.
            if (element === null) {
                anchorElement.removeAttribute('href');
            }
            else {
                anchorElement.setAttribute('href', `#${id}`);
            }
        }
    }
}
exports.removeNonInlineAnchorHrefs = removeNonInlineAnchorHrefs;
/**
 * Removes all `href` attributes from the `<a>` tags from the document.
 *
 * @command **`--remove-anchor-hrefs`**
 * @example
 * ```typescript
 * // The HTML markup before removing the anchor `href` attributes in the
 * // document:
 * //
 * // <html>
 * //   <body>
 * //     <a href="http://example.com">Hello</a>
 * //     <a href="#hello">World</a>
 * //     <p id="hello">Hello, World</p>
 * //   </body>
 * // </html>
 *
 * // Removing the anchor `href` attributes in the document.
 * removeNonInlineAnchorHrefs(document);
 *
 * // The HTML markup after removing the anchor `href` attributes in the
 * // document:
 * //
 * // <html>
 * //   <body>
 * //     <a>Hello</a>
 * //     <a>World</a>
 * //     <p id="hello">Hello, World</p>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function removeAnchorHrefs(document) {
    // Getting all of the anchor `<a>` elements.
    const anchorElements = [...document.getElementsByTagName('a')];
    // Removing all `href` attributes from all these elements.
    for (const anchorElement of anchorElements) {
        anchorElement.removeAttribute('href');
    }
}
exports.removeAnchorHrefs = removeAnchorHrefs;
/**
 * Removes all attributes from all elements in the document whose value
 * provided in the attribute is the same as the default attribute value. For
 * example, the attribute `target` on the `<a>` tag defaults to `_self`. If
 * the element `<a target="_self">` is found in the document, the `target`
 * attribute will be removed as with the value `_self` it is redundant, and so
 * will become `<a>` in this scenario.
 *
 * @command **`--remove-default-attributes`**
 * @example
 * ```typescript
 * // The HTML markup before removing the default attributes for all tags in
 * // the document:
 * //
 * // <html>
 * //   <body>
 * //     <script type="text/javascript">
 * //       console.log('Hello, World')
 * //     </script>
 * //   </body>
 * // </html>
 *
 * // Removing the default attributes for all tags in the document.
 * removeDefaultAttributes(document);
 *
 * // The HTML markup after removing the default attributes for all tags in the
 * // document:
 * //
 * // <html>
 * //   <body>
 * //     <script>
 * //       console.log('Hello, World')
 * //     </script>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function removeDefaultAttributes(document) {
    // Creating a data structure which contains a mapping of tag to arrays of
    // objects containing attributes and their default values.
    const defaultTagAttributeMap = {
        a: [
            {
                attr: 'target',
                default: '_self',
            },
        ],
        area: [
            {
                attr: 'target',
                default: '_self',
            },
        ],
        audio: [
            {
                attr: 'muted',
                default: 'false',
            },
            {
                attr: 'preload',
                default: 'metadata',
            },
        ],
        base: [
            {
                attr: 'target',
                default: '_self',
            },
        ],
        basefont: [
            {
                attr: 'size',
                default: '3',
            },
        ],
        bdi: [
            {
                attr: 'dir',
                default: 'auto',
            },
        ],
        button: [
            {
                attr: 'formenctype',
                default: 'application/x-www-form-urlencoded',
            },
            {
                attr: 'formtarget',
                default: '_self',
            },
            {
                attr: 'type',
                default: 'submit',
            },
        ],
        canvas: [
            {
                attr: 'height',
                default: '150',
            },
            {
                attr: 'width',
                default: '300',
            },
        ],
        col: [
            {
                attr: 'span',
                default: '1',
            },
        ],
        colgroup: [
            {
                attr: 'span',
                default: '1',
            },
        ],
        dd: [
            {
                attr: 'nowrap',
                default: 'no',
            },
        ],
        font: [
            {
                attr: 'nowrap',
                default: 'no',
            },
            {
                attr: 'size',
                default: '3',
            },
        ],
        form: [
            {
                attr: 'autocapitalize',
                default: 'sentences',
            },
            {
                attr: 'enctype',
                default: 'application/x-www-form-urlencoded',
            },
            {
                attr: 'target',
                default: '_self',
            },
        ],
        hr: [
            {
                attr: 'align',
                default: 'left',
            },
        ],
        iframe: [
            {
                attr: 'frameborder',
                default: '1',
            },
            {
                attr: 'height',
                default: '150',
            },
            {
                attr: 'loading',
                default: 'eager',
            },
            {
                attr: 'referrerpolicy',
                default: 'no-referrer-when-downgrade',
            },
            {
                attr: 'width',
                default: '300',
            },
        ],
        img: [
            {
                attr: 'align',
                default: 'bottom',
            },
            {
                attr: 'decoding',
                default: 'auto',
            },
            {
                attr: 'loading',
                default: 'eager',
            },
            {
                attr: 'referrerpolicy',
                default: 'no-referrer-when-downgrade',
            },
            {
                attr: 'srcset',
                default: '1x',
            },
        ],
        input: [
            {
                attr: 'type',
                default: 'text',
            },
            {
                attr: 'size',
                default: '20',
            },
            {
                attr: 'size',
                default: 'pixel',
            },
            {
                attr: 'step',
                default: '1',
            },
            {
                attr: 'step',
                default: 'pixel',
            },
        ],
        keygen: [
            {
                attr: 'challenge',
                default: '',
            },
            {
                attr: 'keytype',
                default: 'RSA',
            },
        ],
        link: [
            {
                attr: 'charset',
                default: 'iso-8859-1',
            },
        ],
        marquee: [
            {
                attr: 'behavior',
                default: 'scroll',
            },
            {
                attr: 'direction',
                default: 'left',
            },
            {
                attr: 'loop',
                default: '−1',
            },
            {
                attr: 'scrollamount',
                default: '6',
            },
            {
                attr: 'scrolldelay',
                default: '85',
            },
        ],
        math: [
            {
                attr: 'display',
                default: 'inline',
            },
            {
                attr: 'overflow',
                default: 'linebreak',
            },
        ],
        menuitem: [
            {
                attr: 'type',
                default: 'command',
            },
        ],
        meter: [
            {
                attr: 'min',
                default: '0',
            },
        ],
        ol: [
            {
                attr: 'type',
                default: '1',
            },
        ],
        param: [
            {
                attr: 'valuetype',
                default: 'data',
            },
        ],
        progress: [
            {
                attr: 'max',
                default: '1',
            },
        ],
        select: [
            {
                attr: 'size',
                default: '0',
            },
            {
                attr: 'size',
                default: '1',
            },
        ],
        script: [
            {
                attr: 'referrerpolicy',
                default: 'no-referrer-when-downgrade',
            },
            {
                attr: 'type',
                default: 'application/javascript',
            },
            {
                attr: 'type',
                default: 'application/ecmascript',
            },
            {
                attr: 'type',
                default: 'application/x-ecmascript',
            },
            {
                attr: 'type',
                default: 'application/x-javascript',
            },
            {
                attr: 'type',
                default: 'text/javascript',
            },
            {
                attr: 'type',
                default: 'text/ecmascript',
            },
            {
                attr: 'type',
                default: 'text/javascript1.0',
            },
            {
                attr: 'type',
                default: 'text/javascript1.1',
            },
            {
                attr: 'type',
                default: 'text/javascript1.2',
            },
            {
                attr: 'type',
                default: 'text/javascript1.2',
            },
            {
                attr: 'type',
                default: 'text/javascript1.3',
            },
            {
                attr: 'type',
                default: 'text/javascript1.4',
            },
            {
                attr: 'type',
                default: 'text/javascript1.5',
            },
            {
                attr: 'type',
                default: 'text/jscript',
            },
            {
                attr: 'type',
                default: 'text/livescript',
            },
            {
                attr: 'type',
                default: 'text/x-ecmascript',
            },
            {
                attr: 'type',
                default: 'text/x-javascript',
            },
        ],
        source: [
            {
                attr: 'srcset',
                default: '1x',
            },
        ],
        style: [
            {
                attr: 'type',
                default: 'text/css',
            },
            {
                attr: 'media',
                default: 'all',
            },
        ],
        svg: [
            {
                attr: 'contentScriptType',
                default: 'application/ecmascript',
            },
            {
                attr: 'contentStyleType',
                default: 'text/css',
            },
            {
                attr: 'height',
                default: 'auto',
            },
            {
                attr: 'preserveAspectRatio',
                default: 'xMidYMid meet',
            },
            {
                attr: 'width',
                default: 'auto',
            },
            {
                attr: 'x',
                default: '0',
            },
            {
                attr: 'y',
                default: '0',
            },
        ],
        table: [
            {
                attr: 'rules',
                default: 'none',
            },
        ],
        td: [
            {
                attr: 'align',
                default: 'left',
            },
            {
                attr: 'colspan',
                default: '1',
            },
            {
                attr: 'rowspan',
                default: '1',
            },
        ],
        textarea: [
            {
                attr: 'cols',
                default: '20',
            },
            {
                attr: 'wrap',
                default: 'soft',
            },
        ],
        th: [
            {
                attr: 'align',
                default: 'left',
            },
            {
                attr: 'colspan',
                default: '1',
            },
            {
                attr: 'rowspan',
                default: '1',
            },
            {
                attr: 'scope',
                default: 'auto',
            },
        ],
        track: [
            {
                attr: 'kind',
                default: 'subtitles',
            },
        ],
        video: [
            {
                attr: 'muted',
                default: 'false',
            },
            {
                attr: 'preload',
                default: 'metadata',
            },
        ],
    };
    // For each tag in the default attribute data structure, removing any
    // attributes where value is equal to the default value.
    for (const tagName in defaultTagAttributeMap) {
        // Getting all of the elements of a given tag.
        const elements = [...document.getElementsByTagName(tagName)];
        for (const element of elements) {
            for (const attributeGroup of defaultTagAttributeMap[tagName]) {
                // Getting the attribute and default value from the map.
                const attribute = attributeGroup.attr;
                const defaultValue = attributeGroup.default;
                // If the element has the specified attribute, and the value of the
                // attribute is the same as the default value, remove that attribute
                // from the element.
                if (element.hasAttribute(attribute) === true
                    && element.getAttribute(attribute) === defaultValue) {
                    element.removeAttribute(attributeGroup.attr);
                }
            }
        }
    }
}
exports.removeDefaultAttributes = removeDefaultAttributes;
/**
 * Removes the WAI-ARIA attributes from all elements, including the `role`
 * attributes.
 *
 * @command **`--remove-aria-attributes`**
 * @example
 * ```typescript
 * // The HTML markup before removing the WAI-ARIA attributes for all tags in
 * // the document:
 * //
 * // <html>
 * //   <body>
 * //     <nav role="navigation"></nav>
 * //   </body>
 * // </html>
 *
 * // Removing the WAI-ARIA attributes for all tags in the document.
 * removeAriaAttributes(document);
 *
 * // The HTML markup after removing the WAI-ARIA attributes for all tags in the
 * // document:
 * //
 * // <html>
 * //   <body>
 * //     <nav></nav>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 *
 * @note always consider keeping the WAI-ARIA attributes for people who use
 * assistive technologies. This function is mainly used to see how much
 * minification can be done. You should consider WAI-ARIA attributes as vital
 * pieces of content on the document and avoid removing them.
 */
function removeAriaAttributes(document) {
    // Getting all of the elements in the document.
    const elements = [...document.getElementsByTagName('*')];
    // For each element, removing the ARIA attributes.
    for (const element of elements) {
        // Getting an array of all attributes on the element.
        const attributes = element.getAttributeNames();
        // Filtering for an array of attributes that starts with `aria-`, as these
        // would indicate they are WAI-ARIA attributes.
        const ariaAttributes = attributes.filter((attribute) => {
            return attribute.toLowerCase().startsWith('aria-');
        });
        // Removing all of the ARIA attributes.
        for (const ariaAttribute of ariaAttributes) {
            element.removeAttribute(ariaAttribute);
        }
    }
    // Getting all elements with a `role` attribute, and removing this attribute.
    const roleAttributeElements = [
        ...document.querySelectorAll('[role]'),
    ];
    for (const element of roleAttributeElements) {
        element.removeAttribute('role');
    }
}
exports.removeAriaAttributes = removeAriaAttributes;
/**
 * Removes the Data attributes from all elements.
 *
 * @command **`--remove-data-attributes`**
 * @example
 * ```typescript
 * // The HTML markup before removing the Data attributes for all tags in
 * // the document:
 * //
 * // <html>
 * //   <body>
 * //     <p data-paragraph-index="123"></p>
 * //   </body>
 * // </html>
 *
 * // Removing the Data attributes for all tags in the document.
 * removeDataAttributes(document);
 *
 * // The HTML markup after removing the Data attributes for all tags in the
 * // document:
 * //
 * // <html>
 * //   <body>
 * //     <p data-paragraph-index="123"></p>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function removeDataAttributes(document) {
    // Getting all of the elements in the document.
    const allElements = [...document.getElementsByTagName('*')];
    // For each element, removing the Data attributes.
    for (const element of allElements) {
        // Getting an array of all attributes on the element.
        const attributes = element.getAttributeNames();
        // Filtering for an array of attributes that starts with `data-`, as these
        // would indicate they are Data attributes.
        const dataAttributes = attributes.filter((attribute) => {
            return attribute.toLowerCase().startsWith('data-');
        });
        // Removing all of the Data attributes.
        for (const dataAttribute of dataAttributes) {
            element.removeAttribute(dataAttribute);
        }
    }
}
exports.removeDataAttributes = removeDataAttributes;
/**
 * Removes the `integrity` check and `crossorigin` attributes from all elements.
 *
 * @command **`--remove-integrity-check-attributes`**
 * @example
 * ```typescript
 * // The HTML markup before removing the integrity check attributes for all
 * // tags in the document:
 * //
 * // <html>
 * //   <head>
 * //     <link rel="stylesheet" href="./styles.css" integrity="sha384-123">
 * //   </head>
 * // </html>
 *
 * // Removing the Data attributes for all tags in the document.
 * removeIntegrityCheckAttributes(document);
 *
 * // The HTML markup after removing the integrity check attributes for all
 * // tags in the document:
 * //
 * // <html>
 * //   <head>
 * //     <link rel="stylesheet" href="./styles.css">
 * //   </head>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function removeIntegrityCheckAttributes(document) {
    // Getting all of the elements with an `integrity` attribute.
    const integrityElements = [
        ...document.querySelectorAll('[integrity]'),
    ];
    // Removing all of the `integrity` attributes from the elements.
    for (const element of integrityElements) {
        element.removeAttribute('integrity');
    }
    // Getting all of the elements with an `integrity` attribute.
    const crossOriginElements = [
        ...document.querySelectorAll('[crossorigin]'),
    ];
    // Removing all of the `crossorigin` attributes from the elements.
    for (const element of crossOriginElements) {
        element.removeAttribute('crossorigin');
    }
}
exports.removeIntegrityCheckAttributes = removeIntegrityCheckAttributes;
/**
 * Removes all elements on the page that are empty and have no effect on the
 * HTML page. For example, the following HTML will all be removed:
 *
 * ```
 * <meta>
 * <link>
 * <script></script>
 * <style></style>
 * <title></title>
 * ```
 *
 * as all of these tags contain no content that have an effect on the page.
 *
 * @command **`--remove-empty-non-display-elements`**
 * @example
 * ```typescript
 * // The HTML markup before removing the empty non-display tags in the
 * // document:
 * //
 * // <html>
 * //   <head>
 * //     <link>
 * //     <script>
 * //       console.log('Hello, World');
 * //     </script>
 * //     <script></script>
 * //   </head>
 * // </html>
 *
 * // Removing all of the empty non-display all tags in the document.
 * removeEmptyNonDisplayElements(document);
 *
 * // The HTML markup after removing the empty non-display tags in the
 * // document:
 * //
 * // <html>
 * //   <head>
 * //     <script>
 * //       console.log('Hello, World');
 * //     </script>
 * //   </head>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function removeEmptyNonDisplayElements(document) {
    // Creating an array of self-closing tags that have no effect on the page
    // when empty.
    const nonDisplaySelfClosingTags = [
        'link',
        'meta',
    ];
    // For each of the tags, get all elements with that tag, and if the element
    // has no attributes, remove that tag from the document.
    for (const nonDisplaySelfClosingTag of nonDisplaySelfClosingTags) {
        // Getting all elements of the given tag.
        const elements = [
            ...document.getElementsByTagName(nonDisplaySelfClosingTag),
        ];
        // For each element, if the element has no attributes, remove it.
        for (const element of elements) {
            const attributes = element.getAttributeNames();
            if (attributes.length === 0) {
                element.remove();
            }
        }
    }
    // Getting all `<script>` tags from the document.
    const scriptElements = [
        ...document.getElementsByTagName('script'),
    ];
    // For each `<script>`, if the script has no `src` attribute and no innerHTML
    // content, remove the `<script>` from the document.
    for (const scriptElement of scriptElements) {
        const src = scriptElement.getAttribute('src');
        const innerHTML = scriptElement.innerHTML.trim();
        if (src === null && innerHTML === '') {
            scriptElement.remove();
        }
    }
    // Creating an array of elements that will be removed if they do not contain
    // any innerHTML content. Note that ordering is important here, as the
    // sectioning elements must be removed last after non-sectioning elements are
    // removed.
    const nonDisplayElementTags = [
        // Non-sectioning elements.
        'title',
        'style',
        'form',
        // Sectioning elements.
        'head',
        'body',
    ];
    // For each of the tags, get all elements with that tag, and if the element
    // has no innerHTML, remove that tag from the document.
    for (const nonDisplayElementTag of nonDisplayElementTags) {
        const elements = [
            ...document.getElementsByTagName(nonDisplayElementTag),
        ];
        for (const element of elements) {
            if (element.innerHTML.trim() === '') {
                element.remove();
            }
        }
    }
}
exports.removeEmptyNonDisplayElements = removeEmptyNonDisplayElements;
/**
 * Removes tags from the document using custom tag names.
 *
 * @command **`--remove-custom-tags-by-name`**
 * @example
 * ```typescript
 * // The HTML markup before removing the tags in the document:
 * //
 * // <html>
 * //   <body>
 * //     <hello>Hello</hello>
 * //     <world>World</world>
 * //   </body>
 * // </html>
 *
 * // Removing the tags in the document using a custom tag name.
 * removeCustomTagsByName(document, ['hello', 'world']);
 *
 * // The HTML markup after removing the tags in the document:
 * //
 * // <html>
 * //   <body>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 * @param tagNames the tags that will be removed from the Document.
 */
function removeCustomTagsByName(document, tagNames) {
    // For each tag, removing all elements of that given tag.
    for (const tagName of tagNames) {
        const elements = [...document.getElementsByTagName(tagName)];
        for (const element of elements) {
            element.remove();
        }
    }
}
exports.removeCustomTagsByName = removeCustomTagsByName;
/**
 * Removes tags from the document using custom CSS selectors.
 *
 * @command **`--remove-custom-tags-by-css-selector`**
 * @example
 * ```typescript
 * // The HTML markup before removing the tags in the document:
 * //
 * // <html>
 * //   <body>
 * //     <p id="hello">Hello</p>
 * //     <p class="world">World</p>
 * //   </body>
 * // </html>
 *
 * // Removing the tags in the document using a custom CSS selectors.
 * removeCustomTagsByCssSelector(document, ['#hello', '.world']);
 *
 * // The HTML markup after removing the tags in the document:
 * //
 * // <html>
 * //   <body>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 * @param cssSelectors the css selector that will be used to remove tags from
 * the document.
 */
function removeCustomTagsByCssSelector(document, cssSelectors) {
    // For each selector, removing all elements of that given selector.
    for (const cssSelector of cssSelectors) {
        const elements = [...document.querySelectorAll(cssSelector)];
        for (const element of elements) {
            element.remove();
        }
    }
}
exports.removeCustomTagsByCssSelector = removeCustomTagsByCssSelector;
//# sourceMappingURL=general-markup-removers.js.map