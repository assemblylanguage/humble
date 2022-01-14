/**
 * Various general utility functions used throughout the program.
 */

/* eslint-disable no-multi-spaces */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-template */
/* eslint-disable @typescript-eslint/no-inferrable-types */

import * as path from 'path';
import * as FileType from 'file-type';
import * as decompress from 'brotli/decompress';
import * as voca from 'voca';
import { FileTypeResult } from 'file-type';
import { AxiosResponse } from 'axios';

/**
 * Resolves a URL to an absolute URL given the base URL and protocol.
 *
 * @param url the URL that will be resolved into an absolute URL.
 * @param protocol the protocol of the URL. Currently the following protocols
 * are supported:
 * * http:
 * * https:
 * * file:
 * * data:
 * @param baseUrl the base URL of the provided URL.
 * @returns the resolved absolute URL.
 */
export function resolveAbsoluteUrl(
  url: string,
  protocol: string,
  baseUrl: string,
) : string {
  // Resolving and returning the absolute URL given the type of protocol used.
  switch (protocol) {
    case 'file:': {
      if (path.isAbsolute(url)) {
        return url;
      }

      return path.join(baseUrl, url);
    }

    case 'http:':
    case 'https:': {
      return new URL(url, baseUrl).href;
    }

    case 'data:': {
      return url;
    }

    default: {
      return null;
    }
  }
}

/**
 * Checks if the given URL includes a protocol.
 *
 * @param url the given URL.
 * @returns true if the URL has a protocol, false otherwise.
 */
export function hasProtocol(
  url: string,
) : boolean {
  // Creating a regex to check if a string has a protocol at the start of it.
  const protocolRegex: RegExp = /^([a-zA-Z0-9]*?[:][/]{2})/i;

  return protocolRegex.test(url);
}

/**
 * Gets the protocol from a given URL. If no protocol is found, assumes the
 * protocol is the `file:` protocol and returns it.
 *
 * @param url the given URL.
 * @returns the protocol from the URL.
 */
export function getProtocolFromUrl(
  url: string,
) : string {
  return hasProtocol(url)
    ? `${url.split(':')[0]}:`
    : 'file:';
}

/**
 * Gets the base URL from the given URL. For example, if the URL is
 * `https://example.com/hello/world`, then the base URL is
 * `https://example.com/`.
 *
 * @param url the given URL.
 * @param protocol the protocol of the URL. Currently the following protocols
 * are supported:
 *   * `file:`
 *   * `http:`
 *   * `https:`
 * @returns the base URL of the given URL.
 */
export function getBaseUrl(
  url: string,
  protocol: string,
) : string {
  switch (protocol) {
    case 'file:': {
      // Resolving the path to the file system and adding the path separator of
      // the system.
      return path.dirname(path.resolve(url)) + path.sep;
    }

    case 'http:':
    case 'https:': {
      // Getting the origin and path name of the URL.
      const origin: string = new URL(url).origin;
      const pathname: string = new URL(url).pathname;

      // Splitting the path into segments, removing the last segments, and
      // adding an empty segment to the end of the segments.
      const pathSegments: string[] = pathname.split('/');
      pathSegments.pop();
      pathSegments.push('');

      // Creating the base URL and returning it.
      const baseUrl: string = origin + pathSegments.join('/');

      return baseUrl;
    }

    default: {
      return null;
    }
  }
}

/**
 * Guesses the MIME Type from a given URL and Buffer, using a combination of
 * file contents, magic numbers, and URL extension.
 *
 * @param url the URL associated with the binary data provided in the `bytes`
 * parameter.
 * @param bytes the binary data used to check for magic numbers.
 * @returns returns a MIME Type associated with the provided `bytes` and `url`.
 */
