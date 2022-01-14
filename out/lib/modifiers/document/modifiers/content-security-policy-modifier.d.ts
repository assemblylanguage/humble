/**
 * Code for modifying the Content-Security-Policy `<meta>` tag in the document
 * in order to block on various resources in the document from loading or
 * executing.
 */
/**
 * Adds a new `Content-Security-Policy` block to the document. If a CSP
 * `<meta>` tag doesn't currently exist, creates the element and adds it to the
 * `<head>` tag.
 *
 * @param document the document that will be modified in place.
 * @param cspPolicy the name of the CSP policy.
 */
export declare function addContentSecurityPolicyBlock(document: Document, cspPolicy: string): void;
/**
 * Adds a new `Content-Security-Policy` to block styles from all sources.
 *
 * @command **`--add-style-csp`**
 * @example
 * ```typescript
 * // `<head>` tag before the Content Security Policy is added:
 * //
 * // <html>
 * //   <head></head>
 * // </html>
 *
 * // Adding the Content Security Policy to block document styles.
 * addStyleCSP(document);
 *
 * // After running, the Content Security Policy is added:
 * //
 * // <html>
 * //   <head>
 * //     <meta http-equiv="Content-Security-Policy" content="style-src none">
 * //   </head>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
export declare function addStyleCSP(document: Document): void;
/**
 * Adds a new `Content-Security-Policy` to block scripts from all sources.
 *
 * @command **`--add-script-csp`**
 * @example
 * ```typescript
 * // `<head>` tag before the Content Security Policy is added:
 * //
 * // <html>
 * //   <head></head>
 * // </html>
 *
 * // Adding the Content Security Policy to block document scripts.
 * addStyleCSP(document);
 *
 * // After running the minifier, generic tag names will be minified:
 * //
 * // <html>
 * //   <head>
 * //     <meta http-equiv="Content-Security-Policy" content="script-src none">
 * //   </head>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
export declare function addScriptCSP(document: Document): void;
/**
 * Adds a new `Content-Security-Policy` to block images from all sources.
 *
 * @command **`--add-image-csp`**
 * @example
 * ```typescript
 * // `<head>` tag before the Content Security Policy is added:
 * //
 * // <html>
 * //   <head></head>
 * // </html>
 *
 * // Adding the Content Security Policy to block document images.
 * addImageCSP(document);
 *
 * // After running, the Content Security Policy is added:
 * //
 * // <html>
 * //   <head>
 * //     <meta http-equiv="Content-Security-Policy" content="img-src none">
 * //   </head>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
export declare function addImageCSP(document: Document): void;
/**
 * Adds a new `Content-Security-Policy` to block frames from all sources.
 *
 * @command **`--add-frame-csp`**
 * @example
 * ```typescript
 * // `<head>` tag before the Content Security Policy is added:
 * //
 * // <html>
 * //   <head></head>
 * // </html>
 *
 * // Adding the Content Security Policy to block document frames.
 * addFrameCSP(document);
 *
 * // After running, the Content Security Policy is added:
 * //
 * // <html>
 * //   <head>
 * //     <meta http-equiv="Content-Security-Policy" content="frame-src none">
 * //   </head>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
export declare function addFrameCSP(document: Document): void;
/**
 * Adds a new `Content-Security-Policy` to block media from all sources.
 *
 * @command **`--add-video-csp`**
 * @example
 * ```typescript
 * // `<head>` tag before the Content Security Policy is added:
 * //
 * // <html>
 * //   <head></head>
 * // </html>
 *
 * // Adding the Content Security Policy to block document media.
 * addVideoCSP(document);
 *
 * // After running, the Content Security Policy is added:
 * //
 * // <html>
 * //   <head>
 * //     <meta http-equiv="Content-Security-Policy" content="media-src none">
 * //   </head>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
export declare function addVideoCSP(document: Document): void;
/**
 * Adds a new `Content-Security-Policy` to block media from all sources
 * (aliases the `addVideoCSP` function).
 *
 * @command **`--add-audio-csp`**
 * @example
 * ```typescript
 * // `<head>` tag before the Content Security Policy is added:
 * //
 * // <html>
 * //   <head></head>
 * // </html>
 *
 * // Adding the Content Security Policy to block document media.
 * addAudioCSP(document);
 *
 * // After running, the Content Security Policy is added:
 * //
 * // <html>
 * //   <head>
 * //     <meta http-equiv="Content-Security-Policy" content="media-src none">
 * //   </head>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
export declare function addAudioCSP(document: Document): void;
/**
 * Adds a new `Content-Security-Policy` to block fonts from all sources.
 *
 * @command **`--add-font-csp`**
 * @example
 * ```typescript
 * // `<head>` tag before the Content Security Policy is added:
 * //
 * // <html>
 * //   <head></head>
 * // </html>
 *
 * // Adding the Content Security Policy to block document fonts.
 * addFontCSP(document);
 *
 * // After running, the Content Security Policy is added:
 * //
 * // <html>
 * //   <head>
 * //     <meta http-equiv="Content-Security-Policy" content="font-src none">
 * //   </head>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
export declare function addFontCSP(document: Document): void;
//# sourceMappingURL=content-security-policy-modifier.d.ts.map