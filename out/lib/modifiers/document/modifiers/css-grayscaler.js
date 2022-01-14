"use strict";
/**
 * Code for converting colors in CSS source code into grayscale colors.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.grayscaleCss = exports.grayscaleStyleSheet = void 0;
/* eslint-disable arrow-body-style */
const Color = require("color");
const cssTree = require("css-tree");
/**
 * Converts all of the colors in the provided CSS code into grayscale colors.
 *
 * @param css the CSS code that will be grayscaled.
 * @returns the grayscaled CSS code.
 */
function grayscaleStyleSheet(css) {
    // Creating an array of all available CSS color names.
    const cssColorNames = [
        'aliceblue', 'antiquewhite', 'aqua', 'aquamarine',
        'azure', 'beige', 'bisque', 'black',
        'blanchedalmond', 'blue', 'blueviolet', 'brown',
        'burlywood', 'cadetblue', 'chartreuse', 'chocolate',
        'coral', 'cornflowerblue', 'cornsilk', 'crimson',
        'cyan', 'darkblue', 'darkcyan', 'darkgoldenrod',
        'darkgray', 'darkgreen', 'darkgrey', 'darkkhaki',
        'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid',
        'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue',
        'darkslategray', 'darkslategrey', 'darkturquoise', 'darkviolet',
        'deeppink', 'deepskyblue', 'dimgray', 'dodgerblue',
        'firebrick', 'floralwhite', 'forestgreen', 'fuchsia',
        'gainsboro', 'ghostwhite', 'gold', 'goldenrod',
        'gray', 'green', 'greenyellow', 'grey',
        'honeydew', 'hotpink', 'indianred', 'indigo',
        'ivory', 'khaki', 'lavender', 'lavenderblush',
        'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral',
        'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgreen',
        'lightgrey', 'lightpink', 'lightsalmon', 'lightseagreen',
        'lightskyblue', 'lightslategray', 'lightslategrey', 'lightsteelblue',
        'lightyellow', 'lime', 'limegreen', 'linen',
        'magenta', 'maroon', 'mediumaquamarine', 'mediumblue',
        'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue',
        'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue',
        'mintcream', 'mistyrose', 'moccasin', 'navajowhite',
        'navy', 'oldlace', 'olive', 'olivedrab',
        'orange', 'orangered', 'orchid', 'palegoldenrod',
        'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip',
        'peachpuff', 'peru', 'pink', 'plum',
        'powderblue', 'purple', 'rebeccapurple', 'red',
        'rosybrown', 'royalblue', 'saddlebrown', 'salmon',
        'sandybrown', 'seagreen', 'seashell', 'sienna',
        'silver', 'skyblue', 'slateblue', 'slategray',
        'slategrey', 'snow', 'springgreen', 'steelblue',
        'tan', 'teal', 'thistle', 'tomato',
        'turquoise', 'violet', 'wheat', 'white',
        'whitesmoke', 'yellow', 'yellowgreen',
    ];
    // Creating an array of all available CSS color functions.
    const cssColorFunctionNames = [
        'rgb',
        'rgba',
        'hsl',
        'hsla',
    ];
    // Generating the CSS AST from the provided CSS code.
    const cssAst = cssTree.parse(css);
    // Walking through all the identifier nodes in the CSS AST and converting
    // all of the color identifiers into grayscale hash values.
    cssTree.walk(cssAst, {
        visit: 'Identifier',
        enter: (node, item, list) => {
            // Getting the identifier value from the node.
            // @ts-ignore
            const identifierValue = node.name.toLowerCase();
            // Checking if the identifier value is a CSS color name.
            if (cssColorNames.includes(identifierValue)) {
                // Getting the color name and converting it to grayscale.
                const color = Color(identifierValue);
                const grayscaleColor = color.grayscale().hex();
                // Updating the node with the grayscaled color hex value.
                // @ts-ignore
                node.name = grayscaleColor;
            }
        },
    });
    // Walking through all the hash nodes in the CSS AST and converting all of
    // the color hash values into grayscale hash values.
    cssTree.walk(cssAst, {
        visit: 'Hash',
        enter: (node, item, list) => {
            // Getting the color hash value and converting it to grayscale.
            // @ts-ignore
            const cssColor = node.value;
            const color = Color(`#${cssColor}`);
            const grayscaleColor = color.grayscale().hex().slice(1);
            // Updating the node with the grayscaled color hex value.
            // @ts-ignore
            node.value = grayscaleColor;
        },
    });
    // Walking through all the function nodes in the CSS AST and converting all
    // of the color function into grayscale hash values.
    cssTree.walk(cssAst, {
        visit: 'Function',
        enter: (node, item, list) => {
            // Getting the function name from the node.
            // @ts-ignore
            const functionName = node.name.toLowerCase();
            // Checking if the function name is a CSS color function.
            if (cssColorFunctionNames.includes(functionName)) {
                // Getting the color hash value and converting it to grayscale.
                const colorFunction = cssTree.generate(node);
                const color = Color(colorFunction);
                const grayscaleColor = color.grayscale().hex().slice(1);
                // Updating the node with the grayscaled color hex value and
                // converting the node into a Hash node.
                // @ts-ignore
                node.type = 'Hash';
                // @ts-ignore
                node.value = grayscaleColor;
                // @ts-ignore
                delete node.children;
            }
        },
    });
    // Generating new CSS code from the modified AST and returning the grayscaled
    // CSS code.
    const grayscaleCssCode = cssTree.generate(cssAst);
    return grayscaleCssCode;
}
exports.grayscaleStyleSheet = grayscaleStyleSheet;
/**
 * Converts all colors in the document in all `<style>` tags and `style`
 * attributes into grayscale colors.
 *
 * @command **`--grayscale-css`**
 * @example
 * ```typescript
 * // The HTML markup before grayscaling CSS colors in the document:
 * //
 * // <html>
 * //   <head>
 * //     <style>
 * //       p { color: red; }
 * //       b { color: green; }
 * //       i { color: #00f; }
 * //       u {
 * //           background-image: linear-gradient(
 * //             to right,
 * //             rgb(255, 0, 0),
 * //             green,
 * //             #0000ff00,
 * //             hsla(0, 100%, 50%, 1.0)
 * //           );
 * //         }
 * //     </style>
 * //   </head>
 * //   <body>
 * //     <p style="color: red;">Hello, World</p>
 * //   </body>
 * // </html>
 *
 * // Grayscaling all of the colors in the `<style>` tags in the document.
 * grayscaleCss(document);
 *
 * // The HTML markup after grayscaling CSS colors in the document:
 * //
 * // <html>
 * //   <head>
 * //     <style>
 * //       p { color: #4D4D4D; }
 * //       b { color: #4C4C4C; }
 * //       i { color: #1C1C1C; }
 * //       u {
 * //           background-image: linear-gradient(
 * //             to right,
 * //             #4D4D4D,
 * //             #4C4C4C,
 * //             #1C1C1C,
 * //             #4D4D4D
 * //           );
 * //         }
 * //     </style>
 * //   </head>
 * //   <body>
 * //     <p style="color: #4D4D4D;">Hello, World</p>
 * //   </body>
 * // </html>
 * ```
 *
 * @param document the document that will be modified in place.
 */
