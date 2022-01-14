"use strict";
/**
 * This file contains the source code for the `Resource` class that acts as an
 * container for individual resources in the document, as well as types
 * associated with resources.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resource = exports.ResourceType = void 0;
const index_1 = require("./transports/index");
const utilities = require("./utilities");
/**
 * Represents a broad categorical type of a resource.
 */
var ResourceType;
(function (ResourceType) {
    // eslint-disable-next-line no-unused-vars
    ResourceType["HTML"] = "html";
    // eslint-disable-next-line no-unused-vars
    ResourceType["CSS"] = "css";
    // eslint-disable-next-line no-unused-vars
    ResourceType["SCRIPT"] = "script";
    // eslint-disable-next-line no-unused-vars
    ResourceType["IMAGE"] = "image";
    // eslint-disable-next-line no-unused-vars
    ResourceType["AUDIO"] = "audio";
    // eslint-disable-next-line no-unused-vars
    ResourceType["VIDEO"] = "video";
    // eslint-disable-next-line no-unused-vars
    ResourceType["FONT"] = "font";
    // eslint-disable-next-line no-unused-vars
    ResourceType["CURSOR"] = "cursor";
    // eslint-disable-next-line no-unused-vars
    ResourceType["FAVICON"] = "favicon";
    // eslint-disable-next-line no-unused-vars
    ResourceType["OTHER"] = "other";
})(ResourceType = exports.ResourceType || (exports.ResourceType = {}));
/**
 * The Resource class represents a single, self-contained resource within an
 * HTML file. Examples of resources include images, CSS, favicons, videos,
 * audio, and generally any other resource that is fetched as part of the a
 * standard request for an HTML page by a browser. Resources can also represent
 * data URIs as well.
 */
class Resource {
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
    constructor(url, absoluteUrl, protocol, type, transportOptions) {
        /**
         * Additional options for the transport method used.
         */
        this.transportOptions = {};
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
    update(bytes) {
        return __awaiter(this, void 0, void 0, function* () {
            // Setting the new bytes for this resource
            this.bytes = bytes;
            // If the new bytes are null, nulling out the MIME Type and file extension,
            // else updating the MIME Type and file extension to reflect the contents
            // of the new buffer.
            if (this.bytes === null) {
                this.mimeType = null;
                this.extension = null;
            }
            else {
                this.mimeType = yield utilities.determineMimeType(this.absoluteUrl, this.bytes);
                this.extension = utilities.getExtensionFromMimeType(this.mimeType);
            }
        });
    }
    /**
     * An asynchronous request for the resource.
     */
    fetch() {
        return __awaiter(this, void 0, void 0, function* () {
            // Fetching the resource using its absolute URL, protocol, and any
            // additional transport options.
            const resourceResponse = yield index_1.fetchResource(this.absoluteUrl, this.protocol, this.transportOptions);
            // Updating the resource with the bytes fetched from the response.
            yield this.update(resourceResponse.bytes);
            // Updating the status and fetch counter with the response.
            this.status = resourceResponse.status;
            this.fetchCounter += 1;
        });
    }
    /**
     * Converts the resource to a Base64 encoded string, with the appropriate
     * MIME Type.
     */
    toBase64() {
        // If the resource was successfully fetched, create the base64 encoded
        // string and return it. Else, return an empty string.
        if (this.status === true) {
            return `data:${this.mimeType};base64,${this.bytes.toString('base64')}`;
        }
        return '';
    }
}
exports.Resource = Resource;
//# sourceMappingURL=resource.js.map