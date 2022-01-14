/**
 * This file contains the source code for fetching resources using the `http:`
 * protocol.
 */
import { ResourceResponse } from '../resource';
/**
 * Fetches a single resource at the given HTTP(S) URL.
 *
 * @param absoluteUrl the absolute URL of the resource that will be fetched.
 * @returns the bytes and status of the fetch.
 */
export declare function fetchHttpResource(absoluteUrl: string, headers: {
    [header: string]: string;
}): Promise<ResourceResponse>;
//# sourceMappingURL=http-transport.d.ts.map