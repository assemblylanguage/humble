/**
 * Unit tests on the Content Security Policy modifier functionality.
 */

import test from 'ava';
import { JSDOM } from 'jsdom';
import {
  addStyleCSP,
  addScriptCSP,
  addContentSecurityPolicyBlock,
} from '../../../../lib/modifiers/document/modifiers/content-security-policy-modifier';

test(
  'addStyleCSP() => Adds a Content Security Policy to the document to block '
+ 'styles.',
  async (t) => {
    const html: string = `
      <html>
        <head></head>
        <body></body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    addStyleCSP(document);

    const cspMetaElement: Element = document.querySelector(
      'meta[http-equiv="Content-Security-Policy"]',
    );

    const testResult: boolean = cspMetaElement
      .getAttribute('content')
      .includes('style-src none');

    t.is(testResult, true);
  },
);

test(
  'addScriptCSP() => Adds a Content Security Policy to the document to block '
+ 'scripts.',
  async (t) => {
    const html: string = `
      <html>
        <head></head>
        <body></body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    addScriptCSP(document);

    const cspMetaElement: Element = document.querySelector(
      'meta[http-equiv="Content-Security-Policy"]',
    );

    const testResult: boolean = cspMetaElement
      .getAttribute('content')
      .includes('script-src none');

    t.is(testResult, true);
  },
);

test(
  'addContentSecurityPolicyBlock() => Adds a Content Security Policy to the '
+ 'document to block styles and scripts.',
  async (t) => {
    const html: string = `
      <html>
        <head></head>
        <body></body>
      </html>
    `;

    const document: Document = new JSDOM(html).window.document;

    addContentSecurityPolicyBlock(document, 'style-src');
    addContentSecurityPolicyBlock(document, 'script-src');

    const cspMetaElement: Element = document.querySelector(
      'meta[http-equiv="Content-Security-Policy"]',
    );

    const testResult: boolean = true
      && cspMetaElement
        .getAttribute('content')
        .includes('style-src none')

      && cspMetaElement
        .getAttribute('content')
        .includes('script-src none');

    t.is(testResult, true);
  },
);
