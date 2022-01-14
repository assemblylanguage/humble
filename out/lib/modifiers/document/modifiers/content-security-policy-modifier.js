"use strict";
/**
 * Code for modifying the Content-Security-Policy `<meta>` tag in the document
 * in order to block on various resources in the document from loading or
 * executing.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFontCSP = exports.addAudioCSP = exports.addVideoCSP = exports.addFrameCSP = exports.addImageCSP = exports.addScriptCSP = exports.addStyleCSP = exports.addContentSecurityPolicyBlock = void 0;
/**
 * Adds a new `Content-Security-Policy` block to the document. If a CSP
 * `<meta>` tag doesn't currently exist, creates the element and adds it to the
 * `<head>` tag.
 *
 * @param document the document that will be modified in place.
 * @param cspPolicy the name of the CSP policy.
 */
function addContentSecurityPolicyBlock(document, cspPolicy) {
    // Get the existing Content-Security-Policy `<meta>` tag
    const existingCspMetaElement = document
        .querySelector('meta[http-equiv="Content-Security-Policy"]');
    // If an existing CSP tag exists, add the policy to the existing CSP tag.
    if (existingCspMetaElement !== null) {
        const existingCspAttribute = existingCspMetaElement
            .getAttribute('content');
        if (existingCspAttribute === null || existingCspAttribute.length === 0) {
            existingCspMetaElement.setAttribute('content', `${cspPolicy} none`);
        }
        else {
            // Only adding the CSP if one doesn't currently exist for the selected
            // policy
            const existingCspPolicy = existingCspMetaElement
                .getAttribute('content');
            if (!existingCspPolicy.includes(cspPolicy)) {
                existingCspMetaElement.setAttribute('content', `${existingCspAttribute}; ${cspPolicy} none`);
            }
        }
        // If no CSP tag currently exists, create a new one and set the CSP policy.
    }
    else {
        // Creating the new CSP `<meta>` element.
        const newCspMetaElement = document.createElement('meta');
        newCspMetaElement.setAttribute('http-equiv', 'Content-Security-Policy');
        newCspMetaElement.setAttribute('content', `${cspPolicy} none`);
        // Adding the CSP `<meta>` element to the `<head>` tag, creating the
        // `<head>` tag if it doesn't already exist.
        const headTag = document.querySelector('head');
        if (headTag !== null) {
            headTag.innerHTML = `${newCspMetaElement.outerHTML}${headTag.innerHTML}`;
        }
        else {
            const htmlTag = document.querySelector('html');
            htmlTag.innerHTML = `${htmlTag.innerHTML}`;
            const newHeadTag = document.createElement('head');
            htmlTag.appendChild(newHeadTag);
            newHeadTag.appendChild(newCspMetaElement);
        }
    }
}
exports.addContentSecurityPolicyBlock = addContentSecurityPolicyBlock;
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
function addStyleCSP(document) {
    addContentSecurityPolicyBlock(document, 'style-src');
}
exports.addStyleCSP = addStyleCSP;
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
function addScriptCSP(document) {
    addContentSecurityPolicyBlock(document, 'script-src');
}
exports.addScriptCSP = addScriptCSP;
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
function addImageCSP(document) {
    addContentSecurityPolicyBlock(document, 'img-src');
}
exports.addImageCSP = addImageCSP;
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
function addFrameCSP(document) {
    addContentSecurityPolicyBlock(document, 'frame-src');
}
exports.addFrameCSP = addFrameCSP;
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
function addVideoCSP(document) {
    addContentSecurityPolicyBlock(document, 'media-src');
}
exports.addVideoCSP = addVideoCSP;
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
function addAudioCSP(document) {
    addVideoCSP(document);
}
exports.addAudioCSP = addAudioCSP;
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
function addFontCSP(document) {
    addContentSecurityPolicyBlock(document, 'font-src');
}
exports.addFontCSP = addFontCSP;
//# sourceMappingURL=content-security-policy-modifier.js.map