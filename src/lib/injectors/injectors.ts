/**
 * Code for injecting various resources and polyfills into the document.
 */

import { ResourceResponse, TransportOptions } from '../resource';
import { fetchResource } from '../transports/index';
import * as utilities from '../utilities';
import html5Polyfill from './injections/html5-polyfill';
import cssFlexboxPolyfill from './injections/css-flexbox-polyfill';
import mediaQueryPolyfill from './injections/media-query-polyfill';
import canvasPolyfill from './injections/canvas-polyfill';
import html5MediaPolyfill from './injections/html5-media-polyfill';
import es5Polyfill from './injections/es5-polyfill';
import base64FlashPlayer from './injections/base64-flash-player';

/**
 * Injects a custom style sheet into the document. The URL of the custom style
 * sheet may be a local resource or a network resource.
 *
 * @command **`--inject-custom-style-sheet`**
 *
 * @param url the URL of the custom style sheet.
 * @param document the document that will be modified in place.
 * @param options additional options used to modify the transport.
 */
export async function injectCustomStyleSheet(
  url: string,
  document: Document,
  options?: TransportOptions,
) : Promise<void> {
  // Getting the protocol and base URL from the URL.
  const protocol: string = utilities.getProtocolFromUrl(url);
  const baseUrl: string = utilities.getBaseUrl(url, protocol);

  // Resolving the URL to an absolute URL.
  const absoluteUrl: string = utilities.resolveAbsoluteUrl(
    url,
    protocol,
    baseUrl,
  );

  // Fetching the injectable CSS from the provided URL.
  const resourceResponse: ResourceResponse = await fetchResource(
    absoluteUrl,
    protocol,
    options,
  );

  // If the fetch was successful, injecting a new `<style>` tag in the `<head>`
  // of the document before any other elements.
  if (resourceResponse.status === true) {
    // Getting the CSS code from the fetch.
    const cssCode: string = resourceResponse.bytes.toString();

    // Injecting the CSS code at the top of the `<head>` tag.
    const headElement: Element = document.querySelector('head');
    headElement.innerHTML = `<style>${cssCode}</style>${headElement.innerHTML}`;
  }
}

/**
 * Injects Alexander Farkas's HTML5 Shiv library into the document for HTML5
 * support in older browsers.
 *
 * @command **`--inject-html5-polyfill`**
 *
 * @param document the document that will be modified in place.
 *
 * @see https://github.com/aFarkas/html5shiv
 */
export function injectHtml5Polyfill(
  document: Document,
) : void {
  // Creating a conditional comment that will hold the HTML5 shiv code. Note
  // the HTML5 shiv code will only execute for IE < 9 browsers.
  const conditionalHtml5PolyfillComment: string = `
    <!--[if lt IE 9]>
      <script type="text/javascript">
        ${html5Polyfill}
      </script>
    <![endif]-->
  `;

  // Injecting the HTML5 shiv code at the bottom of the `<head>` element.
  const headElement: Element = document.querySelector('head');

  headElement.innerHTML += conditionalHtml5PolyfillComment;
}

/**
 * Injects Jonathan Neal's Flexibility Flexbox polyfill library into the
 * document for HTML5 support in older browsers.
 *
 * @command **`--inject-css-flexbox-polyfill`**
 *
 * @param document the document that will be modified in place.
 *
 * @see https://github.com/jonathantneal/flexibility
 */
export function injectCssFlexboxPolyfill(
  document: Document,
) : void {
  // Creating a conditional comment that will hold the flexbox polyfill code.
  // Note the flexbox polyfill code will only execute for IE < 9 browsers.
  const conditionalFlexboxPolyfillComment: string = `
    <!--[if IE]>
      <script type="text/javascript">
        ${cssFlexboxPolyfill}
      </script>
    <![endif]-->
  `;

  // Injecting the flexbox polyfill code at the bottom of the `<head>` element.
  const headElement: Element = document.querySelector('head');

  headElement.innerHTML += conditionalFlexboxPolyfillComment;
}

/**
 * Injects Scott Jehl's Respond.js library into the document for Media Query
 * support in older browsers.
 *
 * @command **`--inject-media-query-polyfill`**
 *
 * @param document the document that will be modified in place.
 *
 * @see https://github.com/scottjehl/Respond
 */
