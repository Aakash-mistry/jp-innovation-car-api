"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Packages = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const PackageSchema = new mongoose_1.default.Schema({
    carListedOnWebsite: { type: mongoose_1.default.Schema.Types.Number, required: true },
    duration: { type: mongoose_1.default.Schema.Types.String, required: true, default: "1_month" },
    features: [{ type: mongoose_1.default.Schema.Types.String, required: true }],
    packageName: { type: mongoose_1.default.Schema.Types.String, required: true },
    remark: { type: mongoose_1.default.Schema.Types.String },
    hotPackage: { type: mongoose_1.default.Schema.Types.Boolean },
    stocksLength: { type: mongoose_1.default.Schema.Types.Number, required: true },
    adminId: { type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: "User" },
    price: { type: mongoose_1.default.Schema.Types.Number, required: true },
    status: { type: mongoose_1.default.Schema.Types.Boolean, required: true, default: false },
}, {
    timestamps: true,
});
exports.Packages = mongoose_1.default.model("Packages", PackageSchema);
