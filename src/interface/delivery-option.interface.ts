import mongoose from "mongoose";

type statusType = "yes" | "no";

export interface IDeliveryOptionProps {
     bookingId: mongoose.Schema.Types.ObjectId;
     options: ICheckListProps[];
     dealerId: mongoose.Schema.Types.ObjectId;
     stockId: mongoose.Schema.Types.ObjectId;
     status: "in_progress" | "completed" | "dispatched_delivery";
}

export interface ICheckListProps {
     title: string;
     option: {
          label: string;
          status: "pass" | "fail"; // Status can now be 'pass', 'fail', or null
     }[];
}
