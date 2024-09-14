"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkContract = void 0;
var assert_1 = require("assert");
var ethers_1 = require("ethers");
var base_1 = require("../base");
var config_1 = require("../config");
var labelhash_1 = require("../utils/labelhash");
var namehash_1 = require("../utils/namehash");
function checkV1Contract(contract, identifier, provider) {
    return __awaiter(this, void 0, void 0, function () {
        var _tokenId, nftOwner, wrapperContract, isInterfaceSupported, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _tokenId = (0, labelhash_1.getLabelhash)(identifier);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, contract.ownerOf(_tokenId)];
                case 2:
                    nftOwner = _b.sent();
                    if (nftOwner === config_1.ADDRESS_NAME_WRAPPER) {
                        return [2 /*return*/, { tokenId: _tokenId, version: base_1.Version.v1w }];
                    }
                    wrapperContract = new ethers_1.ethers.Contract(nftOwner, [
                        'function supportsInterface(bytes4 interfaceId) external view returns (bool)',
                    ], provider);
                    return [4 /*yield*/, wrapperContract.supportsInterface(config_1.INAMEWRAPPER)];
                case 3:
                    isInterfaceSupported = _b.sent();
                    (0, assert_1.strict)(isInterfaceSupported);
                    return [2 /*return*/, { tokenId: _tokenId, version: base_1.Version.v1w }];
                case 4:
                    error_1 = _b.sent();
                    if (
                    // ethers error: given address is not contract, or does not have the supportsInterface method available
                    ((_a = error_1 === null || error_1 === void 0 ? void 0 : error_1.info) === null || _a === void 0 ? void 0 : _a.method) === 'supportsInterface' ||
                        // assert error: given address is a contract but given INAMEWRAPPER interface is not available
                        (typeof (error_1 === null || error_1 === void 0 ? void 0 : error_1.actual) === 'boolean' && !(error_1 === null || error_1 === void 0 ? void 0 : error_1.actual))) {
                        // fail is expected for regular owners since the owner is not a contract and do not have supportsInterface method
                        console.warn("checkV1Contract: supportsInterface check fails for ".concat(_tokenId));
                    }
                    else {
                        console.warn("checkV1Contract: nft ownership check fails for ".concat(_tokenId));
                    }
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/, { tokenId: _tokenId, version: base_1.Version.v1 }];
            }
        });
    });
}
function checkV2Contract(contract, identifier) {
    return __awaiter(this, void 0, void 0, function () {
        var contractAddress, isInterfaceSupported, error_2, namehash;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, contract.getAddress()];
                case 1:
                    contractAddress = _a.sent();
                    if (!(contractAddress !== config_1.ADDRESS_NAME_WRAPPER)) return [3 /*break*/, 5];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, contract.supportsInterface(config_1.INAMEWRAPPER)];
                case 3:
                    isInterfaceSupported = _a.sent();
                    (0, assert_1.strict)(isInterfaceSupported);
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    throw new base_1.ContractMismatchError("".concat(contractAddress, " does not match with any ENS related contract"), 400);
                case 5:
                    namehash = (0, namehash_1.getNamehash)(identifier);
                    // const isWrapped = await contract.isWrapped(namehash);
                    // assert(isWrapped);
                    return [2 /*return*/, { tokenId: namehash, version: base_1.Version.v2 }];
            }
        });
    });
}
function checkContract(provider, contractAddress, identifier) {
    return __awaiter(this, void 0, void 0, function () {
        var _contractAddress, contract;
        return __generator(this, function (_a) {
            _contractAddress = ethers_1.ethers.getAddress(contractAddress);
            contract = new ethers_1.ethers.Contract(_contractAddress, [
                'function ownerOf(uint256 id) view returns (address)',
                'function supportsInterface(bytes4 interfaceId) external view returns (bool)',
                'function isWrapped(bytes32 node) public view returns (bool)',
            ], provider);
            if (_contractAddress === config_1.ADDRESS_ETH_REGISTRAR) {
                return [2 /*return*/, checkV1Contract(contract, identifier, provider)];
            }
            else {
                return [2 /*return*/, checkV2Contract(contract, identifier)];
            }
            return [2 /*return*/];
        });
    });
}
exports.checkContract = checkContract;
