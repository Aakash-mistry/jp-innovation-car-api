import mongoose from "mongoose";
import { IEnquiryProps } from "../interface";

const EnquirySchema = new mongoose.Schema<IEnquiryProps>(
     {
          city: { type: mongoose.Schema.Types.String, required: true },
          contact: { type: mongoose.Schema.Types.String, required: true },
          dealerId: { type: mongoose.Schema.Types.ObjectId, ref: "Dealer", required: true },
          email: { type: mongoose.Schema.Types.String, required: true },
          name: { type: mongoose.Schema.Types.String, required: true },
          stockId: { type: mongoose.Schema.Types.String, ref: "Stock", required: true },
          status: { type: mongoose.Schema.Types.String, default: "created" },
          message: { type: mongoose.Schema.Types.String },
     },
     {
          timestamps: true,
     },
);

export const Enquiry = mongoose.model("Enquiry", EnquirySchema);
