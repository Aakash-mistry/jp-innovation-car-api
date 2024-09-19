import mongoose from "mongoose";

export interface ILeadProps {
     name: string;
     address: string;
     city: string;
     state: string;
     zip: string;
     phone: string;
     email: string;
     transactionCount?: number;
     remark?: string;
     interestedVehicle: mongoose.Schema.Types.ObjectId[]; // Car ID
     budgetRange?: string;
     source: string;
     dealerId?: string;
     status: LeadStatus;
}

export type LeadStatus = "archived" | "draft" | "created";
