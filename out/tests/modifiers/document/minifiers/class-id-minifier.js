"use strict";
/**
 * Unit tests on the class and ID minifier functionality.
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
const class_id_minifier_1 = require("../../../../lib/modifiers/document/minifiers/class-id-minifier");
ava_1.default('minifyClassNames() => All class names in the document and style sheets '
    + 'are minified.', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const html = `
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
    const document = new jsdom_1.JSDOM(html).window.document;
    class_id_minifier_1.minifyClassNames(document);
    const testResult = true
        && document.querySelector("[test='1']").getAttribute('class') === 'a'
        && document.querySelector("[test='2']").getAttribute('class') === 'a b'
        && document.querySelector("[test='3']").getAttribute('class') === 'b'
        && document.querySelector("[test='4']").innerHTML.includes('.a')
        && document.querySelector("[test='4']").innerHTML.includes('.b')
        && document.querySelector("[test='5']").innerHTML.includes('.a.b');
    t.is(testResult, true);
}));
ava_1.default('minifyIDs() => All IDs in the document and style sheets are minified.', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const html = `
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
    const document = new jsdom_1.JSDOM(html).window.document;
    class_id_minifier_1.minifyIDs(document);
    const testResult = true
        && document.querySelector("[test='1']").getAttribute('id') === 'a'
        && document.querySelector("[test='2']").getAttribute('id') === 'b'
        && document.querySelector("[test='3']").innerHTML.includes('#a')
        && document.querySelector("[test='3']").innerHTML.includes('#b')
        && document.querySelector("[test='4']").innerHTML.includes('#a#b');
    t.is(testResult, true);
}));
ava_1.default('minifyClassNamesAndIDsToAttributes() => All class names and IDs in the '
    + 'document and style sheets are converted to minified attributes.', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const html = `
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
    const document = new jsdom_1.JSDOM(html).window.document;
    class_id_minifier_1.minifyClassNamesAndIDsToAttributes(document);
    const testResult = true
        && document.querySelector("[test='1']").getAttribute('b') === ''
        && document.querySelector("[test='1']").getAttribute('id') === null
        && document.querySelector("[test='2']").getAttribute('a') === ''
        && document.querySelector("[test='2']").getAttribute('class') === null
        && document.querySelector("[test='3']").innerHTML.includes('[a]')
        && document.querySelector("[test='3']").innerHTML.includes('[b]')
        && document.querySelector("[test='4']").innerHTML.includes('[b][a]');
    t.is(testResult, true);
}));
//# sourceMappingURL=class-id-minifier.js.map