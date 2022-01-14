/**
 * This file contains the source code for fetching resources using a variety
 * of different protocols and transport options.
 */
import { ResourceResponse, TransportOptions } from '../resource';
/**
 * Fetches a single resource at a given URL using the protocol specified.
 *
 * @param absoluteUrl the absolute URL of the resource that will be fetched.
 * @param protocol the protocol of the resource that will be fetched.
 * @param options additional options used to modify the transport.
 */
export declare function fetchResource(absoluteUrl: string, protocol: string, options?: TransportOptions): Promise<ResourceResponse>;
//# sourceMappingURL=transports.d.ts.map