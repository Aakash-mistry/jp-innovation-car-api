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
exports.DealerController = void 0;
const utils_1 = require("../utils");
const model_1 = require("../model");
const interface_1 = require("../interface");
const mongodb_1 = require("mongodb");
class DealerControllers {
    constructor() {
        this.GetAllDealers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const dealers = yield model_1.Dealer.find().populate("packageId").sort({ createdAt: -1 });
                return (0, utils_1.Ok)(res, dealers);
            }
            catch (err) {
                return (0, utils_1.UnAuthorized)(res, err);
            }
        });
        this.SignUpDealer = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, name, password, photo, roleId, branchId } = req.body;
                const dealerExist = yield model_1.Dealer.findOne({ email });
                if (dealerExist) {
                    return (0, utils_1.UnAuthorized)(res, interface_1.SERVER_MESSAGES.ACCESS_DENIED);
                }
                const newUser = yield new model_1.Dealer({
                    email,
                    name,
                    photo,
                    password: yield (0, utils_1.hashPassword)(password),
                    roleId,
                    branchId,
                }).save();
                return (0, utils_1.Ok)(res, `${newUser.name} is registered`);
            }
            catch (err) {
                return (0, utils_1.UnAuthorized)(res, err);
            }
        });
        this.SignInDealer = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const dealerExist = yield model_1.Dealer.findOne({ email }).populate("packageId");
                if (!dealerExist) {
                    return (0, utils_1.UnAuthorized)(res, interface_1.SERVER_MESSAGES.ACCOUNT_NOT_FOUND);
                }
                if (!(yield (0, utils_1.matchPassword)(dealerExist.password, password))) {
                    return (0, utils_1.UnAuthorized)(res, interface_1.SERVER_MESSAGES.INVALID_PASSWORD);
                }
                const token = (0, utils_1.generateToken)(dealerExist.id);
                if (!dealerExist.roleId) {
                    return (0, utils_1.Ok)(res, { token, user: dealerExist });
                }
                else {
                    const popDealer = yield model_1.Dealer.findById({ _id: dealerExist._id }).populate("roleId");
                    return (0, utils_1.Ok)(res, { token, user: popDealer });
                }
            }
            catch (err) {
                return (0, utils_1.UnAuthorized)(res, err);
            }
        });
        this.UpdateDealer = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updated = yield model_1.Dealer.findByIdAndUpdate({ _id: new mongodb_1.ObjectId(req.params.id) }, { $set: Object.assign({}, req.body) }, { new: true });
                const dealer = yield model_1.Dealer.findById({ _id: updated === null || updated === void 0 ? void 0 : updated._id }).populate("packageId");
                console.log(dealer);
                return (0, utils_1.Ok)(res, {
                    updateDealer: dealer,
                    message: `${dealer === null || dealer === void 0 ? void 0 : dealer.name} your profile is updated`,
                });
            }
            catch (err) {
                console.log(err);
                return (0, utils_1.UnAuthorized)(res, err);
            }
        });
        this.SignOut = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.removeHeader("Authorization");
                return (0, utils_1.Ok)(res, "logged out");
            }
            catch (err) {
                return (0, utils_1.UnAuthorized)(res, err);
            }
        });
    }
}
exports.DealerController = new DealerControllers();
