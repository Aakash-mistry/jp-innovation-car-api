"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealerSignInRule = exports.DealerSignUpRule = void 0;
const express_validator_1 = require("express-validator");
exports.DealerSignUpRule = [
    (0, express_validator_1.body)("email").notEmpty().withMessage("missing credentials"),
    (0, express_validator_1.body)("name").notEmpty().withMessage("name is required"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("password is required"),
];
exports.DealerSignInRule = [
    (0, express_validator_1.body)("email").notEmpty().withMessage("email is required"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("password is required"),
];
