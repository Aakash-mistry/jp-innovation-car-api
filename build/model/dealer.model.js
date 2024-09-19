"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dealer = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const DealerSchema = new mongoose_1.default.Schema({
    email: { type: mongoose_1.default.Schema.Types.String, unique: true, lowercase: true, required: true },
    name: { type: mongoose_1.default.Schema.Types.String, required: true },
    password: { type: mongoose_1.default.Schema.Types.String, required: true },
    photo: { type: mongoose_1.default.Schema.Types.String },
    roleId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Role" },
    branchId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Branch" },
    packageId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Packages" },
    packageEnd: { type: mongoose_1.default.Schema.Types.Date },
}, {
    timestamps: true,
});
exports.Dealer = mongoose_1.default.model("Dealer", DealerSchema);
