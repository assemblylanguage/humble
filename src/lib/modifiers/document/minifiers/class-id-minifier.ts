/**
 * Code for minifying all of the class names and IDs in the document.
 */

/* eslint-disable @typescript-eslint/no-inferrable-types */

import * as cssTree from 'css-tree';
import { CssNode } from 'css-tree';

/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/ban-ts-comment */

/**
 * Creates a valid minified class name or ID from a number by converting
 * the number into a base-26 number that is represented via the letters `A-Z`.
 *
 * @param num the number that will be converted to a 26-base number.
 * @returns a base-26 number represented with the letters A-Z.
 *
 * @todo improve the implementation, CSS allows for additional characters to be
 * included in the selectors, but some are disallowed as the first character.
 * Additionally, there is a small, non-destructive bug where the number after
 * `Z` will be calculated as `BA`, when it should be `AA`, but this won't have
 * any effect unless the number of CSS class names and IDs is greater than 650
 * (26 * 25), which I assume (and hope) for the majority of web pages is not
 * the case.
 */
export function createMinifiedNameFromNumber(
  base10Number: number,
) : string {
  // Using an offset from `a` on the ASCII table which will start as the base
  // number when generating base-26 numbers and converting them to characters.
  // This should generally be either the offset from `A` or `a` on the ASCII
  // table.
  const ASCII_OFFSET: number = 97;

  // Creating an array of base-26 numbers given the provided number.
  let quotient: number = base10Number;
  let remainder: number;
  const base26Array: number[] = [];

  // Repeatedly dividing the number by 26 and getting the remainder in order
  // to construct the base-26 number array.
  while (quotient > 25) {
    remainder = quotient % 26;
    quotient = Math.floor(quotient / 26);

    base26Array.unshift(remainder);
  }

  base26Array.unshift(quotient);

  // Converting the array of base-26 numbers into the characters `a-z`.
  const base26CharArray: string[] = base26Array.map((base26Number: number) => {
    return String.fromCharCode(base26Number + ASCII_OFFSET);
  });

  // Joining the characters together into a base-26 numeric string and
  // returning it.
  const base26NumericString: string = base26CharArray.join('');

  return base26NumericString;
}

