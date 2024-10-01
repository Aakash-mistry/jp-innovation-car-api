import mongoose from "mongoose";
import { IDeliveryOptionProps } from "../interface";

const optionSchema = {
     status: { type: mongoose.Schema.Types.Boolean },
     reason: { type: mongoose.Schema.Types.String },
};

const DeliverOptionSchema = new mongoose.Schema<IDeliveryOptionProps>(
     {
          bookingId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Booking", unique: true },
          dealerId: { type: mongoose.Schema.Types.ObjectId, ref: "Dealer", required: true },
          stockId: { type: mongoose.Schema.Types.ObjectId, ref: "Stock", required: true },
          options: [
               {
                    title: { type: mongoose.Schema.Types.String },
                    option: [
                         {
                              label: { type: mongoose.Schema.Types.String },
                              status: { type: mongoose.Schema.Types.String, default: "fail" },
                         },
                    ],
               },
          ],
          status: { type: mongoose.Schema.Types.String, default: "in_progress" },
     },
     {
          timestamps: true,
     },
);

DeliverOptionSchema.index({
     bookingId: 1,
     stockId: 1,
     dealerId: 1,
});

export const DeliveryOption = mongoose.model<IDeliveryOptionProps>("DeliveryOption", DeliverOptionSchema);
