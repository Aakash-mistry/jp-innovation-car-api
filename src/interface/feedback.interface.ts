import mongoose from "mongoose";

export interface IFeedbackProps {
     name: string;
     email: string;
     phone: string;
     address: string;
     message: string;
     ratings: {
          label: string;
          rate: number;
     }[];
     dealerId: mongoose.Schema.Types.ObjectId;
}
