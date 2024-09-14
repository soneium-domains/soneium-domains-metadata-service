"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLabelhash = exports.labelhash = void 0;
var ethers_1 = require("ethers");
var labelhash = function (label) {
    return (0, ethers_1.keccak256)((0, ethers_1.toUtf8Bytes)(label));
};
exports.labelhash = labelhash;
function getLabelhash(nameOrLabelhash, isHex) {
    if (isHex === void 0) { isHex = false; }
    // if name remove tld before conversion
    var _name = nameOrLabelhash.substring(0, nameOrLabelhash.lastIndexOf('.'));
    // if not name, return original
    if (!_name)
        return nameOrLabelhash;
    var _lhexId = (0, exports.labelhash)(_name);
    if (isHex)
        return _lhexId;
    var _lintId = BigInt(_lhexId).toString();
    return _lintId;
}
exports.getLabelhash = getLabelhash;
