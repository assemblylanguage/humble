/**
 * This file contains the source code for fetching resources using the `file:`
 * protocol.
 */
import { ResourceResponse } from '../resource';
/**
 * Fetches a single resource at the given file URL.
 *
 * @param absoluteUrl the absolute URL of the resource that will be fetched.
 * @returns the bytes and status of the fetch.
 */
export declare function fetchFileResource(absoluteUrl: string): Promise<ResourceResponse>;
//# sourceMappingURL=file-transport.d.ts.map