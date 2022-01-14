/**
 * Unit tests on the class and ID minifier functionality.
 */

import test from 'ava';
import { JSDOM } from 'jsdom';
import {
  minifyClassNames,
  minifyIDs,
  minifyClassNamesAndIDsToAttributes,
} from '../../../../lib/modifiers/document/minifiers/class-id-minifier';

test(
  'minifyClassNames() => All class names in the document and style sheets '
+ 'are minified.',
  async (t) => {
    const html: string = `
      <html>
        <head>
          <style test="4">
            .class1 {color: #000;}
            .class2 {color: #000;}
          </style>

          <style test="5">
            .class1.class2 {color: #000;}
          </style>
        </head>
        <body>
          <p class="class1" test="1"></p>
          <p class="class1 class2" test="2"></p>
          <p class="class2" test="3"></p>
        </body>
      </html>
    `;

    const document = new JSDOM(html).window.document;

    minifyClassNames(document);

    const testResult: boolean = true
      && document.querySelector("[test='1']").getAttribute('class') === 'a'
      && document.querySelector("[test='2']").getAttribute('class') === 'a b'
      && document.querySelector("[test='3']").getAttribute('class') === 'b'
      && document.querySelector("[test='4']").innerHTML.includes('.a')
      && document.querySelector("[test='4']").innerHTML.includes('.b')
      && document.querySelector("[test='5']").innerHTML.includes('.a.b');

    t.is(testResult, true);
  },
);

test(
  'minifyIDs() => All IDs in the document and style sheets are minified.',
  async (t) => {
    const html: string = `
      <html>
        <head>
          <style test="3">
            #id1 {color: #000;}
            #id2 {color: #000;}
          </style>

          <style test="4">
            #id1#id2 {color: #000;}
          </style>
        </head>
        <body>
          <p id="id1" test="1"></p>
          <p id="id2" test="2"></p>
        </body>
      </html>
    `;

    const document = new JSDOM(html).window.document;

    minifyIDs(document);

    const testResult: boolean = true
      && document.querySelector("[test='1']").getAttribute('id') === 'a'
      && document.querySelector("[test='2']").getAttribute('id') === 'b'
      && document.querySelector("[test='3']").innerHTML.includes('#a')
      && document.querySelector("[test='3']").innerHTML.includes('#b')
      && document.querySelector("[test='4']").innerHTML.includes('#a#b');

    t.is(testResult, true);
  },
);

test(
  'minifyClassNamesAndIDsToAttributes() => All class names and IDs in the '
+ 'document and style sheets are converted to minified attributes.',
  async (t) => {
    const html: string = `
      <html>
        <head>
          <style test="3">
            #id1 {color: #000;}
            .class1 {color: #000;}
          </style>

          <style test="4">
            #id1.class1 {color: #000;}
          </style>
        </head>
        <body>
          <p id="id1" test="1"></p>
          <p class="class1" test="2"></p>
        </body>
      </html>
    `;

    const document = new JSDOM(html).window.document;

    minifyClassNamesAndIDsToAttributes(document);

    const testResult: boolean = true
      && document.querySelector("[test='1']").getAttribute('b') === ''
      && document.querySelector("[test='1']").getAttribute('id') === null
      && document.querySelector("[test='2']").getAttribute('a') === ''
      && document.querySelector("[test='2']").getAttribute('class') === null
      && document.querySelector("[test='3']").innerHTML.includes('[a]')
      && document.querySelector("[test='3']").innerHTML.includes('[b]')
      && document.querySelector("[test='4']").innerHTML.includes('[b][a]');

    t.is(testResult, true);
  },
);