/**
 * Minifies all of the class names within a document and all of the document's
 * inline style sheets.
 *
 * @command **`--minify-class-names`**
 * @example
 * ```typescript
 * // The unminified classes in the document and style sheets before running
 * // the minifier:
 * //
 * // <html>
 * //   <head>
 * //     <style>
 * //       .hello { color: #000; }
 * //     </style>
 * //   </head>
 * //   <body>
 * //     <p class="hello"></p>
 * //   </body>
 * // </html>
 *
 * // Minifying the document class names.
 * minifyClassNames(document);
 *
 * // After running the minifier, the classes in the document and style sheet
 * // will be minified:
 * //
 * // <html>
 * //   <head>
 * //     <style>
 * //       .a { color: #000; }
 * //     </style>
 * //   </head>
 * //   <body>
 * //     <p class="a"></p>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
export function minifyClassNames(
  document: Document,
) : void {
  // Setting the starting minified class number, and creating an empty map
  // between the unminified and minified class names.
  let minifiedClassCount: number = 0;
  const minifiedClassMap: { [className: string]: string } = {};

  // Getting all of the class names within the document, and populating the
  // minified class map with { unminified: minified } class names.
  const classNameElements: Element[] = [
    ...document.querySelectorAll('[class]'),
  ];

  // Looping through all elements that have a `class` attribute.
  for (const element of classNameElements) {
    const classList: string[] = [...element.classList];

    // For each of these elements, looping through all of the class names
    // within the element.
    for (const className of classList) {
      // If the unminified class name is currently not found in the minified
      // class map, generating a minified class name and adding it to the the
      // map.
      if (!(className in minifiedClassMap)) {
        // Creating a minified class name and incrementing the class count.
        const minifiedClassName: string = createMinifiedNameFromNumber(
          minifiedClassCount,
        );

        minifiedClassCount += 1;

        // Adding the minified class name to the minified class map.
        minifiedClassMap[className] = minifiedClassName;

        // Replacing the unminified class name with the minified class name in
        // the elements class list.
        element.classList.replace(className, minifiedClassName);
      } else {
        // If the class was already minified, use the minified class name in
        // the class map and set the minified name in the element's class list.
        const minifiedClassName: string = minifiedClassMap[className];

        element.classList.replace(className, minifiedClassName);
      }
    }
  }

  // Modifying all style sheets to use the minified class names in place of the
  // unminified class names.
  const styleElements: Element[] = [...document.getElementsByTagName('style')];

  for (const styleElement of styleElements) {
    // Getting the CSS and creating the AST.
    const css: string = styleElement.innerHTML;
    const cssAst: CssNode = cssTree.parse(css);

    // Walking through all the class selector nodes in the CSS AST and setting
    // the class name to the minified class name.
    cssTree.walk(cssAst, (node: CssNode) => {
      if (node.type === 'ClassSelector' && (node.name in minifiedClassMap)) {
        node.name = minifiedClassMap[node.name];
      }
    });

    // Generating new CSS code from the modified AST, and setting the style
    // element's innerHTML to the new CSS code.
    styleElement.innerHTML = cssTree.generate(cssAst);
  }
}

/**
 * Minifies all of the IDs within a document and all of the document's inline
 * style sheets, as well as updating inline references with the new IDs.
 *
 * @command **`--minify-ids`**
 * @example
 * ```typescript
 * // The unminified IDs in the document and style sheets before running the
 * // minifier:
 * //
 * // <html>
 * //   <head>
 * //     <style>
 * //       #hello { color: #000; }
 * //     </style>
 * //   </head>
 * //   <body>
 * //     <p id="hello"></p>
 * //   </body>
 * // </html>
 *
 * // Minifying the document IDs.
 * minifyIDs(document);
 *
 * // After running the minifier, the IDs in the document and style sheet will
 * // be minified:
 * //
 * // <html>
 * //   <head>
 * //     <style>
 * //       .a { color: #000; }
 * //     </style>
 * //   </head>
 * //   <body>
 * //     <p id="a"></p>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
export function minifyIDs(
  document: Document,
) : void {
  // Setting the starting minified ID, and creating an empty map between the
  // unminified and minified IDs.
  let minifiedIdCount: number = 0;
  const minifiedIdMap: { [id: string]: string } = {};

  // Getting all of the IDs within the document, and populating the minified ID
  // map with { unminified: minified } IDs.
  const idElements: Element[] = [
    ...document.querySelectorAll('[id]'),
  ];

  // Looping through all elements that have an `id` attribute.
  for (const element of idElements) {
    const id: string = element.id;

    // If the unminified ID is currently not found in the minified ID map,
    // generating a minified ID name and adding it to the the map.
    if (!(id in minifiedIdMap)) {
      // Creating a minified ID and incrementing the ID count.
      const minifiedID: string = createMinifiedNameFromNumber(
        minifiedIdCount,
      );

      minifiedIdCount += 1;

      // Adding the minified ID to the minified ID map.
      minifiedIdMap[id] = minifiedID;

      // Setting the element's ID to the minified HTML attribute.
      element.id = minifiedID;
    } else {
      // If there is already a mapping of the ID to a minified HTML
      // attribute, use the minified HTML attribute in the ID to minified
      // HTML attribute map and set the element's ID to the minified HTML
      // attribute.
      element.id = minifiedIdMap[element.id];
    }
  }

  // Modifying all style sheets to use the minified class names in place of the
  // unminified class names.
  const styleElements: Element[] = [...document.getElementsByTagName('style')];

  for (const styleElement of styleElements) {
    // Getting the CSS and creating the AST.
    const css: string = styleElement.innerHTML;
    const cssAst: CssNode = cssTree.parse(css);

    // Walking through all the ID selector nodes in the CSS AST and setting the
    // ID to the minified ID.
    cssTree.walk(cssAst, (node: CssNode) => {
      if (node.type === 'IdSelector' && (node.name in minifiedIdMap)) {
        node.name = minifiedIdMap[node.name];
      }
    });

    // Generating new CSS code from the modified AST, and setting the style
    // element's innerHTML to the new CSS code.
    styleElement.innerHTML = cssTree.generate(cssAst);
  }

  // Modifying all of the hashes in anchor tags with the minified IDs so that
  // inline references will still work.
  const inlineHrefElements: Element[] = [
    ...document.querySelectorAll('a[href^="#"]'),
  ];

  for (const element of inlineHrefElements) {
    // Getting the URL and the reference after the hash.
    const url: string = element.getAttribute('href');
    const hash: string = url.split('#').pop();

    // Getting the minified ID from the hash and setting the href to the
    // minified ID value.
    const minifiedId: string = minifiedIdMap[hash];

    element.setAttribute('href', `#${minifiedId}`);
  }
}

/**
 * Minifies all of the class names and IDs within a document, using the same
 * minification methods as the `minifyClassNames` and `minifyIDs`, except that
 * class names and IDs are converted to minified empty HTML attributes. After
 * the minified empty attributes are added to the elements, the `class`
 * attribute and `id` attribute will be removed from the element (except for
 * `id` attributes that contain inline references), and the class and ID
 * selectors in all style sheets in the page will be updated with CSS3
 * attribute selectors.
 *
 * @command **`--minify-class-names-and-ids-to-attributes`**
 * @example
 * ```typescript
 * // The unminified classes and IDs in the document and style sheets before
 * // running the minifier:
 * //
 * // <html>
 * //   <head>
 * //     <style>
 * //       #hello { color: #000; }
 * //       .world { color: #000; }
 * //     </style>
 * //   </head>
 * //   <body>
 * //     <p id="hello" class="world"></p>
 * //   </body>
 * // </html>
 *
 * // Minifying the document class names and IDs into attributes.
 * minifyClassNamesAndIDsToAttributes(document);
 *
 * // After running the minifier, the classes and IDs in the document and style
 * // sheet will be minified:
 * //
 * // <html>
 * //   <head>
 * //     <style>
 * //       #a { color: #000; }
 * //       .b { color: #000; }
 * //     </style>
 * //   </head>
 * //   <body>
 * //     <p a b></p>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
export function minifyClassNamesAndIDsToAttributes(
  document: Document,
) : void {
  // Setting the starting minified class and ID number, and creating an empty
  // map between the unminified class names and IDs and the minified HTML
  // attributes.
  let minifiedAttributeCount: number = 0;
  const minifiedClassToAttributeMap: { [className: string]: string } = {};
  const minifiedIdToAttributeMap: { [id: string]: string } = {};

  // Getting all of the class names within the document, and populating the
  // minified class map with { unminified: minified } class names and
  // HTML attributes.
  const classNameElements: Element[] = [
    ...document.querySelectorAll('[class]'),
  ];

  // Looping through all elements that have a `class` attribute.
  for (const element of classNameElements) {
    const classList: string[] = [...element.classList];

    // For each of these elements, looping through all of the class names
    // within the element.
    for (const className of classList) {
      // If the class name is currently not found in the class to minified
      // HTML attribute map, generating a minified HTML attribute and adding
      // it to the the map.
      if (!(className in minifiedClassToAttributeMap)) {
        // Creating a minified HTML attribute from the class name and
        // incrementing the attribute count.
        const minifiedHtmlAttribute: string = createMinifiedNameFromNumber(
          minifiedAttributeCount,
        );

        minifiedAttributeCount += 1;

        // Adding the class name and minified HTML attribute to the class to
        // minified HTML attribute map.
        minifiedClassToAttributeMap[className] = minifiedHtmlAttribute;

        // Adding the minified HTML attribute to the element with an empty
        // value.
        element.setAttribute(minifiedHtmlAttribute, '');
      } else {
        // If there is already a mapping of the class name to a minified HTML
        // attribute, use the minified HTML attribute in the class to minified
        // HTML attribute map and add the minified HTML attribute to the
        // element with an empty value.
        const minifiedCssAttribute: string = minifiedClassToAttributeMap[className];

        element.setAttribute(minifiedCssAttribute, '');
      }
    }

    // Removing the `class` attribute after all of the minified HTML attributes
    // have been added to the element.
    element.removeAttribute('class');
  }

  // Getting all of the IDs within the document, and populating the ID to
  // minified HTML attribute map with { unminified: minified } IDs and HTML
  // attributes.
  const idElements: Element[] = [
    ...document.querySelectorAll('[id]'),
  ];

  // Looping through all elements that have an `id` attribute.
  for (const element of idElements) {
    const id: string = element.id;

    // If the ID is currently not found in the ID to minified HTML attribute
    // map, generating a minified HTML attribute and adding it to the the map.
    if (!(id in minifiedIdToAttributeMap)) {
      // Creating a minified HTML attribute from the class name and
      // incrementing the attribute count.
      const minifiedHtmlAttribute: string = createMinifiedNameFromNumber(
        minifiedAttributeCount,
      );

      minifiedAttributeCount += 1;

      // Adding the ID and minified HTML attribute to the ID to minified HTML
      // attribute map.
      minifiedIdToAttributeMap[id] = minifiedHtmlAttribute;

      // Setting the element's ID to the minified HTML attribute.
      element.id = minifiedHtmlAttribute;
    } else {
      // If there is already a mapping of the ID to a minified HTML
      // attribute, use the minified HTML attribute in the ID to minified
      // HTML attribute map and set the element's ID to the minified HTML
      // attribute.
      element.id = minifiedIdToAttributeMap[element.id];
    }
  }

  // Modifying all of the hashes in anchor tags with the minified HTML
  // attributes so that inline references will still work.
  const inlineHrefElements: Element[] = [
    ...document.querySelectorAll('a[href^="#"]'),
  ];

  // Creating an array of all minified HTML attributes/IDs that have been
  // found in the document, as the CSS source code for these IDs should not be
  // converted to attribute selectors.
  const inlineHrefMinifiedIds: string[] = [];

  for (const element of inlineHrefElements) {
    // Getting the URL and the reference after the hash.
    const url: string = element.getAttribute('href');
    const hash: string = url.split('#').pop();

    // Getting the minified ID from the hash, adding the minified ID to the
    // array of inline minified IDs, and setting the href to the minified ID
    // value.
    const minifiedId: string = minifiedIdToAttributeMap[hash];

    inlineHrefMinifiedIds.push(minifiedId);
    element.setAttribute('href', `#${minifiedId}`);
  }

  // Modifying all style sheets to use the minified HTML attributes in place
  // of the class names and IDs.
  const styleElements: Element[] = [...document.getElementsByTagName('style')];

  for (const styleElement of styleElements) {
    // Getting the CSS and creating the AST.
    const css: string = styleElement.innerHTML;
    const cssAst: CssNode = cssTree.parse(css);

    // Walking through all the class selector and ID selector nodes in the CSS
    // AST and converting the nodes into attribute selector nodes with the
    // minified HTML attribute selectors.
    cssTree.walk(cssAst, (node: CssNode) => {
      // If the node is a class selector node and the selector's name is found
      // as a key in the class name to minified HTML attribute map, convert the
      // node into an attribute selector node with the minified HTML attribute.
      if (
        node.type === 'ClassSelector'
        && (node.name in minifiedClassToAttributeMap)
      ) {
        // @ts-ignore
        node.flags = null;
        node.loc = null;
        // @ts-ignore
        node.matcher = null;
        // @ts-ignore
        node.type = 'AttributeSelector';
        // @ts-ignore
        node.name = {
          type: 'Identifier',
          loc: null,
          name: minifiedClassToAttributeMap[node.name],
        };
      }

      // If the node is an ID selector node and the selector's name is found
      // as a key in the ID to minified HTML attribute map, convert the
      // node into an attribute selector node with the minified HTML attribute,
      // but only perform the conversion if the ID was not found inline (to
      // keep the inline references, those ID values are not replace with HTML
      // attributes).
      if (
        node.type === 'IdSelector'
        && (node.name in minifiedIdToAttributeMap)
      ) {
        const minifiedId: string = minifiedIdToAttributeMap[node.name];

        // If the ID is found as an inline reference, simply update the ID
        // selector node with the minified ID. Else, replace the node with an
        // attribute node that uses a minified HTML attribute.
        if (inlineHrefMinifiedIds.includes(minifiedId)) {
          node.name = minifiedIdToAttributeMap[node.name];
        } else {
          // @ts-ignore
          node.flags = null;
          node.loc = null;
          // @ts-ignore
          node.matcher = null;
          // @ts-ignore
          node.type = 'AttributeSelector';
          // @ts-ignore
          node.name = {
            type: 'Identifier',
            loc: null,
            name: minifiedIdToAttributeMap[node.name],
          };
        }
      }
    });

    // Generating new CSS code from the modified AST, and setting the style
    // element's innerHTML to the new CSS code.
    styleElement.innerHTML = cssTree.generate(cssAst);
  }

  // Looping through all elements that have an `id` attribute, and removing
  // the `id` attribute with an empty minified HTML attribute, except for the
  // elements that contain inline references.
  for (const element of idElements) {
    const id: string = element.id;

    // If the ID is found in the ID to minified HTML attribute map, and the
    // ID is not an inline reference, removing the `id` attribute and setting
    // the minified HTML attribute with an empty value.
    if (
      Object.values(minifiedIdToAttributeMap).includes(id)
      && !inlineHrefMinifiedIds.includes(id)
    ) {
      element.setAttribute(element.id, '');
      element.removeAttribute('id');
    }
  }
}
