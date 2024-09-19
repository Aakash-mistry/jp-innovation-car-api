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
exports.TestDriveController = void 0;
const utils_1 = require("../utils");
const model_1 = require("../model");
const interface_1 = require("../interface");
class TestDriveControllers {
    constructor() {
        this.getMyTestDrive = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const verify = (0, utils_1.verifyToken)(token);
                const drives = yield model_1.TestDrive.find({ dealerId: verify.id })
                    .populate("dealerId")
                    .populate({
                    path: "stockId",
                    model: "Stock",
                    populate: [
                        {
                            path: "variantId",
                        },
                        {
                            path: "brandId",
                        },
                        {
                            path: "cardId",
                            model: "Catalogue",
                            populate: "carModel",
                        },
                    ],
                })
                    .sort({ createdAt: -1 });
                return (0, utils_1.Ok)(res, drives);
            }
            catch (err) {
                return this.handleError(res, err);
            }
        });
        this.createTestDrive = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { address, budgetRange, city, email, mobile, name, photo, state, stockId } = req.body;
                const driveExist = yield model_1.TestDrive.findOne({ email, mobile });
                if (driveExist) {
                    return (0, utils_1.UnAuthorized)(res, interface_1.SERVER_MESSAGES.DATA_EXIST);
                }
                const token = req.headers.authorization;
                const verify = (0, utils_1.verifyToken)(token);
                const newDrive = yield new model_1.TestDrive({
                    address,
                    budgetRange,
                    city,
                    dealerId: verify.id,
                    email,
                    mobile,
                    name,
                    photo,
                    stockId,
                    state,
                }).save();
                return (0, utils_1.Ok)(res, `${newDrive.name} is created`);
            }
            catch (err) {
                return this.handleError(res, err);
            }
        });
        this.updateTestDrive = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const drive = yield model_1.TestDrive.findByIdAndUpdate({ _id: req.params.id }, { $set: Object.assign({}, req.body) });
                return (0, utils_1.Ok)(res, "drive updated");
            }
            catch (err) {
                return this.handleError(res, err);
            }
        });
        this.deleteTestDrive = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield model_1.TestDrive.findByIdAndDelete({ _id: req.params.id });
                return (0, utils_1.Ok)(res, "drive deleted");
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
exports.TestDriveController = new TestDriveControllers();
