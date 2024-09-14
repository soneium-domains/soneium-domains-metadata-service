"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ensMetadata_1 = require("./controller/ensMetadata");
var ensMetadata721_1 = require("./controller/ensMetadata721");
var ensMetadata1155_1 = require("./controller/ensMetadata1155");
var ensImage_1 = require("./controller/ensImage");
var ensRasterize_1 = require("./controller/ensRasterize");
var avatarMetadata_1 = require("./controller/avatarMetadata");
var avatarImage_1 = require("./controller/avatarImage");
var queryNFT_1 = require("./controller/queryNFT");
var preview_1 = require("./controller/preview");
function default_1(app) {
    // #swagger.ignore = true
    app.get('/', function (_req, res) {
        res.send('Well done mate To see more go to "/docs"!');
    });
    app.get('/:networkName/:contractAddress(0x[a-fA-F0-9]{40})/:tokenId', ensMetadata_1.ensMetadata);
    app.get('//erc721/:tokenId', ensMetadata721_1.ensMetadata721);
    app.get('//erc1155/:tokenId', ensMetadata1155_1.ensMetadata1155);
    app.get('/:networkName/:contractAddress(0x[a-fA-F0-9]{40})/:tokenId/image', ensImage_1.ensImage);
    app.get('/:networkName/:contractAddress(0x[a-fA-F0-9]{40})/:tokenId/rasterize', ensRasterize_1.ensRasterize);
    app.get('/:networkName/avatar/:name/meta', avatarMetadata_1.avatarMetadata);
    app.get('/:networkName/avatar/:name', avatarImage_1.avatarImage);
    app.get('/queryNFT', queryNFT_1.queryNFTep);
    app.get('/preview/:name', preview_1.preview);
}
exports.default = default_1;
