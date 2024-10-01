import mongoose from "mongoose";

export interface IBookingProps {
     vehicle: {
          model: mongoose.Schema.Types.ObjectId;
          variant: mongoose.Schema.Types.ObjectId;
          color: mongoose.Schema.Types.ObjectId;
          fuelType: mongoose.Schema.Types.ObjectId;
          stockId: mongoose.Schema.Types.ObjectId;
          warrantyCost: number;
     };
     exchange?: {
          exchangedVehicleChaseNo: string;
          exchangedVehicleColor: string;
          exchangedVehicleEngineNo: string;
          exchangedVehicleFuelType: string;
          exchangedVehicleManufacturing: string;
          exchangedVehicleMilage: string;
          exchangedVehicleName: string;
          exchangePrice: number;
     };
     bank?: {
          loanAmount: number; // Changed to number
          bankName?: string;
          tenuredMonths: number; // Changed to number
          installmentAmount: number; // Changed to number
          downPayment: number;
          processingFees: number;
          loanPercentage: number;
     };
     customer: {
          customerName: string;
          address: string;
          email: string;
          mobile: string;
     };
     signature: {
          customerSignature: string;
          dealerSignature: string;
     };
     billing: {
          accessoriesCost: number;
          advanceAmount: number;
          balanceAmount: number;
          dealDate: Date;
          gst: number;
          lessExchange: number;
          rtoCharge: number;
          vehiclePrice: number;
     };
     dealerId: mongoose.Schema.Types.ObjectId;
     ledger: ILedgerProps[];
     status: BookingStatusType;
}

export type BookingStatusType =
     | "in_stock"
     | "out_of_stock"
     | "ready_for_deliver"
     | "delivered"
     | "just_booked"
     | "in_progress"
     | "dispatched_delivery";

export type particularOptions = "cash" | "cheque" | "loan";

export const ParticularOptions: particularOptions[] = ["cash", "cheque", "loan"];

export interface ILedgerProps {
     date: Date;
     particular: particularOptions;
     vchNo?: number;
     credit: number;
     chequeDetails?: {
          chequeNo: string;
          bank: {
               name: string;
               branch: string;
               accountNo: string;
               loanTenure: number;
               loanInterest: number;
          };
     };
}
