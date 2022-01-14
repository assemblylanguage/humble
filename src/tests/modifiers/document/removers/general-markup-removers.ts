/**
 * Unit tests on the markup remover functionality.
 */

import test from 'ava';
import { JSDOM } from 'jsdom';
import {
  removeElementsByTagName,
  removeElementsByCssSelector,
  removeStylesTags,
  removeAlternativeStylesTags,
  removeInlineStyles,
  removeStyles,
  removeScriptTags,
  removeNoscriptTags,
  removeInlineScripts,
  removeHrefScripts,
  removeScripts,
  removeImageSrcs,
  removeImageSrcsets,
  removeImageAlts,
  removeImageAttributes,
  removeCssImages,
  removeImages,
  removeFrames,
  removeVideoSrcs,
  removeVideos,
  removeAudioSrcs,
  removeAudio,
  removeFonts,
  removeCursors,
  removeFavicons,
  removeCanvas,
  removeConditionalComments,
  removeNonConditionalComments,
  removeComments,
  removeForms,
  removeFormAttributes,
  removeFormTagsOnly,
  removeNonDisplayMetaTags,
  removeNonDisplayLinkTags,
  removeMetaRefreshTag,
  removeNonInlineAnchorHrefs,
  removeAnchorHrefs,
  removeDefaultAttributes,
  removeAriaAttributes,
  removeDataAttributes,
  removeIntegrityCheckAttributes,
  removeEmptyNonDisplayElements,
  removeCustomTagsByName,
  removeCustomTagsByCssSelector,
} from '../../../../lib/modifiers/document/removers/general-markup-removers';
import { Resource, ResourceCache } from '../../../../lib/resource';

test(
  'removeElementsByTagName() => All tags are removed from the document by '
+ 'their tag name.',
  async (t) => {
    const html: string = `
      <html>
        <body>
          <div></div>
          <div></div>
          <div></div>
          <hello></hello>
          <world></world>
        </body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeElementsByTagName(document, 'div');
    removeElementsByTagName(document, 'hello');
    removeElementsByTagName(document, 'world');

    const testResult: boolean = true
      && [...document.querySelectorAll('div')].length === 0
      && [...document.querySelectorAll('hello')].length === 0
      && [...document.querySelectorAll('world')].length === 0;

    t.is(testResult, true);
  },
);

test(
  'removeElementsByCssSelector() => All elements are removed from the '
+ 'document by their CSS selectors.',
  async (t) => {
    const html: string = `
      <html>
        <body>
          <div test="1"></div>
          <div test="1"></div>
          <div test="1"></div>
          <br test="2">
        </body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeElementsByCssSelector(document, "[test='1']");
    removeElementsByCssSelector(document, "[test='2']");

    const testResult: boolean = true
      && [...document.querySelectorAll("[test='1']")].length === 0
      && [...document.querySelectorAll("[test='2']")].length === 0;

    t.is(testResult, true);
  },
);

