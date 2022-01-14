/**
 * Code for removing various elements, attributes, source code, and other
 * markup throughout the document.
 */
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
export declare function removeElementsByTagName(document: Document, tagName: string): void;
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
export declare function removeElementsByCssSelector(document: Document, cssSelector: string): void;
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
export declare function removeStylesTags(document: Document): void;
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
export declare function removeAlternativeStylesTags(document: Document): void;
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
export declare function removeInlineStyles(document: Document): void;
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
export declare function removeStyles(document: Document): void;
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
export declare function removeScriptTags(document: Document): void;
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
export declare function removeNoscriptTags(document: Document): void;
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
export declare function removeInlineScripts(document: Document): void;
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
export declare function removeHrefScripts(document: Document): void;
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
export declare function removeScripts(document: Document): void;
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
export declare function removeImageSrcs(document: Document): void;
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
export declare function removeImageSrcsets(document: Document): void;
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
export declare function removeImageAlts(document: Document): void;
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
export declare function removeImageAttributes(document: Document): void;
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
export declare function removeCssImages(document: Document): void;
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
export declare function removeImages(document: Document): void;
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
export declare function removeFrames(document: Document): void;
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
export declare function removeVideoSrcs(document: Document): void;
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
export declare function removeVideos(document: Document): void;
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
export declare function removeAudioSrcs(document: Document): void;
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
export declare function removeAudio(document: Document): void;
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
export declare function removeFonts(document: Document): void;
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
export declare function removeCursors(document: Document): void;
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
export declare function removeFavicons(document: Document): void;
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
export declare function removeCanvas(document: Document): void;
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
export declare function removeConditionalComments(document: Document): void;
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
export declare function removeNonConditionalComments(document: Document): void;
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
export declare function removeComments(document: Document): void;
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
export declare function removeForms(document: Document): void;
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
export declare function removeFormAttributes(document: Document): void;
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
export declare function removeFormTagsOnly(document: Document): void;
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
export declare function removeNonDisplayMetaTags(document: Document): void;
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
export declare function removeNonDisplayLinkTags(document: Document): void;
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
export declare function removeMetaRefreshTag(document: Document): void;
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
export declare function removeNonInlineAnchorHrefs(document: Document): void;
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
export declare function removeAnchorHrefs(document: Document): void;
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
export declare function removeDefaultAttributes(document: Document): void;
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
export declare function removeAriaAttributes(document: Document): void;
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
export declare function removeDataAttributes(document: Document): void;
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
export declare function removeIntegrityCheckAttributes(document: Document): void;
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
export declare function removeEmptyNonDisplayElements(document: Document): void;
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
export declare function removeCustomTagsByName(document: Document, tagNames: string[]): void;
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
export declare function removeCustomTagsByCssSelector(document: Document, cssSelectors: string[]): void;
//# sourceMappingURL=general-markup-removers.d.ts.map