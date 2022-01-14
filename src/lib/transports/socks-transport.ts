/**
 * This file contains the source code for fetching resources through a socks5
 * proxy.
 */

import axios, { AxiosResponse } from 'axios';
import { SocksProxyAgent } from 'socks-proxy-agent';
import { ResourceResponse } from '../resource';
import * as utilities from '../utilities';

/* eslint-disable import/prefer-default-export */

/**
 * Fetches a single resource at the given HTTP(S) URL through a socks5 proxy.
 *
 * @param absoluteUrl the absolute URL of the Resource that will be fetched.
 * @param socksProxyAgentString the socks proxy agent. See the
 * `socks-proxy-agent` library for additional info on this parameter.
 * @returns the bytes and status of the fetch.
 */
export async function fetchSocksResource(
  absoluteUrl: string,
  headers: { [header: string]: string },
  socksProxyAgentString: string,
) : Promise<ResourceResponse> {
  // Creating a socks5 proxy agent.
  const socksProxyAgent: SocksProxyAgent = new SocksProxyAgent(
    socksProxyAgentString,
  );

  // Trying to fetch a using at a give HTTP(S) URL through the socks5 proxy.
  // If the fetch fails, return null bytes and a failed status.
  let response: AxiosResponse;

  try {
    response = await axios.get(absoluteUrl, {
      responseType: 'arraybuffer',
      httpsAgent: socksProxyAgent,

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
