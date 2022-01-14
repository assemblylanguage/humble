"use strict";
/**
 * Code for removing metadata from common binary file formats such as PNG,
 * JPEG, or PDF. See Mat2 for a full list of supported file types.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMetadataFromResourceCache = exports.removeResourceMetadata = void 0;
/* eslint-disable no-lonely-if */
const os = require("os");
const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");
const rimraf = require("rimraf");
const dependencies = require("../../../dependencies");
/**
 * Removes metadata from the provided binary file using Mat2.
 *
 * @param bytes a buffer representing a binary file.
 * @param fileExtension the file extension for the file.
 * @dependencies Mat2.
 */
function removeResourceMetadata(bytes, fileExtension) {
    // Getting the path to and creating a new Humble temporary directory if
    // one does not already exist.
    const tempDir = path.join(os.tmpdir(), 'humble');
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
    }
    // Creating file paths for the temporary file and writing the file to the
    // temporary directory.
    const tempFilePath = path.join(tempDir, `temp${fileExtension}`);
    const cleanedFilePath = path.join(tempDir, `temp.cleaned${fileExtension}`);
    fs.writeFileSync(tempFilePath, bytes);
    // Calling the Mat2 command to remove the metadata from the file in the
    // temporary directory.
    const mat2Process = childProcess.spawnSync('mat2', [
        tempFilePath,
    ]);
    // If the metadata removal was successful, reading the file to get the
    // buffer, and then deleting the temporary files and directories.
    if (mat2Process.status === 0) {
        const fileBuffer = fs.readFileSync(cleanedFilePath);
        // Deleting the temporary files and directory.
        rimraf.sync(tempDir);
        return fileBuffer;
    }
    // If the process failed, simply delete the temporary files and directory to
    // clean up the resources, and return the original buffer.
    rimraf.sync(tempDir);
    return bytes;
}
exports.removeResourceMetadata = removeResourceMetadata;
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
function removeMetadataFromResourceCache(resourceCache, keepIfLarger = true) {
    // Checking if Mat2 is installed on the host system.
    const isMat2Installed = dependencies.isMat2Installed();
    // If Mat2 is installed, removing metadata from all of the resources in the
    // resource cache.
    if (isMat2Installed) {
        // Removing metadata for all resources in the resource cache.
        for (const url in resourceCache) {
            // Getting the resource, bytes, and file extension.
            const resource = resourceCache[url];
            const bytes = resource.bytes;
            const fileExtension = resource.extension;
            // Getting the metadata removed bytes from the resource.
            const metadataRemovedBuffer = removeResourceMetadata(bytes, fileExtension);
            // If the `keepIfLarger` flag is enabled, updating the resource to the
            // metadata removed buffer. If the flag is false, only updating the
            // resource if the bytes are smaller after the metadata removal.
            if (keepIfLarger === true) {
                resource.update(metadataRemovedBuffer);
            }
            else {
                if (metadataRemovedBuffer.length < bytes.length) {
                    resource.update(metadataRemovedBuffer);
                }
            }
        }
    }
}
exports.removeMetadataFromResourceCache = removeMetadataFromResourceCache;
//# sourceMappingURL=meta-data-remover.js.map