"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Variant = exports.FuelType = exports.CarModel = exports.Company = exports.VehicleSubType = exports.VehicleType = exports.Wheels = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const MasterSchema = new mongoose_1.Schema({
    desc: { type: mongoose_1.default.Schema.Types.String },
    image: { type: mongoose_1.default.Schema.Types.String },
    label: { type: mongoose_1.default.Schema.Types.String, required: true },
}, {
    timestamps: true,
});
function createMasterModel(modelName) {
    return (0, mongoose_1.model)(modelName, MasterSchema);
}
exports.Wheels = createMasterModel("Wheels");
exports.VehicleType = createMasterModel("VehicleType");
exports.VehicleSubType = createMasterModel("VehicleSubType");
exports.Company = createMasterModel("Company");
exports.CarModel = createMasterModel("Model");
exports.FuelType = createMasterModel("FuelType");
exports.Variant = createMasterModel("Variant");
