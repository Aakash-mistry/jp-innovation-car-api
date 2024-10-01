import mongoose from "mongoose";
import { IDeliveryProps } from "../interface";

const DeliverySchema = new mongoose.Schema<IDeliveryProps>(
     {
          deliveryType: {
               type: mongoose.Schema.Types.String,
               enum: ["delivery", "pickup"],
               default: "delivery",
               required: true,
          },
          bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
          dealerId: { type: mongoose.Schema.Types.ObjectId, ref: "Dealer", required: true },
          employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "BranchEmployee", required: true },
          optionId: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "DeliveryOption",
               required: true,
          },
          otp: {
               driver: { type: mongoose.Schema.Types.String, required: true },
               customer: { type: mongoose.Schema.Types.String, required: true },
          },
          verification: {
               driver: { type: mongoose.Schema.Types.Boolean, default: false },
               customer: { type: mongoose.Schema.Types.Boolean, default: false },
          },
          status: {
               type: mongoose.Schema.Types.String,
               enum: ["dispatched", "delivered", "otp_sent"],
               default: "dispatched",
          },
          stockId: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "Stock",
               required: true,
          },
     },
     {
          timestamps: true,
     },
);

export const Delivery = mongoose.model<IDeliveryProps>("Delivery", DeliverySchema);
