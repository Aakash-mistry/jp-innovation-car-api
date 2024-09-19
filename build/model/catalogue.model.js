"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Catalogue = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CatalogueSchema = new mongoose_1.default.Schema({
    adminId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    bodyHeight: { type: mongoose_1.default.Schema.Types.Number, required: true },
    bodyLength: { type: mongoose_1.default.Schema.Types.Number, required: true },
    bodyWidth: { type: mongoose_1.default.Schema.Types.Number, required: true },
    carModel: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Model", required: true },
    company: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Company", required: true },
    fuelType: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "FuelType", required: true },
    discontinuedYear: { type: mongoose_1.default.Schema.Types.String, required: true },
    engineSize: { type: mongoose_1.default.Schema.Types.String, required: true },
    exteriorImage: [
        {
            type: mongoose_1.default.Schema.Types.String,
            required: true,
        },
    ],
    generation: { type: mongoose_1.default.Schema.Types.String, required: true },
    interiorImage: [{ type: mongoose_1.default.Schema.Types.String, required: true }],
    launchYear: { type: mongoose_1.default.Schema.Types.Number, required: true },
    price: { type: mongoose_1.default.Schema.Types.Number, required: true },
    seat: { type: mongoose_1.default.Schema.Types.String, required: true },
    thumbnailImage: { type: mongoose_1.default.Schema.Types.String, required: true },
    transmission: { type: mongoose_1.default.Schema.Types.String, required: true },
    variant: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Variant", required: true },
    vehicleSubType: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "VehicleSubType", required: true },
    vehicleType: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "VehicleType", required: true },
    wheel: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Wheels", required: true },
    wheelerImage: [{ type: mongoose_1.default.Schema.Types.String, required: true }],
    colors: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Color", required: true }],
}, {
    timestamps: true,
});
exports.Catalogue = mongoose_1.default.model("Catalogue", CatalogueSchema);
