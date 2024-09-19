"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
const validations_1 = require("../validations");
const utils_1 = require("../utils");
const passport_1 = __importDefault(require("passport"));
exports.AdminAuthRouter = express_1.default.Router();
const { SignIn, SignUp, SignedInProfile } = controller_1.UserControllers;
exports.AdminAuthRouter.post("/user/auth/sign-up", validations_1.AdminSignUpRule, utils_1.Validate, SignUp);
exports.AdminAuthRouter.post("/user/auth/sign-in", validations_1.AdminSignInRule, utils_1.Validate, SignIn);
exports.AdminAuthRouter.get("/user/auth/profile", passport_1.default.authenticate("user", { session: false }), SignedInProfile);
