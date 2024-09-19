import mongoose from "mongoose";

export interface IBookingProps {
     vehicle: {
          selectedColor?: string;
          chaseNo: string;
          engineNo: string;
          manufacturingYear: string;
          milage: string;
          vehicleId: string;
     };
     exchange?: {
          exchangedVehicleChaseNo: string;
          exchangedVehicleColor: string;
          exchangedVehicleEngineNo: string;
          exchangedVehicleFuelType: string;
          exchangedVehicleManufacturing: string;
          exchangedVehicleMilage: string;
          exchangedVehicleName: string;
     };
     bank?: {
          loanAmount: string;
          bankName?: string; // Assuming it's not optional since it's provided in the example
          tenuredMonths: string;
          installmentAmount: string;
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
          dealDate: Date; // Assuming the date is in ISO format; otherwise, use Date type
          gst: string;
          lessExchange: number;
          rtoCharge: number;
          vehiclePrice: number;
     };
     dealerId: { type: mongoose.Schema.Types.ObjectId };
     ledger: ILedgerProps[];
     status: BookingStatusType;
}

export type BookingStatusType = "in_stock" | "out_of_stock" | "ready_for_deliver" | "delivered";

export type particularOptions = "cash" | "cheque" | "loan";

export const ParticularOptions: particularOptions[] = ["cash", "cheque", "loan"];

export interface ILedgerProps {
     date: Date;
     particular: particularOptions; // cash, cheque, loan
     vchNo?: number; // random number  6 digits
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
