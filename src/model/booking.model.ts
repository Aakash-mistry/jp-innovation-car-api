import mongoose, { Schema, Document } from "mongoose";
import { IBookingProps } from "../interface";

const BookingSchema = new mongoose.Schema<IBookingProps>(
     {
          bank: {
               loanAmount: { type: Schema.Types.Number },
               bankName: { type: Schema.Types.String },
               tenuredMonths: { type: Schema.Types.Number },
               installmentAmount: { type: Schema.Types.Number },
               downPayment: { type: Schema.Types.Number },
               processingFees: { type: Schema.Types.Number },
               loanPercentage: { type: Schema.Types.Number },
          },
          billing: {
               accessoriesCost: { type: Schema.Types.Number },
               advanceAmount: { type: Schema.Types.Number },
               balanceAmount: { type: Schema.Types.Number },
               dealDate: { type: Schema.Types.Date, index: true },
               gst: { type: Schema.Types.Number },
               lessExchange: { type: Schema.Types.Number },
               rtoCharge: { type: Schema.Types.Number },
               vehiclePrice: { type: Schema.Types.Number },
          },
          customer: {
               customerName: { type: Schema.Types.String, required: true },
               address: { type: Schema.Types.String, required: true },
               email: { type: Schema.Types.String, required: true, index: true },
               mobile: { type: Schema.Types.String, required: true },
          },
          dealerId: { type: Schema.Types.ObjectId, ref: "Dealer", required: true, index: true },
          exchange: {
               exchangedVehicleChaseNo: { type: Schema.Types.String },
               exchangedVehicleColor: { type: Schema.Types.String },
               exchangedVehicleEngineNo: { type: Schema.Types.String },
               exchangedVehicleFuelType: { type: Schema.Types.String },
               exchangedVehicleManufacturing: { type: Schema.Types.String },
               exchangedVehicleMilage: { type: Schema.Types.String },
               exchangedVehicleName: { type: Schema.Types.String },
               exchangePrice: { type: Schema.Types.Number },
          },
          ledger: [
               {
                    date: { type: Schema.Types.Date },
                    particular: { type: Schema.Types.String },
                    vchNo: { type: Schema.Types.Number },
                    credit: { type: Schema.Types.Number },
                    chequeDetails: {
                         chequeNo: { type: Schema.Types.String },
                         bank: {
                              name: { type: Schema.Types.String },
                              branch: { type: Schema.Types.String },
                              accountNo: { type: Schema.Types.String },
                              loanTenure: { type: Schema.Types.Number },
                              loanInterest: { type: Schema.Types.Number },
                         },
                    },
               },
          ],
          signature: {
               customerSignature: { type: Schema.Types.String, required: true },
               dealerSignature: { type: Schema.Types.String, required: true },
          },
          status: { type: Schema.Types.String, default: "just_booked", required: true, index: true },
          vehicle: {
               model: { type: Schema.Types.ObjectId, required: true, ref: "Model", index: true },
               variant: { type: Schema.Types.ObjectId, required: true, ref: "Variant", index: true },
               color: { type: Schema.Types.ObjectId, required: true, ref: "Color", index: true },
               stockId: { type: Schema.Types.ObjectId, required: true, ref: "Stock", index: true },
               warrantyCost: { type: Schema.Types.Number },
          },
     },
     {
          timestamps: true, // Automatically adds createdAt and updatedAt
     },
);

BookingSchema.index({ dealerId: 1, "billing.dealDate": -1 }); // Compound index for sorting by dealerId and dealDate
BookingSchema.index({ "customer.email": 1 }); // Single field index on customer email
BookingSchema.index({ "vehicle.stockId": 1 });

export const Booking = mongoose.model<IBookingProps>("Booking", BookingSchema);
