/**
 * This file contains the source code for fetching resources using the `http:`
 * protocol.
 */

import axios, { AxiosResponse } from 'axios';
import { ResourceResponse } from '../resource';
import * as utilities from '../utilities';

/**
 * Fetches a single resource at the given HTTP(S) URL.
 *
 * @param absoluteUrl the absolute URL of the resource that will be fetched.
 * @returns the bytes and status of the fetch.
 */
export async function fetchHttpResource(
  absoluteUrl: string,
  headers: { [header: string]: string },
) : Promise<ResourceResponse> {
  // Trying to fetch a using at a give HTTP(S) URL. If the fetch fails, return
  // null bytes and a failed status.
  let response: AxiosResponse;

  try {
    response = await axios.get(absoluteUrl, {
      responseType: 'arraybuffer',

      // Setting the headers for the request.
      headers,
    });
  } catch (error: unknown) {
    const bytes: Buffer = null;
    const status: boolean = false;
    const statusCode: number = 404;

    return {
      bytes,
      status,
      statusCode,
    };
  }

  // If the fetch succeeded, check the HTTP status code to determine the bytes
  // were correctly fetched.
  const statusCode: number = response.status;
  const status: boolean = statusCode >= 200 && statusCode < 300;

  // If bytes were fetched, returning the fetched bytes.
  if (status === true) {
    const bytes: Buffer = utilities.decompressResponse(response);

    return {
      bytes,
      status,
      statusCode,
    };
  }

  // If the bytes were not fetched and something failed, return null bytes and
  // a failed status.
  const bytes: Buffer = null;

  return {
    bytes,
    status,
    statusCode,
  };
}
