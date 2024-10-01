import mongoose from "mongoose";
import { ICustomerProps } from "../interface";

const CustomerSchema = new mongoose.Schema<ICustomerProps>(
     {
          bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
          dealerId: { type: mongoose.Schema.Types.ObjectId, ref: "Dealer", required: true },
          feedbackId: { type: mongoose.Schema.Types.ObjectId, ref: "Feedback", required: true },
          status: {
               type: mongoose.Schema.Types.String,
               enum: ["active", "inactive"],
               default: "active",
               required: true,
          },
          stockId: { type: mongoose.Schema.Types.ObjectId, ref: "Stock", required: true },
          deliveryId: { type: mongoose.Schema.Types.ObjectId, ref: "Delivery", required: true },
     },
     {
          timestamps: true,
     },
);

export const Customer = mongoose.model("Customer", CustomerSchema);
