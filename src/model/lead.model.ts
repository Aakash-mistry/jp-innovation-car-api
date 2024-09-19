import mongoose from "mongoose";
import { ILeadProps } from "../interface";

const LeadSchema = new mongoose.Schema<ILeadProps>(
     {
          address: { type: mongoose.Schema.Types.String, required: true },
          budgetRange: { type: mongoose.Schema.Types.String, required: true, index: true },
          city: { type: mongoose.Schema.Types.String, required: true },
          dealerId: { type: mongoose.Schema.Types.ObjectId, ref: "Dealer", required: true },
          email: { type: mongoose.Schema.Types.String, required: true },
          interestedVehicle: [{ type: mongoose.Schema.Types.ObjectId, ref: "Stock", required: true }],
          name: { type: mongoose.Schema.Types.String, required: true },
          phone: { type: mongoose.Schema.Types.String, required: true, index: true },
          remark: { type: mongoose.Schema.Types.String },
          source: { type: mongoose.Schema.Types.String, required: true },
          state: { type: mongoose.Schema.Types.String, required: true },
          transactionCount: { type: mongoose.Schema.Types.String },
          zip: { type: mongoose.Schema.Types.String, required: true },
          status: { type: mongoose.Schema.Types.String },
     },
     {
          timestamps: true,
     },
);

LeadSchema.index({ email: 1, interestedVehicle: 1, dealerId: 1 });

export const Lead = mongoose.model("Lead", LeadSchema);