function grayscaleCss(document) {
    // Getting all of the `<style>` elements in the document.
    const styleElements = [...document.getElementsByTagName('style')];
    // Converting all of the colors in the `<style>` elements into grayscale.
    for (const styleElement of styleElements) {
        // Getting the CSS and running the grayscale conversion function.
        const css = styleElement.innerHTML;
        const grayscaledCss = grayscaleStyleSheet(css);
        // Setting the `<style>` element's CSS code to the grayscaled code.
        styleElement.innerHTML = grayscaledCss;
    }
    // Getting all fo the elements in the document with a `style` attribute.
    const styleAttributeElements = [
        ...document.querySelectorAll('[style]'),
    ];
    // Converting all of the colors in the `style` attribute to grayscale.
    for (const styleAttributeElement of styleAttributeElements) {
        // Getting the CSS code from the attribute.
        const css = styleAttributeElement.getAttribute('style');
        // Creating a minimal stylesheet from the code that is compatible with the
        // `css-tree` library.
        const cssTreeCompatibleCss = `x{${css}}`;
        // Converting the compatible CSS code to grayscale and getting the
        // grayscaled code from the output.
        const cssTreeCompatibleGrayscaledCss = grayscaleStyleSheet(cssTreeCompatibleCss);
        const grayscaledCss = cssTreeCompatibleGrayscaledCss.slice(2, cssTreeCompatibleGrayscaledCss.length - 1);
        // Updating the `style` attribute with the grayscaled code.
        styleAttributeElement.setAttribute('style', grayscaledCss);
    }
}
exports.grayscaleCss = grayscaleCss;
//# sourceMappingURL=css-grayscaler.js.map