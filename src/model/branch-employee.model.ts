import mongoose from "mongoose";
import { IBranchEmployeeProps, IBranchProps } from "../interface";

const BranchEmployeeSchema = new mongoose.Schema<IBranchEmployeeProps>(
     {
          email: { type: mongoose.Schema.Types.String, required: true },
          fullName: { type: mongoose.Schema.Types.String, required: true },
          image: { type: mongoose.Schema.Types.String, required: true },
          mobile: { type: mongoose.Schema.Types.String, required: true },
          password: { type: mongoose.Schema.Types.String, required: true },
          role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
          branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
          dealerId: { type: mongoose.Schema.Types.ObjectId, ref: "Dealer", required: true },
     },
     {
          timestamps: true,
     },
);

export const BranchEmployee = mongoose.model("BranchEmployee", BranchEmployeeSchema);
