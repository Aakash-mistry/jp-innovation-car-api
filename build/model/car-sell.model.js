"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarSell = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CarSellSchema = new mongoose_1.default.Schema({
    brandName: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Company", required: true },
    carModel: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Model", required: true },
    carVariant: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Variant", required: true },
    dealerId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Dealer", required: true },
    fuelType: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "FuelType", required: true },
    color: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Color", required: true },
    city: { type: mongoose_1.default.Schema.Types.String, required: true },
    kmUsed: { type: mongoose_1.default.Schema.Types.String, required: true },
    modelYear: { type: mongoose_1.default.Schema.Types.String, required: true },
    regState: { type: mongoose_1.default.Schema.Types.String, required: true },
    rtoCode: { type: mongoose_1.default.Schema.Types.String, required: true },
    thumbnail: { type: mongoose_1.default.Schema.Types.String, required: true },
    //   transmission: { type: mongoose.Schema.Types.String, required: true },
    whenToSell: { type: mongoose_1.default.Schema.Types.String, required: true },
    carExterior: [{ type: mongoose_1.default.Schema.Types.String }],
    carInterior: [{ type: mongoose_1.default.Schema.Types.String }],
    customer: {
        firstName: { type: mongoose_1.default.Schema.Types.String, required: true },
        lastName: { type: mongoose_1.default.Schema.Types.String, required: true },
        email: { type: mongoose_1.default.Schema.Types.String, required: true },
        phone: { type: mongoose_1.default.Schema.Types.String, required: true },
        message: { type: mongoose_1.default.Schema.Types.String },
    },
    condition: {
        exterior: { type: mongoose_1.default.Schema.Types.String },
        interior: { type: mongoose_1.default.Schema.Types.String },
        accident: { type: mongoose_1.default.Schema.Types.Boolean },
    },
}, {
    timestamps: true,
});
exports.CarSell = mongoose_1.default.model("CarSell", CarSellSchema);