export function injectMediaQueryPolyfill(
  document: Document,
) : void {
  // Creating a conditional comment that will hold the Media Query shim code.
  // Note the Media Query polyfill code will only execute for IE < 9 browsers.
  const conditionalMediaQueryShimComment: string = `
    <!--[if lt IE 9]>
      <script type="text/javascript">
        ${mediaQueryPolyfill}
      </script>
    <![endif]-->
  `;

  // Injecting the Media Query shim code at the end of the `<body>` tag.
  const bodyElement: Element = document.querySelector('body');

  bodyElement.innerHTML += conditionalMediaQueryShimComment;
}

/**
 * Injects Google's ExplorerCanvas library into the document for canvas support
 * in Internet Explorer, with Adobe Flash fallback.
 *
 * @command **`--inject-canvas-polyfill`**
 *
 * @param document the document that will be modified in place.
 *
 * @see https://github.com/arv/explorercanvas
 */
export function injectCanvasPolyfill(
  document: Document,
) : void {
  // Creating a conditional comment that will hold the ExplorerCanvas polyfill
  // code. Note the ExplorerCanvas shim code will only execute for IE browsers.
  const conditionalCanvasShimComment: string = `
    <!--[if IE]>
      <script type="text/javascript">
        ${canvasPolyfill}
      </script>
    <![endif]-->
  `;

  // Injecting the ExplorerCanvas shim code at the bottom of the `<head>`
  // element.
  const headElement: Element = document.querySelector('head');

  headElement.innerHTML += conditionalCanvasShimComment;
}

/**
 * Injects Dave Hall's HTML5 Media library into the document for `<audio>` and
 * `<video>` support in Internet Explorer, with Adobe Flash fallbacks.
 *
 * @command **`--inject-html5-media-polyfill`**
 *
 * @param document the document that will be modified in place.
 *
 * @see https://github.com/etianen/html5media
 */
export function injectHtml5MediaPolyfill(
  document: Document,
) : void {
  // Creating a conditional comment that will hold the HTML Media polyfill
  // code. Note the HTML Media polyfill code will only execute for IE browsers.
  const conditionalVideoAudioComment: string = `
    <!--[if IE]>
      <script type="text/javascript">
        ${html5MediaPolyfill}
      </script>
    <![endif]-->
  `;

  // Injecting the HTML Media polyfill code at the bottom of the `<head>`
  // element.
  const headElement: Element = document.querySelector('head');

  headElement.innerHTML += conditionalVideoAudioComment;
}

/**
 * Injects Kristopher Michael Kowal's ES5 Shim polyfill library into the
 * document for polyfilling some ES5 functions into ES3.
 *
 * @command **`--inject-es5-polyfill`**
 *
 * @param document the document that will be modified in place.
 *
 * @see https://github.com/es-shims/es5-shim
 */
export function injectEs5Polyfill(
  document: Document,
) : void {
  // Creating a `<script>` tag that will hold the ES5 polyfill code.
  const es5PolyfillScript: string = `
    <script type="text/javascript">
      ${es5Polyfill}
    </script>
  `;

  // Injecting the ES5 shim code at the bottom of the `<head>` element.
  const headElement: Element = document.querySelector('head');

  headElement.innerHTML += es5PolyfillScript;
}

/**
 * Injects a Ruffle Flash Player into the document that will automatically run
 * any SWF files found in the document.
 *
 * @command **`--inject-flash-player`**
 *
 * @param document the document that will be modified in place.
 *
 * @see https://ruffle.rs/
 * @see https://github.com/ruffle-rs/ruffle
 * @see https://github.com/ruffle-rs/ruffle/releases/tag/nightly-2021-05-13
 */
export function injectFlashPlayer(
  document: Document,
) : void {
  // Converting the ruffle flash player and loader code bundle from base64 into
  // a utf8 encoded string.
  const flashPlayer: string = Buffer.from(
    base64FlashPlayer,
    'base64',
  ).toString();

  // Creating a `<script>` tag that will hold the ruffle player and loader code.
  const flashPlayerScript: string = `
    <script type="text/javascript">
      ${flashPlayer}
    </script>
  `;

  // Injecting the ruffle player and loader code at the bottom of the `<head>`
  // element.
  const headElement: Element = document.querySelector('head');

  headElement.innerHTML += flashPlayerScript;
}
