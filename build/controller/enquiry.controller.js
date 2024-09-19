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
exports.EnquiryController = void 0;
const utils_1 = require("../utils");
const model_1 = require("../model");
const interface_1 = require("../interface");
const mongodb_1 = require("mongodb");
class EnquiryControllers {
    constructor() {
        this.getMyEnquiry = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const verify = (0, utils_1.verifyToken)(token);
                const enquiry = yield model_1.Enquiry.find({ dealerId: verify.id })
                    .sort({ createdAt: -1 })
                    .populate({
                    path: "stockId",
                    select: "-dealerId",
                    model: "Stock",
                    populate: [
                        {
                            path: "brandId",
                        },
                        {
                            path: "variantId",
                        },
                        {
                            path: "engineNo",
                        },
                        {
                            path: "fuelTypeId",
                        },
                        {
                            path: "cardId",
                            populate: "carModel",
                        },
                    ],
                });
                return (0, utils_1.Ok)(res, enquiry);
            }
            catch (err) {
                return this.handleError(res, err);
            }
        });
        this.createEnquiry = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { address, city, contact, email, name, source, state, stockId, zip } = req.body;
                const existedEnquiry = yield model_1.Enquiry.findOne({ email, name, stockId });
                if (existedEnquiry) {
                    return (0, utils_1.UnAuthorized)(res, interface_1.SERVER_MESSAGES.ALREADY_EXIST);
                }
                const token = req.headers.authorization;
                const verify = (0, utils_1.verifyToken)(token);
                const newEnquiry = yield new model_1.Enquiry({
                    address,
                    city,
                    contact,
                    dealerId: new mongodb_1.ObjectId(`${verify.id}`),
                    email,
                    name,
                    source,
                    state,
                    stockId,
                    zip,
                    status: "created",
                }).save();
                return (0, utils_1.Ok)(res, `enquiry created for ${newEnquiry.name}`);
            }
            catch (err) {
                return this.handleError(res, err);
            }
        });
        this.updateEnquiry = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const verify = (0, utils_1.verifyToken)(token);
                const enquiry = yield model_1.Enquiry.findById({ _id: req.params.id, dealerId: verify.id });
                if (!enquiry) {
                    return (0, utils_1.UnAuthorized)(res, interface_1.SERVER_MESSAGES.ACCESS_DENIED);
                }
                const updateEnquiry = yield model_1.Enquiry.findByIdAndUpdate({ _id: enquiry === null || enquiry === void 0 ? void 0 : enquiry._id }, { $set: Object.assign({}, req.body) });
                return (0, utils_1.Ok)(res, "update enquiry");
            }
            catch (err) {
                return this.handleError(res, err);
            }
        });
        this.deleteEnquiry = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const verify = (0, utils_1.verifyToken)(token);
                const enquiry = yield model_1.Enquiry.findById({ _id: req.params.id, dealerId: verify.id });
                if (!enquiry) {
                    return (0, utils_1.UnAuthorized)(res, interface_1.SERVER_MESSAGES.ACCESS_DENIED);
                }
                const deletedEnquiry = yield model_1.Enquiry.findByIdAndDelete({ _id: enquiry._id });
                return (0, utils_1.Ok)(res, "enquiry deleted");
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
exports.EnquiryController = new EnquiryControllers();
