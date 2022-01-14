"use strict";
/**
 * Code for encoding and decoding strings and buffers into z85 encoded format.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Z85 = void 0;
/**
 * A Z85 encoder and decoder class. This class supports encoding strings,
 * arrays, and buffers into a z85 encoded string, and supports decoding
 * z85 encoded strings into array buffers. Implementation is based off of the
 * implementation at `https://github.com/cometd/cometd-Z85`.
 */
class Z85 {
    constructor() {
        /**
         * The z85 character encoding table.
         */
        this.z85EncodeTable = [
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
            'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
            'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D',
            'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
            'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
            'Y', 'Z', '.', '-', ':', '+', '=', '^', '!', '/',
            '*', '?', '&', '<', '>', '(', ')', '[', ']', '{',
            '}', '@', '%', '$', '#',
        ];
        /**
         * The Z85 character decoding table.
         */
        this.z85DecodeTable = [
            0x00, 0x44, 0x00, 0x54, 0x53, 0x52, 0x48, 0x00,
            0x4B, 0x4C, 0x46, 0x41, 0x00, 0x3F, 0x3E, 0x45,
            0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
            0x08, 0x09, 0x40, 0x00, 0x49, 0x42, 0x4A, 0x47,
            0x51, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2A,
            0x2B, 0x2C, 0x2D, 0x2E, 0x2F, 0x30, 0x31, 0x32,
            0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3A,
            0x3B, 0x3C, 0x3D, 0x4D, 0x00, 0x4E, 0x43, 0x00,
            0x00, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10,
            0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18,
            0x19, 0x1A, 0x1B, 0x1C, 0x1D, 0x1E, 0x1F, 0x20,
            0x21, 0x22, 0x23, 0x4F, 0x00, 0x50, 0x00, 0x00,
        ];
    }
    /**
     * Z85 encodes the given data into printable z85 encoded text.
     *
     * @example
     * ```
     * import { Z85 } from './z85';
     *
     * // Creating the Z85 encoder and decoder.
     * const z85 = new Z85();
     *
     * // An array of bytes can be encoded.
     * const imageBytes = [0xC, 0x0, 0xF, 0xF, 0xE];
     * const imageZ85string = z85.encode(imageBytes);
     *
     * // An string can be encoded as well. The assumed encoding is UTF-8.
     * const plainString = 'hello world';
     * const z85encodedString = z85.encode(plainString);
     * ```
     *
     * @param data the data that will be encoded.
     * @return a z85 encoded string.
     */
    encode(data) {
        // Creating a common ArrayBuffer from the provided data argument.
        let buffer;
        if (data instanceof ArrayBuffer) {
            buffer = data;
        }
        else if (data instanceof Uint8Array) {
            buffer = data.buffer;
        }
        else if (data instanceof Uint16Array) {
            buffer = data.buffer;
        }
        else if (data instanceof Uint32Array) {
            buffer = data.buffer;
        }
        else if (Array.isArray(data)) {
            buffer = new Uint8Array(data).buffer;
        }
        else if (typeof data === 'string') {
            buffer = new TextEncoder().encode(data).buffer;
        }
        else {
            throw new Error(`Cannot encode data: ${typeof data} is not a supported type.`);
        }
        // Getting the length of the buffer.
        const length = buffer.byteLength;
        // Getting the remainder of modulo 4 of the length of the buffer.
        const remainder = length % 4;
        // Calculating the amount of padding needed for the buffer.
        const padding = 4 - (remainder === 0 ? 4 : remainder);
        // Creating a dataview from the buffer.
        const view = new DataView(buffer);
        // Creating the z85 encoded string from all of the bytes in the buffer.
        let result = '';
        let value = 0;
        for (let i = 0; i < length + padding; i += 1) {
            // Checking if the iteration is currently on a padding byte.
            const isPadding = i >= length;
            // Getting the value of the current byte, or 0 if its a padding byte.
            value = value * 256 + (isPadding ? 0 : view.getUint8(i));
            // If the current byte location + 1 is divisible by 4, calculating the
            // z85 encoded character.
            if ((i + 1) % 4 === 0) {
                // Setting the divisor for the Z85 encoding.
                let divisor = 85 * 85 * 85 * 85;
                // Calculating the z85 encoded character and adding it to the result.
                for (let j = 5; j > 0; j -= 1) {
                    if (!isPadding || j > padding) {
                        const code = Math.floor(value / divisor) % 85;
                        result += this.z85EncodeTable[code];
                    }
                    // Updating the divisor.
                    divisor /= 85;
                }
                // Updating the value.
                value = 0;
            }
        }
        return result;
    }
    /**
     * Z85 decodes the given input string into an `ArrayBuffer`.
     *
     * @example
     * ```
     * import { Z85 } from './z85';
     *
     * // Creating the Z85 encoder and decoder.
     * const z85 = new Z85();
     *
     * // Decoding a z85 encoded 'hello world' string.
     * const z85EncodedString = 'xK#0@zY<mxA+]m';
     * const z85DecodedArrayBuffer = z85.decode(z85EncodedString);
     *
     * // When decoded, you will see the string 'hello world'. The TextEncoder
     * // can be used to encode the array buffer to a UTF-8 encoded string.
     * const z85DecodedString = new TextDecoder().decode(z85DecodedArrayBuffer);
     * ```
     *
     * @param string a z85 encoded string.
     * @returns a Z85 decoded array buffer.
     */
    decode(string) {
        // Getting the remainder of modulo 5 of the length of the string.
        const remainder = string.length % 5;
        // Calculating the amount of padding needed for the buffer.
        const padding = 5 - (remainder === 0 ? 5 : remainder);
        // For each byte in the padding, encoding the padding and adding it to the
        // provided string.
        for (let p = 0; p < padding; p += 1) {
            string += this.z85EncodeTable[this.z85EncodeTable.length - 1];
        }
        // Calculating the length of the string given the additional padding bytes.
        const length = string.length;
        // Creating an array buffer of the required length given the z85 encoded
        // string, and creating a dataview from this buffer.
        const buffer = new ArrayBuffer(((length * 4) / 5) - padding);
        const view = new DataView(buffer);
        // Decoding the z85 encoded string into an ArrayBuffer.
        let value = 0;
        let charIdx = 0;
        let byteIdx = 0;
        for (let i = 0; i < length; i += 1) {
            // Getting the code point at the given character index in the z85 encoded
            // string, and incrementing the character index.
            const code = string.charCodeAt(charIdx) - 32;
            charIdx += 1;
            // Getting the decoded byte from the code point.
            value = value * 85 + this.z85DecodeTable[code];
            // If the current character index is divisible by 5, calculating the
            // Z85-decoded byte.
            if (charIdx % 5 === 0) {
                // Setting the divisor for the Z85 decoding.
                let divisor = 256 * 256 * 256;
                // Adding the bytes to the dataview.
                while (divisor >= 1) {
                    if (byteIdx < view.byteLength) {
                        view.setUint8(byteIdx, Math.floor(value / divisor) % 256);
                        byteIdx += 1;
                    }
                    // Updating the divisor.
                    divisor /= 256;
                }
                // Updating the value.
                value = 0;
            }
        }
        return buffer;
    }
}
exports.Z85 = Z85;
//# sourceMappingURL=z85.js.map