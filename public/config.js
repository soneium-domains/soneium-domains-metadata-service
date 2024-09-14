"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.THE_GRAPH_API_KEY = exports.SERVER_URL = exports.RESPONSE_TIMEOUT = exports.NODE_PROVIDER_URL_SEPOLIA = exports.NODE_PROVIDER_URL_GOERLI = exports.NODE_PROVIDER_URL_CF = exports.NODE_PROVIDER_URL = exports.NODE_PROVIDER = exports.REDIS_URL = exports.OPENSEA_API_KEY = exports.INFURA_API_KEY = exports.IPFS_GATEWAY = exports.INAMEWRAPPER = exports.NAMEWRAPPER_ABI = exports.ETH_REGISTRY_ABI = exports.CANVAS_EMOJI_FONT_PATH = exports.CANVAS_FONT_PATH = exports.ADDRESS_NAME_WRAPPER = exports.ADDRESS_ETH_REGISTRY = exports.ADDRESS_ETH_REGISTRAR = void 0;
var path = require('path');
require('dotenv').config();
var PORT = process.env.PORT || 3000;
var HOST = process.env.HOST || 'metadata.soneium.domains';
var ENV = process.env.ENV || 'local'; // local/prod
var REDIS_URL = process.env.REDIS_URL;
exports.REDIS_URL = REDIS_URL;
var FONT_FOLDER = path.join((ENV === 'local' ? 'src' : 'public'), 'assets');
var CANVAS_FONT_PATH = path.join(FONT_FOLDER, 'Satoshi-Bold.ttf');
exports.CANVAS_FONT_PATH = CANVAS_FONT_PATH;
var CANVAS_EMOJI_FONT_PATH = path.join(FONT_FOLDER, 'NotoColorEmoji.ttf');
exports.CANVAS_EMOJI_FONT_PATH = CANVAS_EMOJI_FONT_PATH;
var INAMEWRAPPER = process.env.INAMEWRAPPER || '0xd82c42d8';
exports.INAMEWRAPPER = INAMEWRAPPER;
var IPFS_GATEWAY = process.env.IPFS_GATEWAY || 'https://ipfs.io';
exports.IPFS_GATEWAY = IPFS_GATEWAY;
var INFURA_API_KEY = process.env.INFURA_API_KEY || '';
exports.INFURA_API_KEY = INFURA_API_KEY;
var OPENSEA_API_KEY = process.env.OPENSEA_API_KEY || '';
exports.OPENSEA_API_KEY = OPENSEA_API_KEY;
var NODE_PROVIDER = process.env.NODE_PROVIDER || 'geth';
exports.NODE_PROVIDER = NODE_PROVIDER;
var NODE_PROVIDER_URL = process.env.NODE_PROVIDER_URL || 'http://localhost:8545';
exports.NODE_PROVIDER_URL = NODE_PROVIDER_URL;
var THE_GRAPH_API_KEY = process.env.THE_GRAPH_API_KEY || '';
exports.THE_GRAPH_API_KEY = THE_GRAPH_API_KEY;
// undocumented, temporary keys
var NODE_PROVIDER_URL_CF = process.env.NODE_PROVIDER_URL_CF || '';
exports.NODE_PROVIDER_URL_CF = NODE_PROVIDER_URL_CF;
var NODE_PROVIDER_URL_GOERLI = process.env.NODE_PROVIDER_URL_GOERLI || '';
exports.NODE_PROVIDER_URL_GOERLI = NODE_PROVIDER_URL_GOERLI;
var NODE_PROVIDER_URL_SEPOLIA = process.env.NODE_PROVIDER_URL_SEPOLIA || '';
exports.NODE_PROVIDER_URL_SEPOLIA = NODE_PROVIDER_URL_SEPOLIA;
var ADDRESS_ETH_REGISTRAR = process.env.ADDRESS_ETH_REGISTRAR || '0xA2baDb1a39b578573371BfbaEe85a2fD1db16D63';
exports.ADDRESS_ETH_REGISTRAR = ADDRESS_ETH_REGISTRAR;
var ADDRESS_ETH_REGISTRY = process.env.ADDRESS_ETH_REGISTRY || '0xF0A7aC86FE19c8Af9f42f00e60aA781818F676CB';
exports.ADDRESS_ETH_REGISTRY = ADDRESS_ETH_REGISTRY;
var ADDRESS_NAME_WRAPPER = process.env.ADDRESS_NAME_WRAPPER || '0x02Cd40daE88c503ef462b05adAc329a7F87A6421';
exports.ADDRESS_NAME_WRAPPER = ADDRESS_NAME_WRAPPER;
var SERVER_URL = ENV === 'local' ? "http://localhost:".concat(PORT) : "https://".concat(HOST);
exports.SERVER_URL = SERVER_URL;
var ETH_REGISTRY_ABI = [
    'function recordExists(bytes32 node) external view returns (bool)'
];
exports.ETH_REGISTRY_ABI = ETH_REGISTRY_ABI;
var NAMEWRAPPER_ABI = [
    'function isWrapped(bytes32 node) public view returns (bool)'
];
exports.NAMEWRAPPER_ABI = NAMEWRAPPER_ABI;
// response timeout: 1 min
var RESPONSE_TIMEOUT = 15 * 1000;
exports.RESPONSE_TIMEOUT = RESPONSE_TIMEOUT;
