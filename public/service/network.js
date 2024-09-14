"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NETWORK = void 0;
var ethers_1 = require("ethers");
var base_1 = require("../base");
var config_1 = require("../config");
var NODE_PROVIDERS = {
    INFURA: 'INFURA',
    CLOUDFLARE: 'CLOUDFLARE',
    GOOGLE: 'GOOGLE',
    GETH: 'GETH',
};
exports.NETWORK = {
    LOCAL: 'local',
    RINKEBY: 'rinkeby',
    ROPSTEN: 'ropsten',
    GOERLI: 'goerli',
    SEPOLIA: 'sepolia',
    MINATO: 'minato',
    MAINNET: 'mainnet',
};
function getWeb3URL(providerName, api, network) {
    switch (providerName.toUpperCase()) {
        case NODE_PROVIDERS.INFURA:
            return "".concat(api.replace('https://', "https://".concat(network, ".")));
        case NODE_PROVIDERS.CLOUDFLARE:
            if (network === exports.NETWORK.MAINNET)
                return "".concat(api, "/").concat(network);
            if (network === exports.NETWORK.GOERLI)
                return config_1.NODE_PROVIDER_URL_GOERLI;
            if (network === exports.NETWORK.SEPOLIA)
                return config_1.NODE_PROVIDER_URL_SEPOLIA;
        case NODE_PROVIDERS.GOOGLE:
            if (network === exports.NETWORK.MAINNET)
                return api;
            if (network === exports.NETWORK.GOERLI)
                return config_1.NODE_PROVIDER_URL_GOERLI;
            if (network === exports.NETWORK.SEPOLIA)
                return config_1.NODE_PROVIDER_URL_SEPOLIA;
            return "".concat(config_1.NODE_PROVIDER_URL_CF, "/").concat(network);
        case NODE_PROVIDERS.GETH:
            return api;
        default:
            throw Error('');
    }
}
function getNetwork(network) {
    // currently subgraphs used under this function are outdated,
    // we will have namewrapper support and more attributes when latest subgraph goes to production
    var SUBGRAPH_URL;
    switch (network) {
        case exports.NETWORK.LOCAL:
            SUBGRAPH_URL = 'http://127.0.0.1:8000/subgraphs/name/graphprotocol/ens';
            break;
        case exports.NETWORK.RINKEBY:
            SUBGRAPH_URL =
                'https://api.thegraph.com/subgraphs/name/makoto/ensrinkeby';
            break;
        case exports.NETWORK.ROPSTEN:
            SUBGRAPH_URL =
                'https://api.thegraph.com/subgraphs/name/ensdomains/ensropsten';
            break;
        case exports.NETWORK.GOERLI:
            SUBGRAPH_URL =
                'https://api.thegraph.com/subgraphs/name/ensdomains/ensgoerli';
            break;
        case exports.NETWORK.SEPOLIA:
            SUBGRAPH_URL =
                'https://api.studio.thegraph.com/query/49574/enssepolia/version/latest';
            break;
        case exports.NETWORK.MINATO:
            SUBGRAPH_URL = "https://api.studio.thegraph.com/query/87844/soneium_domains/version/latest";
            //SUBGRAPH_URL =`https://gateway-testnet-arbitrum.network.thegraph.com/api/${THE_GRAPH_API_KEY}/subgraphs/id/6rjKFCCHJuEiMPVXTLMxEemgdE6tPquhoAkmT3xbLA5X`;
            break;
        case exports.NETWORK.MAINNET:
            SUBGRAPH_URL =
                "https://gateway-arbitrum.network.thegraph.com/api/".concat(config_1.THE_GRAPH_API_KEY, "/subgraphs/id/5XqPmWe6gjyrJtFn9cLy237i4cWw2j9HcUJEXsP5qGtH");
            break;
        default:
            throw new base_1.UnsupportedNetwork("Unknown network '".concat(network, "'"), 501);
    }
    var WEB3_URL = getWeb3URL(config_1.NODE_PROVIDER, config_1.NODE_PROVIDER_URL, network);
    // add source param at the end for better request measurability
    SUBGRAPH_URL = SUBGRAPH_URL + '?source=ens-metadata';
    if (network === exports.NETWORK.MINATO) {
        var ens = new ethers_1.EnsPlugin('0xF0A7aC86FE19c8Af9f42f00e60aA781818F676CB', 1946);
        var _network = new ethers_1.Network(network, 1946).attachPlugin(ens);
        var provider_1 = new ethers_1.JsonRpcProvider(WEB3_URL, _network, { staticNetwork: true });
        return { WEB3_URL: WEB3_URL, SUBGRAPH_URL: SUBGRAPH_URL, provider: provider_1 };
    }
    var provider = new ethers_1.JsonRpcProvider(WEB3_URL, network, { staticNetwork: true });
    return { WEB3_URL: WEB3_URL, SUBGRAPH_URL: SUBGRAPH_URL, provider: provider };
}
exports.default = getNetwork;
