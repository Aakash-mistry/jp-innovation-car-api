"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestDrive = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const TestDriveSchema = new mongoose_1.default.Schema({
    address: { type: mongoose_1.default.Schema.Types.String, required: true },
    name: { type: mongoose_1.default.Schema.Types.String, required: true },
    photo: { type: mongoose_1.default.Schema.Types.String, required: true },
    city: { type: mongoose_1.default.Schema.Types.String, required: true },
    state: { type: mongoose_1.default.Schema.Types.String, required: true },
    email: { type: mongoose_1.default.Schema.Types.String, required: true },
    mobile: { type: mongoose_1.default.Schema.Types.String, required: true },
    budgetRange: { type: mongoose_1.default.Schema.Types.String, required: true },
    dealerId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Dealer", required: true },
    stockId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Stock", required: true },
    status: { type: mongoose_1.default.Schema.Types.String },
    subStatus: {
        label: { type: mongoose_1.default.Schema.Types.String },
        reason: { type: mongoose_1.default.Schema.Types.String },
    },
}, {
    timestamps: true,
});
exports.TestDrive = mongoose_1.default.model("TestDrive", TestDriveSchema);
