import mongoose from "mongoose";

export interface IDepartmentProps {
     label: string;
     dealerId: mongoose.Schema.Types.ObjectId;
}
