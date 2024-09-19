import mongoose from "mongoose";

export interface ITestDriveProps {
     name: string;
     city: string;
     mobile: string;
     email: string;
     budgetRange: string;
     dealerId: mongoose.Schema.Types.ObjectId;
     stockId: mongoose.Schema.Types.ObjectId;
     status?: string;
     subStatus?: {
          label: string;
          reason: string;
     };
     message: string;
}
