"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const utils_1 = require("../utils");
const interface_1 = require("../interface");
const model_1 = require("../model");
class UserController {
    SignUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, name, password } = req.body;
                const user = yield model_1.User.findOne({ email });
                if (user) {
                    return (0, utils_1.UnAuthorized)(res, interface_1.SERVER_MESSAGES.ALREADY_EXIST);
                }
                const newUser = yield new model_1.User({
                    email,
                    name,
                    password: yield (0, utils_1.hashPassword)(password),
                }).save();
                return (0, utils_1.Ok)(res, `${newUser === null || newUser === void 0 ? void 0 : newUser.name} registered as admin`);
            }
            catch (err) {
                return (0, utils_1.UnAuthorized)(res, err);
            }
        });
    }
    SignIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield model_1.User.findOne({ email });
                if (!user) {
                    return (0, utils_1.UnAuthorized)(res, interface_1.SERVER_MESSAGES.ACCOUNT_NOT_FOUND);
                }
                if (!(yield (0, utils_1.matchPassword)(user.password, password))) {
                    return (0, utils_1.UnAuthorized)(res, interface_1.SERVER_MESSAGES.INVALID_PASSWORD);
                }
                const token = (0, utils_1.generateToken)(user.id);
                return (0, utils_1.Ok)(res, { token });
            }
            catch (err) {
                return (0, utils_1.UnAuthorized)(res, err);
            }
        });
    }
    SignedInProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decodeToken = (0, utils_1.verifyToken)(req.headers.authorization);
                const user = yield model_1.User.findById({ _id: decodeToken });
                return (0, utils_1.Ok)(res, user);
            }
            catch (err) {
                return (0, utils_1.UnAuthorized)(res, err);
            }
        });
    }
}
exports.UserControllers = new UserController();
