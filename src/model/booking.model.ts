import mongoose from "mongoose";
import { IBookingProps } from "../interface";

const BookingSchema = new mongoose.Schema<IBookingProps>(
     {
          vehicle: {
               selectedColor: { type: mongoose.Schema.Types.ObjectId, ref: "Color" },
               chaseNo: { type: mongoose.Schema.Types.String },
               engineNo: { type: mongoose.Schema.Types.String },
               manufacturingYear: { type: mongoose.Schema.Types.String },
               milage: { type: mongoose.Schema.Types.String },
               vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Stock" },
          },
          exchange: {
               exchangedVehicleChaseNo: { type: mongoose.Schema.Types.String },
               exchangedVehicleColor: { type: mongoose.Schema.Types.String },
               exchangedVehicleEngineNo: { type: mongoose.Schema.Types.String },
               exchangedVehicleFuelType: { type: mongoose.Schema.Types.String },
               exchangedVehicleManufacturing: { type: mongoose.Schema.Types.String },
               exchangedVehicleMilage: { type: mongoose.Schema.Types.String },
               exchangedVehicleName: { type: mongoose.Schema.Types.String },
          },
          bank: {
               loanAmount: { type: mongoose.Schema.Types.String },
               bankName: { type: mongoose.Schema.Types.String },
               tenuredMonths: { type: mongoose.Schema.Types.String },
               installmentAmount: { type: mongoose.Schema.Types.String },
          },
          customer: {
               customerName: { type: String, required: true },
               address: { type: String, required: true },
               email: { type: String, required: true },
               mobile: { type: String, required: true },
          },
          signature: {
               customerSignature: { type: String, required: true },
               dealerSignature: { type: String, required: true },
          },
          billing: {
               accessoriesCost: { type: Number },
               advanceAmount: { type: Number },
               balanceAmount: { type: Number },
               dealDate: { type: Date },
               gst: { type: String },
               lessExchange: { type: Number },
               rtoCharge: { type: Number },
               vehiclePrice: { type: Number },
               loanPercentage: { type: Number },
          },
          dealerId: { type: mongoose.Schema.Types.ObjectId, ref: "Dealer", required: true },
          ledger: [
               {
                    date: { type: mongoose.Schema.Types.Date },
                    particular: { type: mongoose.Schema.Types.String, default: "cash" },
                    vchNo: { type: mongoose.Schema.Types.Number }, // random number  6 digits
                    credit: { type: mongoose.Schema.Types.Number },
                    chequeDetails: {
                         chequeNo: { type: mongoose.Schema.Types.String },
                         bank: {
                              name: { type: mongoose.Schema.Types.String },
                              branch: { type: mongoose.Schema.Types.String },
                              accountNo: { type: mongoose.Schema.Types.String },
                              loanTenure: { type: mongoose.Schema.Types.Number },
                              loanInterest: { type: mongoose.Schema.Types.Number },
                         },
                    },
               },
          ],
          status: { type: mongoose.Schema.Types.String, default: "in_stock" },
     },
     {
          timestamps: true,
     },
);

// Indexing dealerId for efficient lookups
BookingSchema.index({ dealerId: 1 });

// Compound index for querying by dealerId and dealDate
BookingSchema.index({ dealerId: 1, "billing.dealDate": 1 });

// Indexing email for efficient lookups on customer email
BookingSchema.index({ "customer.email": 1 });

// Indexing vehicleId for efficient lookups on the vehicle ID
BookingSchema.index({ "vehicle.vehicleId": 1 });

export const Booking = mongoose.model("Booking", BookingSchema);
