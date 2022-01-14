/**
 * Code for removing any hidden elements within the document.
 */

/* eslint-disable consistent-return */

import * as _ from 'lodash';
import * as cssParse from 'css';
import * as cssTree from 'css-tree';
import { Rule, CssNode } from 'css-tree';

/**
 * Checks if a `Rule` node has a specified property.
 *
 * @param ruleNode the `Rule` node that will be checked.
 * @param propertyName the name of the property.
 * @param propertyValue the value of the property.
 * @returns true if the `Rule` has the property and value provided, false
 * otherwise.
 */
function ruleHasProperty(
  ruleNode: Rule,
  propertyName: string,
  propertyValue: string,
) : boolean {
  // Finding nodes at a given `Rule` node with a given property and value for
  // that property.
  const foundNode: CssNode = cssTree.find(ruleNode, (node) => {
    // Checking if the nodes under a given `Rule` node is a `Declaration` node
    // and has the property name provided.
    if (
      node.type === 'Declaration'
      && node.property === propertyName
    ) {
      // If the found `Declaration` node has an `Identifier` node with the
      // property value provided, returning the `Identifier` node. Else, if no
      // nodes are found, returning null.
      const propertyFound: CssNode = cssTree.find(node, (propertyNode) => {
        if (
          propertyNode.type === 'Identifier'
          && propertyNode.name === propertyValue
        ) {
          return true;
        }
      });

      // Returning false when the specified property and value are not found.
      return propertyFound !== null;
    }
  });

  // Returning true if the property and value were found, false otherwise.
  return foundNode !== null;
}

/**
 * Removes all elements from the document and all rules from the inline
 * stylesheets with `display: none` CSS declarations.
 *
 * @command **`--remove-hidden-elements-and-css`**
 * @example
 * ```typescript
 * // The HTML markup before removing hidden elements in the document:
 * //
 * // <html>
 * //   <head>
 * //     <style>
 * //       p { display: none; }
 * //     </style>
 * //   </head>
 * //   <body>
 * //     <p>Hello, World</p>
 * //     <div style="display: none;">Hello, World</div>
 * //   </body>
 * // </html>
 *
 * // Removing the hidden elements in the document.
 * removeHiddenElementsAndCss(document);
 *
 * // The HTML markup after removing hidden elements in the document:
 * //
 * // <html>
 * //   <head>
 * //     <style>
 * //       p { display: none; }
 * //     </style>
 * //   </head>
 * //   <body>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
export function removeHiddenElementsAndCss(
  document: Document,
) : void {
  // Getting all elements with a `style` attribute.
  const inlineStyleElements: Element[] = [
    ...document.querySelectorAll('[style]'),
  ];

  // Removing all elements with `display: none` inline styles.
  for (const element of inlineStyleElements) {
    // Getting the inline styles and checking if a `display: none` is found.
    const inlineCss: string = element.getAttribute('style');
    const isHidden: boolean = /display\s*?[:]\s*?none/gmi.test(inlineCss);

    // Removing the element if it is hidden.
    if (isHidden) {
      element.remove();
    }
  }

  // Getting all `<style>` elements in the document.
  const styleElements: Element[] = [...document.getElementsByTagName('style')];

  // Getting all CSS selectors in all style sheets with a `display: none` rule,
  // removing those elements from the document, and removing the CSS selectors
  // that select those elements from the style sheet.
  for (const styleElement of styleElements) {
    const css: string = styleElement.innerHTML;
    const cssAst: any = cssTree.parse(css);

    // Walking through all the rule nodes in the CSS AST and looking for
    // rules with `display: none` properties.
    cssTree.walk(cssAst, {
      visit: 'Rule',
      enter: (node: Rule, item, list) => {
        // Checking if the rule has a `display: none` property.
        if (ruleHasProperty(node, 'display', 'none')) {
          // Removing all of these rules from the AST.
          list.remove(item);

          // Getting all of the CSS selectors from this rule.
          const cssRules: any[] = cssParse.parse(cssTree.generate(node))
            .stylesheet
            .rules;

          const cssSelectors: string[] = _(cssRules)
            .map((cssRule: any) => cssRule.selectors)
            .flattenDeep()
            .value();

          // Removing all of the elements in the document with these CSS
          // selectors, as they are hidden elements and won't be displayed.
          for (const cssSelector of cssSelectors) {
            const foundElement: Element = document.querySelector(cssSelector);

            if (foundElement !== null) {
              foundElement.remove();
            }
          }
        }
      },
    });

    // Generating new CSS code from the modified AST, and setting the innerHTML
    // to the new CSS code.
    const reducedCss: string = cssTree.generate(cssAst);

    styleElement.innerHTML = reducedCss;
  }
}
