"use strict";
// @ref: https://github.com/ensdomains/ensjs-v3/blob/feat/namewrapper-upgrade/packages/ensjs/src/utils/fuses.ts
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
exports.getWrapperState = exports.WrapperState = exports.decodeFuses = exports.userSettableFuseKeys = exports.fullParentFuseKeys = exports.parentFuseKeys = exports.childFuseKeys = exports.unnamedUserSettableFuses = exports.unnamedParentFuses = exports.unnamedChildFuses = exports.fullFuseEnum = exports.userSettableFuseEnum = exports.fullParentFuseEnum = exports.parentFuseEnum = exports.childFuseEnum = exports.USER_SETTABLE_FUSES = exports.PARENT_CONTROLLED_FUSES = exports.CHILD_CONTROLLED_FUSES = void 0;
// child named fuses
var CANNOT_UNWRAP = 1;
var CANNOT_BURN_FUSES = 2;
var CANNOT_TRANSFER = 4;
var CANNOT_SET_RESOLVER = 8;
var CANNOT_SET_TTL = 16;
var CANNOT_CREATE_SUBDOMAIN = 32;
var CANNOT_APPROVE = 64;
// parent named fuses
var PARENT_CANNOT_CONTROL = 0x10000;
var IS_DOT_ETH = 0x20000;
var CAN_EXTEND_EXPIRY = 0x40000;
// fuse ranges
exports.CHILD_CONTROLLED_FUSES = 0x0000ffff;
exports.PARENT_CONTROLLED_FUSES = 0xffff0000;
exports.USER_SETTABLE_FUSES = 0xfffdffff;
// empty fuse
var CAN_DO_EVERYTHING = 0;
exports.childFuseEnum = {
    CANNOT_UNWRAP: CANNOT_UNWRAP,
    CANNOT_BURN_FUSES: CANNOT_BURN_FUSES,
    CANNOT_TRANSFER: CANNOT_TRANSFER,
    CANNOT_SET_RESOLVER: CANNOT_SET_RESOLVER,
    CANNOT_SET_TTL: CANNOT_SET_TTL,
    CANNOT_CREATE_SUBDOMAIN: CANNOT_CREATE_SUBDOMAIN,
    CANNOT_APPROVE: CANNOT_APPROVE,
};
exports.parentFuseEnum = {
    PARENT_CANNOT_CONTROL: PARENT_CANNOT_CONTROL,
    CAN_EXTEND_EXPIRY: CAN_EXTEND_EXPIRY,
};
exports.fullParentFuseEnum = __assign(__assign({}, exports.parentFuseEnum), { IS_DOT_ETH: IS_DOT_ETH });
exports.userSettableFuseEnum = __assign(__assign({}, exports.childFuseEnum), exports.parentFuseEnum);
exports.fullFuseEnum = __assign(__assign(__assign({}, exports.userSettableFuseEnum), exports.fullParentFuseEnum), { CAN_DO_EVERYTHING: CAN_DO_EVERYTHING });
exports.unnamedChildFuses = [
    128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768,
];
exports.unnamedParentFuses = [
    0x80000, 0x100000, 0x200000, 0x400000, 0x800000, 0x1000000, 0x2000000,
    0x4000000, 0x8000000, 0x10000000, 0x20000000, 0x40000000, 0x80000000,
];
exports.unnamedUserSettableFuses = __spreadArray(__spreadArray([], __read(exports.unnamedChildFuses), false), __read(exports.unnamedParentFuses), false);
exports.childFuseKeys = Object.keys(exports.childFuseEnum);
exports.parentFuseKeys = Object.keys(exports.parentFuseEnum);
exports.fullParentFuseKeys = Object.keys(exports.fullParentFuseEnum);
exports.userSettableFuseKeys = Object.keys(exports.userSettableFuseEnum);
var decodeNamedFuses = function (fuses, arr) {
    var fuseObj = Object.fromEntries(arr.map(function (fuse) { return [
        fuse,
        (fuses & exports.fullFuseEnum[fuse]) ===
            exports.fullFuseEnum[fuse],
    ]; }));
    return fuseObj;
};
var decodeUnnamedFuses = function (fuses, arr) {
    var fuseObj = Object.fromEntries(arr.map(function (fuse) { return [fuse, (fuses & fuse) === fuse]; }));
    return fuseObj;
};
var decodeFuses = function (fuses) {
    var parentNamedFuses = decodeNamedFuses(fuses, exports.fullParentFuseKeys);
    var parentUnnamedFuses = decodeUnnamedFuses(fuses, exports.unnamedParentFuses);
    var childNamedFuses = decodeNamedFuses(fuses, exports.childFuseKeys);
    var childUnnamedFuses = decodeUnnamedFuses(fuses, exports.unnamedChildFuses);
    return {
        parent: __assign(__assign({}, parentNamedFuses), { unnamed: parentUnnamedFuses }),
        child: __assign(__assign({}, childNamedFuses), { CAN_DO_EVERYTHING: (fuses & exports.CHILD_CONTROLLED_FUSES) === 0, unnamed: childUnnamedFuses }),
    };
};
exports.decodeFuses = decodeFuses;
exports.WrapperState = Object.freeze({
    LOCKED: 'Locked',
    EMANCIPATED: 'Emancipated',
    WRAPPED: 'Wrapped',
});
function getWrapperState(fuses) {
    if (fuses.parent.PARENT_CANNOT_CONTROL) {
        if (fuses.child.CANNOT_UNWRAP)
            return exports.WrapperState.LOCKED;
        return exports.WrapperState.EMANCIPATED;
    }
    return exports.WrapperState.WRAPPED;
}
exports.getWrapperState = getWrapperState;
