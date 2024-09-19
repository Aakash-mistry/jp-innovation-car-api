import mongoose from "mongoose";

export interface IBranchEmployeeProps {
     fullName: string;
     email: string;
     mobile: string;
     password: string;
     role: mongoose.Schema.Types.ObjectId;
     dealerId: mongoose.Schema.Types.ObjectId;
     branchId: mongoose.Schema.Types.ObjectId;
     image: string;
}
