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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvatarImage = exports.getAvatarMeta = exports.AvatarMetadata = void 0;
var http_1 = __importDefault(require("http"));
var https_1 = __importDefault(require("https"));
var ens_avatar_1 = require("@ensdomains/ens-avatar");
var assert_1 = require("assert");
var dompurify_1 = __importDefault(require("dompurify"));
var jsdom_1 = require("jsdom");
var base_1 = require("../base");
var config_1 = require("../config");
var abortableFetch_1 = require("../utils/abortableFetch");
var isSvg_1 = __importDefault(require("../utils/isSvg"));
var requestFilterHandler = require('ssrf-req-filter').requestFilterHandler;
var window = new jsdom_1.JSDOM('').window;
var AvatarMetadata = /** @class */ (function () {
    function AvatarMetadata(provider, uri) {
        this.defaultProvider = provider;
        this.avtResolver = new ens_avatar_1.AvatarResolver(provider, {
            ipfs: config_1.IPFS_GATEWAY,
            apiKey: { opensea: config_1.OPENSEA_API_KEY },
            urlDenyList: ['metadata.soneium.domains'],
            agents: {
                httpAgent: requestFilterHandler(new http_1.default.Agent()),
                httpsAgent: requestFilterHandler(new https_1.default.Agent()),
            },
        });
        this.uri = uri;
    }
    AvatarMetadata.prototype.getImage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var avatarURI, error_1, response, mimeType, data, DOMPurify_1, cleanData, mimeType, base64data, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.avtResolver.getAvatar(this.uri, {
                                jsdomWindow: window,
                            })];
                    case 1:
                        avatarURI = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        if (error_1 instanceof Error) {
                            console.log("".concat(this.uri, " - error:"), error_1.message);
                        }
                        if (typeof error_1 === 'string') {
                            console.log("".concat(this.uri, " - error:"), error_1);
                        }
                        throw new base_1.RetrieveURIFailed("Error fetching avatar: Provided url or NFT source is broken.", 404);
                    case 3:
                        if (!avatarURI) {
                            throw new base_1.TextRecordNotFound('There is no avatar set under given address', 404);
                        }
                        if (!(avatarURI === null || avatarURI === void 0 ? void 0 : avatarURI.startsWith('http'))) return [3 /*break*/, 6];
                        return [4 /*yield*/, (0, abortableFetch_1.abortableFetch)(avatarURI, {
                                timeout: 7000,
                                headers: {
                                    'user-agent': 'ENS-ImageFetcher/1.0.0',
                                },
                            })];
                    case 4:
                        response = _a.sent();
                        (0, assert_1.strict)(!!response, 'Response is empty');
                        mimeType = (response === null || response === void 0 ? void 0 : response.headers.get('Content-Type')) || '';
                        return [4 /*yield*/, (response === null || response === void 0 ? void 0 : response.buffer())];
                    case 5:
                        data = _a.sent();
                        if ((mimeType === null || mimeType === void 0 ? void 0 : mimeType.includes('svg')) || (0, isSvg_1.default)(data.toString())) {
                            DOMPurify_1 = (0, dompurify_1.default)(window);
                            cleanData = DOMPurify_1.sanitize(data.toString(), {
                                FORBID_TAGS: ['a', 'area', 'base', 'iframe', 'link'],
                            });
                            return [2 /*return*/, [Buffer.from(cleanData), mimeType]];
                        }
                        return [2 /*return*/, [data, mimeType]];
                    case 6:
                        if (avatarURI === null || avatarURI === void 0 ? void 0 : avatarURI.startsWith('data:')) {
                            mimeType = avatarURI.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/);
                            base64data = avatarURI.split('base64,')[1];
                            (0, assert_1.strict)(base64data, 'base64 format is incorrect: empty data');
                            (0, assert_1.strict)(mimeType, 'base64 format is incorrect: no mimetype');
                            data = Buffer.from(base64data, 'base64');
                            return [2 /*return*/, [data, mimeType[0]]];
                        }
                        throw new base_1.RetrieveURIFailed('Unknown type/protocol given for the image source.', 400);
                }
            });
        });
    };
    AvatarMetadata.prototype.getMeta = function (networkName) {
        return __awaiter(this, void 0, void 0, function () {
            var metadata, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.avtResolver.getMetadata(this.uri)];
                    case 1:
                        metadata = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        if (error_2 instanceof Error) {
                            console.log("".concat(this.uri, " - error:"), error_2.message);
                        }
                        if (typeof error_2 === 'string') {
                            console.log("".concat(this.uri, " - error:"), error_2);
                        }
                        throw new base_1.ResolverNotFound('There is no resolver set under given address', 404);
                    case 3:
                        if (!metadata) {
                            throw new base_1.TextRecordNotFound('There is no avatar set under given address', 404);
                        }
                        if (!metadata.image) {
                            if (metadata.image_url) {
                                metadata.image = metadata.image_url;
                            }
                            else if (metadata.image_data) {
                                metadata.image = "https://metadata.soneium.domains/".concat(networkName, "/avatar/").concat(this.uri);
                            }
                            else {
                                throw new base_1.TextRecordNotFound('There is no avatar set under given address', 404);
                            }
                        }
                        // replace back original url after fetch
                        metadata.image = metadata.image.replace(config_1.IPFS_GATEWAY, 'https://ipfs.io');
                        return [2 /*return*/, metadata];
                }
            });
        });
    };
    return AvatarMetadata;
}());
exports.AvatarMetadata = AvatarMetadata;
function getAvatarMeta(provider, name, networkName) {
    return __awaiter(this, void 0, void 0, function () {
        var avatar;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    avatar = new AvatarMetadata(provider, name);
                    return [4 /*yield*/, avatar.getMeta(networkName)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getAvatarMeta = getAvatarMeta;
function getAvatarImage(provider, name) {
    return __awaiter(this, void 0, void 0, function () {
        var avatar;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    avatar = new AvatarMetadata(provider, name);
                    return [4 /*yield*/, avatar.getImage()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getAvatarImage = getAvatarImage;
