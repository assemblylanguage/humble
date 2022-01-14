# Humble (HTML Bundler)

_Bundle web pages for offline viewing_

## Table of Contents

* [Overview](#overview)
* [Usage](#usage)
* [Installation](#installation)
    - [Windows](#windows)
    - [Mac](#mac)
    - [Linux](#linux)
    - [BSD](#bsd)
    - [Haiku](#haiku)
    - [Other](#other)
* [Building](#building)
* [API](#api)
* [Docs](#docs)
* [License](#license)

## Overview

A web page bundler, similar to [Monolith](https://github.com/Y2Z/monolith), with these in mind:

* **Security**: Incorporates [DOM Purify](https://github.com/cure53/DOMPurify) and custom sanitizers to remove possible malware from bundles.
* **Speed**: Resources are fetched asynchronously when they are needed for bundling. Any resources not needed are not fetched to improve speed.
* **Efficiency**: High levels of minification and compressions through [Terser](https://github.com/terser/terser), [Clean CSS](https://www.npmjs.com/package/clean-css), [HTML Minifier](https://www.npmjs.com/package/html-minifier), and many more custom minifiers.
* **Extensibility**: Extensive CLI API for customizing bundling process.

## Usage

Creating an archive of a webpage:

```sh
humble \
    https://wikipedia.org/wiki/Unix \
    --out archive.html
```

Adding a custom style sheet to the archive:

```sh
humble \
    https://wikipedia.org/wiki/Unix \
    --inject-custom-style-sheet ./styles.css \
    --out archive.html
```

Creating a safe archive by removing scripts, frames, URLs, etc.

```sh
humble \
    https://wikipedia.org/wiki/Unix \
    --sanitize \
    --out archive.html
```

Minifying HTML, CSS, and JS in the archive:

```sh
humble \
    https://wikipedia.org/wiki/Unix \
    --minify \
    --out archive.html
```

Beautifying HTML, CSS, and JS in the archive:

```sh
humble \
    https://wikipedia.org/wiki/Unix \
    --beautify \
    --out archive.html
```

Grayscaling the archive:

```sh
humble \
    https://wikipedia.org/wiki/Unix \
    --grayscale \
    --out archive.html
```

Additional options through the `--help` command:

```
Usage: humble [options] <url>

Humble - HTML page bundler.

Arguments:
  url                                          The URL of the page that will be bundled. Either an absolute HTTP URL or relative or absolute file URL.

Options:
  -v, --version                                output the version number
  -o --out <type>                              The path of the file that the HTML archive will be written to.
  -s --silent                                  Silences all of the console output.
  -c --check-dependencies                      Checks which dependencies used by Humble are available on the platform.
  --use-title                                  Uses the title of the document as the output file name.
  --remove-style-tags                          Removes `<style>` tags from the HTML page.
  --remove-alternative-styles-tags             Removes alternative style sheets from the HTML page.
  --remove-inline-styles                       Removes inline `style` attributes.
  --remove-styles                              Removes all styles from the HTML page.
  --add-style-csp                              Sets a style `Content-Security-Policy` to block styles.
  --remove-script-tags                         Removes `<script>` tags from the HTML page.
  --remove-noscript-tags                       Removes `<noscript>` tags from the HTML page.
  --remove-inline-scripts                      Removes inline script event handler `on*` attributes and `href` attributes with `javascript:` protocols.
  --remove-href-scripts                        Removes scripts in the `href` attributes that use the `javascript:` protocol.
  --remove-scripts                             Removes all scripts from the HTML page.
  --add-script-csp                             Sets a script `Content-Security-Policy` to block scripts.
  --remove-image-srcs                          Removes the `src` attribute from image tags.
  --remove-image-srcsets                       Removes the `srcset` attribute from image tags.
  --remove-image-alts                          Removes the `alt` attribute from image tags.
  --remove-image-attributes                    Removes `src`, `srcset`, and `alt` attributes from image tags.
  --remove-css-images                          Removes images from CSS style sheets.
  --remove-images                              Removes all images from the HTML page, including in the CSS style sheets.
  --add-image-csp                              Sets an image `Content-Security-Policy` to block images.
  --remove-frames                              Removes all frames from the HTML page.
  --add-frame-csp                              Sets a frame `Content-Security-Policy` to block frames.
  --remove-video-srcs                          Removes the `src` attribute from video tags.
  --remove-videos                              Removes all videos from the HTML page.
  --add-video-csp                              Sets a video `Content-Security-Policy` to block videos.
  --remove-audio-srcs                          Removes the `src` attribute from audio tags.
  --remove-audio                               Removes all audio from the HTML page.
  --add-audio-csp                              Sets an audio `Content-Security-Policy` to block audio.
  --remove-fonts                               Removes all fonts from the HTML page.
  --add-font-csp                               Sets a font `Content-Security-Policy` to block fonts.
  --remove-cursors                             Removes all cursors from the HTML page.
  --remove-favicons                            Removes all favicons from the HTML page.
  --remove-canvas                              Removes all `<canvas>` tags from the HTML page.
  --remove-conditional-comments                Removes conditional comments from the HTML page.
  --remove-non-conditional-comments            Removes non-conditional comments from the HTML page.
  --remove-comments                            Removes all comments from the HTML page.
  --remove-forms                               Removes all `<form>` tags from the HTML page.
  --remove-form-attributes                     Removes all attributes from `<form>` tags in the HTML page.
  --remove-form-tags-only                      Removes `<form>` tags, but no nested tags, from the HTML page.
  --remove-non-display-meta-tags               Removes non-display `<meta>` tags from the HTML page.
  --remove-non-display-link-tags               Removes non-display `<link>` tags from the HTML page.
  --remove-meta-refresh-tag                    Removes refresh `<meta>` tags from the HTML page.
  --remove-non-inline-anchor-hrefs             Removes the `href` attribute from `<a>` tags that link to external files, but not the links to internal sections of the HTML page.
  --remove-anchor-hrefs                        Removes the `href` attribute from `<a>` tags.
  --remove-default-attributes                  Removes any redundant default attributes from all tags in the HTML page.
  --remove-aria-attributes                     Removes all WAI-ARIA attributes from the HTML page.
  --remove-data-attributes                     Removes all Data attributes from the HTML page.
  --remove-integrity-check-attributes          Removes all integrity check attributes from the HTML page.
  --remove-empty-non-display-elements          Removes empty elements that don't have an effect on page rendering. For example, and empty `<style></style>` will be removed.
  --remove-tracking-pixels                     Removes all tracking pixels from the HTML page.
  --remove-hidden-elements                     Removes all hidden elements from the HTML page.
  --remove-custom-tags-by-name <type>          Removes all tags from the HTML page in the provided pipe-delimited string of custom tags. For example, `foo|bar` will remove all `<foo>` and
                                               `<bar>` tags. When used programmatically, a JavaScript string[] array can be used.
  --remove-custom-tags-by-css-selector <type>  Removes all tags from the HTML page in the provided pipe-delimited string of custom CSS selectors. For example, `[foo]|[bar]` will remove all
                                               tags with the `foo` attribute and all tags with the `bar` attribute. When used programmatically, a JavaScript string[] array can be used.
  --remove-unused-css                          Removes all CSS code from the style sheets that are no used in the HTML page.
  --dom-purify                                 Sanitizes the HTML using the DOM Purify library.
  --markdown                                   Converts the HTML to Markdown format.
  --collapse-empty-attributes                  Collapses empty HTML attribute values. For example, `<input type="radio" checked="">` will collapse the empty attribute into `<input
                                               type="radio" checked>`.
  --minify-html                                Minifies the HTML in the HTML page.
  --minify-css                                 Minifies the CSS in the HTML page.
  --minify-js                                  Minifies the JavaScript in the HTML page.
  --minify-generic-tag-names                   Minifies tag names for non-semantic elements such as `<div>` and `<span>`.
  --minify-class-names                         Minifies all class names in the stylesheets and HTML page.
  --minify-ids                                 Minifies all IDs in the stylesheets and HTML page.
  --minify-class-names-and-ids-to-attributes   Minifies all class names and IDs in the stylesheets and HTML page into attributes and CSS attribute selectors.
  --beautify                                   Beautifies the HTML page. Runs `--beautify-html`, `--beautify-css`, and `--beautify-js`.
  --beautify-html                              Beautifies the HTML in the HTML page.
  --beautify-css                               Beautifies the CSS in the HTML page.
  --beautify-js                                Beautifies the JavaScript in the HTML page.
  --convert-images-to-supported-image-formats  Converts all images in the HTML into formats supported by most browsers (PNG, JPEG, and GIF). For example, WEBP and TIFF images will be
                                               converted, as these types are only supported by a subset of browsers
  --minify-images                              Minifies images in the HTML page.
  --jpeg-quality                               When minifying images, sets the JPEG quality value. The default value is `40`.
  --allow-webp                                 When minifying images, allows the conversion to the WEBP image to improve minification. By default the WEBP image type will not be used.
  --webp-quality                               When minifying images, sets the WEBP quality value. The default value is `20`.
  --minify-audio                               Minifies audio in the HTML page.
  --minify-videos                              Minifies videos in the HTML page.
  --minify-fonts                               Minifies fonts in the HTML page.
  --remove-resource-metadata                   Remove metadata from resources in the HTML page.
  --keep-resource-if-larger                    When removing resource metadata, if set will keep the new resource with the removed metadata even if the resource is larger after the
                                               modification.
  --transpile-es6-to-es5                       Transpiles ES6 to ES5 JavaScript code in the HTML page.
  --grayscale-css                              Grayscales all CSS colors in the HTML page.
  --grayscale-images                           Grayscales all images in the HTML page.
  --grayscale-videos                           Grayscales all videos in the HTML page.
  --grayscale                                  Grayscales the HTML page, including CSS colors, images, and videos.
  --readability-mode                           Converts the document into readability mode using Mozilla's readability library.
  --inject-custom-style-sheet <type>           Injects a custom style sheet into the HTML page.
  --inject-html5-polyfill                      Injects an HTML5 polyfill into the HTML page.
  --inject-css-flexbox-polyfill                Injects a CSS flexbox polyfill into the HTML page.
  --inject-media-query-polyfill                Injects a media query polyfill into the HTML page.
  --inject-html5-media-polyfill                Injects a `<video>` and `<audio>` tag polyfill into the HTML page.
  --inject-canvas-polyfill                     Injects a `<canvas>` tag polyfill into the HTML page.
  --inject-es5-polyfill                        Injects an ES5 shim polyfill into the HTML page.
  --inject-flash-player                        Injects a Ruffle flash player into that page that will play flash content embedded in the page.
  --inject-compiled-page                       Injects a compiled version of the HTML page as a self-extracting script into the HTML page.
  --headers <type>                             A pipe-delimited string of HTTP headers used in the requests. For example, `User-Agent:custom-ua|Accept-Language:en-US` will pass `User-Agent`
                                               with the value `custom-ua` and `Accept-Language` with the value `en-US` as headers in the request. When used programmatically, a JavaScript
                                               object of { [header: string]: string } can be used.
  --socks-proxy <type>                         Use the provided socks5 proxy as a transport.
  --headless-browser-transport                 Uses a headless browser when fetching the HTML page and all the page resources. Note that if this option is specified, the executable path must
                                               be specified using the `--headless-browser-executable-path` argument. Additional arguments may be passed to the headless browser via the
                                               `--headless-browser-args` path as a pipe-separated string. Additionally, if the `--socks-proxy` argument is specified, resources will be
                                               fetched using the socks5 proxy on chromium-based browsers.
  --headless-browser-executable-path <type>    The path to the headless browser executable.
  --headless-browser-args <type>               Arguments passed to the headless browser as a pipe-separated string. For example, `--headless-browser-args "--arg1 value1|--arg2 value2"` will
                                               pass the arguments `--arg1 value1` and `--arg2 value2` to the headless browser.
  --sanitize                                   A prebuilt set of options creating safe HTML page archives by removing scripts, frames, canvases, comments, forms, and resource metadata, as
                                               well as adding security policies to block scripts and frames.
  --compatibility                              A prebuilt set of options that adds polyfills to the HTML archive and convert resources in the page into formats compatible with older
                                               browsers.
  --simple-minification                        A prebuilt set of options for losslessly minifying the HTML archive.
  --advanced-minification                      A prebuilt set of options for aggressive minification. May break page functionality.
  --extreme-minification                       A prebuilt set of options for performing as many optimizations to HTML archive as possible. Produces the smallest archives, but will almost
                                               always break page functionality.
  -h, --help                                   display help for command
```

## Installation

Install humble by downloading the binary and using `node` to run it. On `Windows` and `Mac`, the humble binary should be moved to your preferred location and optional dependencies need to be downloaded manually. On `*nix` platforms, the binary will be installed in a location on the PATH, and installation instructions include optional dependencies.

### Windows

```powershell
curl https://raw.githubusercontent.com/assemblylanguage/humble/master/dist/humble.js > humble
node humble --help
```

### Mac

```sh
curl https://raw.githubusercontent.com/assemblylanguage/humble/master/dist/humble.js > humble
node humble --help
```

### Linux

**Debian and Ubuntu**

```sh
sudo apt-get install -y curl nodejs imagemagick pngcrush pngquant gifsicle libwebp6 ffmpeg fonttools mat2
curl https://raw.githubusercontent.com/assemblylanguage/humble/master/dist/humble | sudo tee /usr/local/bin/humble > /dev/null
sudo chmod +x /usr/local/bin/humble
```

**Fedora**

```sh
sudo dnf install -y curl nodejs ImageMagick pngcrush pngquant gifsicle libwebp fonttools
curl https://raw.githubusercontent.com/assemblylanguage/humble/master/dist/humble | sudo tee /usr/local/bin/humble > /dev/null
sudo chmod +x /usr/local/bin/humble
```

**Arch**

```sh
sudo pacman -S --noconfirm which curl nodejs imagemagick pngcrush pngquant gifsicle libwebp ffmpeg python-fonttools mat2
curl https://raw.githubusercontent.com/assemblylanguage/humble/master/dist/humble | sudo tee /usr/local/bin/humble > /dev/null
sudo chmod +x /usr/local/bin/humble
```

### BSD

**FreeBSD**

```sh
pkg install -y curl node ImageMagick7 pngcrush pngquant gifsicle webp ffmpeg py37-fonttools
curl https://raw.githubusercontent.com/assemblylanguage/humble/master/dist/humble > /usr/local/bin/humble
chmod +x /usr/local/bin/humble
```

**OpenBSD**

```sh
pkg_add curl node ImageMagick pngcrush gifsicle libwebp ffmpeg
curl https://raw.githubusercontent.com/assemblylanguage/humble/master/dist/humble > /usr/local/bin/humble
chmod +x /usr/local/bin/humble
```

### Haiku

```sh
pkgman install -y curl nodejs imagemagick pngcrush pngquant gifsicle libwebp ffmpeg fonttools
curl https://raw.githubusercontent.com/assemblylanguage/humble/master/dist/humble > /boot/system/non-packaged/bin/humble
chmod +x /boot/system/non-packaged/bin/humble
```

### Other

Other platforms have not been tested, but humble may still work if `node` is installed.

```sh
curl https://raw.githubusercontent.com/assemblylanguage/humble/master/dist/humble.js > humble
node humble --help
```

### Building

Instructions for building from source:

```sh
git clone https://github.com/assemblylanguage/humble
cd humble
npm install --force
npm run all
```

If the build was successful:

* The CLI binary will be built at `./dist`
* The library will be built at `./out`
* The docs will be built at `./docs`

### License

(C) AssemblyLanguage 2022, Licensed under the GNU AGPLv3.

### Commercial Usage

Commercial usage is allowed subject to the terms of the GNU AGPLv3 license. For license exceptions, reach out to `assemblylanguage@protonmail.com`.
