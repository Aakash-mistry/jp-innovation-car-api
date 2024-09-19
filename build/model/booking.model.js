"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const BookingSchema = new mongoose_1.default.Schema({
    vehicle: {
        selectedColor: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Color" },
        chaseNo: { type: mongoose_1.default.Schema.Types.String },
        engineNo: { type: mongoose_1.default.Schema.Types.String },
        manufacturingYear: { type: mongoose_1.default.Schema.Types.String },
        milage: { type: mongoose_1.default.Schema.Types.String },
        vehicleId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Stock" },
    },
    exchange: {
        exchangedVehicleChaseNo: { type: mongoose_1.default.Schema.Types.String },
        exchangedVehicleColor: { type: mongoose_1.default.Schema.Types.String },
        exchangedVehicleEngineNo: { type: mongoose_1.default.Schema.Types.String },
        exchangedVehicleFuelType: { type: mongoose_1.default.Schema.Types.String },
        exchangedVehicleManufacturing: { type: mongoose_1.default.Schema.Types.String },
        exchangedVehicleMilage: { type: mongoose_1.default.Schema.Types.String },
        exchangedVehicleName: { type: mongoose_1.default.Schema.Types.String },
    },
    bank: {
        loanAmount: { type: mongoose_1.default.Schema.Types.String },
        bankName: { type: mongoose_1.default.Schema.Types.String },
        tenuredMonths: { type: mongoose_1.default.Schema.Types.String },
        installmentAmount: { type: mongoose_1.default.Schema.Types.String },
    },
    customer: {
        customerName: { type: String, required: true },
        address: { type: String, required: true },
        email: { type: String, required: true },
        mobile: { type: String, required: true },
    },
    signature: {
        customerSignature: { type: String, required: true },
        dealerSignature: { type: String, required: true },
    },
    billing: {
        accessoriesCost: { type: Number },
        advanceAmount: { type: Number },
        balanceAmount: { type: Number },
        dealDate: { type: Date },
        gst: { type: String },
        lessExchange: { type: Number },
        rtoCharge: { type: Number },
        vehiclePrice: { type: Number },
        loanPercentage: { type: Number },
    },
    dealerId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Dealer", required: true },
    ledger: [
        {
            date: { type: mongoose_1.default.Schema.Types.Date },
            particular: { type: mongoose_1.default.Schema.Types.String, default: "cash" },
            vchNo: { type: mongoose_1.default.Schema.Types.Number }, // random number  6 digits
            credit: { type: mongoose_1.default.Schema.Types.Number },
            chequeDetails: {
                chequeNo: { type: mongoose_1.default.Schema.Types.String },
                bank: {
                    name: { type: mongoose_1.default.Schema.Types.String },
                    branch: { type: mongoose_1.default.Schema.Types.String },
                    accountNo: { type: mongoose_1.default.Schema.Types.String },
                    loanTenure: { type: mongoose_1.default.Schema.Types.Number },
                    loanInterest: { type: mongoose_1.default.Schema.Types.Number },
                },
            },
        },
    ],
    status: { type: mongoose_1.default.Schema.Types.String, default: "in_stock" },
}, {
    timestamps: true,
});
// Indexing dealerId for efficient lookups
BookingSchema.index({ dealerId: 1 });
// Compound index for querying by dealerId and dealDate
BookingSchema.index({ dealerId: 1, "billing.dealDate": 1 });
// Indexing email for efficient lookups on customer email
BookingSchema.index({ "customer.email": 1 });
// Indexing vehicleId for efficient lookups on the vehicle ID
BookingSchema.index({ "vehicle.vehicleId": 1 });
exports.Booking = mongoose_1.default.model("Booking", BookingSchema);
