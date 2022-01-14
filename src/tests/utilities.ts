/**
 * Unit tests on the general utility functions.
 */

import test from 'ava';
import { JSDOM } from 'jsdom';
import * as utilities from '../lib/utilities';

test(
  'resolveAbsoluteUrl() => Relative URL `test.html` resolved to '
+ '`http://base.test/test.html` with base URL `http://base.test`.',
  async (t) => {
    const baseUrl: string = 'http://base.test';
    const url: string = 'test.html';
    const protocol: string = 'http:';
    const absoluteUrl: string = utilities.resolveAbsoluteUrl(
      url,
      protocol,
      baseUrl,
    );

    t.is(absoluteUrl === 'http://base.test/test.html', true);
  },
);

test(
  'hasProtocol() => Protocol found on `http://test.test`',
  async (t) => {
    const url: string = 'http://test.test';
    const hasProtocol: boolean = utilities.hasProtocol(url);

    t.is(hasProtocol === true, true);
  },
);

test(
  'hasProtocol() => Protocol not found on `test.html`',
  async (t) => {
    const url: string = 'test.html';
    const hasProtocol: boolean = utilities.hasProtocol(url);

    t.is(hasProtocol === false, true);
  },
);

test(
  'hasProtocol() => Protocol found on `http://test.test/:/file:test.html`',
  async (t) => {
    const url: string = 'http://test.test/:/file:test.html';
    const hasProtocol: boolean = utilities.hasProtocol(url);

    t.is(hasProtocol === true, true);
  },
);

test(
  'getProtocol() => `http:` returned from `http://test.test/:/file:test.html`',
  async (t) => {
    const url: string = 'http://test.test/:/file:test.html';
    const protocol: string = utilities.getProtocolFromUrl(url);

    t.is(protocol === 'http:', true);
  },
);

test(
  'getProtocol() => `file:` returned from `test.html`',
  async (t) => {
    const url: string = 'test.html';
    const protocol: string = utilities.getProtocolFromUrl(url);

    t.is(protocol === 'file:', true);
  },
);

test(
  'getBaseUrl() => `http://base.test/test/` returned from '
+ '`http://base.test/test/test.html`',
  async (t) => {
    const url: string = 'http://base.test/test/test.html';
    const protocol: string = 'http:';
    const baseUrl: string = utilities.getBaseUrl(url, protocol);

    t.is(baseUrl === 'http://base.test/test/', true);
  },
);

test(
  'determineMimeType() => `image/png` returned from `test.png`',
  async (t) => {
    const url: string = 'test.png';
    const bytes: Buffer = null;
    const mimeType: string = await utilities.determineMimeType(url, bytes);

    t.is(mimeType === 'image/png', true);
  },
);

test(
  'getExtensionFromMimeType() => `.png` returned from `image/png`',
  async (t) => {
    const mimeType: string = 'image/png';
    const extension: string = utilities.getExtensionFromMimeType(mimeType);

    t.is(extension === '.png', true);
  },
);

test(
  'parseSrcsetUrls() => `[test1.png, test2.png]` returned from '
+ '`test1.png 240w, test2.png 640w`',
  async (t) => {
    const srcset: string = 'test1.png 240w, test2.png 640w';
    const urls: string[] = utilities.parseSrcsetUrls(srcset);

    const testResult: boolean = true
      && urls[0] === 'test1.png'
      && urls[1] === 'test2.png';

    t.is(testResult, true);
  },
);

test(
  'getDoctype() => `<!DOCTYPE html>` returned from document with this '
+ 'doctype.',
  async (t) => {
    const html: string = `
      <!DOCTYPE html>
      <html></html>
    `;

    const document: Document = new JSDOM(html).window.document;
    const doctype: string = utilities.getDoctype(document);

    t.is(doctype === '<!DOCTYPE html>', true);
  },
);

test(
  'createPathSafeFileName() => `test` returned from string with unsafe path '
+ 'characters doctype.',
  async (t) => {
    const pathUnsafeFileName: string = `/\\?%*:|"<>,;=test`;
    const pathSafeFileName: string = utilities.createPathSafeFileName(
      pathUnsafeFileName,
    );

    t.is(pathSafeFileName === 'test', true);
  },
);
