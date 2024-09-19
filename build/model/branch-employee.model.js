"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchEmployee = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const BranchEmployeeSchema = new mongoose_1.default.Schema({
    email: { type: mongoose_1.default.Schema.Types.String, required: true },
    fullName: { type: mongoose_1.default.Schema.Types.String, required: true },
    image: { type: mongoose_1.default.Schema.Types.String, required: true },
    mobile: { type: mongoose_1.default.Schema.Types.String, required: true },
    password: { type: mongoose_1.default.Schema.Types.String, required: true },
    role: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Role", required: true },
    branchId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Branch", required: true },
    dealerId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Dealer", required: true },
}, {
    timestamps: true,
});
exports.BranchEmployee = mongoose_1.default.model("BranchEmployee", BranchEmployeeSchema);