test(
  'removeStylesTags() => All style elements are removed from the document.',
  async (t) => {
    const html: string = `
      <html>
        <head>
          <style test="1">
            div {color: #000;}
          </style>

          <link rel="alternate stylesheet" test="2">
        </head>
        <body>
          <div style="color: #000;" test="3"></div>
        </body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeStylesTags(document);

    const testResult: boolean = true
      && document.querySelector("[test='1']") === null
      && document.querySelector("[test='2']") === null
      && document.querySelector("[test='3']").getAttribute('style') !== null;

    t.is(testResult, true);
  },
);

test(
  'removeAlternativeStylesTags() => All alternative stylesheet elements are '
+ 'removed from the document.',
  async (t) => {
    const html: string = `
      <html>
        <head>
          <style test="1">
            div {color: #000;}
          </style>

          <link rel="alternate stylesheet" test="2">
        </head>
        <body>
          <div style="color: #000;" test="3"></div>
        </body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeAlternativeStylesTags(document);

    const testResult: boolean = true
      && document.querySelector("[test='1']") !== null
      && document.querySelector("[test='2']") === null
      && document.querySelector("[test='3']").getAttribute('style') !== null;

    t.is(testResult, true);
  },
);

test(
  'removeInlineStyles() => Only inline style attributes are removed from the '
+ 'document.',
  async (t) => {
    const html: string = `
      <html>
        <head>
          <style test="1">
            div {color: #000;}
          </style>

          <link rel="alternate stylesheet" test="2">
        </head>
        <body>
          <div style="color: #000;" test="3"></div>
        </body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeInlineStyles(document);

    const testResult: boolean = true
      && document.querySelector("[test='1']") !== null
      && document.querySelector("[test='2']") !== null
      && document.querySelector("[test='3']").getAttribute('style') === null;

    t.is(testResult, true);
  },
);

test(
  'removeStyles() => All styles are removed from the document.',
  async (t) => {
    const html: string = `
      <html>
        <head>
          <style test="1">
            div {color: #000;}
          </style>

          <link rel="alternate stylesheet" test="2">
        </head>
        <body>
          <div style="color: #000;" test="3"></div>
        </body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeStyles(document);

    const testResult: boolean = true
      && document.querySelector("[test='1']") === null
      && document.querySelector("[test='2']") === null
      && document.querySelector("[test='3']").getAttribute('style') === null;

    t.is(testResult, true);
  },
);

test(
  'removeScriptTags() => All `<script>` elements are removed from the '
+ 'document.',
  async (t) => {
    const html: string = `
      <html>
        <head>
          <script test="1">
            console.log("test");
          </script>
        </head>
        <body>
          <div test="2" onclick="console.log('test');"></div>
          <noscript>test</noscript>
          <a href="javascript:console.log('test');" test="3">
        </body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeScriptTags(document);

    const testResult: boolean = true
      && document.querySelector('script') === null
      && document.querySelector("[test='1']") === null
      && document.querySelector("[test='2']").getAttribute('onclick') !== null
      && document.querySelector('noscript') !== null
      && document.querySelector("[test='3']").getAttribute('href') !== null;

    t.is(testResult, true);
  },
);

test(
  'removeNoscriptTags() => All `<noscript>` elements are removed from the '
+ 'document.',
  async (t) => {
    const html: string = `
      <html>
        <head>
          <script test="1">
            console.log("test");
          </script>
        </head>
        <body>
          <div test="2" onclick="console.log('test');"></div>
          <noscript>test</noscript>
          <a href="javascript:console.log('test');" test="3">
        </body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeNoscriptTags(document);

    const testResult: boolean = true
      && document.querySelector('script') !== null
      && document.querySelector("[test='1']") !== null
      && document.querySelector("[test='2']").getAttribute('onclick') !== null
      && document.querySelector('noscript') === null
      && document.querySelector("[test='3']").getAttribute('href') !== null;

    t.is(testResult, true);
  },
);

test(
  'removeInlineScripts() => All inline scripts are removed from the document.',
  async (t) => {
    const html: string = `
      <html>
        <head>
          <script test="1">
            console.log("test");
          </script>
        </head>
        <body>
          <div test="2" onclick="console.log('test');"></div>
          <noscript>test</noscript>
          <a href="javascript:console.log('test');" test="3">
        </body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeInlineScripts(document);

    const testResult: boolean = true
      && document.querySelector('script') !== null
      && document.querySelector("[test='1']") !== null
      && document.querySelector("[test='2']").getAttribute('onclick') === null
      && document.querySelector('noscript') !== null
      && document.querySelector("[test='3']").getAttribute('href') !== null;

    t.is(testResult, true);
  },
);

test(
  'removeHrefScripts() => All `href` scripts are removed from the document.',
  async (t) => {
    const html: string = `
      <html>
        <head>
          <script test="1">
            console.log("test");
          </script>
        </head>
        <body>
          <div test="2" onclick="console.log('test');"></div>
          <noscript>test</noscript>
          <a href="javascript:console.log('test');" test="3">
        </body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeHrefScripts(document);

    const testResult: boolean = true
      && document.querySelector('script') !== null
      && document.querySelector("[test='1']") !== null
      && document.querySelector("[test='2']").getAttribute('onclick') !== null
      && document.querySelector('noscript') !== null
      && document.querySelector("[test='3']").getAttribute('href') === null;

    t.is(testResult, true);
  },
);

test(
  'removeScripts() => All `<script>` and `<noscript>` elements, and inline '
+ 'scripts are removed from the document.',
  async (t) => {
    const html: string = `
      <html>
        <head>
          <script test="1">
            console.log("test");
          </script>
        </head>
        <body>
          <div test="2" onclick="console.log('test');"></div>
          <noscript>test</noscript>
          <a href="javascript:console.log('test');" test="3">
        </body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeScripts(document);

    const testResult: boolean = true
      && document.querySelector('script') === null
      && document.querySelector("[test='1']") === null
      && document.querySelector("[test='2']").getAttribute('onclick') === null
      && document.querySelector('noscript') === null
      && document.querySelector("[test='3']").getAttribute('href') === null;

    t.is(testResult, true);
  },
);

test(
  'removeImageSrcs() => All `src` attributes are removed from all image '
+ 'elements.',
  async (t) => {
    const html: string = `
      <html>
        <body>
          <img test="1" src="test1">
          <picture test="2" src="test2">
            <source test="3" src="test3">
          </picture>
        </body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeImageSrcs(document);

    const testResult: boolean = true
      && document.querySelector("[test='1']").getAttribute('src') === null
      && document.querySelector("[test='2']").getAttribute('src') === null
      && document.querySelector("[test='3']").getAttribute('src') === null;

    t.is(testResult, true);
  },
);

test(
  'removeImageSrcsets() => All `srcset` attributes are removed from all image '
+ 'elements.',
  async (t) => {
    const html: string = `
      <html>
        <body>
          <img test="1" srcset="test1">
          <picture test="2" srcset="test2">
            <source test="3" srcset="test3">
          </picture>
        </body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeImageSrcsets(document);

    const testResult: boolean = true
      && document.querySelector("[test='1']").getAttribute('srcset') === null
      && document.querySelector("[test='2']").getAttribute('srcset') === null
      && document.querySelector("[test='3']").getAttribute('srcset') === null;

    t.is(testResult, true);
  },
);

test(
  'removeImageAlts() => All `alt` attributes are removed from all image '
+ 'elements.',
  async (t) => {
    const html: string = `
      <html>
        <body>
          <img test="1" alt="test1">
          <picture test="2" alt="test2">
            <source test="3" alt="test3">
          </picture>
        </body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeImageAlts(document);

    const testResult: boolean = true
      && document.querySelector("[test='1']").getAttribute('alt') === null
      && document.querySelector("[test='2']").getAttribute('alt') === null
      && document.querySelector("[test='3']").getAttribute('alt') === null;

    t.is(testResult, true);
  },
);

test(
  'removeImageAttributes() => All `src`, `srcset`, and `alt` attributes are '
+ 'removed from all image elements.',
  async (t) => {
    const html: string = `
      <html>
        <body>
          <img test="1" src="test1" srcset="test1" alt="test1">
          <picture test="2" src="test2" srcset="test2" alt="test2">
            <source test="3" src="test2" srcset="test2" alt="test3">
          </picture>
        </body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeImageAttributes(document);

    const testResult: boolean = true
      && document.querySelector("[test='1']").getAttribute('src') === null
      && document.querySelector("[test='2']").getAttribute('src') === null
      && document.querySelector("[test='3']").getAttribute('src') === null
      && document.querySelector("[test='1']").getAttribute('srcset') === null
      && document.querySelector("[test='2']").getAttribute('srcset') === null
      && document.querySelector("[test='3']").getAttribute('srcset') === null
      && document.querySelector("[test='1']").getAttribute('alt') === null
      && document.querySelector("[test='2']").getAttribute('alt') === null
      && document.querySelector("[test='3']").getAttribute('alt') === null;

    t.is(testResult, true);
  },
);

test(
  'removeCssImages() => All images (except for cursors) in the stylesheets '
+ 'are removed from the document.',
  async (t) => {
    const html: string = `
      <html>
        <head>
          <style test="1">
            [test="2"]{background-image:url("http://test.test/test.png")}
            [test="3"]{list-style-image:url("http://test.test/test.png")}
            [test="4"]{cursor:url("http://test.test/test.png")}
          </style>
        </head>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeCssImages(document);

    const testResult: boolean = true
      && document
        .querySelector('style[test="1"]')
        .innerHTML
        .includes('[test="2"]{background-image:url("")}')

      && document
        .querySelector('style[test="1"]')
        .innerHTML
        .includes('[test="3"]{list-style-image:url("")}')

      && document
        .querySelector('style[test="1"]')
        .innerHTML
        .includes('[test="4"]{cursor:url("http://test.test/test.png")}');

    t.is(testResult, true);
  },
);

test(
  'removeImages() => All image elements are removed from the document, and '
+ 'all CSS images are removed from the stylesheets.',
  async (t) => {
    const html: string = `
      <html>
        <head>
          <style test="1">
            [test="2"]{background-image:url("http://test.test/test.png")}
            [test="3"]{cursor:url("http://test.test/test.png")}
          </style>
        </head>
        <body>
          <img test="4">
          <picture test="5">
            <source test="6">
          </picture>
        </body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeImages(document);

    const testResult: boolean = true
      && document
        .querySelector('[test="4"]') === null

      && document
        .querySelector('[test="5"]') === null

      && document
        .querySelector('[test="6"]') === null

      && document
        .querySelector('style[test="1"]')
        .innerHTML
        .includes('[test="2"]{background-image:url("")}')

      && document
        .querySelector('style[test="1"]')
        .innerHTML
        .includes('[test="3"]{cursor:url("http://test.test/test.png")}');

    t.is(testResult, true);
  },
);

test(
  'removeFrames() => All elements for embedding frames are removed from the '
+ 'document.',
  async (t) => {
    const html: string = `
      <html>
        <body>
          <frame test="1"></frame>
          <frameset test="2"></frameset>
          <iframe test="3"></iframe>
          <portal test="4"></portal>
        </body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeFrames(document);

    const testResult: boolean = true
      && document.querySelector('[test="1"]') === null
      && document.querySelector('[test="2"]') === null
      && document.querySelector('[test="3"]') === null
      && document.querySelector('[test="4"]') === null;

    t.is(testResult, true);
  },
);

test(
  'removeVideoSrcs() => All `src` attributes are removed from all video '
+ 'elements.',
  async (t) => {
    const html: string = `
      <html>
        <body>
          <video src="test1" test="1">
            <source src="test2" test="2">
          </video>
        </body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeVideoSrcs(document);

    const testResult: boolean = true
      && document.querySelector('[test="1"]').getAttribute('src') === null
      && document.querySelector('[test="2"]').getAttribute('src') === null;

    t.is(testResult, true);
  },
);

test(
  'removeVideos() => All `<video>` elements are removed from the '
+ 'document.',
  async (t) => {
    const html: string = `
      <html>
        <body>
          <video test="1"></video>
        </body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeVideos(document);

    const testResult: boolean = document.querySelector('[test="1"]') === null;

    t.is(testResult, true);
  },
);

test(
  'removeAudioSrcs() => All `src` attributes are removed from all audio '
+ 'elements.',
  async (t) => {
    const html: string = `
      <html>
        <body>
          <audio src="test1" test="1">
            <source src="test2" test="2">
          </audio>
        </body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeAudioSrcs(document);

    const testResult: boolean = true
      && document.querySelector('[test="1"]').getAttribute('src') === null
      && document.querySelector('[test="2"]').getAttribute('src') === null;

    t.is(testResult, true);
  },
);

test(
  'removeAudio() => All `<audio>` elements are removed from the document.',
  async (t) => {
    const html: string = `
      <html>
        <body>
          <audio test="1"></audio>
        </body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeAudio(document);

    const testResult: boolean = document.querySelector('[test="1"]') === null;

    t.is(testResult, true);
  },
);

test(
  'removeFonts() => All fonts are removed from the stylesheets in the '
+ 'document.',
  async (t) => {
    const html: string = `
      <html>
        <head>
          <style test="1">
            @font-face { src: url("http://test.test/test.woff") }
          </style>
        </head>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeFonts(document);

    const testResult: boolean = document
      .querySelector("[test='1']")
      .innerHTML
      .trim() === '';

    t.is(testResult, true);
  },
);

test(
  'removeCursors() => All cursors are removed from the stylesheets in the '
+ 'document.',
  async (t) => {
    const html: string = `
      <html>
        <head>
          <style test="1">
            [test="2"] { cursor:url("http://test.test/test.cur"); }
          </style>
        </head>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeCursors(document);

    const testResult: boolean = document
      .querySelector("[test='1']")
      .innerHTML
      .includes('cursor') === false;

    t.is(testResult, true);
  },
);

test(
  'removeFavicons() => All favicon elements are removed from the document.',
  async (t) => {
    const html: string = `
      <html>
        <head>
          <link rel="icon" href="./image.png" test="1">
          <link rel="shortcut icon" href="./image.png" test="2">
          <link rel="apple-touch-icon" href="./image.png" test="3">
          <link rel="apple-touch-startup-image" href="./image.png" test="4">
        </head>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeFavicons(document);

    const testResult: boolean = true
      && document.querySelector("[test='1']") === null
      && document.querySelector("[test='2']") === null
      && document.querySelector("[test='3']") === null
      && document.querySelector("[test='4']") === null;

    t.is(testResult, true);
  },
);

test(
  'removeCanvas() => All `<canvas>` elements are removed from the document.',
  async (t) => {
    const html: string = `
      <html>
        <body>
          <canvas test="1"></canvas>
          <canvas test="2"></canvas>
        </body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeCanvas(document);

    const testResult: boolean = true
      && document.querySelector("[test='1']") === null
      && document.querySelector("[test='2']") === null;

    t.is(testResult, true);
  },
);

test(
  'removeConditionalComments() => All Internet Explorer Conditional Comments '
+ 'are removed from the document.',
  async (t) => {
    const html: string = `
      <html>
        <body test="1">
          <!--[if IE 6]>
            <p>test="2"</p>
          <![endif]-->

          <!-- test="3" -->
        </body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeConditionalComments(document);

    const testResult: boolean = true
      && document
        .querySelector("[test='1']")
        .innerHTML
        .includes('test="2"') === false

      && document
        .querySelector("[test='1']")
        .innerHTML
        .includes('test="3"') === true;

    t.is(testResult, true);
  },
);

test(
  'removeNonConditionalComments() => All non Conditional Comments are removed '
+ 'from the document.',
  async (t) => {
    const html: string = `
      <html>
        <body test="1">
          <!--[if IE 6]>
            <p>test="2"</p>
          <![endif]-->

          <!-- test="3" -->
        </body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeNonConditionalComments(document);

    const testResult: boolean = true
      && document
        .querySelector('[test="1"]')
        .innerHTML
        .includes('test="2"') === true

      && document
        .querySelector('[test="1"]')
        .innerHTML
        .includes('test="3"') === false;

    t.is(testResult, true);
  },
);

test(
  'removeComments() => All comments are removed from the document.',
  async (t) => {
    const html: string = `
      <html>
        <body test="1">
          <!--[if IE 6]>
            <p>test="2"</p>
          <![endif]-->

          <!-- test="3" -->
        </body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeComments(document);

    const testResult: boolean = true
      && document
        .querySelector('[test="1"]')
        .innerHTML
        .includes('test="2"') === false

      && document
        .querySelector('[test="1"]')
        .innerHTML
        .includes('test="3"') === false;

    t.is(testResult, true);
  },
);

test(
  'removeForms() => All `<form>` tags and child elements are removed from the '
+ 'document.',
  async (t) => {
    const html: string = `
      <html>
        <body>
          <form method="POST" action="./index.php" test="1">
            <input type="text" name="hello">
            <input type="submit">
          </form>
        </body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeForms(document);

    const testResult: boolean = document.querySelector('[test="1"]') === null;

    t.is(testResult, true);
  },
);

test(
  'removeFormAttributes() => All attributes on all `<form>` tags are removed '
+ 'from the document.',
  async (t) => {
    const html: string = `
      <html>
        <body>
          <form method="POST" action="./index.php" test="1">
            <input type="text" name="hello">
            <input type="submit">
          </form>
        </body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeFormAttributes(document);

    const testResult: boolean = true
      && document.querySelector('form').getAttribute('method') === null
      && document.querySelector('form').getAttribute('action') === null;

    t.is(testResult, true);
  },
);

test(
  'removeFormTagsOnly() => All `<form>` tags are removed from the document, '
+ 'but child elements are not removed.',
  async (t) => {
    const html: string = `
      <html>
        <body>
          <form method="POST" action="./index.php" test="1">
            <input type="text" name="hello" test="2">
            <input type="submit" test="3">
          </form>
        </body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeFormTagsOnly(document);

    const testResult: boolean = true
      && document.querySelector("[test='1']") === null
      && document.querySelector("[test='2']") !== null
      && document.querySelector("[test='3']") !== null;

    t.is(testResult, true);
  },
);

test(
  'removeNonDisplayMetaTags() => All `<meta>` tags that have no effect on the '
+ 'document are removed.',
  async (t) => {
    const html: string = `
      <html>
        <head>
          <!-- Should be removed -->
          <meta test="1" keywords="">
          <meta test="2" description="">

          <!-- Should not be removed -->
          <meta test="3" viewport="">
          <meta test="4" charset="">
          <meta test="5" http-equiv="content-security-policy">
          <meta test="6" http-equiv="content-type">
          <meta test="7" http-equiv="default-style">
        </head>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeNonDisplayMetaTags(document);

    const testResult: boolean = true
      && document.querySelector("[test='1']") === null
      && document.querySelector("[test='2']") === null
      && document.querySelector("[test='3']") !== null
      && document.querySelector("[test='4']") !== null
      && document.querySelector("[test='5']") !== null
      && document.querySelector("[test='6']") !== null
      && document.querySelector("[test='7']") !== null;

    t.is(testResult, true);
  },
);

test(
  'removeNonDisplayLinkTags() => All `<link>` tags that have no effect on the '
+ 'document are removed.',
  async (t) => {
    const html: string = `
      <html>
        <head>
          <!-- Should be removed -->
          <link rel="license" test="1">

          <!-- Should not be removed -->
          <link rel="stylesheet" test="2">
          <link rel="alternate stylesheet" test="3">
          <link rel="icon" test="4">
          <link rel="shortcut icon" test="5">
          <link rel="apple-touch-icon" test="6">
          <link rel="apple-touch-startup-image" test="7">
        </head>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeNonDisplayLinkTags(document);

    const testResult: boolean = true
      && document.querySelector("[test='1']") === null
      && document.querySelector("[test='2']") !== null
      && document.querySelector("[test='3']") !== null
      && document.querySelector("[test='4']") !== null
      && document.querySelector("[test='5']") !== null
      && document.querySelector("[test='6']") !== null
      && document.querySelector("[test='7']") !== null;

    t.is(testResult, true);
  },
);

test(
  'removeMetaRefreshTag() => All `<meta http-equiv="refresh">` tags are '
+ 'removed from the document.',
  async (t) => {
    const html: string = `
      <html>
        <head>
          <meta http-equiv="refresh" test="1">
        </head>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeMetaRefreshTag(document);

    const testResult: boolean = document.querySelector("[test='1']") === null;

    t.is(testResult, true);
  },
);

test(
  'removeNonInlineAnchorHrefs() => All non-inline anchor href attributes are '
+ 'removed from the document.',
  async (t) => {
    const html: string = `
      <html>
        <body>
          <h1 id="id1"></h1>

          <!-- 
            These 'href' attributes won't be removed since they point to inline
            elements.
          -->
          <a href="#id1" test="1"></a>
          <a href="./#id1" test="2"></a>

          <!--
            This 'href' attribute will be removed since it doesn't point to an
            inline element.
          -->
          <a href="#id2" test="3"></a>

          <!-- 
            These 'href' attributes will be removed as they reference external
            documents.
          -->
          <a test="4" href="http://test.test"></a>
          <a test="5" href="http://test.test/#id1"></a>
        </body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeNonInlineAnchorHrefs(document);

    const testResult: boolean = true
      && document.querySelector('[test="1"]').getAttribute('href') === '#id1'
      && document.querySelector('[test="2"]').getAttribute('href') === '#id1'
      && document.querySelector('[test="3"]').getAttribute('href') === null
      && document.querySelector('[test="4"]').getAttribute('href') === null
      && document.querySelector('[test="5"]').getAttribute('href') === '#id1';

    t.is(testResult, true);
  },
);

test(
  'removeAnchorHrefs() => All anchor href attributes removed from the '
+ 'document.',
  async (t) => {
    const html: string = `
      <html>
        <body>
          <h1 id="id1"></h1>

          <!-- 
            These 'href' attributes won't be removed since they point to inline
            elements.
          -->
          <a href="#id1" test="1"></a>
          <a href="./#id1" test="2"></a>

          <!--
            This 'href' attribute will be removed since it doesn't point to an
            inline element.
          -->
          <a href="#id2" test="3"></a>

          <!-- 
            These 'href' attributes will be removed as they reference external
            documents.
          -->
          <a test="4" href="http://test.test"></a>
          <a test="5" href="http://test.test/#id1"></a>
        </body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeAnchorHrefs(document);

    const testResult: boolean = true
      && document.querySelector("[test='1']").getAttribute('href') === null
      && document.querySelector("[test='2']").getAttribute('href') === null
      && document.querySelector("[test='3']").getAttribute('href') === null
      && document.querySelector("[test='4']").getAttribute('href') === null
      && document.querySelector("[test='5']").getAttribute('href') === null;

    t.is(testResult, true);
  },
);

test(
  'removeDefaultAttributes() => All default attributes are removed from the '
+ 'document.',
  async (t) => {
    const html: string = `
      <html>
        <body>
          <a target="_self" test="1"></a>
          <audio muted="false" preload="metadata" test="2"></a>
        </body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeDefaultAttributes(document);

    const testResult: boolean = true
      && document.querySelector('[test="1"]').getAttribute('target') === null
      && document.querySelector('[test="2"]').getAttribute('muted') === null
      && document.querySelector('[test="2"]').getAttribute('preload') === null;

    t.is(testResult, true);
  },
);

test(
  'removeAriaAttributes() => All WAI-ARIA attributes are removed from the '
+ 'document.',
  async (t) => {
    const html: string = `
      <html>
        <body>
          <div
            role="progressbar"
            aria-valuenow="75"
            aria-valuemin="0"
            aria-valuemax="100"
            test="1"
          ></div>
        </body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeAriaAttributes(document);

    const ariaElement: Element = document.querySelector('[test="1"]');

    const testResult: boolean = true
      && ariaElement.getAttribute('aria-valuenow') === null
      && ariaElement.getAttribute('aria-valuemin') === null
      && ariaElement.getAttribute('aria-valuemax') === null;

    t.is(testResult, true);
  },
);

test(
  'removeDataAttributes() => All Data attributes are removed from the '
+ 'document.',
  async (t) => {
    const html: string = `
      <html>
        <body>
          <div 
            data-test-1="test"
            data-test-2="test"
            data-test-3="test" 
            test="1"
          ></div>
        </body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeDataAttributes(document);

    const dataElement: Element = document.querySelector('[test="1"]');

    const testResult: boolean = true
      && dataElement.getAttribute('data-test-1') === null
      && dataElement.getAttribute('data-test-2') === null
      && dataElement.getAttribute('data-test-3') === null;

    t.is(testResult, true);
  },
);

test(
  'removeIntegrityCheckAttributes() => All integrity check attributes are '
+ 'removed from the document.',
  async (t) => {
    const html: string = `
      <html>
        <body>
          <link integrity="test1" test="1">
          <link crossorigin="test2" test="2">
        </body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeIntegrityCheckAttributes(document);

    const testResult: boolean = true
      && document
        .querySelector('[test="1"]')
        .getAttribute('integrity') === null

      && document
        .querySelector('[test="2"]')
        .getAttribute('crossorigin') === null;

    t.is(testResult, true);
  },
);

test(
  'removeEmptyNonDisplayElements() => All empty non-display elements are '
+ 'removed from the document.',
  async (t) => {
    const html: string = `
      <html>
        <body>
          <link>
          <meta>
          <style></style>
          <script>
            console.log('test');
          </script>
        </body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeEmptyNonDisplayElements(document);

    const testResult: boolean = true
      && document.querySelector('link') === null
      && document.querySelector('meta') === null
      && document.querySelector('style') === null
      && document.querySelector('script') !== null;

    t.is(testResult, true);
  },
);

test(
  'removeCustomTagsByName() => All custom tags provided are removed from the '
+ 'document.',
  async (t) => {
    const html: string = `
      <html>
        <body>
          <hello test="1"></hello>
          <world test="2"></world>
        </body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeCustomTagsByName(document, ['hello', 'world']);

    const testResult: boolean = true
      && document.querySelector('[test="1"]') === null
      && document.querySelector('[test="2"]') === null;

    t.is(testResult, true);
  },
);

test(
  'removeCustomTagsByCssSelector() => All custom tags by CSS selector are '
+ 'removed from the document.',
  async (t) => {
    const html: string = `
      <html>
        <body>
          <div id="test1" test="1"></div>
          <div id="test2" test="2"></div>
        </body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    removeCustomTagsByCssSelector(document, ['#test1', '#test2']);

    const testResult: boolean = true
      && document.querySelector('[test="1"]') === null
      && document.querySelector('[test="2"]') === null;

    t.is(testResult, true);
  },
);
