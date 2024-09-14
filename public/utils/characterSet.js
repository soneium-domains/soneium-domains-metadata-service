"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isASCII = exports.findCharacterSet = void 0;
var emoji_regex_1 = __importDefault(require("emoji-regex"));
var base_1 = require("../base");
function findCharacterSet(label) {
    // regex digit only
    if (/^[0-9]+$/.test(label))
        return base_1.characterSet.DIGIT;
    // regex latin letters only
    if (/^[a-zA-Z]+$/.test(label))
        return base_1.characterSet.LETTER;
    // regex unicode mode, alphanumeric
    // \p{L} or \p{Letter}: any kind of letter from any language.
    // \p{N} or \p{Number}: any kind of numeric character in any script.
    if (/^[\p{L}\p{N}]*$/u.test(label))
        return base_1.characterSet.ALPHANUMERIC;
    // regex emoji only
    if (/^[\p{Extended_Pictographic}|\p{Emoji_Component}]+$/gu.test(label))
        return base_1.characterSet.EMOJI;
    return base_1.characterSet.MIXED;
}
exports.findCharacterSet = findCharacterSet;
function isASCII(label) {
    // function excludes all known emojis from ascii check
    var emojiRxp = (0, emoji_regex_1.default)();
    // check both ascii and emoji character set
    var newEmojiRxp = new RegExp("^([\0-]|".concat(emojiRxp.source, ")+$"), emojiRxp.flags);
    return newEmojiRxp.test(label);
}
exports.isASCII = isASCII;
