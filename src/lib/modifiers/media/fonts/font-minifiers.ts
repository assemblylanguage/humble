/**
 * Code for minifying fonts. Currently supports these font types: TTF, OTF,
 * WOFF, and WOFF2.
 */

import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import * as childProcess from 'child_process';
import { SpawnSyncReturns } from 'child_process';
import * as rimraf from 'rimraf';
import * as dependencies from '../../../dependencies';
import { Resource, ResourceCache } from '../../../resource';
import { FontExtension } from './font-extensions';

/**
 * Converts a TTF or OTF font to WOFF2 format. Conversion is done through
 * Fonttools.
 *
 * @param bytes a buffer containing a TTF or OTF font file.
 * @param inputExtension the extension of the input file font (the font type
 * that will be converted from).
 * @returns a buffer of the font converted to WOFF2 format.
 * @dependencies Fonttools 4.
 */
export function convertTtfAndOtfToWoff2(
  bytes: Buffer,
  inputExtension: FontExtension,
) : Buffer {
  // Getting the path to and creating a new Humble temporary directory if
  // one does not already exist.
  const tempDir: string = path.join(os.tmpdir(), 'humble');

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  // Creating input and output file paths for the temporary file and writing
  // the font file to the temporary directory.
  const tempInputFilePath: string = path.join(tempDir, `temp.${inputExtension}`);
  const tempOutputFilePath: string = path.join(tempDir, 'temp.woff2');

  fs.writeFileSync(tempInputFilePath, bytes);

  // Calling the Fonttools command to convert the font file in the temporary
  // directory to the WOFF2 format.
  const fonttoolsProcess: SpawnSyncReturns<string> = childProcess.spawnSync(
    'fonttools',
    [
      'ttLib.woff2',
      'compress',
      '--output-file', tempOutputFilePath,
      tempInputFilePath,
    ],
  );

  // If the conversion was successful, reading the file to get the buffer, and
  // then deleting the temporary files and directory.
  if (fonttoolsProcess.status === 0) {
    // Getting the converted font buffer.
    const convertedFontBuffer: Buffer = fs.readFileSync(tempOutputFilePath);

    // Deleting the temporary files and directory.
    rimraf.sync(tempDir);

    return convertedFontBuffer;
  }

  // If the process failed, simply delete the temporary files and directory to
  // clean up the resources, and return the original buffer.
  rimraf.sync(tempDir);

  return bytes;
}

/**
 * Subsets a font to only the glyphs that are found in the document text, with
 * all other glyphs not found in the document text removed.
 *
 * @param bytes a buffer containing a font file.
 * @param inputExtension the extension of the input file font (the font type
 * that will be subsetted).
 * @returns a buffer of the subsetted font.
 * @dependencies Fonttools 4.
 */
export function subsetFont(
  bytes: Buffer,
  inputExtension: FontExtension,
  document: Document,
) : Buffer {
  // Getting the path to and creating a new Humble temporary directory if
  // one does not already exist.
  const tempDir: string = path.join(os.tmpdir(), 'humble');

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  // Creating input and output file paths for the temporary file and writing
  // the font file to the temporary directory.
  const tempInputFilePath: string = path.join(
    tempDir,
    `temp.${inputExtension}`,
  );

  const tempOutputFilePath: string = path.join(
    tempDir,
    `temp.subset.${inputExtension}`,
  );

  fs.writeFileSync(tempInputFilePath, bytes);

  // Getting all of the text in the document excluding the HTML markup of the
  // page.
  const documentText: string = document.documentElement.textContent;

  // Creating and writing a unicode character list file containing all of the
  // unique unicode code points in the document text.
  const documentChars: string[] = [...new Set(documentText.split(''))];
  const unicodeCharsFileContents: string = documentChars
    .map((char: string) => char.codePointAt(0).toString(16))
    .map((char: string) => `U+${char.padStart(4, '0')}`)
    .join('\n');

  // Creating the path to a temporary unicode character file and writing the
  // unicode character list to a temporary file.
  const unicodeCharacterFilePath: string = path.join(tempDir, 'unicode.txt');
  fs.writeFileSync(unicodeCharacterFilePath, unicodeCharsFileContents);

  // Calling the Fonttools command to create a subset of the font containing
  // only the glyphs that are actually displayed on the HTML page in the
  // document text.
  const fonttoolsProcess: SpawnSyncReturns<string> = childProcess.spawnSync(
    'fonttools',
    [
      'subset',
      `--output-file=${tempOutputFilePath}`,
      `--unicodes-file=${unicodeCharacterFilePath}`,
      tempInputFilePath,
    ],
  );

  // If the subsetting was successful, reading the file to get the buffer, and
  // then deleting the temporary files and directory.
  if (fonttoolsProcess.status === 0) {
    // Getting the subsetted font buffer.
    const subsettedFontBuffer: Buffer = fs.readFileSync(tempOutputFilePath);

    // Deleting the temporary files and directory.
    rimraf.sync(tempDir);

    return subsettedFontBuffer;
  }

  // If the process failed, simply delete the temporary files and directory to
  // clean up the resources, and return the original buffer.
  rimraf.sync(tempDir);

  return bytes;
}

