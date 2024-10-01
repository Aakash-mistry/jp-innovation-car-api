import mongoose from "mongoose";

export interface ICustomerProps {
     dealerId: mongoose.Schema.Types.ObjectId;
     bookingId: mongoose.Schema.Types.ObjectId;
     stockId: mongoose.Schema.Types.ObjectId;
     feedbackId: mongoose.Schema.Types.ObjectId;
     deliveryId: mongoose.Schema.Types.ObjectId;
     status: "active" | "inactive";
}
