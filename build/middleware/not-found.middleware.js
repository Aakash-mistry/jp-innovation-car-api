"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundMiddleware = void 0;
const utils_1 = require("../utils");
const notFoundMiddleware = (_, res) => {
    return (0, utils_1.NotFound)(res, "API ENDPOINT NOT FOUND");
};
exports.notFoundMiddleware = notFoundMiddleware;
