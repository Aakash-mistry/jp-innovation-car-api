import mongoose from "mongoose";

export interface IBranchProps {
     address: string;
     city: string;
     state: string;
     zip: string;
     phone: string;
     email: string;
     transactionCount: number;
     remark?: boolean;
     branchRole: string;
     dealerId: mongoose.Schema.Types.ObjectId;
     branchName: string;
     photo: string;
}
