import mongoose from "mongoose";

export interface IEnquiryProps {
     name: string;
     email: string;
     contact: string;
     city: string;
     dealerId: mongoose.Schema.Types.ObjectId;
     stockId: mongoose.Schema.Types.ObjectId;
     status: EnquiryStatus;
     message: string;
}

export type EnquiryStatus = "archived" | "draft" | "created";
