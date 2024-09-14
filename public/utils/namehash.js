"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNamehash = exports.constructEthNameHash = void 0;
var utils_1 = require("@ensdomains/ensjs/utils");
var ethers_1 = require("ethers");
var base_1 = require("../base");
var bigIntToUint8Array_1 = require("./bigIntToUint8Array");
var sha3 = require('js-sha3').keccak_256;
var eth0x = '4f5b812789fc606be1b3b16908db13fc7a9adf7ca72641f84d75b47069d3d7f0';
function constructEthNameHash(tokenId, version) {
    if (version > base_1.Version.v1)
        return tokenId;
    var label0x = (0, ethers_1.zeroPadValue)((0, ethers_1.hexlify)((0, bigIntToUint8Array_1.bigIntToUint8Array)(BigInt(tokenId))), 32)
        .replace('0x', '');
    var labels = [label0x, eth0x];
    // 0 x 64
    var node = '0000000000000000000000000000000000000000000000000000000000000000';
    for (var i = labels.length - 1; i >= 0; i--) {
        var labelSha = labels[i];
        node = sha3(Buffer.from(node + labelSha, 'hex'));
    }
    return '0x' + node;
}
exports.constructEthNameHash = constructEthNameHash;
function getNamehash(nameOrNamehash) {
    var _name = nameOrNamehash.substring(0, nameOrNamehash.lastIndexOf('.'));
    // if not name, return original (in case intID provided convert to hexID)
    if (!_name) {
        if (!nameOrNamehash.match(/^0x/)) {
            return (0, ethers_1.zeroPadValue)((0, ethers_1.hexlify)((0, bigIntToUint8Array_1.bigIntToUint8Array)(BigInt(nameOrNamehash))), 32);
        }
        return nameOrNamehash;
    }
    var _lhexId = (0, utils_1.namehash)(nameOrNamehash);
    return _lhexId;
}
exports.getNamehash = getNamehash;
