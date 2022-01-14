/**
 * This file contains the source code for fetching resources through a socks5
 * proxy.
 */
import { ResourceResponse } from '../resource';
/**
 * Fetches a single resource at the given HTTP(S) URL through a socks5 proxy.
 *
 * @param absoluteUrl the absolute URL of the Resource that will be fetched.
 * @param socksProxyAgentString the socks proxy agent. See the
 * `socks-proxy-agent` library for additional info on this parameter.
 * @returns the bytes and status of the fetch.
 */
export declare function fetchSocksResource(absoluteUrl: string, headers: {
    [header: string]: string;
}, socksProxyAgentString: string): Promise<ResourceResponse>;
//# sourceMappingURL=socks-transport.d.ts.map