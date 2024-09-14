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
exports.preview = void 0;
var base_1 = require("../base");
var config_1 = require("../config");
var metadata_1 = require("../service/metadata");
/* istanbul ignore next */
function preview(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var name, metadata, base64, buffer;
        return __generator(this, function (_a) {
            // #swagger.description = 'ENS NFT preview'
            // #swagger.parameters['name'] = { type: 'string', description: 'ENS name.' }
            res.setTimeout(config_1.RESPONSE_TIMEOUT, function () {
                res.status(504).json({ message: 'Timeout' });
            });
            name = req.params.name;
            try {
                if (!name || name.length < 7 || !name.endsWith('.son')) {
                    throw Error("".concat(name, " is not an ENS name."));
                }
                metadata = new metadata_1.Metadata({
                    name: name,
                    created_date: 0,
                    tokenId: '0',
                    version: base_1.Version.v2,
                });
                metadata.generateImage();
                if (metadata.image) {
                    base64 = metadata.image.replace('data:image/svg+xml;base64,', '');
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
                /* #swagger.responses[200] = {
                    description: 'Image file'
                } */
            }
            catch (error) {
                /* #swagger.responses[404] = {
                       description: 'No results found'
                } */
                if (!res.headersSent) {
                    res.status(404).json({
                        message: "Error generating image: ".concat(error),
                    });
                }
            }
            return [2 /*return*/];
        });
    });
}
exports.preview = preview;
