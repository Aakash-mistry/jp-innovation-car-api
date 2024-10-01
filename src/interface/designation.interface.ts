import mongoose from "mongoose";

export interface IDesignation {
     label: string;
     desc: string;
     department: mongoose.Schema.Types.ObjectId;
     dealerId: mongoose.Schema.Types.ObjectId;
}
