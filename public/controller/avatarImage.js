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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.avatarImage = void 0;
var node_fetch_1 = require("node-fetch");
var base_1 = require("../base");
var config_1 = require("../config");
var avatar_1 = require("../service/avatar");
var network_1 = __importDefault(require("../service/network"));
var template_document_1 = __importDefault(require("../template-document"));
function avatarImage(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, name, networkName, provider, _b, buffer, mimeType, documentTemplate, error_1, errCode;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    // #swagger.description = 'ENS avatar image'
                    // #swagger.parameters['networkName'] = { schema: { $ref: '#/definitions/networkName' } }
                    // #swagger.parameters['name'] = { description: 'ENS name', schema: { $ref: '#/definitions/ensName' } }
                    res.setTimeout(config_1.RESPONSE_TIMEOUT, function () {
                        res.status(504).json({ message: 'Timeout' });
                    });
                    _a = req.params, name = _a.name, networkName = _a.networkName;
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    provider = (0, network_1.default)(networkName).provider;
                    return [4 /*yield*/, (0, avatar_1.getAvatarImage)(provider, name)];
                case 2:
                    _b = __read.apply(void 0, [_c.sent(), 2]), buffer = _b[0], mimeType = _b[1];
                    if (buffer) {
                        /* #swagger.responses[200] = {
                             description: 'Image file'
                        } */
                        if (!res.headersSent) {
                            if (req.header('sec-fetch-dest') === 'document') {
                                documentTemplate = (0, template_document_1.default)({ buffer: buffer, metadata: { name: name, network: networkName }, mimeType: mimeType });
                                res
                                    .writeHead(200, {
                                    'Content-Type': 'text/html',
                                })
                                    .end(documentTemplate);
                                return [2 /*return*/];
                            }
                            res
                                .writeHead(200, {
                                'Content-Type': mimeType,
                                'Content-Length': buffer.length,
                            })
                                .end(buffer);
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
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _c.sent();
                    errCode = ((error_1 === null || error_1 === void 0 ? void 0 : error_1.code) && Number(error_1.code)) || 500;
                    if (error_1 instanceof node_fetch_1.FetchError ||
                        error_1 instanceof base_1.NFTURIParsingError ||
                        error_1 instanceof base_1.ResolverNotFound ||
                        error_1 instanceof base_1.RetrieveURIFailed ||
                        error_1 instanceof base_1.TextRecordNotFound ||
                        error_1 instanceof base_1.UnsupportedNamespace ||
                        error_1 instanceof base_1.UnsupportedNetwork) {
                        /* #swagger.responses[501] = {
                            description: 'Unsupported network'
                        } */
                        if (!res.headersSent) {
                            res.status(errCode).json({
                                message: error_1.message,
                            });
                        }
                        return [2 /*return*/];
                    }
                    if (!res.headersSent) {
                        res.status(404).json({
                            message: 'No image found.',
                        });
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.avatarImage = avatarImage;
