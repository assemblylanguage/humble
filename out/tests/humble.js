"use strict";
/**
 * Unit tests on internal Humble methods.
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
const ava_1 = require("ava");
const jsdom_1 = require("jsdom");
const humble_1 = require("../lib/humble");
const resource_1 = require("../lib/resource");
ava_1.default('Humble.getProtocol() => `http:` returned from `http://test.test/`.', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const baseUrl = 'http://test.test/';
    const url = 'http://test.test/';
    const humble = new humble_1.Humble({ url: baseUrl });
    const protocol = humble.getProtocol(url);
    t.is(protocol === 'http:', true);
}));
ava_1.default('Humble.getProtocol() => `file:` returned from `./test.html`.', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const baseUrl = './test.html';
    const url = './test.html';
    const humble = new humble_1.Humble({ url: baseUrl });
    const protocol = humble.getProtocol(url);
    t.is(protocol === 'file:', true);
}));
ava_1.default('Humble.getProtocol() => `data:` returned from `data:test`.', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const baseUrl = 'data:test';
    const url = 'data:test';
    const humble = new humble_1.Humble({ url: baseUrl });
    const protocol = humble.getProtocol(url);
    t.is(protocol === 'data:', true);
}));
ava_1.default('Humble.getProtocol() => `http:` returned from `test.html` with base '
    + 'URL of `http://test.test`.', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const baseUrl = 'http://test.test';
    const url = 'test.html';
    const humble = new humble_1.Humble({ url: baseUrl });
    const protocol = humble.getProtocol(url);
    t.is(protocol === 'http:', true);
}));
ava_1.default('Humble.getProtocol() => `http:` returned from '
    + '`http://test.test/:/file:test.html`', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const baseUrl = 'http://test.test/:/file:test.html';
    const url = 'http://test.test/:/file:test.html';
    const humble = new humble_1.Humble({ url: baseUrl });
    const protocol = humble.getProtocol(url);
    t.is(protocol === 'http:', true);
}));
ava_1.default('Humble.correctUrl() => Corrects backslashes in `\\\\test.html` to '
    + 'forward slashes `//test.html`.', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const baseUrl = 'http://test.test';
    const url = '\\\\test.html';
    const humble = new humble_1.Humble({ url: baseUrl });
    const correctedUrl = humble.correctUrl(url);
    t.is(correctedUrl === '//test.html', true);
}));
ava_1.default('Humble.resolveAbsoluteUrl() => Absolute URL `http://test.test` '
    + 'resolved to `http://test.test` with base URL `http://base.test`.', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const baseUrl = 'http://base.test';
    const url = 'http://test.test';
    const humble = new humble_1.Humble({ url: baseUrl });
    const resolvedUrl = humble.resolveAbsoluteUrl(url);
    t.is(resolvedUrl === 'http://test.test', true);
}));
ava_1.default('Humble.resolveAbsoluteUrl() => Relative URL `test.html` resolved to '
    + '`http://base.test/test.html` with base URL `http://base.test`.', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const baseUrl = 'http://base.test';
    const url = 'test.html';
    const humble = new humble_1.Humble({ url: baseUrl });
    const resolvedUrl = humble.resolveAbsoluteUrl(url);
    t.is(resolvedUrl === 'http://base.test/test.html', true);
}));
ava_1.default('Humble.createCacheResource() => A single resource is successfully '
    + 'added to the resource cache.', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const baseUrl = 'http://test.test';
    const url = 'test.png';
    const humble = new humble_1.Humble({ url: baseUrl });
    const type = resource_1.ResourceType.IMAGE;
    humble.createCacheResource(url, type);
    t.is(Object.keys(humble.resourceCache).length === 1, true);
}));
ava_1.default('Humble.createSubCache() => A single image resource is added to the '
    + 'resource cache, and a subcache is successfully created with that image '
    + 'resource.', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const baseUrl = 'http://test.test';
    const humble = new humble_1.Humble({ url: baseUrl });
    humble.createCacheResource('test.png', resource_1.ResourceType.IMAGE);
    humble.createCacheResource('test.ogg', resource_1.ResourceType.AUDIO);
    humble.createCacheResource('test.js', resource_1.ResourceType.SCRIPT);
    const imageCache = humble.createSubCache(resource_1.ResourceType.IMAGE);
    t.is(imageCache['test.png'] !== undefined, true);
}));
ava_1.default('Humble.cacheCss() => All CSS resources are added to the cache.', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const html = `
      <html>
        <head>
          <link rel="stylesheet" href="test1.css">
          <link rel="stylesheet" href="/test2.css">
          <link rel="stylesheet" href="http://test.test/test3.css">
        </head>
      </html>
    `;
    const document = new jsdom_1.JSDOM(html).window.document;
    const humble = new humble_1.Humble({ url: '' });
    humble.document = document;
    humble.cacheCss();
    const testResult = true
        && humble.resourceCache['test1.css'] !== undefined
        && humble.resourceCache['/test2.css'] !== undefined
        && humble.resourceCache['http://test.test/test3.css'] !== undefined;
    t.is(testResult, true);
}));
ava_1.default('Humble.cacheScripts() => All script resources are added to the cache.', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const html = `
      <html>
        <head>
          <script src="test1.js"></script>
          <script src="/test2.js"></script>
          <script src="http://test.test/test3.js"></script>
        </head>
        <body>
          <script src="test4.js"></script>
        </body>
      </html>
    `;
    const document = new jsdom_1.JSDOM(html).window.document;
    const humble = new humble_1.Humble({ url: '' });
    humble.document = document;
    humble.cacheScripts();
    const testResult = true
        && humble.resourceCache['test1.js'] !== undefined
        && humble.resourceCache['/test2.js'] !== undefined
        && humble.resourceCache['http://test.test/test3.js'] !== undefined
        && humble.resourceCache['test4.js'] !== undefined;
    t.is(testResult, true);
}));
ava_1.default('Humble.cacheHtmlImages() => All images in HTML tags are added to the '
    + 'cache.', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const html = `
      <html>
        <head>
          <style>
              [test] {
                background-image: url("test1.gif");
              }
          </style>
        </head>
        <body>
          <img src="test2.png">
          <img src="/test3.jpeg" />
          <picture>
            <source src="http://test.test/test4.tiff"></source>
            <img src="test5.webp">
          </picture>
          <img
            src="test6.png" 
            srcset="
              test7.png 1x,
              test8.svg 2x
            "
          >
        </body>
      </html>
    `;
    const document = new jsdom_1.JSDOM(html).window.document;
    const humble = new humble_1.Humble({ url: '' });
    humble.document = document;
    humble.cacheHtmlImages();
    const testResult = true
        && humble.resourceCache['test2.png'] !== undefined
        && humble.resourceCache['/test3.jpeg'] !== undefined
        && humble.resourceCache['http://test.test/test4.tiff'] !== undefined
        && humble.resourceCache['test5.webp'] !== undefined
        && humble.resourceCache['test6.png'] !== undefined
        && humble.resourceCache['test7.png'] !== undefined
        && humble.resourceCache['test8.svg'] !== undefined;
    t.is(testResult, true);
}));
ava_1.default('Humble.cacheCssImages() => All images in the CSS stylesheets are added '
    + 'to the cache.', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const html = `
      <html>
        <head>
          <style>
            [test1] {
              background-image: url("test1.png");
            }

            [test2] {
              border-image: url(http://test.test/test2.png);
            }
          </style>
        </head>
        <body></body>
      </html>
    `;
    const document = new jsdom_1.JSDOM(html).window.document;
    const humble = new humble_1.Humble({ url: '' });
    humble.document = document;
    humble.cacheCssImages();
    const testResult = true
        && humble.resourceCache['test1.png'] !== undefined
        && humble.resourceCache['http://test.test/test2.png'] !== undefined;
    t.is(testResult, true);
}));
ava_1.default('Humble.cacheAudio() => All audio files in the document are added to '
    + 'the cache.', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const html = `
      <html>
        <body>
          <audio src="test1.ogg"></audio>
          <audio>
            <source src="/test2.ogg"></source>
            <source src="http://test.test/test3.mp3"></source>
          </audio>
        </body>
      </html>
    `;
    const document = new jsdom_1.JSDOM(html).window.document;
    const humble = new humble_1.Humble({ url: '' });
    humble.document = document;
    humble.cacheAudio();
    const testResult = true
        && humble.resourceCache['test1.ogg'] !== undefined
        && humble.resourceCache['/test2.ogg'] !== undefined
        && humble.resourceCache['http://test.test/test3.mp3'] !== undefined;
    t.is(testResult, true);
}));
ava_1.default('Humble.cacheVideos() => All videos in the document are added to the '
    + 'cache.', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const html = `
      <html>
        <body>
          <video src="test1.mp4"></video>
          <video>
            <source src="/test2.mkv"></source>
            <source src="http://test.test/test3.webm"></source>
          </video>
        </body>
      </html>
    `;
    const document = new jsdom_1.JSDOM(html).window.document;
    const humble = new humble_1.Humble({ url: '' });
    humble.document = document;
    humble.cacheVideos();
    const testResult = true
        && humble.resourceCache['test1.mp4'] !== undefined
        && humble.resourceCache['/test2.mkv'] !== undefined
        && humble.resourceCache['http://test.test/test3.webm'] !== undefined;
    t.is(testResult, true);
}));
ava_1.default('Humble.cacheFonts() => All fonts in the CSS style sheets are added to '
    + 'the cache.', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const html = `
      <html>
        <head>
          <style>
            @font-face {
              src: url("test1.tff") format("tff")
                   url("/test2.woff") format("woff")
                   url("http://test.test/test3.woff2") format("woff2");
            }

            @font-face {
              src: url(test4.otf);
            }
          </style>
        </head>
      </html>
    `;
    const document = new jsdom_1.JSDOM(html).window.document;
    const humble = new humble_1.Humble({ url: '' });
    humble.document = document;
    humble.cacheFonts();
    const testResult = true
        && humble.resourceCache['test1.tff'] !== undefined
        && humble.resourceCache['/test2.woff'] !== undefined
        && humble.resourceCache['http://test.test/test3.woff2'] !== undefined
        && humble.resourceCache['test4.otf'] !== undefined;
    t.is(testResult, true);
}));
ava_1.default('Humble.cacheCursors() => All cursors in the CSS style sheets are added '
    + 'to the cache.', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const html = `
      <html>
        <head>
          <style>
            [test1] {
              cursor: url(test1.cur) url(/test2.png);
            }

            [test2] {
              cursor: url('http://test.test/test3.svg');
            }
          </style>
        </head>
      </html>
    `;
    const document = new jsdom_1.JSDOM(html).window.document;
    const humble = new humble_1.Humble({ url: '' });
    humble.document = document;
    humble.cacheCursors();
    const testResult = true
        && humble.resourceCache['test1.cur'] !== undefined
        && humble.resourceCache['/test2.png'] !== undefined
        && humble.resourceCache['http://test.test/test3.svg'] !== undefined;
    t.is(testResult, true);
}));
ava_1.default('Humble.cacheFavicons() => All favicons in the document are added to '
    + 'the cache.', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const html = `
      <html>
        <head>
          <link rel="icon" href="test1.png">
          <link rel="shortcut icon" href="/test2.png">
          <link rel="apple-touch-icon" href="test3.svg">
          <link rel="apple-touch-startup-image" href="test4.ico">
          <link rel="apple-touch-icon-precomposed" href="test5.png">
        </head>
      </html>
    `;
    const document = new jsdom_1.JSDOM(html).window.document;
    const humble = new humble_1.Humble({ url: '' });
    humble.document = document;
    humble.cacheFavicons();
    const testResult = true
        && humble.resourceCache['test1.png'] !== undefined
        && humble.resourceCache['/test2.png'] !== undefined
        && humble.resourceCache['test3.svg'] !== undefined
        && humble.resourceCache['test4.ico'] !== undefined
        && humble.resourceCache['test5.png'] !== undefined;
    t.is(testResult, true);
}));
//# sourceMappingURL=humble.js.map