"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validate = exports.logger = void 0;
const express_validator_1 = require("express-validator");
const winston_1 = __importDefault(require("winston"));
const server_utils_1 = require("./server.utils");
exports.logger = winston_1.default.createLogger({
    level: "info",
    format: winston_1.default.format.json(),
    transports: [new winston_1.default.transports.Console(), new winston_1.default.transports.File({ filename: "combined.log" })],
});
const Validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return (0, server_utils_1.BadRequest)(res, errors.array().map((prop) => prop.msg));
    }
    next();
};
exports.Validate = Validate;
