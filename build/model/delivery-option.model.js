"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryOption = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const optionSchema = {
    status: { type: mongoose_1.default.Schema.Types.Boolean },
    reason: { type: mongoose_1.default.Schema.Types.String },
};
const DeliverOptionSchema = new mongoose_1.default.Schema({
    bookingId: { type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: "Booking", unique: true },
    dealerId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Dealer", required: true },
    stockId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Stock", required: true },
    options: [
        {
            milage: { type: mongoose_1.default.Schema.Types.String },
            status: { type: mongoose_1.default.Schema.Types.String, default: "yes" },
        },
        {
            engineNo: { type: mongoose_1.default.Schema.Types.String },
            status: { type: mongoose_1.default.Schema.Types.String, default: "yes" },
        },
        {
            chasis: { type: mongoose_1.default.Schema.Types.String },
            status: { type: mongoose_1.default.Schema.Types.String, default: "yes" },
        },
        {
            doors: { type: mongoose_1.default.Schema.Types.String },
            status: { type: mongoose_1.default.Schema.Types.String, default: "yes" },
        },
        {
            bonnet: { type: mongoose_1.default.Schema.Types.String },
            status: { type: mongoose_1.default.Schema.Types.String, default: "yes" },
        },
    ],
}, {
    timestamps: true,
});
DeliverOptionSchema.index({
    bookingId: 1,
    stockId: 1,
    dealerId: 1,
});
exports.DeliveryOption = mongoose_1.default.model("DeliveryOption", DeliverOptionSchema);