export async function determineMimeType(
  url: string,
  bytes: Buffer,
) : Promise<string> {
  // First check the magic numbers to determine MIME type, as this is the
  // definitive source for determining MIME types from binary data. Note that
  // if the buffer provided is null, file type checks based on magic numbers
  // will be skipped, and other sources (such as file extension) will be used
  // instead.
  const magicNumberFileTypeResult: FileTypeResult = bytes === null
    ? null
    : await FileType.fromBuffer(bytes);

  if (magicNumberFileTypeResult) {
    // Ignoring mime types determined as application/xml, as this is a valid
    // MIME type but is applied too broadly and will break inlining SVG's.
    // This MIME type is instead used below if the XML is not of a known type.
    if (magicNumberFileTypeResult.mime !== 'application/xml') {
      return magicNumberFileTypeResult.mime;
    }
  }

  // Getting the file extension from the provided URL.
  const extension: string = url.includes('.')
    ? url.split('.').pop().split('?')[0]
    : null;

  // Getting the MIME Type from the file extension.
  if (extension) {
    switch (extension) {
      // AAC audio.
      case 'aac': { return 'audio/aac'; }
      // AbiWord document.
      case 'abw': { return 'application/x-abiword'; }
      // Archive document (multiple files embedded).
      case 'arc': { return 'application/x-freearc'; }
      // AVI: Audio Video Interleave.
      case 'avi': { return 'video/x-msvideo'; }
      // Amazon Kindle eBook format.
      case 'azw': { return 'application/vnd.amazon.ebook'; }
      // Any kind of binary data.
      case 'bin': { return 'application/octet-stream'; }
      // Windows OS/2 Bitmap Graphics.
      case 'bmp': { return 'image/bmp'; }
      // BZip archive.
      case 'bz': { return 'application/x-bzip'; }
      // BZip2 archive.
      case 'bz2': { return 'application/x-bzip2'; }
      // C-Shell script.
      case 'csh': { return 'application/x-csh'; }
      // Cascading Style Sheets (CSS).
      case 'css': { return 'text/css'; }
      // Comma-separated values (CSV).
      case 'csv': { return 'text/csv'; }
      // Microsoft Word.
      case 'doc': { return 'application/msword'; }
      // Microsoft Word (OpenXML).
      case 'docx': { return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'; }
      // MS Embedded OpenType fonts.
      case 'eot': { return 'application/vnd.ms-fontobject'; }
      // Electronic publication (EPUB).
      case 'epub': { return 'application/epub+zip'; }
      // GZip Compressed Archive.
      case 'gz': { return 'application/gzip'; }
      // Graphics Interchange Format (GIF).
      case 'gif': { return 'image/gif'; }
      // HyperText Markup Language (HTML).
      case 'htm': { return 'text/html'; }
      // HyperText Markup Language (HTML).
      case 'html': { return 'text/html'; }
      // Icon format.
      case 'ico': { return 'image/vnd.microsoft.icon'; }
      // iCalendar format.
      case 'ics': { return 'text/calendar'; }
      // Java Archive (JAR).
      case 'jar': { return 'application/java-archive'; }
      // JPEG images.
      case 'jpeg': { return 'image/jpeg'; }
      // JPEG images.
      case 'jpg': { return 'image/jpeg'; }
      // JavaScript.
      case 'js': { return 'text/javascript'; }
      // JSON format.
      case 'json': { return 'application/json'; }
      // JSON-LD format.
      case 'jsonld': { return 'application/ld+json'; }
      // Musical Instrument Digital Interface (MIDI).
      case 'mid': { return 'audio/midi'; }
      // Musical Instrument Digital Interface (MIDI).
      case 'midi': { return 'audio/midi'; }
      // JavaScript module.
      case 'mjs': { return 'text/javascript'; }
      // MP3 audio.
      case 'mp3': { return 'audio/mpeg'; }
      // MP4 video.
      case 'mp4': { return 'video/mp4'; }
      // MPEG Video.
      case 'mpeg': { return 'video/mpeg'; }
      // Apple Installer Package.
      case 'mpkg': { return 'application/vnd.apple.installer+xml'; }
      // OpenDocument presentation document.
      case 'odp': { return 'application/vnd.oasis.opendocument.presentation'; }
      // OpenDocument spreadsheet document.
      case 'ods': { return 'application/vnd.oasis.opendocument.spreadsheet'; }
      // OpenDocument text document.
      case 'odt': { return 'application/vnd.oasis.opendocument.text'; }
      // OGG audio.
      case 'oga': { return 'audio/ogg'; }
      // OGG video.
      case 'ogv': { return 'video/ogg'; }
      // OGG.
      case 'ogx': { return 'application/ogg'; }
      // Opus audio.
      case 'opus': { return 'audio/opus'; }
      // OpenType font.
      case 'otf': { return 'font/otf'; }
      // Portable Network Graphics.
      case 'png': { return 'image/png'; }
      // Adobe Portable Document Format (PDF).
      case 'pdf': { return 'application/pdf'; }
      // Hypertext Preprocessor (Personal Home Page).
      case 'php': { return 'application/x-httpd-php'; }
      // Microsoft PowerPoint.
      case 'ppt': { return 'application/vnd.ms-powerpoint'; }
      // Microsoft PowerPoint (OpenXML).
      case 'pptx': { return 'application/vnd.openxmlformats-officedocument.presentationml.presentation'; }
      // RAR archive.
      case 'rar': { return 'application/vnd.rar'; }
      // Rich Text Format (RTF).
      case 'rtf': { return 'application/rtf'; }
      // Bourne shell script.
      case 'sh': { return 'application/x-sh'; }
      // Scalable Vector Graphics (SVG).
      case 'svg': { return 'image/svg+xml'; }
      // Small web format (SWF) or Adobe Flash document.
      case 'swf': { return 'application/x-shockwave-flash'; }
      // Tape Archive (TAR).
      case 'tar': { return 'application/x-tar'; }
      // Tagged Image File Format (TIFF).
      case 'tif': { return 'image/tiff'; }
      // Tagged Image File Format (TIFF).
      case 'tiff': { return 'image/tiff'; }
      // MPEG transport stream.
      case 'ts': { return 'video/mp2t'; }
      // TrueType Font.
      case 'ttf': { return 'font/ttf'; }
      // Text, (generally ASCII or ISO 8859-n).
      case 'txt': { return 'text/plain'; }
      // Microsoft Visio.
      case 'vsd': { return 'application/vnd.visio'; }
      // Waveform Audio Format.
      case 'wav': { return 'audio/wav'; }
      // WEBM audio.
      case 'weba': { return 'audio/webm'; }
      // WEBM video.
      case 'webm': { return 'video/webm'; }
      // WEBP image.
      case 'webp': { return 'image/webp'; }
      // Web Open Font Format (WOFF).
      case 'woff': { return 'font/woff'; }
      // Web Open Font Format (WOFF).
      case 'woff2': { return 'font/woff2'; }
      // XHTML.
      case 'xhtml': { return 'application/xhtml+xml'; }
      // Microsoft Excel.
      case 'xls': { return 'application/vnd.ms-excel'; }
      // Microsoft Excel (OpenXML).
      case 'xlsx': { return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'; }
      // XML.
      case 'xml': { return 'text/xml'; }
      // XUL.
      case 'xul': { return 'application/vnd.mozilla.xul+xml'; }
      // ZIP archive.
      case 'zip': { return 'application/zip'; }
      // 3GPP audio/video container.
      case '3gp': { return 'video/3gpp'; }
      // 3GPP2 audio/video container.
      case '3g2': { return 'video/3gpp2'; }
      // 7-zip archive.
      case '7z': { return 'application/x-7z-compressed'; }

      // no default
    }
  }

  // Getting the string contents of the buffer if no magic numbers were found.
  const fileContents: string = bytes.toString();

  // Checking the file contents string for key substrings to determine the MIME
  // type.

  // Checking if the file is an SVG.
  if (
    fileContents.includes('<svg')
    && fileContents.includes('</svg>')
  ) {
    return 'image/svg+xml';
  }

  // Checking if the file is an RSS feed (XML).
  if (
    fileContents.includes('<feed')
    && fileContents.includes('</feed>')
  ) {
    return 'application/rss+xml';
  }

  // Returning `application/xml` for all unknown XML MIME types.
  if (magicNumberFileTypeResult) {
    if (magicNumberFileTypeResult.mime === 'application/xml') {
      return magicNumberFileTypeResult.mime;
    }
  }

  // If no MIME Type is found, returning the default MIME Type.
  return 'application/octet-stream';
}

/**
 * Gets a file extension from a given MIME Type.
 *
 * @param mimeType the given MIME Type.
 * @returns and extension, such as `.png` for MIME Type `image/png`
 */
export function getExtensionFromMimeType(
  mimeType: string,
) : string {
  switch (mimeType) {
    // AAC audio.
    case 'audio/aac': { return '.aac'; }
    // AbiWord document.
    case 'application/x-abiword': { return '.abw'; }
    // Archive document (multiple files embedded).
    case 'application/x-freearc': { return '.arc'; }
    // AVI: Audio Video Interleave.
    case 'video/x-msvideo': { return '.avi'; }
    // Amazon Kindle eBook format.
    case 'application/vnd.amazon.ebook': { return '.azw'; }
    // Any kind of binary data.
    case 'application/octet-stream': { return '.bin'; }
    // Windows OS/2 Bitmap Graphics.
    case 'image/bmp': { return '.bmp'; }
    // BZip archive.
    case 'application/x-bzip': { return '.bz'; }
    // BZip2 archive.
    case 'application/x-bzip2': { return '.bz2'; }
    // C-Shell script.
    case 'application/x-csh': { return '.csh'; }
    // Cascading Style Sheets (CSS).
    case 'text/css': { return '.css'; }
    // Comma-separated values (CSV).
    case 'text/csv': { return '.csv'; }
    // Microsoft Word.
    case 'application/msword': { return '.doc'; }
    // Microsoft Word (OpenXML).
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { return '.docx'; }
    // MS Embedded OpenType fonts.
    case 'application/vnd.ms-fontobject': { return '.eot'; }
    // Electronic publication (EPUB).
    case 'application/epub+zip': { return '.epub'; }
    // GZip Compressed Archive.
    case 'application/gzip': { return '.gz'; }
    // Graphics Interchange Format (GIF).
    case 'image/gif': { return '.gif'; }
    // HyperText Markup Language (HTML).
    case 'text/html': { return '.html'; }
    // Icon format.
    case 'image/vnd.microsoft.icon': { return '.ico'; }
    // iCalendar format.
    case 'text/calendar': { return '.ics'; }
    // Java Archive (JAR).
    case 'application/java-archive': { return '.jar'; }
    // JPEG images.
    case 'image/jpeg': { return '.jpeg'; }
    // JavaScript.
    case 'text/javascript': { return '.js'; }
    // JSON format.
    case 'application/json': { return '.json'; }
    // JSON-LD format.
    case 'application/ld+json': { return '.jsonld'; }
    // Musical Instrument Digital Interface (MIDI).
    case 'audio/midi': { return '.midi'; }
    // MP3 audio.
    case 'audio/mpeg': { return '.mp3'; }
    // MPEG Video.
    case 'video/mpeg': { return '.mpeg'; }
    // Apple Installer Package.
    case 'application/vnd.apple.installer+xml': { return '.mpkg'; }
    // OpenDocument presentation document.
    case 'application/vnd.oasis.opendocument.presentation': { return '.odp'; }
    // OpenDocument spreadsheet document.
    case 'application/vnd.oasis.opendocument.spreadsheet': { return '.ods'; }
    // OpenDocument text document.
    case 'application/vnd.oasis.opendocument.text': { return '.odt'; }
    // OGG audio.
    case 'audio/ogg': { return '.oga'; }
    // OGG video.
    case 'video/ogg': { return '.ogv'; }
    // OGG.
    case 'application/ogg': { return '.ogx'; }
    // Opus audio.
    case 'audio/opus': { return '.opus'; }
    // OpenType font.
    case 'font/otf': { return '.otf'; }
    // Portable Network Graphics.
    case 'image/png': { return '.png'; }
    // Adobe Portable Document Format (PDF).
    case 'application/pdf': { return '.pdf'; }
    // Hypertext Preprocessor (Personal Home Page).
    case 'application/x-httpd-php': { return '.php'; }
    // Microsoft PowerPoint.
    case 'application/vnd.ms-powerpoint': { return '.ppt'; }
    // Microsoft PowerPoint (OpenXML).
    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation': { return '.pptx'; }
    // RAR archive.
    case 'application/vnd.rar': { return '.rar'; }
    // Rich Text Format (RTF).
    case 'application/rtf': { return '.rtf'; }
    // Bourne shell script.
    case 'application/x-sh': { return '.sh'; }
    // Scalable Vector Graphics (SVG).
    case 'image/svg+xml': { return '.svg'; }
    // Scalable Vector Graphics (SVG).
    case 'image/svg': { return '.svg'; }
    // Small web format (SWF) or Adobe Flash document.
    case 'application/x-shockwave-flash': { return '.swf'; }
    // Tape Archive (TAR).
    case 'application/x-tar': { return '.tar'; }
    // Tagged Image File Format (TIFF).
    case 'image/tiff': { return '.tiff'; }
    // MPEG transport stream.
    case 'video/mp2t': { return '.ts'; }
    // TrueType Font.
    case 'font/ttf': { return '.ttf'; }
    // Text, (generally ASCII or ISO 8859-n).
    case 'text/plain': { return '.txt'; }
    // Microsoft Visio.
    case 'application/vnd.visio': { return '.vsd'; }
    // Waveform Audio Format.
    case 'audio/wav': { return '.wav'; }
    // WEBM audio.
    case 'audio/webm': { return '.weba'; }
    // WEBM video.
    case 'video/webm': { return '.webm'; }
    // WEBP image.
    case 'image/webp': { return '.webp'; }
    // Web Open Font Format (WOFF).
    case 'font/woff': { return '.woff'; }
    // Web Open Font Format (WOFF).
    case 'font/woff2': { return '.woff2'; }
    // XHTML.
    case 'application/xhtml+xml': { return '.xhtml'; }
    // Microsoft Excel.
    case 'application/vnd.ms-excel': { return '.xls'; }
    // Microsoft Excel (OpenXML).
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': { return '.xlsx'; }
    // XML.
    case 'text/xml': { return '.xml'; }
    // XUL.
    case 'application/vnd.mozilla.xul+xml': { return '.xul'; }
    // ZIP archive.
    case 'application/zip': { return '.zip'; }
    // 3GPP audio/video container.
    case 'video/3gpp': { return '.3gp'; }
    // 3GPP2 audio/video container.
    case 'video/3gpp2': { return '.3g2'; }
    // 7-zip archive.
    case 'application/x-7z-compressed': { return '.7z'; }
    // RSS Feed.
    case 'application/rss+xml': { return '.xml'; }
    // XML Document.
    case 'application/xml': { return '.xml'; }

    // If no MIME Type is found, return an null as the default extension.
    default: { return null; }
  }
}

/**
 * Parses out the URLs from a `srcset` attribute.
 *
 * @param srcset a given srcset.
 * @returns a list of all URLs from the srcset.
 */
export function parseSrcsetUrls(
  srcset: string,
) : string[] {
  return srcset.split(',').map((src: string) => src.trim().split(' ')[0]);
}

/**
 * Recreates the `DOCTYPE` from a given document.
 *
 * @param document the given document.
 * @returns the correct `DOCTYPE` from a given document.
 * @see https://stackoverflow.com/questions/6088972/get-doctype-of-an-html-as-string-with-javascript
 */
export function getDoctype(
  document: Document,
) : string {
  const doctypeElement: DocumentType = document.doctype;

  if (doctypeElement !== null) {
    const doctypeHtml: string = '<!DOCTYPE '
      + doctypeElement.name
      + (doctypeElement.publicId ? ' PUBLIC "' + doctypeElement.publicId + '"' : '')
      + (!doctypeElement.publicId && doctypeElement.systemId ? ' SYSTEM' : '')
      + (doctypeElement.systemId ? ' "' + doctypeElement.systemId + '"' : '')
      + '>';

    return doctypeHtml;
  }

  return '';
}

/**
 * Decompresses an axios response data if the response data is brotli
 * compressed. If not brotli compressed, returns the original response data
 * (as axios by default handles gzip and deflate compression formats).
 *
 * @param response an axios response.
 * @returns the decompressed buffer from the response.
 */
export function decompressResponse(
  response: AxiosResponse,
) : Buffer {
  // Getting the content encoding from the response headers.
  const contentEncoding: string = response.headers['content-encoding'];

  // Checking if the response is brotli compressed.
  const isBrotliResponse: boolean = contentEncoding === 'br';

  // Getting the buffer from the response.
  const bytes: Buffer = Buffer.from(response.data);

  // If the response is brotli compressed, decompressing it and returning the
  // decompressed buffer. If not brotli compressed, returning the original
  // buffer from the response.
  if (isBrotliResponse === true) {
    const brotliDecompressedBuffer: Buffer = Buffer.from(decompress(bytes));

    return brotliDecompressedBuffer;
  }

  return bytes;
}

/**
 * Creates a path-safe file name from a string.
 *
 * @param fileName the file name that will be converted.
 * @returns a path-safe file name
 */
export function createPathSafeFileName(
  fileName: string,
) : string {
  // Creating a regular expression to remove path unsafe characters from a string.
  const pathUnsafeReplacementRegex: RegExp = /[\\/?%*:|"'<>,;=]/g;

  // Removing path unsafe characters and returning the path-safe string.
  const pathSafeFileName: string = fileName.replace(pathUnsafeReplacementRegex, '');

  return pathSafeFileName;
}

/**
 * Creates a file name from the title of the document. If no title is found in
 * the document, the generic file name `archive.html` is returned.
 *
 * @param document the document with a title that will be converted to a file
 * name.
 * @returns a path-safe file name.
 */
export function createFileNameFromTitle(
  document: Document,
) : string {
  // Getting the title from the document.
  const title: string = document.title;

  // Returning a generic `archive.html` title if the title is empty.
  if (title === '') {
    return 'archive.html';
  }

  // Removing path unsafe characters from the title.
  const pathSafeTitle: string = createPathSafeFileName(title);

  // Converting the title to snake case.
  const pathSafeSnakeCaseTitle: string = voca.snakeCase(pathSafeTitle);

  // Adding a `.html` extension to the file name.
  const fileName: string = `${pathSafeSnakeCaseTitle}.html`;

  return fileName;
}
