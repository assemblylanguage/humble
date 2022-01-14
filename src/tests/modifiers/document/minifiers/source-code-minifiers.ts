/**
 * Unit tests on the source code minifier functionality.
 */

import test from 'ava';
import { JSDOM } from 'jsdom';
import {
  collapseEmptyAttributes,
  minifyGenericTagNames,
} from '../../../../lib/modifiers/document/minifiers/source-code-minifiers';

test(
  'collapseEmptyAttributes() => All empty attributes in the HTML page are '
+ 'collapsed.',
  async (t) => {
    const html: string = `
      <html>
        <body>
          <p test1=""></p>
          <p test2=""></p>
          <p test3=""></p>
        </body>
      </html>
    `;

    const collapsedHtml: string = collapseEmptyAttributes(html);
    const testResult: boolean = true
      && collapsedHtml.includes('<p test1>')
      && collapsedHtml.includes('<p test2>')
      && collapsedHtml.includes('<p test3>');

    t.is(testResult, true);
  },
);

test(
  'minifyGenericTagNames() => Generic tags name such as `<div>` and `<span>` '
+ 'are minified.',
  async (t) => {
    const html: string = `
      <html>
        <body>
          <div></div>
          <span></span>
        </body>
      </html>
    `;

    const document = new JSDOM(html).window.document;

    minifyGenericTagNames(document);

    const testResult: boolean = true
      && document.querySelector('d') !== null
      && document.querySelector('n') !== null;

    t.is(testResult, true);
  },
);
