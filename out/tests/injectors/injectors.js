"use strict";
/**
 * Unit tests on the injector functionality.
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
const fs = require("fs");
const path = require("path");
const ava_1 = require("ava");
const jsdom_1 = require("jsdom");
const injectors_1 = require("../../lib/injectors/injectors");
ava_1.default('injectCustomStyleSheet() => A custom style sheet is injected into the '
    + 'document.', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const html = `
      <html>
        <head></head>
        <body></body>
      </html>
    `;
    const document = new jsdom_1.JSDOM(html).window.document;
    const url = path.join(__dirname, './test.css');
    const css = '.test {color: #000;}';
    fs.writeFileSync(url, css);
    yield injectors_1.injectCustomStyleSheet(url, document);
    fs.unlinkSync(url);
    const testResult = true
        && document
            .querySelector('head')
            .innerHTML
            .includes(css);
    t.is(testResult, true);
}));
ava_1.default('injectHtml5Polyfill() => HTML5 Shiv polyfill is injected into the '
    + 'document.', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const html = `
      <html>
        <head></head>
        <body></body>
      </html>
    `;
    const document = new jsdom_1.JSDOM(html).window.document;
    injectors_1.injectHtml5Polyfill(document);
    const testResult = true
        && document
            .querySelector('head')
            .innerHTML
            .includes('@preserve HTML5 Shiv')
        && document
            .querySelector('head')
            .innerHTML
            .includes('<!--[if lt IE 9]>');
    t.is(testResult, true);
}));
ava_1.default('injectCssFlexboxPolyfill() => CSS flexbox polyfill is injected into the '
    + 'document.', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const html = `
      <html>
        <head></head>
        <body></body>
      </html>
    `;
    const document = new jsdom_1.JSDOM(html).window.document;
    injectors_1.injectCssFlexboxPolyfill(document);
    const testResult = true
        && document
            .querySelector('head')
            .innerHTML
            .includes('Jonathan Neal');
    t.is(testResult, true);
}));
ava_1.default('injectMediaQueryPolyfill() => Media Query polyfill is injected into the '
    + 'document.', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const html = `
      <html>
        <head></head>
        <body></body>
      </html>
    `;
    const document = new jsdom_1.JSDOM(html).window.document;
    injectors_1.injectMediaQueryPolyfill(document);
    const testResult = true
        && document
            .querySelector('body')
            .innerHTML
            .includes('Respond.js')
        && document
            .querySelector('body')
            .innerHTML
            .includes('<!--[if lt IE 9]>');
    t.is(testResult, true);
}));
ava_1.default('injectCanvasPolyfill() => Canvas polyfill is injected into the document.', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const html = `
      <html>
        <head></head>
        <body></body>
      </html>
    `;
    const document = new jsdom_1.JSDOM(html).window.document;
    injectors_1.injectCanvasPolyfill(document);
    const testResult = true
        && document
            .querySelector('head')
            .innerHTML
            .includes('canvas')
        && document
            .querySelector('head')
            .innerHTML
            .includes('<!--[if IE]>');
    t.is(testResult, true);
}));
ava_1.default('injectHtml5MediaPolyfill() => HTML5 Video and Audio polyfills are injected '
    + 'into the document.', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const html = `
      <html>
        <head></head>
        <body></body>
      </html>
    `;
    const document = new jsdom_1.JSDOM(html).window.document;
    injectors_1.injectHtml5MediaPolyfill(document);
    const testResult = true
        && document
            .querySelector('head')
            .innerHTML
            .includes('canvas')
        && document
            .querySelector('head')
            .innerHTML
            .includes('flowplayer.js');
    t.is(testResult, true);
}));
ava_1.default('injectEs5Polyfill() => ES5 shim polyfill is injected into the document.', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const html = `
      <html>
        <head></head>
        <body></body>
      </html>
    `;
    const document = new jsdom_1.JSDOM(html).window.document;
    injectors_1.injectEs5Polyfill(document);
    const testResult = true
        && document
            .querySelector('head')
            .innerHTML
            .includes('es5-shim');
    t.is(testResult, true);
}));
ava_1.default('injectFlashPlayer() => Flash player is injected into the document.', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const html = `
      <html>
        <head></head>
        <body></body>
      </html>
    `;
    const document = new jsdom_1.JSDOM(html).window.document;
    injectors_1.injectFlashPlayer(document);
    const testResult = true
        && document
            .querySelector('head')
            .innerHTML
            .includes('script');
    t.is(testResult, true);
}));
//# sourceMappingURL=injectors.js.map