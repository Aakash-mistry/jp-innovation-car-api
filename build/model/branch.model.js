"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.Branch = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const BranchSchema = new mongoose_1.default.Schema({
    branchName: { type: mongoose_1.default.Schema.Types.String, required: true },
    address: { type: mongoose_1.default.Schema.Types.String, required: true },
    city: { type: mongoose_1.default.Schema.Types.String, required: true },
    dealerId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Dealer", required: true },
    email: { type: mongoose_1.default.Schema.Types.String, required: true },
    branchRole: { type: mongoose_1.default.Schema.Types.String },
    phone: { type: mongoose_1.default.Schema.Types.String, required: true },
    remark: { type: mongoose_1.default.Schema.Types.String },
    state: { type: mongoose_1.default.Schema.Types.String, required: true },
    transactionCount: { type: mongoose_1.default.Schema.Types.Number },
    zip: { type: mongoose_1.default.Schema.Types.String },
    photo: { type: mongoose_1.default.Schema.Types.String, required: true },
}, {
    timestamps: true,
});
exports.Branch = mongoose_1.default.model("Branch", BranchSchema);
const RoleSchema = new mongoose_1.default.Schema({
    label: { type: mongoose_1.default.Schema.Types.String, required: true },
    dealerId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Dealer", required: true },
}, {
    timestamps: true,
});
exports.Role = mongoose_1.default.model("Role", RoleSchema);
