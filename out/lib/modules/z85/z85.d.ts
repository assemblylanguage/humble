/**
 * Code for encoding and decoding strings and buffers into z85 encoded format.
 */
/**
 * A Z85 encoder and decoder class. This class supports encoding strings,
 * arrays, and buffers into a z85 encoded string, and supports decoding
 * z85 encoded strings into array buffers. Implementation is based off of the
 * implementation at `https://github.com/cometd/cometd-Z85`.
 */
export declare class Z85 {
    /**
     * The z85 character encoding table.
     */
    private readonly z85EncodeTable;
    /**
     * The Z85 character decoding table.
     */
    private readonly z85DecodeTable;
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
    encode(data: ArrayBuffer | Uint8Array | Uint16Array | Uint32Array | Array<number> | string): string;
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
    decode(string: string): ArrayBuffer;
}
//# sourceMappingURL=z85.d.ts.map