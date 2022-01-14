/**
 * This file contains the source code for fetching resources using a variety
 * of different protocols and transport options.
 */

import { logger } from '../logger';
import { ResourceResponse, TransportOptions } from '../resource';
import { fetchFileResource } from './file-transport';
import { fetchHttpResource } from './http-transport';
import { fetchHeadlessBrowserResource } from './headless-browser-transport';
import { fetchSocksResource } from './socks-transport';
import { fetchDataResource } from './data-transport';

/**
 * Creates a shortened version of a URL for logging purposes.
 *
 * @param url the URL that may be shortened.
 * @returns either a shortened URL or the original URL if it is already short.
 */
function createShortenedUrl(
  url: string,
) : string {
  // Checking the URL is too long (often the case with data URIs).
  const isUrlLong: boolean = url.length >= 300;

  // Creating a shortened URL if it is too long.
  if (isUrlLong) {
    const shortenedUrl: string = `${url.slice(0, 300)}...`;

    return shortenedUrl;
  }

  // Or returning the original URL if it is not too long.
  return url;
}

/**
 * Fetches a single resource at a given URL using the protocol specified.
 *
 * @param absoluteUrl the absolute URL of the resource that will be fetched.
 * @param protocol the protocol of the resource that will be fetched.
 * @param options additional options used to modify the transport.
 */
export async function fetchResource(
  absoluteUrl: string,
  protocol: string,
  options?: TransportOptions,
) : Promise<ResourceResponse> {
  // Creating the empty resource response.
  let response: ResourceResponse;

  // Fetching the resource using the protocol and options specified. If a case
  // for the protocol is not found, a default failed status and null bytes will
  // be returned.
  switch (protocol) {
    case 'file:': {
      response = await fetchFileResource(absoluteUrl);

      break;
    }

    case 'http:':
    case 'https:': {
      if (options.headlessBrowserTransport) {
        response = await fetchHeadlessBrowserResource(
          options.browser,
          absoluteUrl,
        );
      } else if (options.socksProxy) {
        response = await fetchSocksResource(
          absoluteUrl,
          options.headers,
          options.socksProxy,
        );
      } else {
        response = await fetchHttpResource(absoluteUrl, options.headers);
      }

      break;
    }

    case 'data:': {
      response = await fetchDataResource(absoluteUrl);

      break;
    }

    default: {
      const bytes: Buffer = null;
      const status: boolean = false;
      const statusCode: number = 404;

      response = {
        bytes,
        status,
        statusCode,
      };
    }
  }

  // Creating a URL that will be displayed by the logger, shortening the
  // absolute URL if it is too long for logging purposes.
  const displayUrl: string = createShortenedUrl(absoluteUrl);

  // Logging the result of the fetch to the logger.
  if (response.status === true) {
    logger.log(
      'ok',
      `Fetched (${response.statusCode}) => ${displayUrl}`,
      { depth: 1 },
    );
  } else {
    logger.log(
      'error',
      `Failed  (${response.statusCode}) => ${displayUrl}`,
      { depth: 1 },
    );
  }

  return response;
}
