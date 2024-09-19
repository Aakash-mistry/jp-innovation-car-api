"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminSignInRule = exports.AdminSignUpRule = void 0;
const express_validator_1 = require("express-validator");
exports.AdminSignUpRule = [
    (0, express_validator_1.body)("name", "admin name is required").isString().withMessage("admin name must be in string"),
    (0, express_validator_1.body)("email", "email is required").isEmail().withMessage("email should be valid email"),
    (0, express_validator_1.body)("password", "password is required")
        .isString()
        .isLength({ min: 6, max: 22 })
        .withMessage("password should be min 6 & max 22 character"),
];
exports.AdminSignInRule = [
    (0, express_validator_1.body)("email", "email is required").isEmail().withMessage("email should be valid email"),
    (0, express_validator_1.body)("password", "password is required")
        .isString()
        .isLength({ min: 6, max: 22 })
        .withMessage("password should be min 6 & max 22 character"),
];
