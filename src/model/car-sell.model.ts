import mongoose from "mongoose";
import { ISellCarProps } from "../interface";

const CarSellSchema = new mongoose.Schema<ISellCarProps>(
     {
          brandName: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
          carModel: { type: mongoose.Schema.Types.ObjectId, ref: "Model", required: true },
          carVariant: { type: mongoose.Schema.Types.ObjectId, ref: "Variant", required: true },
          dealerId: { type: mongoose.Schema.Types.ObjectId, ref: "Dealer", required: true },
          fuelType: { type: mongoose.Schema.Types.ObjectId, ref: "FuelType", required: true },
          color: { type: mongoose.Schema.Types.ObjectId, ref: "Color", required: true },
          city: { type: mongoose.Schema.Types.String, required: true },
          kmUsed: { type: mongoose.Schema.Types.String, required: true },
          modelYear: { type: mongoose.Schema.Types.String, required: true },
          regState: { type: mongoose.Schema.Types.String, required: true },
          rtoCode: { type: mongoose.Schema.Types.String, required: true },
          thumbnail: { type: mongoose.Schema.Types.String, required: true },
          //   transmission: { type: mongoose.Schema.Types.String, required: true },
          whenToSell: { type: mongoose.Schema.Types.String, required: true },
          carExterior: [{ type: mongoose.Schema.Types.String }],
          carInterior: [{ type: mongoose.Schema.Types.String }],
          customer: {
               firstName: { type: mongoose.Schema.Types.String, required: true },
               lastName: { type: mongoose.Schema.Types.String, required: true },
               email: { type: mongoose.Schema.Types.String, required: true },
               phone: { type: mongoose.Schema.Types.String, required: true },
               message: { type: mongoose.Schema.Types.String },
          },
          condition: {
               exterior: { type: mongoose.Schema.Types.String },
               interior: { type: mongoose.Schema.Types.String },
               accident: { type: mongoose.Schema.Types.Boolean },
          },
     },

     {
          timestamps: true,
     },
);

export const CarSell = mongoose.model<ISellCarProps>("CarSell", CarSellSchema);
