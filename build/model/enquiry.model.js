"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enquiry = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const EnquirySchema = new mongoose_1.default.Schema({
    address: { type: mongoose_1.default.Schema.Types.String, required: true },
    city: { type: mongoose_1.default.Schema.Types.String, required: true },
    contact: { type: mongoose_1.default.Schema.Types.String, required: true },
    dealerId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Dealer", required: true },
    email: { type: mongoose_1.default.Schema.Types.String, required: true },
    name: { type: mongoose_1.default.Schema.Types.String, required: true },
    source: { type: mongoose_1.default.Schema.Types.String, required: true },
    state: { type: mongoose_1.default.Schema.Types.String, required: true },
    stockId: { type: mongoose_1.default.Schema.Types.String, ref: "Stock", required: true },
    status: { type: mongoose_1.default.Schema.Types.String, default: "created" },
    zip: { type: mongoose_1.default.Schema.Types.String, required: true },
}, {
    timestamps: true,
});
exports.Enquiry = mongoose_1.default.model("Enquiry", EnquirySchema);
