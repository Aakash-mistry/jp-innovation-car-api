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
exports.FollowUpController = void 0;
const utils_1 = require("../utils");
const model_1 = require("../model");
class FollowUpControllers {
    constructor() {
        this.GetMyFollowUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const verify = (0, utils_1.verifyToken)(token);
                const followUps = yield model_1.FollowUp.find({ dealerId: verify.id }).populate("enquiryId");
                return (0, utils_1.Ok)(res, followUps);
            }
            catch (err) {
                return this.handleError(res, err);
            }
        });
        this.CreateFollowUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { dealerId, status, interested, notInterestedReasonOptions, scheduledFollowUp, enquiryId, stockId, type, } = req.body;
                const newFollowUp = yield new model_1.FollowUp({
                    dealerId,
                    status,
                    interested,
                    notInterestedReasonOptions,
                    scheduledFollowUp,
                    enquiryId,
                    stockId,
                    type,
                }).save();
                const newFollow = yield model_1.FollowUp.findById({ _id: newFollowUp._id }).populate("enquiryId");
                return (0, utils_1.Ok)(res, {
                    message: `${(_a = newFollow === null || newFollow === void 0 ? void 0 : newFollow.enquiryId) === null || _a === void 0 ? void 0 : _a.name} is successfully saved`,
                    followUpId: newFollow === null || newFollow === void 0 ? void 0 : newFollow._id,
                });
            }
            catch (err) {
                return this.handleError(res, err);
            }
        });
        this.UpdateFollowUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedFollowUp = yield model_1.FollowUp.findByIdAndUpdate({ _id: req.params.id }, { $set: Object.assign({}, req.body) });
                return (0, utils_1.Ok)(res, "follow up updated");
            }
            catch (err) {
                return this.handleError(res, err);
            }
        });
        this.DeleteFollowUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield model_1.FollowUp.findByIdAndDelete({ _id: req.params.id });
                return (0, utils_1.Ok)(res, "follow up deleted");
            }
            catch (err) {
                return this.handleError(res, err);
            }
        });
    }
    handleError(res, err) {
        console.log(err);
        const message = err.message || err;
        return (0, utils_1.UnAuthorized)(res, message);
    }
}
exports.FollowUpController = new FollowUpControllers();
