/**
 * Unit tests on the injector functionality.
 */

import * as fs from 'fs';
import * as path from 'path';
import test from 'ava';
import { JSDOM } from 'jsdom';
import {
  injectCustomStyleSheet,
  injectHtml5Polyfill,
  injectCssFlexboxPolyfill,
  injectMediaQueryPolyfill,
  injectCanvasPolyfill,
  injectHtml5MediaPolyfill,
  injectEs5Polyfill,
  injectFlashPlayer,
} from '../../lib/injectors/injectors';

test(
  'injectCustomStyleSheet() => A custom style sheet is injected into the '
+ 'document.',
  async (t) => {
    const html: string = `
      <html>
        <head></head>
        <body></body>
      </html>
    `;

    const document = new JSDOM(html).window.document;

    const url: string = path.join(__dirname, './test.css');
    const css: string = '.test {color: #000;}';

    fs.writeFileSync(url, css);

    await injectCustomStyleSheet(url, document);

    fs.unlinkSync(url);

    const testResult: boolean = true
      && document
        .querySelector('head')
        .innerHTML
        .includes(css);

    t.is(testResult, true);
  },
);

test(
  'injectHtml5Polyfill() => HTML5 Shiv polyfill is injected into the '
+ 'document.',
  async (t) => {
    const html: string = `
      <html>
        <head></head>
        <body></body>
      </html>
    `;

    const document = new JSDOM(html).window.document;

    injectHtml5Polyfill(document);

    const testResult: boolean = true
      && document
        .querySelector('head')
        .innerHTML
        .includes('@preserve HTML5 Shiv')

      && document
        .querySelector('head')
        .innerHTML
        .includes('<!--[if lt IE 9]>');

    t.is(testResult, true);
  },
);

test(
  'injectCssFlexboxPolyfill() => CSS flexbox polyfill is injected into the '
+ 'document.',
  async (t) => {
    const html: string = `
      <html>
        <head></head>
        <body></body>
      </html>
    `;

    const document = new JSDOM(html).window.document;

    injectCssFlexboxPolyfill(document);

    const testResult: boolean = true
      && document
        .querySelector('head')
        .innerHTML
        .includes('Jonathan Neal');

    t.is(testResult, true);
  },
);

test(
  'injectMediaQueryPolyfill() => Media Query polyfill is injected into the '
+ 'document.',
  async (t) => {
    const html: string = `
      <html>
        <head></head>
        <body></body>
      </html>
    `;

    const document = new JSDOM(html).window.document;

    injectMediaQueryPolyfill(document);

    const testResult: boolean = true
      && document
        .querySelector('body')
        .innerHTML
        .includes('Respond.js')

      && document
        .querySelector('body')
        .innerHTML
        .includes('<!--[if lt IE 9]>');

    t.is(testResult, true);
  },
);

test(
  'injectCanvasPolyfill() => Canvas polyfill is injected into the document.',
  async (t) => {
    const html: string = `
      <html>
        <head></head>
        <body></body>
      </html>
    `;

    const document = new JSDOM(html).window.document;

    injectCanvasPolyfill(document);

    const testResult: boolean = true
      && document
        .querySelector('head')
        .innerHTML
        .includes('canvas')

      && document
        .querySelector('head')
        .innerHTML
        .includes('<!--[if IE]>');

    t.is(testResult, true);
  },
);

test(
  'injectHtml5MediaPolyfill() => HTML5 Video and Audio polyfills are injected '
+ 'into the document.',
  async (t) => {
    const html: string = `
      <html>
        <head></head>
        <body></body>
      </html>
    `;

    const document = new JSDOM(html).window.document;

    injectHtml5MediaPolyfill(document);

    const testResult: boolean = true
      && document
        .querySelector('head')
        .innerHTML
        .includes('canvas')

      && document
        .querySelector('head')
        .innerHTML
        .includes('flowplayer.js');

    t.is(testResult, true);
  },
);

test(
  'injectEs5Polyfill() => ES5 shim polyfill is injected into the document.',
  async (t) => {
    const html: string = `
      <html>
        <head></head>
        <body></body>
      </html>
    `;

    const document = new JSDOM(html).window.document;

    injectEs5Polyfill(document);

    const testResult: boolean = true
      && document
        .querySelector('head')
        .innerHTML
        .includes('es5-shim');

    t.is(testResult, true);
  },
);

test(
  'injectFlashPlayer() => Flash player is injected into the document.',
  async (t) => {
    const html: string = `
      <html>
        <head></head>
        <body></body>
      </html>
    `;

    const document = new JSDOM(html).window.document;

    injectFlashPlayer(document);

    const testResult: boolean = true
      && document
        .querySelector('head')
        .innerHTML
        .includes('script');

    t.is(testResult, true);
  },
);
