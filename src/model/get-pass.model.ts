import mongoose from "mongoose";
import { IGetPassProps } from "../interface";

const GetPassSchema = new mongoose.Schema<IGetPassProps>(
     {
          bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
          customerMail: { type: mongoose.Schema.Types.String, required: true },
          dealerId: { type: mongoose.Schema.Types.ObjectId, ref: "Dealer", required: true },
          driverId: { type: mongoose.Schema.Types.ObjectId, ref: "BranchEmployee", required: true },
          otp: {
               customer: { type: mongoose.Schema.Types.String, required: true },
               driver: { type: mongoose.Schema.Types.String },
          },
          sentOn: { type: mongoose.Schema.Types.Date, required: true },
          otpType: { type: mongoose.Schema.Types.String, required: true, default: "customer_driver" },
          status: { type: mongoose.Schema.Types.String, required: true, default: "muted" },
          feedback: [
               {
                    milage: { type: mongoose.Schema.Types.String },
                    status: { type: mongoose.Schema.Types.String, default: "yes" },
               },
               {
                    engineNo: { type: mongoose.Schema.Types.String },
                    status: { type: mongoose.Schema.Types.String, default: "yes" },
               },
               {
                    chasis: { type: mongoose.Schema.Types.String },
                    status: { type: mongoose.Schema.Types.String, default: "yes" },
               },
               {
                    doors: { type: mongoose.Schema.Types.String },
                    status: { type: mongoose.Schema.Types.String, default: "yes" },
               },
               {
                    bonnet: { type: mongoose.Schema.Types.String },
                    status: { type: mongoose.Schema.Types.String, default: "yes" },
               },
          ],
     },
     {
          timestamps: true,
     },
);

GetPassSchema.index({ bookingId: 1 });
GetPassSchema.index({ customerMail: 1 });
GetPassSchema.index({ dealerId: 1 });
GetPassSchema.index({ driverId: 1 });
GetPassSchema.index({ otp: 1 });
GetPassSchema.index({ sentOn: 1, status: 1 });

export const GetPass = mongoose.model("GetPass", GetPassSchema);
