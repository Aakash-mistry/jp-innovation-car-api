import mongoose from "mongoose";
import { ITestDriveProps } from "../interface";

const TestDriveSchema = new mongoose.Schema<ITestDriveProps>(
     {
          name: { type: mongoose.Schema.Types.String, required: true },
          city: { type: mongoose.Schema.Types.String, required: true },
          email: { type: mongoose.Schema.Types.String, required: true },
          mobile: { type: mongoose.Schema.Types.String, required: true },
          budgetRange: { type: mongoose.Schema.Types.String, required: true },
          dealerId: { type: mongoose.Schema.Types.ObjectId, ref: "Dealer", required: true },
          stockId: { type: mongoose.Schema.Types.ObjectId, ref: "Stock", required: true },
          status: { type: mongoose.Schema.Types.String },
          subStatus: {
               label: { type: mongoose.Schema.Types.String },
               reason: { type: mongoose.Schema.Types.String },
          },
          message: { type: mongoose.Schema.Types.String },
     },
     {
          timestamps: true,
     },
);
export const TestDrive = mongoose.model<ITestDriveProps>("TestDrive", TestDriveSchema);
