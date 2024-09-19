"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPass = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const GetPassSchema = new mongoose_1.default.Schema({
    bookingId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Booking", required: true },
    customerMail: { type: mongoose_1.default.Schema.Types.String, required: true },
    dealerId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Dealer", required: true },
    driverId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "BranchEmployee", required: true },
    otp: {
        customer: { type: mongoose_1.default.Schema.Types.String, required: true },
        driver: { type: mongoose_1.default.Schema.Types.String },
    },
    sentOn: { type: mongoose_1.default.Schema.Types.Date, required: true },
    otpType: { type: mongoose_1.default.Schema.Types.String, required: true, default: "customer_driver" },
    status: { type: mongoose_1.default.Schema.Types.String, required: true, default: "muted" },
    feedback: [
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
GetPassSchema.index({ bookingId: 1 });
GetPassSchema.index({ customerMail: 1 });
GetPassSchema.index({ dealerId: 1 });
GetPassSchema.index({ driverId: 1 });
GetPassSchema.index({ otp: 1 });
GetPassSchema.index({ sentOn: 1, status: 1 });
exports.GetPass = mongoose_1.default.model("GetPass", GetPassSchema);
