import mongoose from "mongoose";

export interface IDeliveryProps {
     bookingId: mongoose.Schema.Types.ObjectId;
     stockId: mongoose.Schema.Types.ObjectId;
     dealerId: mongoose.Schema.Types.ObjectId;
     employeeId: mongoose.Schema.Types.ObjectId;
     optionId: mongoose.Schema.Types.ObjectId;
     deliveryType: "delivery" | "pickup";
     status: "dispatched" | "delivered" | "otp_sent";
     otp: {
          driver: string;
          customer: string;
     };
     verification?: {
          driver: boolean;
          customer: boolean;
     };
}
