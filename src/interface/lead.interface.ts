import mongoose from "mongoose";

export interface ILeadProps {
     name: string;
     city: string;
     phone: string;
     email: string;
     remark?: string;
     interestedVehicle: mongoose.Schema.Types.ObjectId[]; // Car ID
     budgetRange?: string;
     source: string;
     dealerId?: string;
     status: LeadStatus;
}

export type LeadStatus = "archived" | "draft" | "created";
