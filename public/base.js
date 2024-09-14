"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpiredNameError = exports.UnsupportedNetwork = exports.OwnerNotFoundError = exports.NamehashMismatchError = exports.ContractMismatchError = exports.NFTURIParsingError = exports.UnsupportedNamespace = exports.SubgraphRecordNotFound = exports.RetrieveURIFailed = exports.TextRecordNotFound = exports.ResolverNotFound = exports.BaseError = exports.Version = exports.characterSet = void 0;
exports.characterSet = Object.freeze({
    ALPHANUMERIC: 'alphanumeric',
    DIGIT: 'digit',
    EMOJI: 'emoji',
    LETTER: 'letter',
    MIXED: 'mixed',
});
var Version;
(function (Version) {
    Version[Version["v1"] = 0] = "v1";
    Version[Version["v1w"] = 1] = "v1w";
    Version[Version["v2"] = 2] = "v2";
})(Version || (exports.Version = Version = {}));
var BaseError = /** @class */ (function (_super) {
    __extends(BaseError, _super);
    function BaseError(message, code) {
        if (code === void 0) { code = 500; }
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        _this.code = code;
        var trueProto = _newTarget.prototype;
        Object.setPrototypeOf(_this, trueProto);
        return _this;
    }
    return BaseError;
}(Error));
exports.BaseError = BaseError;
var ResolverNotFound = /** @class */ (function (_super) {
    __extends(ResolverNotFound, _super);
    function ResolverNotFound() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ResolverNotFound;
}(BaseError));
exports.ResolverNotFound = ResolverNotFound;
var TextRecordNotFound = /** @class */ (function (_super) {
    __extends(TextRecordNotFound, _super);
    function TextRecordNotFound() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TextRecordNotFound;
}(BaseError));
exports.TextRecordNotFound = TextRecordNotFound;
var RetrieveURIFailed = /** @class */ (function (_super) {
    __extends(RetrieveURIFailed, _super);
    function RetrieveURIFailed() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RetrieveURIFailed;
}(BaseError));
exports.RetrieveURIFailed = RetrieveURIFailed;
var SubgraphRecordNotFound = /** @class */ (function (_super) {
    __extends(SubgraphRecordNotFound, _super);
    function SubgraphRecordNotFound() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SubgraphRecordNotFound;
}(BaseError));
exports.SubgraphRecordNotFound = SubgraphRecordNotFound;
var UnsupportedNamespace = /** @class */ (function (_super) {
    __extends(UnsupportedNamespace, _super);
    function UnsupportedNamespace() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UnsupportedNamespace;
}(BaseError));
exports.UnsupportedNamespace = UnsupportedNamespace;
var NFTURIParsingError = /** @class */ (function (_super) {
    __extends(NFTURIParsingError, _super);
    function NFTURIParsingError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NFTURIParsingError;
}(BaseError));
exports.NFTURIParsingError = NFTURIParsingError;
var ContractMismatchError = /** @class */ (function (_super) {
    __extends(ContractMismatchError, _super);
    function ContractMismatchError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ContractMismatchError;
}(BaseError));
exports.ContractMismatchError = ContractMismatchError;
var NamehashMismatchError = /** @class */ (function (_super) {
    __extends(NamehashMismatchError, _super);
    function NamehashMismatchError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NamehashMismatchError;
}(BaseError));
exports.NamehashMismatchError = NamehashMismatchError;
var OwnerNotFoundError = /** @class */ (function (_super) {
    __extends(OwnerNotFoundError, _super);
    function OwnerNotFoundError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return OwnerNotFoundError;
}(BaseError));
exports.OwnerNotFoundError = OwnerNotFoundError;
var UnsupportedNetwork = /** @class */ (function (_super) {
    __extends(UnsupportedNetwork, _super);
    function UnsupportedNetwork() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UnsupportedNetwork;
}(BaseError));
exports.UnsupportedNetwork = UnsupportedNetwork;
var ExpiredNameError = /** @class */ (function (_super) {
    __extends(ExpiredNameError, _super);
    function ExpiredNameError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ExpiredNameError;
}(BaseError));
exports.ExpiredNameError = ExpiredNameError;
