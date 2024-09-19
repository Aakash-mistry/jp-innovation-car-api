import mongoose from "mongoose";
import { IBranchProps, IRoleProps } from "../interface";

const BranchSchema = new mongoose.Schema<IBranchProps>(
     {
          branchName: { type: mongoose.Schema.Types.String, required: true },
          address: { type: mongoose.Schema.Types.String, required: true },
          city: { type: mongoose.Schema.Types.String, required: true },
          dealerId: { type: mongoose.Schema.Types.ObjectId, ref: "Dealer", required: true },
          email: { type: mongoose.Schema.Types.String, required: true },
          branchRole: { type: mongoose.Schema.Types.String },
          phone: { type: mongoose.Schema.Types.String, required: true },
          remark: { type: mongoose.Schema.Types.String },
          state: { type: mongoose.Schema.Types.String, required: true },
          transactionCount: { type: mongoose.Schema.Types.Number },
          zip: { type: mongoose.Schema.Types.String },
          photo: { type: mongoose.Schema.Types.String, required: true },
     },
     {
          timestamps: true,
     },
);

export const Branch = mongoose.model("Branch", BranchSchema);

const RoleSchema = new mongoose.Schema<IRoleProps>(
     {
          label: { type: mongoose.Schema.Types.String, required: true },
          dealerId: { type: mongoose.Schema.Types.ObjectId, ref: "Dealer", required: true },
     },
     {
          timestamps: true,
     },
);

export const Role = mongoose.model("Role", RoleSchema);
