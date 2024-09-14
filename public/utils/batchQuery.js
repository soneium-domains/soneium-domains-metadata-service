"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBatchQuery = void 0;
var graphql_1 = require("graphql");
var graphql_request_1 = require("graphql-request");
var BatchedQuery = /** @class */ (function () {
    function BatchedQuery(queryName) {
        this.documentNodes = [];
        this.queryName = '';
        this.queryName = queryName;
    }
    BatchedQuery.prototype.add = function (document) {
        if (!document)
            throw Error('Parameters cannot be empty.');
        var documentNode = (0, graphql_1.parse)(document);
        this.documentNodes.push(documentNode);
        return this;
    };
    BatchedQuery.prototype._genNodes = function () {
        var variables = new Set();
        var documentNodes = [];
        this.documentNodes.forEach(function (documentNode) {
            var _a;
            var vars = (_a = documentNode.definitions[0].variableDefinitions) === null || _a === void 0 ? void 0 : _a.map(function (def) {
                return "$".concat(def.variable.name.value, ":").concat(def.type.name.value);
            }).toString();
            variables.add(vars);
            var node = (0, graphql_1.print)(documentNode)
                .replace(/query.*\{/, '')
                .slice(0, -1)
                .trim();
            documentNodes.push(node);
        });
        return [__spreadArray([], __read(variables), false).join(', '), documentNodes];
    };
    BatchedQuery.prototype.query = function () {
        var _a = __read(this._genNodes(), 2), variables = _a[0], documentNodes = _a[1];
        return (0, graphql_request_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    query ", "(", ") {\n      ", "\n    }\n    "], ["\n    query ", "(", ") {\n      ", "\n    }\n    "])), this.queryName, variables, documentNodes).replace(/\n/g, '').replace(/\s\s+/g, ' ').trim();
    };
    return BatchedQuery;
}());
function createBatchQuery(queryName) {
    return new BatchedQuery(queryName);
}
exports.createBatchQuery = createBatchQuery;
var templateObject_1;
