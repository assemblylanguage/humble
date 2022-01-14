/**
 * Code for removing metadata from common binary file formats such as PNG,
 * JPEG, or PDF. See Mat2 for a full list of supported file types.
 */
/// <reference types="node" />
import { ResourceCache } from '../../../resource';
/**
 * Removes metadata from the provided binary file using Mat2.
 *
 * @param bytes a buffer representing a binary file.
 * @param fileExtension the file extension for the file.
 * @dependencies Mat2.
 */
export declare function removeResourceMetadata(bytes: Buffer, fileExtension: string): Buffer;
/**
 * Removes metadata from all resource in a resource cache. When the file type
 * of the resource is not supported, no modifications to the resource will
 * occur.
 *
 * @command **`--remove-resource-metadata`**
 *
 * @param resourceCache a resource cache of binary files.
 * @param keepIfLarger if true will keep the metadata removed resource even if
 * that resource is larger than the original file.
 * @dependencies Mat2.
 */
export declare function removeMetadataFromResourceCache(resourceCache: ResourceCache, keepIfLarger?: boolean): void;
//# sourceMappingURL=meta-data-remover.d.ts.map