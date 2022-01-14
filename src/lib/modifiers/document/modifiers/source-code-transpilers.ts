/**
 * Code for transpiling JS source code throughout the document.
 */

/* eslint-disable no-script-url */
/* eslint-disable no-multi-spaces */

import * as babel from '@babel/core';

/**
 * Transpiles the JavaScript in all `<script>` tags, in all inline script
 * attributes in the document, and all `javascript:` protocols. The
 * implementation is from the `@babel/core` library.
 *
 * @command **`--transpile-es6-to-es5`**
 * @example
 * ```typescript
 * // The untranspiled JS before running the transpiler:
 * //
 * // <html>
 * //   <head>
 * //     <script>
 * //       let hello = 'world';
 * //     </script>
 * //   </head>
 * // </html>
 *
 * // Transpiling the document JS.
 * transpileEs6ToEs5(document, options);
 *
 * // After running the transpiler, the ES6+ JS will be transpiled to ES5:
 * //
 * // <html>
 * //   <head>
 * //     <script>
 * //       var hello = 'world';
 * //     </script>
 * //   </head>
 * // </html>
 *
 * @param document the document that will be modified in place.
 * @param options the options used within the `@babel/core` library.
 *
 * @see https://babeljs.io/
 */
export function transpileEs6ToEs5(
  document: Document,
  options: any,
): void {
  // Transpiling all of the JavaScript in the `<script>` tags
  const scriptElements: Element[] = [
    ...document.getElementsByTagName('script'),
  ];

  for (const scriptElement of scriptElements) {
    // Getting the JavaScript code and transpiling it.
    const js: string = scriptElement.innerHTML;
    const transpiledJs: string = babel.transformSync(js);

    // Setting the transpiled code in the innerHTML of the element.
    scriptElement.innerHTML = transpiledJs;
  }

  // Minifying all of the JavaScript in the inline script attributes.
  const eventAttributes: string[] = [
    'onabort',              'onanimationcancel',  'onanimationend',
    'onanimationiteration', 'onanimationstart',   'onauxclick',
    'onblur',               'onerror',            'onfocus',
    'oncancel',             'oncanplay',          'oncanplaythrough',
    'onchange',             'onclick',            'onclose',
    'oncontextmenu',        'oncuechange',        'ondblclick',
    'ondrag',               'ondragend',          'ondragenter',
    'ondragexit',           'ondragleave',        'ondragover',
    'ondragstart',          'ondrop',             'ondurationchange',
    'onemptied',            'onended',            'onformdata',
    'ongotpointercapture',  'oninput',            'oninvalid',
    'onkeydown',            'onkeypress',         'onkeyup',
    'onload',               'onloadeddata',       'onloadedmetadata',
    'onloadend',            'onloadstart',        'onlostpointercapture',
    'onmousedown',          'onmouseenter',       'onmouseleave',
    'onmousemove',          'onmouseout',         'onmouseover',
    'onmouseup',            'onmousewheel',       'onwheel',
    'onpause',              'onplay',             'onplaying',
    'onpointerdown',        'onpointermove',      'onpointerup',
    'onpointercancel',      'onpointerover',      'onpointerout',
    'onpointerenter',       'onpointerleave',     'onpointerlockchange',
    'onpointerlockerror',   'onprogress',         'onratechange',
    'onreset',              'onresize',           'onscroll',
    'onseeked',             'onseeking',          'onselect',
    'onselectstart',        'onselectionchange',  'onshow',
    'onsort',               'onstalled',          'onsubmit',
    'onsuspend',            'ontimeupdate',       'onvolumechange',
    'ontouchcancel',        'ontouchend',         'ontouchmove',
    'ontouchstart',         'ontransitioncancel', 'ontransitionend',
    'ontransitionrun',      'ontransitionstart',  'onwaiting',
  ];

  const allElements: Element[] = [
    ...document.getElementsByTagName('*'),
  ];

  // For each element in the document, if the element has one of the `on*`
  // event attributes, minifying the JavaScript code in that attribute.
  for (const element of allElements) {
    for (const eventAttribute of eventAttributes) {
      if (element.hasAttribute(eventAttribute)) {
        // Getting the JavaScript code and minifying it.
        const js: string = element.getAttribute(eventAttribute);
        const transpiledJs: string = babel.transformSync(js, options);

        // Setting the transpiled code in the event attribute of the element.
        element.setAttribute(eventAttribute, transpiledJs);
      }
    }
  }

  // Minifying the JavaScript in all inline `href` attributes using the
  // `javascript:` protocol.
  const hrefElements: Element[] = [
    ...document.querySelectorAll('[href]'),
  ];

  for (const element of hrefElements) {
    const href: string = element.getAttribute('href') ?? '';

    if (/javascript:/gmi.test(href) === true) {
      // Getting the JavaScript code and minifying it.
      const js: string = element.getAttribute('href')
        .split('javascript:')
        .slice(1)
        .join('javascript:');

      const transpiledJs: string = babel.transformSync(js, options);

      // Setting the transpiled code in the `href` attribute of the element.
      element.setAttribute('href', `javascript:${transpiledJs}`);
    }
  }
}
