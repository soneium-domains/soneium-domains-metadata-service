"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensImage = void 0;
var node_fetch_1 = require("node-fetch");
var base_1 = require("../base");
var config_1 = require("../config");
var contract_1 = require("../service/contract");
var domain_1 = require("../service/domain");
var network_1 = __importDefault(require("../service/network"));
var template_document_1 = __importDefault(require("../template-document"));
/* istanbul ignore next */
function ensImage(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, contractAddress, networkName, identifier, _b, provider, SUBGRAPH_URL, _c, tokenId, version, result, documentTemplate, base64, buffer, error_1, errCode;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    // #swagger.description = 'ENS NFT image'
                    // #swagger.parameters['networkName'] = { schema: { $ref: '#/definitions/networkName' } }
                    // #swagger.parameters['{}'] = { name: 'contractAddress', description: 'Contract address which stores the NFT indicated by the tokenId', type: 'string', schema: { $ref: '#/definitions/contractAddress' } }
                    // #swagger.parameters['tokenId'] = { type: 'string', description: 'Labelhash(v1) /Namehash(v2) of your ENS name.\n\nMore: https://docs.ens.domains/contract-api-reference/name-processing#hashing-names', schema: { $ref: '#/definitions/tokenId' } }
                    res.setTimeout(config_1.RESPONSE_TIMEOUT, function () {
                        res.status(504).json({ message: 'Timeout' });
                    });
                    _a = req.params, contractAddress = _a.contractAddress, networkName = _a.networkName, identifier = _a.tokenId;
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 4, , 5]);
                    _b = (0, network_1.default)(networkName), provider = _b.provider, SUBGRAPH_URL = _b.SUBGRAPH_URL;
                    return [4 /*yield*/, (0, contract_1.checkContract)(provider, contractAddress, identifier)];
                case 2:
                    _c = _d.sent(), tokenId = _c.tokenId, version = _c.version;
                    return [4 /*yield*/, (0, domain_1.getDomain)(provider, networkName, SUBGRAPH_URL, contractAddress, tokenId, version)];
                case 3:
                    result = _d.sent();
                    if (result.image_url) {
                        if (req.header('sec-fetch-dest') === 'document') {
                            documentTemplate = (0, template_document_1.default)({ metadata: __assign(__assign({}, result), { network: networkName }) });
                            res
                                .writeHead(200, {
                                'Content-Type': 'text/html',
                            })
                                .end(documentTemplate);
                            return [2 /*return*/];
                        }
                        base64 = result.image_url.replace('data:image/svg+xml;base64,', '');
                        buffer = Buffer.from(base64, 'base64');
                        if (!res.headersSent) {
                            res
                                .writeHead(200, {
                                'Content-Type': 'image/svg+xml',
                                'Content-Length': buffer.length,
                            })
                                .end(buffer);
                            return [2 /*return*/];
                        }
                    }
                    else {
                        throw Error('Image URL is missing.');
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _d.sent();
                    errCode = ((error_1 === null || error_1 === void 0 ? void 0 : error_1.code) && Number(error_1.code)) || 500;
                    if (error_1 instanceof node_fetch_1.FetchError) {
                        /* #swagger.responses[404] = {
                             description: 'No results found'
                        } */
                        res.status(404).json({
                            message: error_1.message,
                        });
                        return [2 /*return*/];
                    }
                    /* #swagger.responses[500] = {
                             description: 'Internal Server Error'
                    } */
                    /* #swagger.responses[501] = {
                           description: 'Unsupported network'
                    } */
                    if (error_1 instanceof base_1.ContractMismatchError ||
                        error_1 instanceof base_1.ExpiredNameError ||
                        error_1 instanceof base_1.NamehashMismatchError ||
                        error_1 instanceof base_1.UnsupportedNetwork) {
                        if (!res.headersSent) {
                            res.status(errCode).json({
                                message: error_1.message,
                            });
                            return [2 /*return*/];
                        }
                    }
                    /* #swagger.responses[404] = {
                           description: 'No results found'
                    } */
                    if (!res.headersSent) {
                        res.status(404).json({
                            message: 'No results found.',
                        });
                    }
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.ensImage = ensImage;
