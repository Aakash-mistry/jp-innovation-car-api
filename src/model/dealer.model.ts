import mongoose from "mongoose";
import { IDealerProps } from "../interface";

const DealerSchema = new mongoose.Schema<IDealerProps>(
     {
          email: { type: mongoose.Schema.Types.String, unique: true, lowercase: true, required: true },
          name: { type: mongoose.Schema.Types.String, required: true },
          password: { type: mongoose.Schema.Types.String, required: true },
          photo: { type: mongoose.Schema.Types.String },
          roleId: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
          packageId: { type: mongoose.Schema.Types.ObjectId, ref: "Packages" },
          packageEnd: { type: mongoose.Schema.Types.Date },
          blocked: { type: mongoose.Schema.Types.Boolean, default: false },
     },
     {
          timestamps: true,
     },
);

export const Dealer = mongoose.model("Dealer", DealerSchema);
