"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ref: https://github.com/sindresorhus/is-svg
// @ref: https://github.com/sindresorhus/is-svg/pull/38
var fast_xml_parser_1 = require("fast-xml-parser");
function isSvg(data) {
    if (typeof data !== 'string') {
        throw new TypeError("Expected a `string`, got `".concat(typeof data, "`"));
    }
    data = data.toLowerCase().trim();
    if (data.length === 0) {
        return false;
    }
    // Has to be `!==` as it can also return an object with error info.
    if (fast_xml_parser_1.XMLValidator.validate(data) !== true) {
        return false;
    }
    var jsonObject;
    var parser = new fast_xml_parser_1.XMLParser();
    try {
        jsonObject = parser.parse(data);
    }
    catch (_a) {
        return false;
    }
    if (!jsonObject) {
        return false;
    }
    if (!('svg' in jsonObject)) {
        return false;
    }
    return true;
}
exports.default = isSvg;
