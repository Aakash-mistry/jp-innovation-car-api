"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowUp = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const FollowUpSchema = new mongoose_1.default.Schema({
    interested: {
        status: { type: mongoose_1.default.Schema.Types.String },
        quotedPrice: { type: mongoose_1.default.Schema.Types.Number },
    },
    notInterestedReasonOptions: { type: mongoose_1.default.Schema.Types.String },
    status: { type: mongoose_1.default.Schema.Types.String, default: "none" },
    scheduledFollowUp: { type: mongoose_1.default.Schema.Types.Date },
    stockId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Stock", required: true },
    dealerId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Dealer", required: true },
    enquiryId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Enquiry" },
    type: { type: mongoose_1.default.Schema.Types.String, default: "stock", required: true },
}, {
    timestamps: true,
});
exports.FollowUp = mongoose_1.default.model("FollowUp", FollowUpSchema);
