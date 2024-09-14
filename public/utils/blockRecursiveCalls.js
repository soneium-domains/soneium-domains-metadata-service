"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockRecursiveCalls = void 0;
function blockRecursiveCalls(req, res, next) {
    var requestOrigin = req.get('origin') || req.get('referer');
    if (requestOrigin) {
        try {
            var parsedRequestOrigin = new URL(requestOrigin);
            if (parsedRequestOrigin.hostname === req.hostname &&
                parsedRequestOrigin.protocol.includes('http')) {
                console.warn("Recursive call detected");
                res.status(403).json({ message: 'Recursive calls are not allowed.' });
                return;
            }
        }
        catch (error) {
            console.warn('Error parsing URL', error);
        }
    }
    next();
}
exports.blockRecursiveCalls = blockRecursiveCalls;
