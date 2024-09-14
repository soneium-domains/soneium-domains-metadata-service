"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var cors_1 = __importDefault(require("cors"));
var compression_1 = __importDefault(require("compression"));
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var redoc_express_1 = __importDefault(require("redoc-express"));
var endpoint_1 = __importDefault(require("./endpoint"));
var blockRecursiveCalls_1 = require("./utils/blockRecursiveCalls");
var rateLimiter_1 = require("./utils/rateLimiter");
var setCacheHeader = function (req, res, next) {
    var period = 60 * 60;
    if (req.method == 'GET') {
        res.set('Cache-control', "public, max-age=".concat(period, ", s-maxage=").concat(period));
    }
    res.append('Vary', 'Sec-Fetch-Dest');
    next();
};
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(helmet_1.default.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'none'"],
        scriptSrc: [
            'https://unpkg.com/redoc@latest/bundles/redoc.standalone.js'
        ],
        imgSrc: ['*', 'data:'],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'data:', 'https://fonts.gstatic.com'],
        connectSrc: ['*', 'data:'],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
        frameSrc: ["'none'"],
        childSrc: ["'none'"],
        workerSrc: ['blob:'],
        baseUri: ["'none'"],
        formAction: ["'none'"],
        upgradeInsecureRequests: [],
    },
}));
if (process.env.ENV === 'local') {
    app.use('/assets', express_1.default.static(path_1.default.join(__dirname, 'assets')));
}
app.use(rateLimiter_1.rateLimitMiddleware);
app.use(blockRecursiveCalls_1.blockRecursiveCalls);
// apply cache header for all get requests
app.use(setCacheHeader);
(0, endpoint_1.default)(app);
app.use((0, compression_1.default)({ filter: shouldCompress }));
function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false;
    }
    // fallback to standard filter function
    return compression_1.default.filter(req, res);
}
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("APP_LOG::App listening on port ".concat(PORT));
});
app.get('/favicon.ico', function (req, res) { return res.status(204).end(); });
app.get('/docs', (0, redoc_express_1.default)({
    title: 'Soneium Domains Metadata Service',
    specUrl: '/assets/doc_output.json',
}));
module.exports = app;
