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
exports.LeadController = void 0;
const utils_1 = require("../utils");
const model_1 = require("../model");
const interface_1 = require("../interface");
const mongodb_1 = require("mongodb");
class LeadControllers {
    constructor() {
        this.getMyLeads = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const verify = (0, utils_1.verifyToken)(token);
                const leads = yield model_1.Lead.find({ dealerId: verify.id })
                    .populate({
                    path: "interestedVehicle",
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
                })
                    .sort({ createdAt: -1 });
                return (0, utils_1.Ok)(res, leads);
            }
            catch (err) {
                return this.handleError(res, err);
            }
        });
        this.createNewLeads = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { address, city, email, interestedVehicle, name, phone, source, state, zip, budgetRange, remark, } = req.body;
                const leadExist = yield model_1.Lead.findOne({ phone, interestedVehicle, email });
                if (leadExist) {
                    return (0, utils_1.UnAuthorized)(res, interface_1.SERVER_MESSAGES.ALREADY_EXIST);
                }
                const token = req.headers.authorization;
                const verify = (0, utils_1.verifyToken)(token);
                const newLead = yield new model_1.Lead({
                    address,
                    city,
                    email,
                    interestedVehicle,
                    name,
                    phone,
                    source,
                    state,
                    zip,
                    budgetRange,
                    remark,
                    dealerId: new mongodb_1.ObjectId(verify.id),
                }).save();
                return (0, utils_1.Ok)(res, `lead has been created for ${newLead.name}`);
            }
            catch (err) {
                return this.handleError(res, err);
            }
        });
        this.updateLead = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updateLead = yield model_1.Lead.findByIdAndUpdate({ _id: req.params.id }, { $set: Object.assign({}, req.body) });
            }
            catch (err) {
                return this.handleError(res, err);
            }
        });
        this.deleteLead = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteLead = yield model_1.Lead.findByIdAndDelete({ _id: req.params.id });
                return (0, utils_1.Ok)(res, "lead has been removed");
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
exports.LeadController = new LeadControllers();
