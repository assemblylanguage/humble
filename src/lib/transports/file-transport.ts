/**
 * This file contains the source code for fetching resources using the `file:`
 * protocol.
 */

import * as fs from 'fs';
import { ResourceResponse } from '../resource';

/**
 * Fetches a single resource at the given file URL.
 *
 * @param absoluteUrl the absolute URL of the resource that will be fetched.
 * @returns the bytes and status of the fetch.
 */
export async function fetchFileResource(
  absoluteUrl: string,
) : Promise<ResourceResponse> {
  // Checking if the escaped file path exists on the system and if it is a
  // file, and if so reading the file and returning the bytes.
  if (fs.existsSync(absoluteUrl) && fs.lstatSync(absoluteUrl).isFile()) {
    const bytes: Buffer = fs.readFileSync(absoluteUrl);
    const status: boolean = true;
    const statusCode: number = 200;

    return {
      bytes,
      status,
      statusCode,
    };
  }

  // If the escaped file path was not found, checking if the unescaped file
  // path is found and is a file, and if so reading the file and returning the
  // bytes.
  const unescapedFilePath: string = unescape(absoluteUrl);

  if (fs.existsSync(unescapedFilePath) && fs.lstatSync(absoluteUrl).isFile()) {
    const bytes: Buffer = fs.readFileSync(unescape(absoluteUrl));
    const status: boolean = true;
    const statusCode: number = 200;

    return {
      bytes,
      status,
      statusCode,
    };
  }

  // If none of the files are found, the fetch fails and return null bytes and
  // a failed status.
  const bytes: Buffer = null;
  const status: boolean = false;
  const statusCode: number = 404;

  return {
    bytes,
    status,
    statusCode,
  };
}
