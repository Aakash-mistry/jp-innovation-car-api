import mongoose from "mongoose";
import { IBranchEmployeeProps, IBranchProps } from "../interface";

const BranchEmployeeSchema = new mongoose.Schema<IBranchEmployeeProps>(
     {
          email: { type: mongoose.Schema.Types.String, required: true },
          department: { type: mongoose.Schema.Types.String, required: true },
          fullName: { type: mongoose.Schema.Types.String, required: true },
          image: { type: mongoose.Schema.Types.String, required: true },
          mobile: { type: mongoose.Schema.Types.String, required: true },
          designation: { type: mongoose.Schema.Types.ObjectId, ref: "Designation", required: true },
          password: { type: mongoose.Schema.Types.String, required: true },
          branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
          dealerId: { type: mongoose.Schema.Types.ObjectId, ref: "Dealer", required: true },
          available: { type: mongoose.Schema.Types.Boolean, default: true },
          topLevel: { type: mongoose.Schema.Types.ObjectId, ref: "BranchEmployee" },
          midLevel: { type: mongoose.Schema.Types.ObjectId, ref: "BranchEmployee" },
          entryLevel: { type: mongoose.Schema.Types.ObjectId, ref: "BranchEmployee" },
     },
     {
          timestamps: true,
     },
);

export const BranchEmployee = mongoose.model("BranchEmployee", BranchEmployeeSchema);
