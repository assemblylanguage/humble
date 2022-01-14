/**
 * Code for sanitizing HTML using the DOM Purify library.
 */

/* eslint-disable import/newline-after-import */
/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-var-requires */

import { JSDOM } from 'jsdom';
const createDOMPurify = require('dompurify');

/**
 * Sanitizes HTML using the DOM Purify library.
 *
 * @command **`--dom-purify`**
 * @example see `https://github.com/cure53/DOMPurify` for additional
 * information and examples of DOM Purify sanitizing.
 *
 * @param html the HTML that will be sanitized.
 * @returns the sanitized HTML.
 */
export function purifyHtml(
  html: string,
) : string {
  // Sanitizing the HTML using DOM Purify.
  const { window } = new JSDOM('');
  const DOMPurify = createDOMPurify(window);
  const sanitizedHtml = DOMPurify.sanitize(html);

  return sanitizedHtml;
}
