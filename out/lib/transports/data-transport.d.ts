/**
 * This file contains the source code for fetching resources using the `data:`
 * protocol.
 */
import { ResourceResponse } from '../resource';
/**
 * "Fetches" a single resource at the given data URI. Since a data URI is both
 * a URI and a resource itself, this function essentially just converts the
 * data URI into a buffer with a successful status.
 *
 * @param absoluteUrl the absolute URL of the resource that will be fetched.
 * @returns the bytes and status of the fetch.
 */
export declare function fetchDataResource(absoluteUrl: string): Promise<ResourceResponse>;
//# sourceMappingURL=data-transport.d.ts.map