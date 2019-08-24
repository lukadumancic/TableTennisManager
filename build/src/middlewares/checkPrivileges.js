"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (req, res, next) {
    if (false) {
        return res.send({ error: 'No privileges' });
    }
    next();
});
