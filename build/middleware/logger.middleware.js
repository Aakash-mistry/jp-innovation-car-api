"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const utils_1 = require("../utils");
const LoggerService = (req, res, next) => {
    utils_1.logger.log({
        level: "info",
        message: "🌐 Received API Request",
        url: req.url,
        method: req.method,
    });
    next();
};
exports.LoggerService = LoggerService;
