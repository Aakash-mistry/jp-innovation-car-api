import mongoose from "mongoose";
import { IDesignation } from "../interface";

const DesignationSchema = new mongoose.Schema<IDesignation>(
     {
          department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
          desc: { type: mongoose.Schema.Types.String },
          label: { type: mongoose.Schema.Types.String, required: true },
          dealerId: { type: mongoose.Schema.Types.ObjectId, ref: "Dealer", required: true },
     },
     {
          timestamps: true,
     },
);

export const Designation = mongoose.model<IDesignation>("Designation", DesignationSchema);
