"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lead = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const LeadSchema = new mongoose_1.default.Schema({
    address: { type: mongoose_1.default.Schema.Types.String, required: true },
    budgetRange: { type: mongoose_1.default.Schema.Types.String, required: true, index: true },
    city: { type: mongoose_1.default.Schema.Types.String, required: true },
    dealerId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Dealer", required: true },
    email: { type: mongoose_1.default.Schema.Types.String, required: true },
    interestedVehicle: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Stock", required: true }],
    name: { type: mongoose_1.default.Schema.Types.String, required: true },
    phone: { type: mongoose_1.default.Schema.Types.String, required: true, index: true },
    remark: { type: mongoose_1.default.Schema.Types.String },
    source: { type: mongoose_1.default.Schema.Types.String, required: true },
    state: { type: mongoose_1.default.Schema.Types.String, required: true },
    transactionCount: { type: mongoose_1.default.Schema.Types.String },
    zip: { type: mongoose_1.default.Schema.Types.String, required: true },
    status: { type: mongoose_1.default.Schema.Types.String },
}, {
    timestamps: true,
});
LeadSchema.index({ email: 1, interestedVehicle: 1, dealerId: 1 });
exports.Lead = mongoose_1.default.model("Lead", LeadSchema);
