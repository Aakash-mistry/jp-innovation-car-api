"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stock = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const StockSchema = new mongoose_1.default.Schema({
    accessories: { type: mongoose_1.default.Schema.Types.String, required: true },
    carExteriorUrl: [{ type: mongoose_1.default.Schema.Types.String, required: true }],
    carInteriorUrl: [{ type: mongoose_1.default.Schema.Types.String, required: true }],
    certificateTitle: { type: mongoose_1.default.Schema.Types.String, required: true },
    insurance: { type: mongoose_1.default.Schema.Types.String, required: true },
    puc: { type: mongoose_1.default.Schema.Types.String, required: true },
    rc_book: { type: mongoose_1.default.Schema.Types.String, required: true },
    chaseNo: { type: mongoose_1.default.Schema.Types.String, required: true },
    engineNo: { type: mongoose_1.default.Schema.Types.String, required: true },
    insuranceType: { type: mongoose_1.default.Schema.Types.String, required: true },
    insuranceValidity: { type: mongoose_1.default.Schema.Types.String, required: true },
    registrationNumber: { type: mongoose_1.default.Schema.Types.String, required: true },
    registrationType: { type: mongoose_1.default.Schema.Types.String, required: true },
    registrationYear: { type: mongoose_1.default.Schema.Types.String, required: true },
    thumbnailUrl: { type: mongoose_1.default.Schema.Types.String, required: true },
    tyresUrl: [{ type: mongoose_1.default.Schema.Types.String, required: true }],
    manufacturingYear: { type: mongoose_1.default.Schema.Types.Number, required: true },
    mileage: { type: mongoose_1.default.Schema.Types.Number, required: true },
    salePrice: { type: mongoose_1.default.Schema.Types.Number, required: true },
    branchId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Branch", required: true },
    brandId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Company", required: true },
    cardId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Catalogue", required: true },
    colorId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Color", required: true },
    deaderId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Dealer", required: true },
    fuelTypeId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "FuelType", required: true },
    variantId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Variant", required: true },
    features: { type: mongoose_1.default.Schema.Types.String },
    sellerComment: { type: mongoose_1.default.Schema.Types.String },
    commission: { type: mongoose_1.default.Schema.Types.Number, required: true },
    customerPrice: { type: mongoose_1.default.Schema.Types.Number, required: true },
    otherDealerStock: {
        dealerPrice: { type: mongoose_1.default.Schema.Types.Number },
        addedPrice: { type: mongoose_1.default.Schema.Types.Number },
        ownStock: { type: mongoose_1.default.Schema.Types.Boolean },
    },
    status: { type: mongoose_1.default.Schema.Types.String, default: "in_stock", required: true },
}, {
    timestamps: true,
});
StockSchema.index({ email: 1, stockId: 1, dealerId: 1 });
exports.Stock = mongoose_1.default.model("Stock", StockSchema);
