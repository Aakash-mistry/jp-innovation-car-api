"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AdminSchema = new mongoose_1.default.Schema({
    email: { type: mongoose_1.default.Schema.Types.String, required: true, lowercase: true },
    name: { type: mongoose_1.default.Schema.Types.String, required: true, lowercase: true },
    password: { type: mongoose_1.default.Schema.Types.String, required: true },
    role: { type: mongoose_1.default.Schema.Types.String, default: "dealer", required: true },
}, {
    timestamps: true,
});
exports.User = mongoose_1.default.model("User", AdminSchema);
