import mongoose from "mongoose";
import { IDepartmentProps } from "../interface";

const DepartmentSchema = new mongoose.Schema<IDepartmentProps>(
     {
          label: { type: mongoose.Schema.Types.String, required: true },
          dealerId: { type: mongoose.Schema.Types.ObjectId, ref: "Dealer", required: true },
     },
     {
          timestamps: true,
     },
);

export const Department = mongoose.model<IDepartmentProps>("Department", DepartmentSchema);
