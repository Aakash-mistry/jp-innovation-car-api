"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Colors = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ColorSchema = new mongoose_1.default.Schema({
    hex: { type: mongoose_1.default.Schema.Types.String, required: true },
    name: { type: mongoose_1.default.Schema.Types.String, required: true },
}, {
    timestamps: true,
});
exports.Colors = mongoose_1.default.model("Color", ColorSchema);
