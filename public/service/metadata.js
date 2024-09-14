"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metadata = void 0;
var ens_normalize_1 = require("@adraffy/ens-normalize");
var canvas_1 = require("canvas");
var base_1 = require("../base");
var config_1 = require("../config");
var svg_template_1 = __importDefault(require("../svg-template"));
var base64encode_1 = __importDefault(require("../utils/base64encode"));
var characterSet_1 = require("../utils/characterSet");
var charLength_1 = require("../utils/charLength");
var fuse_1 = require("../utils/fuse");
var Metadata = /** @class */ (function () {
    function Metadata(_a) {
        var name = _a.name, description = _a.description, created_date = _a.created_date, tokenId = _a.tokenId, version = _a.version, last_request_date = _a.last_request_date;
        var label = this.getLabel(name);
        this.is_normalized = this._checkNormalized(name);
        this.name = this.formatName(name, tokenId);
        this.description = this.formatDescription(name, description);
        this.attributes = this.initializeAttributes(created_date, label);
        this.url = this.is_normalized
            ? "https://soneium.domains/".concat(name)
            : null;
        this.last_request_date = last_request_date;
        this.version = version;
    }
    Metadata.prototype.getLabel = function (name) {
        return name.substring(0, name.indexOf('.'));
    };
    Metadata.prototype.formatName = function (name, tokenId) {
        return this.is_normalized
            ? (0, ens_normalize_1.ens_beautify)(name)
            : tokenId.replace(new RegExp('^(.{0,6}).*(.{4})$', 'im'), '[$1...$2].son');
    };
    Metadata.prototype.formatDescription = function (name, description) {
        var baseDescription = description || "".concat(this.name, ", a Soneium Domain");
        var normalizedNote = !this.is_normalized
            ? " (".concat(name, " is not in normalized form)")
            : '';
        var asciiWarning = this.generateAsciiWarning(this.getLabel(name));
        return "".concat(baseDescription).concat(normalizedNote).concat(asciiWarning);
    };
    Metadata.prototype.generateAsciiWarning = function (label) {
        if (!(0, characterSet_1.isASCII)(label)) {
            return (' ⚠️ ATTENTION: This name contains non-ASCII characters as shown above. ' +
                'Please be aware that there are characters that look identical or very ' +
                'similar to English letters, especially characters from Cyrillic and Greek. ' +
                'Also, traditional Chinese characters can look identical or very similar to ' +
                'simplified variants. For more information: ' +
                'https://en.wikipedia.org/wiki/IDN_homograph_attack');
        }
        return '';
    };
    Metadata.prototype.generateRuggableWarning = function (label, version, wrapperState) {
        if (version == base_1.Version.v2 &&
            wrapperState === fuse_1.WrapperState.WRAPPED &&
            (label.split('.').length > 1 || !label.endsWith('.son'))) {
            return ' [ ⚠️ ATTENTION: THE NFT FOR THIS NAME CAN BE REVOKED AT ANY TIME WHILE IT IS IN THE WRAPPED STATE ]';
        }
        return '';
    };
    Metadata.prototype.initializeAttributes = function (created_date, label) {
        var name_length = this._labelCharLength(label);
        var segment_length = this._labelSegmentLength(label);
        var character_set = (0, characterSet_1.findCharacterSet)(label);
        return [
            {
                trait_type: 'Created Date',
                display_type: 'date',
                value: created_date * 1000,
            },
            {
                trait_type: 'Length',
                display_type: 'number',
                value: name_length,
            },
            {
                trait_type: 'Segment Length',
                display_type: 'number',
                value: segment_length,
            },
            {
                trait_type: 'Character Set',
                display_type: 'string',
                value: character_set,
            },
        ];
    };
    Metadata.prototype.addAttribute = function (attribute) {
        this.attributes.push(attribute);
    };
    Metadata.prototype.setImage = function (image_url) {
        this.image = image_url;
        this.image_url = image_url;
    };
    Metadata.prototype.setBackground = function (base64, mimeType) {
        if (this.is_normalized) {
            this.background_image = base64;
            this.mimeType = mimeType;
        }
    };
    Metadata.prototype.generateImage = function () {
        var name = this.name;
        var labels = name.split('.');
        var isSubdomain = labels.length > 2;
        var _a = this.processSubdomain(name, isSubdomain), domain = _a.domain, subdomainText = _a.subdomainText;
        var _b = this.processDomain(domain), processedDomain = _b.processedDomain, domainFontSize = _b.domainFontSize;
        var svg = this._generateByVersion(domainFontSize, subdomainText, isSubdomain, processedDomain);
        try {
            this.setImage('data:image/svg+xml;base64,' + (0, base64encode_1.default)(svg));
        }
        catch (e) {
            console.log("generateImage", processedDomain, e);
            this.setImage('');
        }
    };
    Metadata.prototype.processSubdomain = function (name, isSubdomain) {
        var subdomainText;
        var domain = name;
        if (isSubdomain && !name.includes('...')) {
            var labels = name.split('.');
            var subdomain = labels.slice(0, labels.length - 2).join('.') + '.';
            domain = labels.slice(-2).join('.');
            if ((0, charLength_1.getSegmentLength)(subdomain) > Metadata.MAX_CHAR) {
                subdomain = Metadata._textEllipsis(subdomain);
            }
            var subdomainFontSize = Metadata._getFontSize(subdomain);
            subdomainText = "\n        <text\n          x=\"32.5\"\n          y=\"200\"\n          font-size=\"".concat(subdomainFontSize, "px\"\n          fill=\"white\"\n        >\n          ").concat(subdomain, "\n        </text>\n      ");
        }
        return { domain: domain, subdomainText: subdomainText };
    };
    Metadata.prototype.processDomain = function (domain) {
        var charSegmentLength = (0, charLength_1.getSegmentLength)(domain);
        if (charSegmentLength > Metadata.MAX_CHAR) {
            domain = Metadata._textEllipsis(domain);
            charSegmentLength = Metadata.MAX_CHAR;
        }
        var domainFontSize = Metadata._getFontSize(domain);
        if (charSegmentLength > 25) {
            domain = this._addSpan(domain, charSegmentLength / 2);
            domainFontSize = (domainFontSize - 1) * 2;
        }
        return { processedDomain: domain, domainFontSize: domainFontSize };
    };
    Metadata.prototype._addSpan = function (str, index) {
        return "\n    <tspan x=\"32\" dy=\"-1.2em\">".concat(str.substring(0, index), "</tspan>\n    <tspan x=\"32\" dy=\"1.2em\">").concat(str.substring(index, str.length), "</tspan>\n    ");
    };
    Metadata.prototype._generateByVersion = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!Object.values(base_1.Version).includes(this.version)) {
            throw Error("Unknown Metadata version: ".concat(this.version));
        }
        return this._renderSVG.apply(this, __spreadArray(__spreadArray([], __read(args), false), [this.version], false));
    };
    Metadata._textEllipsis = function (name) {
        var _nameLength = name.length;
        return (name.substring(0, Metadata.MAX_CHAR - 7) +
            '...' +
            name.substring(_nameLength - 7, _nameLength - 4) +
            '.son');
    };
    Metadata._getFontSize = function (name) {
        if (!this.ctx) {
            try {
                (0, canvas_1.registerFont)(config_1.CANVAS_FONT_PATH, { family: 'Satoshi' });
                (0, canvas_1.registerFont)(config_1.CANVAS_EMOJI_FONT_PATH, { family: 'Noto Color Emoji' });
            }
            catch (error) {
                console.warn('Font registration is failed.');
                console.warn(error);
            }
            var canvas = (0, canvas_1.createCanvas)(270, 270, 'svg');
            this.ctx = canvas.getContext('2d');
            this.ctx.font =
                '20px Satoshi, Noto Color Emoji, Apple Color Emoji, sans-serif';
        }
        var fontMetrics = this.ctx.measureText(name);
        var fontSize = Math.floor(20 * (200 / fontMetrics.width));
        return fontSize < 34 ? fontSize : 32;
    };
    Metadata.prototype._checkNormalized = function (name) {
        // this method can be used to filter many informal name types
        try {
            return name === (0, ens_normalize_1.ens_normalize)(name);
        }
        catch (_a) {
            return false;
        }
    };
    Metadata.prototype._labelCharLength = function (label) {
        if (!label)
            throw Error('Label cannot be empty!');
        return (0, charLength_1.getCodePointLength)(label);
    };
    Metadata.prototype._labelSegmentLength = function (label) {
        if (!label)
            throw Error('Label cannot be empty!');
        return (0, charLength_1.getSegmentLength)(label);
    };
    Metadata.prototype._renderSVG = function (domainFontSize, subdomainText, isSubdomain, domain, version) {
        return (0, svg_template_1.default)({
            backgroundImage: this.background_image,
            domain: domain.trim(),
            domainFontSize: domainFontSize,
            isNormalized: this.is_normalized,
            isSubdomain: isSubdomain,
            mimeType: this.mimeType,
            subdomainText: subdomainText,
            version: version,
        });
    };
    Metadata.MAX_CHAR = 60;
    return Metadata;
}());
exports.Metadata = Metadata;
