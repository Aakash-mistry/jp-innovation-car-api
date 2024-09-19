import mongoose from "mongoose";
import { IFollowUpProps } from "../interface";

const FollowUpSchema = new mongoose.Schema<IFollowUpProps>(
     {
          interested: {
               status: { type: mongoose.Schema.Types.String },
               quotedPrice: { type: mongoose.Schema.Types.Number },
          },
          notInterestedReasonOptions: { type: mongoose.Schema.Types.String },
          status: { type: mongoose.Schema.Types.String, default: "none" },
          scheduledFollowUp: { type: mongoose.Schema.Types.Date },
          stockId: { type: mongoose.Schema.Types.ObjectId, ref: "Stock", required: true },
          dealerId: { type: mongoose.Schema.Types.ObjectId, ref: "Dealer", required: true },
          enquiryId: { type: mongoose.Schema.Types.ObjectId, ref: "Enquiry" },
          type: { type: mongoose.Schema.Types.String, default: "stock", required: true },
     },
     {
          timestamps: true,
     },
);

export const FollowUp = mongoose.model("FollowUp", FollowUpSchema);
