"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterColorRule = exports.MasterValidationRule = void 0;
const express_validator_1 = require("express-validator");
exports.MasterValidationRule = [
    (0, express_validator_1.body)("label", "label is required").isString(),
    // body("image", "image is required").isString(),
    // body("desc").isString(),
];
exports.MasterColorRule = [(0, express_validator_1.body)(["name", "hex"], "missing field").isString()];
