/**
 * This file contains the source code for the `Resource` class that acts as an
 * container for individual resources in the document, as well as types
 * associated with resources.
 */
/// <reference types="node" />
import { Browser } from 'puppeteer-core';
/**
 * A generic response type from fetching a resource.
 */
export declare type ResourceResponse = {
    bytes: Buffer;
    status: boolean;
    statusCode: number;
};
/**
 * Represents a broad categorical type of a resource.
 */
export declare enum ResourceType {
    HTML = "html",
    CSS = "css",
    SCRIPT = "script",
    IMAGE = "image",
    AUDIO = "audio",
    VIDEO = "video",
    FONT = "font",
    CURSOR = "cursor",
    FAVICON = "favicon",
    OTHER = "other"
}
/**
 * Represents options that can be used to modify the transport for certain
 * fetch operations.
 */
export declare type TransportOptions = {
    headlessBrowserTransport?: boolean;
    browser?: Browser;
    socksProxy?: string;
    headers?: {
        [header: string]: string;
    };
};
/**
 * The Resource class represents a single, self-contained resource within an
 * HTML file. Examples of resources include images, CSS, favicons, videos,
 * audio, and generally any other resource that is fetched as part of the a
 * standard request for an HTML page by a browser. Resources can also represent
 * data URIs as well.
 */
export declare class Resource {
    /**
     * The URL of the resource.
     */
    url: string;
    /**
     * The absolute URL of the resource.
     */
    absoluteUrl: string;
    /**
     * The base URL of the resource.
     */
    baseUrl: string;
    /**
     * The protocol of the URL of the resource.
     */
    protocol: string;
    /**
     * A representation of the resource in binary form.
     */
    bytes: Buffer;
    /**
     * The status of the request when fetching a resource at it's absolute URL.
     * A `true` value indicates a successful fetch, and a `false` value indicates
     * a failed fetch.
     */
    status: boolean;
    /**
     * An HTTP status code from fetching a resource at it's absolute URL.
     */
    statusCode: number;
    /**
     * The MIME Type of the resource.
     */
    mimeType: string;
    /**
     * The file extension of the resource.
     */
    extension: string;
    /**
     * The broad categorical type of the resource.
     */
    type: ResourceType;
    /**
     * A counter for the number of times a request for the resource has been
     * attempted.
     */
    fetchCounter: number;
    /**
     * Additional options for the transport method used.
     */
    transportOptions: TransportOptions;
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
    constructor(url: string, absoluteUrl: string, protocol: string, type: ResourceType, transportOptions?: TransportOptions);
    /**
     * Modifies the bytes of the resource with a new buffer, and updates the
     * internal state of the resource to reflect this new buffer, including
     * updating the MIME Type and file extension to remain consistent with the
     * new buffer.
     *
     * @param bytes the new bytes for the resource.
     */
    update(bytes: Buffer): Promise<void>;
    /**
     * An asynchronous request for the resource.
     */
    fetch(): Promise<void>;
    /**
     * Converts the resource to a Base64 encoded string, with the appropriate
     * MIME Type.
     */
    toBase64(): string;
}
/**
 * Represents a cache of Resources indexed by their absolute URL.
 */
export declare type ResourceCache = {
    [url: string]: Resource;
};
//# sourceMappingURL=resource.d.ts.map