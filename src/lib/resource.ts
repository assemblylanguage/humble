/**
 * This file contains the source code for the `Resource` class that acts as an
 * container for individual resources in the document, as well as types
 * associated with resources.
 */

/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-shadow */

import { Browser } from 'puppeteer-core';
import { fetchResource } from './transports/index';
import * as utilities from './utilities';

/**
 * A generic response type from fetching a resource.
 */
export type ResourceResponse = {
  bytes: Buffer,
  status: boolean,
  statusCode: number,
}

/**
 * Represents a broad categorical type of a resource.
 */
export enum ResourceType {
  // eslint-disable-next-line no-unused-vars
  HTML = 'html',

  // eslint-disable-next-line no-unused-vars
  CSS = 'css',

  // eslint-disable-next-line no-unused-vars
  SCRIPT = 'script',

  // eslint-disable-next-line no-unused-vars
  IMAGE = 'image',

  // eslint-disable-next-line no-unused-vars
  AUDIO = 'audio',

  // eslint-disable-next-line no-unused-vars
  VIDEO = 'video',

  // eslint-disable-next-line no-unused-vars
  FONT = 'font',

  // eslint-disable-next-line no-unused-vars
  CURSOR = 'cursor',

  // eslint-disable-next-line no-unused-vars
  FAVICON = 'favicon',

  // eslint-disable-next-line no-unused-vars
  OTHER = 'other',
}

/**
 * Represents options that can be used to modify the transport for certain
 * fetch operations.
 */
export type TransportOptions = {
  headlessBrowserTransport?: boolean,
  browser?: Browser,
  socksProxy?: string,
  headers?: { [header: string]: string },
}

/**
 * The Resource class represents a single, self-contained resource within an
 * HTML file. Examples of resources include images, CSS, favicons, videos,
 * audio, and generally any other resource that is fetched as part of the a
 * standard request for an HTML page by a browser. Resources can also represent
 * data URIs as well.
 */
export class Resource {
  /**
   * The URL of the resource.
   */
  public url: string;

  /**
   * The absolute URL of the resource.
   */
  public absoluteUrl: string;

  /**
   * The base URL of the resource.
   */
  public baseUrl: string;

  /**
   * The protocol of the URL of the resource.
   */
  public protocol: string;

  /**
   * A representation of the resource in binary form.
   */
  public bytes: Buffer;

  /**
   * The status of the request when fetching a resource at it's absolute URL.
   * A `true` value indicates a successful fetch, and a `false` value indicates
   * a failed fetch.
   */
  public status: boolean;

  /**
   * An HTTP status code from fetching a resource at it's absolute URL.
   */
  public statusCode: number;

  /**
   * The MIME Type of the resource.
   */
  public mimeType: string;

  /**
   * The file extension of the resource.
   */
  public extension: string;

  /**
   * The broad categorical type of the resource.
   */
  public type: ResourceType;

  /**
   * A counter for the number of times a request for the resource has been
   * attempted.
   */
  public fetchCounter: number;

  /**
   * Additional options for the transport method used.
   */
  public transportOptions: TransportOptions = {};

  /**
   * Constructor method for the Resource. Creates an uninitialized resource
   * with no buffer contents and with an empty fetch counter.
   *
   * @param url the URL of the resource.
   * @param absoluteUrl the absolute URL of the resource.
   * @param protocol the protocol of the resource.
   * @param type the resource type.
   * @param transportOptions additional transport options for fetching the
   * resource.
   */
  constructor(
    url: string,
    absoluteUrl: string,
    protocol: string,
    type: ResourceType,
    transportOptions?: TransportOptions,
  ) {
    this.url = url;
    this.absoluteUrl = absoluteUrl;
    this.baseUrl = utilities.getBaseUrl(absoluteUrl, protocol);
    this.protocol = protocol;
    this.bytes = null;
    this.status = null;
    this.mimeType = null;
    this.extension = null;
    this.type = type;
    this.fetchCounter = 0;
    this.transportOptions = transportOptions;
  }

  /**
   * Modifies the bytes of the resource with a new buffer, and updates the
   * internal state of the resource to reflect this new buffer, including
   * updating the MIME Type and file extension to remain consistent with the
   * new buffer.
   *
   * @param bytes the new bytes for the resource.
   */
  async update(
    bytes: Buffer,
  ) : Promise<void> {
    // Setting the new bytes for this resource
    this.bytes = bytes;

    // If the new bytes are null, nulling out the MIME Type and file extension,
    // else updating the MIME Type and file extension to reflect the contents
    // of the new buffer.
    if (this.bytes === null) {
      this.mimeType = null;
      this.extension = null;
    } else {
      this.mimeType = await utilities.determineMimeType(
        this.absoluteUrl,
        this.bytes,
      );

      this.extension = utilities.getExtensionFromMimeType(
        this.mimeType,
      );
    }
  }

  /**
   * An asynchronous request for the resource.
   */
  async fetch() : Promise<void> {
    // Fetching the resource using its absolute URL, protocol, and any
    // additional transport options.
    const resourceResponse: ResourceResponse = await fetchResource(
      this.absoluteUrl,
      this.protocol,
      this.transportOptions,
    );

    // Updating the resource with the bytes fetched from the response.
    await this.update(resourceResponse.bytes);

    // Updating the status and fetch counter with the response.
    this.status = resourceResponse.status;
    this.fetchCounter += 1;
  }

  /**
   * Converts the resource to a Base64 encoded string, with the appropriate
   * MIME Type.
   */
  toBase64() : string {
    // If the resource was successfully fetched, create the base64 encoded
    // string and return it. Else, return an empty string.
    if (this.status === true) {
      return `data:${this.mimeType};base64,${this.bytes.toString('base64')}`;
    }

    return '';
  }
}

/**
 * Represents a cache of Resources indexed by their absolute URL.
 */
export type ResourceCache = {
  [url: string]: Resource,
}
