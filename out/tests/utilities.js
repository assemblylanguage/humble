"use strict";
/**
 * Unit tests on the general utility functions.
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
const utilities = require("../lib/utilities");
ava_1.default('resolveAbsoluteUrl() => Relative URL `test.html` resolved to '
    + '`http://base.test/test.html` with base URL `http://base.test`.', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const baseUrl = 'http://base.test';
    const url = 'test.html';
    const protocol = 'http:';
    const absoluteUrl = utilities.resolveAbsoluteUrl(url, protocol, baseUrl);
    t.is(absoluteUrl === 'http://base.test/test.html', true);
}));
ava_1.default('hasProtocol() => Protocol found on `http://test.test`', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const url = 'http://test.test';
    const hasProtocol = utilities.hasProtocol(url);
    t.is(hasProtocol === true, true);
}));
ava_1.default('hasProtocol() => Protocol not found on `test.html`', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const url = 'test.html';
    const hasProtocol = utilities.hasProtocol(url);
    t.is(hasProtocol === false, true);
}));
ava_1.default('hasProtocol() => Protocol found on `http://test.test/:/file:test.html`', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const url = 'http://test.test/:/file:test.html';
    const hasProtocol = utilities.hasProtocol(url);
    t.is(hasProtocol === true, true);
}));
ava_1.default('getProtocol() => `http:` returned from `http://test.test/:/file:test.html`', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const url = 'http://test.test/:/file:test.html';
    const protocol = utilities.getProtocolFromUrl(url);
    t.is(protocol === 'http:', true);
}));
ava_1.default('getProtocol() => `file:` returned from `test.html`', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const url = 'test.html';
    const protocol = utilities.getProtocolFromUrl(url);
    t.is(protocol === 'file:', true);
}));
ava_1.default('getBaseUrl() => `http://base.test/test/` returned from '
    + '`http://base.test/test/test.html`', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const url = 'http://base.test/test/test.html';
    const protocol = 'http:';
    const baseUrl = utilities.getBaseUrl(url, protocol);
    t.is(baseUrl === 'http://base.test/test/', true);
}));
ava_1.default('determineMimeType() => `image/png` returned from `test.png`', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const url = 'test.png';
    const bytes = null;
    const mimeType = yield utilities.determineMimeType(url, bytes);
    t.is(mimeType === 'image/png', true);
}));
ava_1.default('getExtensionFromMimeType() => `.png` returned from `image/png`', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const mimeType = 'image/png';
    const extension = utilities.getExtensionFromMimeType(mimeType);
    t.is(extension === '.png', true);
}));
ava_1.default('parseSrcsetUrls() => `[test1.png, test2.png]` returned from '
    + '`test1.png 240w, test2.png 640w`', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const srcset = 'test1.png 240w, test2.png 640w';
    const urls = utilities.parseSrcsetUrls(srcset);
    const testResult = true
        && urls[0] === 'test1.png'
        && urls[1] === 'test2.png';
    t.is(testResult, true);
}));
ava_1.default('getDoctype() => `<!DOCTYPE html>` returned from document with this '
    + 'doctype.', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const html = `
      <!DOCTYPE html>
      <html></html>
    `;
    const document = new jsdom_1.JSDOM(html).window.document;
    const doctype = utilities.getDoctype(document);
    t.is(doctype === '<!DOCTYPE html>', true);
}));
ava_1.default('createPathSafeFileName() => `test` returned from string with unsafe path '
    + 'characters doctype.', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const pathUnsafeFileName = `/\\?%*:|"<>,;=test`;
    const pathSafeFileName = utilities.createPathSafeFileName(pathUnsafeFileName);
    t.is(pathSafeFileName === 'test', true);
}));
//# sourceMappingURL=utilities.js.map