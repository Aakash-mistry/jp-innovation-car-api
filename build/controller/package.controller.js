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
exports.PackagesController = void 0;
const utils_1 = require("../utils");
const model_1 = require("../model");
const interface_1 = require("../interface");
class PackagesControllers {
    constructor() {
        this.getAllPackages = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const packages = yield model_1.Packages.find();
                return (0, utils_1.Ok)(res, packages);
            }
            catch (err) {
                return this.handleError(res, err);
            }
        });
        this.createPackages = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { carListedOnWebsite, duration, features, packageName, stocksLength, hotPackage, remark, price, status, } = req.body;
                const token = req.headers.authorization;
                const verify = (0, utils_1.verifyToken)(token);
                const packageExist = yield model_1.Packages.findOne({ packageName, price });
                if (packageExist) {
                    return (0, utils_1.UnAuthorized)(res, interface_1.SERVER_MESSAGES.DATA_EXIST);
                }
                const newPackage = yield new model_1.Packages({
                    carListedOnWebsite,
                    duration,
                    features,
                    packageName,
                    stocksLength,
                    hotPackage,
                    remark,
                    price,
                    status,
                    adminId: verify.id,
                }).save();
                return (0, utils_1.Ok)(res, `${newPackage.packageName} is uploaded`);
            }
            catch (err) {
                return this.handleError(res, err);
            }
        });
        this.updatePackages = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const packages = yield model_1.Packages.findByIdAndUpdate({ _id: req.params.id }, { $set: Object.assign({}, req.body) });
                return (0, utils_1.Ok)(res, "packages updated");
            }
            catch (err) {
                return this.handleError(res, err);
            }
        });
        this.deletePackages = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield model_1.Packages.findByIdAndDelete({ _id: req.params.id });
                return (0, utils_1.Ok)(res, "packages removed");
            }
            catch (err) {
                return this.handleError(res, err);
            }
        });
    }
    handleError(res, err) {
        const message = err.message || err;
        return (0, utils_1.UnAuthorized)(res, message);
    }
}
exports.PackagesController = new PackagesControllers();