/**
 * Minifies all fonts in the provided font cache using a series of font
 * minification and conversion algorithms. The algorithm used for conversions
 * and minifications is as follows:
 *
 * * TTF -> WOFF2 -> Subsetted WOFF2 (using Fonttools)
 * * OTF -> WOFF2 -> Subsetted WOFF2 (using Fonttools)
 * * WOFF -> WOFF2 -> Subsetted WOFF2 (using Fonttools)
 * * WOFF2 -> Subsetted WOFF2 (using Fonttools)
 *
 * @command **`--minify-fonts`**
 *
 * @param document the document that contains text content used for the
 * font subsetting process.
 * @param fontCache a resource cache of fonts that will be minified.
 * @dependencies Fonttools 4.
 */
export function minifyFonts(
  document: Document,
  fontCache: ResourceCache,
) : void {
  // Checking if Fonttools is installed on the host system.
  const isFonttoolsInstalled: boolean = dependencies.isFonttoolsInstalled();

  // If Fonttools is installed, minifying and subsetting the fonts from the
  // font cache.
  if (isFonttoolsInstalled) {
    // Minifying all fonts in the font cache.
    for (const url in fontCache) {
      // Getting the resource, bytes, and MIME Type.
      const resource: Resource = fontCache[url];
      const bytes: Buffer = resource.bytes;
      const mimeType: string = resource.mimeType;

      // If the resource fetch was successful, performing the minification
      // depending on the MIME Type of the audio, and then updating the
      // resource with the new audio buffer if the new audio buffer is
      // smaller than the original.
      if (resource.status === true) {
        switch (mimeType) {
          case 'font/ttf':
          case 'font/otf':
          case 'font/woff': {
            // Getting the file extension associated with the MIME Type
            // provided.
            let fontExtension: FontExtension;

            switch (mimeType) {
              case 'font/ttf': {
                fontExtension = FontExtension.TTF;

                break;
              }

              case 'font/otf': {
                fontExtension = FontExtension.OTF;

                break;
              }

              case 'font/woff': {
                fontExtension = FontExtension.WOFF;

                break;
              }

              // @no-default
            }

            // Converting the TTF, OTF, or WOFF bytes into WOFF2 format.
            const woff2FontBytes: Buffer = convertTtfAndOtfToWoff2(
              bytes,
              fontExtension,
            );

            // Subsetting the WOFF2 font with only the characters found in the
            // document excluding the HTML markup.
            const subsettedWoff2Bytes: Buffer = subsetFont(
              woff2FontBytes,
              fontExtension,
              document,
            );

            // Updating the font resource with the optimized and subsetted font
            // only if optimized font is smaller than the original font.
            if (subsettedWoff2Bytes.length < bytes.length) {
              resource.update(subsettedWoff2Bytes);
            }

            break;
          }

          case 'font/woff2': {
            // Subsetting the WOFF2 font with only the characters found in the
            // document excluding the HTML markup.
            const subsettedWoff2Bytes: Buffer = subsetFont(
              bytes,
              FontExtension.WOFF2,
              document,
            );

            // Updating the font resource with the optimized and subsetted font
            // only if optimized font is smaller than the original font.
            if (subsettedWoff2Bytes.length < bytes.length) {
              resource.update(subsettedWoff2Bytes);
            }

            break;
          }

          // @no-default
        }
      }
    }
  }
}
