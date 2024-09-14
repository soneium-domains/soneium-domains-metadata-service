"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bigIntToUint8Array = void 0;
function bigIntToUint8Array(big) {
    // ensure big is positive and determine its byte size
    var isNegative = big < BigInt(0);
    if (isNegative) {
        // find the number of bits required to represent the positive value
        var bitLength = big.toString(2).length;
        // adjust the big to its two's complement representation
        big += BigInt(1) << BigInt(bitLength + 1);
    }
    // convert big to a hex string
    var hex = big.toString(16);
    // ensure even length for proper byte conversion
    if (hex.length % 2 !== 0) {
        hex = '0' + hex;
    }
    var len = hex.length / 2;
    var u8 = new Uint8Array(len);
    for (var i = 0, j = 0; i < len; i++, j += 2) {
        u8[i] = parseInt(hex.slice(j, j + 2), 16);
    }
    // if the original big was negative, invert all bits for two's complement
    if (isNegative) {
        for (var i = 0; i < len; i++) {
            u8[i] = ~u8[i] & 0xff;
        }
    }
    return u8;
}
exports.bigIntToUint8Array = bigIntToUint8Array;
