import mongoose from "mongoose";

type statusType = "yes" | "no";

export interface IDeliveryOptionProps {
     bookingId: mongoose.Schema.Types.ObjectId;
     options: [
          {
               milage: string;
               status: statusType;
          },
          {
               engineNo: string;
               status: statusType;
          },
          {
               chasis: string;
               status: statusType;
          },
          {
               doors: string;
               status: statusType;
          },
          {
               bonnet: string;
               status: statusType;
          },
     ];
     dealerId: mongoose.Schema.Types.ObjectId;
     stockId: mongoose.Schema.Types.ObjectId;
}
