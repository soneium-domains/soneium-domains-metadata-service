"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var btoa = require('btoa');
function base64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (_, p1) {
        return String.fromCharCode(parseInt(p1, 16));
    }));
}
exports.default = base64EncodeUnicode;
