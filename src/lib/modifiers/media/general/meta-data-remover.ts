/**
 * Code for removing metadata from common binary file formats such as PNG,
 * JPEG, or PDF. See Mat2 for a full list of supported file types.
 */

/* eslint-disable no-lonely-if */

import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import * as childProcess from 'child_process';
import { SpawnSyncReturns } from 'child_process';
import * as rimraf from 'rimraf';
import * as dependencies from '../../../dependencies';
import { Resource, ResourceCache } from '../../../resource';

/**
 * Removes metadata from the provided binary file using Mat2.
 *
 * @param bytes a buffer representing a binary file.
 * @param fileExtension the file extension for the file.
 * @dependencies Mat2.
 */
export function removeResourceMetadata(
  bytes: Buffer,
  fileExtension: string,
) : Buffer {
  // Getting the path to and creating a new Humble temporary directory if
  // one does not already exist.
  const tempDir: string = path.join(os.tmpdir(), 'humble');

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  // Creating file paths for the temporary file and writing the file to the
  // temporary directory.
  const tempFilePath: string = path.join(tempDir, `temp${fileExtension}`);
  const cleanedFilePath: string = path.join(tempDir, `temp.cleaned${fileExtension}`);

  fs.writeFileSync(tempFilePath, bytes);

  // Calling the Mat2 command to remove the metadata from the file in the
  // temporary directory.
  const mat2Process: SpawnSyncReturns<string> = childProcess.spawnSync(
    'mat2',
    [
      tempFilePath,
    ],
  );

  // If the metadata removal was successful, reading the file to get the
  // buffer, and then deleting the temporary files and directories.
  if (mat2Process.status === 0) {
    const fileBuffer: Buffer = fs.readFileSync(cleanedFilePath);

    // Deleting the temporary files and directory.
    rimraf.sync(tempDir);

    return fileBuffer;
  }

  // If the process failed, simply delete the temporary files and directory to
  // clean up the resources, and return the original buffer.
  rimraf.sync(tempDir);

  return bytes;
}

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
export function removeMetadataFromResourceCache(
  resourceCache: ResourceCache,
  keepIfLarger: boolean = true,
) : void {
  // Checking if Mat2 is installed on the host system.
  const isMat2Installed: boolean = dependencies.isMat2Installed();

  // If Mat2 is installed, removing metadata from all of the resources in the
  // resource cache.
  if (isMat2Installed) {
    // Removing metadata for all resources in the resource cache.
    for (const url in resourceCache) {
      // Getting the resource, bytes, and file extension.
      const resource: Resource = resourceCache[url];
      const bytes: Buffer = resource.bytes;
      const fileExtension: string = resource.extension;

      // Getting the metadata removed bytes from the resource.
      const metadataRemovedBuffer: Buffer = removeResourceMetadata(
        bytes,
        fileExtension,
      );

      // If the `keepIfLarger` flag is enabled, updating the resource to the
      // metadata removed buffer. If the flag is false, only updating the
      // resource if the bytes are smaller after the metadata removal.
      if (keepIfLarger === true) {
        resource.update(metadataRemovedBuffer);
      } else {
        if (metadataRemovedBuffer.length < bytes.length) {
          resource.update(metadataRemovedBuffer);
        }
      }
    }
  }
}
