import mongoose from "mongoose";
import { IPackagesProps } from "../interface";

const PackageSchema = new mongoose.Schema<IPackagesProps>(
     {
          carListedOnWebsite: { type: mongoose.Schema.Types.Number, required: true },
          duration: { type: mongoose.Schema.Types.String, required: true, default: "1_month" },
          features: [{ type: mongoose.Schema.Types.String, required: true }],
          packageName: { type: mongoose.Schema.Types.String, required: true },
          remark: { type: mongoose.Schema.Types.String },
          hotPackage: { type: mongoose.Schema.Types.Boolean },
          stocksLength: { type: mongoose.Schema.Types.Number, required: true },
          adminId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
          price: { type: mongoose.Schema.Types.Number, required: true },
          status: { type: mongoose.Schema.Types.Boolean, required: true, default: false },
     },
     {
          timestamps: true,
     },
);

export const Packages = mongoose.model<IPackagesProps>("Packages", PackageSchema);
