import mongoose from "mongoose";
import { IFeedbackProps } from "../interface/feedback.interface";

const FeedbackSchema = new mongoose.Schema<IFeedbackProps>(
     {
          address: { type: mongoose.Schema.Types.String, required: true },
          email: { type: mongoose.Schema.Types.String, required: true },
          message: { type: mongoose.Schema.Types.String },
          name: { type: mongoose.Schema.Types.String, required: true },
          phone: { type: mongoose.Schema.Types.String, required: true },
          ratings: [
               {
                    label: { type: mongoose.Schema.Types.String, required: true },
                    rate: { type: mongoose.Schema.Types.Number, required: true },
               },
          ],
          dealerId: { type: mongoose.Schema.Types.ObjectId, ref: "Dealer", required: true },
     },
     {
          timestamps: true,
     },
);

export const Feedback = mongoose.model("Feedback", FeedbackSchema);
