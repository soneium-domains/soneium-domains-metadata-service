"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importFont = void 0;
var fs = require('fs');
function importFont(font_path, media_type) {
    var buff = fs.readFileSync(font_path);
    var base64data = buff.toString('base64');
    return "data:".concat(media_type, ";charset=utf-8;base64,").concat(base64data);
}
exports.importFont = importFont;
