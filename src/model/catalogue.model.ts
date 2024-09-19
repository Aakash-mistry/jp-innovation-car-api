import mongoose from "mongoose";
import { ICatalogueProps, VariantsProps } from "../interface";

const VehicleVariantSchema = new mongoose.Schema<VariantsProps>(
     {
          colors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Color", required: true }],
          engineSize: { type: mongoose.Schema.Types.String, required: true },
          fuelType: { type: mongoose.Schema.Types.ObjectId, ref: "FuelType", required: true },
          price: { type: mongoose.Schema.Types.String, required: true },
          variant: { type: mongoose.Schema.Types.ObjectId, ref: "Variant", required: true },
          transmission: { type: mongoose.Schema.Types.String, required: true },
     },
     {
          timestamps: true,
     },
);

const CatalogueSchema = new mongoose.Schema<ICatalogueProps>(
     {
          adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
          bodyHeight: { type: mongoose.Schema.Types.String, required: true },
          bodyLength: { type: mongoose.Schema.Types.String, required: true },
          bodyWidth: { type: mongoose.Schema.Types.String, required: true },
          discontinuedYear: { type: mongoose.Schema.Types.String, required: true },
          launchYear: { type: mongoose.Schema.Types.String, required: true },
          lastRecordedPrice: { type: mongoose.Schema.Types.String, required: true },
          thumbnail: { type: mongoose.Schema.Types.String, required: true },
          specification: { type: mongoose.Schema.Types.String, required: true },
          generation: { type: mongoose.Schema.Types.String, required: true },
          variants: [VehicleVariantSchema],
          brand: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
          carModel: { type: mongoose.Schema.Types.ObjectId, ref: "Model", required: true },
          vehicleSubType: { type: mongoose.Schema.Types.ObjectId, ref: "VehicleSubType", required: true },
          vehicleType: { type: mongoose.Schema.Types.ObjectId, ref: "VehicleType", required: true },
          wheels: { type: mongoose.Schema.Types.ObjectId, ref: "Wheels", required: true },
          carExterior: [{ type: mongoose.Schema.Types.String }],
          carInterior: [{ type: mongoose.Schema.Types.String }],
          carTyres: [{ type: mongoose.Schema.Types.String }],
     },
     {
          timestamps: true,
     },
);

export const Catalogue = mongoose.model<ICatalogueProps>("Catalogue", CatalogueSchema);
