/**
 * Code for removing unused CSS from all of the style sheets in the document.
 */

/* eslint-disable arrow-body-style */

import * as cssParse from 'css';
import * as cssTree from 'css-tree';
import { CssNode } from 'css-tree';

/**
 * Checks if a Rule Node includes the specified class name.
 *
 * @param ruleNode a Rule Node from the `css-tree` library.
 * @param className the class name that will be checked for existence in the
 * Rule Node.
 * @returns returns true if the class name is found in the Rule Node, false
 * otherwise.
 */
function ruleHasClassName(
  ruleNode: any,
  className: string,
) : boolean {
  const foundNode: CssNode = cssTree.find(ruleNode.prelude, (node) => {
    return node.type === 'ClassSelector' && node.name === className;
  });

  return foundNode !== null;
}

/**
 * Checks if a Rule Node includes the specified ID.
 *
 * @param ruleNode a Rule Node from the `css-tree` library.
 * @param ID the ID that will be checked for existence in the Rule Node.
 * @returns returns true if the ID is found in the Rule Node, false otherwise.
 */
function ruleHasID(
  ruleNode: any,
  ID: string,
) : boolean {
  const foundNode: CssNode = cssTree.find(ruleNode.prelude, (node) => {
    return node.type === 'IdSelector' && node.name === ID;
  });

  return foundNode !== null;
}

/**
 * Removes all unused CSS code from the document. For example, if the selector
 * `p { color: #000 }` is found in a style sheet, but there are no `<p>` tags
 * on the page, the `p { color: #000 }` will be removed from the style sheet.
 *
 * @command **`--remove-unused-css`**
 * @example
 * ```typescript
 * // The HTML markup before removing unused CSS in the document:
 * //
 * // <html>
 * //   <head>
 * //     <style>
 * //       p { color: #000; }
 * //       b { color: #000; }
 * //       i { color: #000; }
 * //       u { color: #000; }
 * //     </style>
 * //   </head>
 * //   <body>
 * //     <p>Hello, World</p>
 * //   </body>
 * // </html>
 *
 * // Removing the unused CSS in the document.
 * removeHiddenElementsAndCss(document);
 *
 * // The HTML markup after removing unused CSS in the document:
 * //
 * // <html>
 * //   <head>
 * //     <style>
 * //       p { color: #000; }
 * //     </style>
 * //   </head>
 * //   <body>
 * //     <p>Hello, World</p>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
export function removeUnusedCss(
  document: Document,
) : void {
  // Getting all of the `<style>` elements in the document.
  const styleElements: Element[] = [...document.getElementsByTagName('style')];

  // For each style element, generating a CSS AST, walking through the tree,
  // getting all of the CSS selectors in the tree, and checking if an element
  // in the document is found given the selector. If no elements are found at
  // a given selector, removing that selector (and possibly the entire node)
  // from the style sheet.
  for (const styleElement of styleElements) {
    // Getting the CSS and creating the AST.
    const css: string = styleElement.innerHTML;
    const cssAst: CssNode = cssTree.parse(css);

    // Walking through all the rule nodes in the CSS AST and getting all of
    // the CSS selectors from the rule nodes.
    cssTree.walk(cssAst, {
      visit: 'Rule',
      enter: (ruleNode: CssNode, ruleItem: any, ruleList: any) => {
        // Generating a new CSS AST for each of the rule nodes.
        const cssRuleString: string = cssTree.generate(ruleNode);
        const cssRuleAst: any = cssParse.parse(cssRuleString);

        // Getting the rule from the generated AST.
        const cssRule: any = cssRuleAst.stylesheet.rules[0];

        // Getting the selectors from the generated AST.
        const cssSelectors: string[] = cssRule.selectors;

        // Filtering out all selectors where an element is found in the
        // document at that selector.
        const filteredSelectors: string[] = cssSelectors
          .filter((selector: string) => {
            // Note the try block captures any cases where a selector fails,
            // in which case keep that selector in the stylesheet. Otherwise,
            // check if the queried element at the given CSS selector is found
            // and returning true if so, false otherwise.
            try {
              const queriedElement: Element = document.querySelector(selector);

              return queriedElement !== null;
            } catch (error) {
              return true;
            }
          });

        // If none of the selectors found elements in the document, removing
        // the entire rule from the AST. Else, generating a new rule node with
        // only the selectors that found an element.
        if (filteredSelectors.length === 0) {
          ruleList.remove(ruleItem);
        } else {
          cssRule.selectors = filteredSelectors;
          const newRuleAst: CssNode = cssTree.parse(
            cssParse.stringify(cssRuleAst),
          );

          cssTree.walk(newRuleAst, (node: CssNode, item: any) => {
            if (node.type === 'Rule') {
              ruleList.replace(ruleItem, item);
            }
          });
        }
      },
    });

    // Generating new CSS code from the modified AST, and setting the CSS for
    // the style element to the new code with dead CSS code eliminated.
    const deadCodeEliminatedCss: string = cssTree.generate(cssAst);
    styleElement.innerHTML = deadCodeEliminatedCss;
  }
}
