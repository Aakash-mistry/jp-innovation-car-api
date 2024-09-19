import mongoose from "mongoose";

export interface IGetPassProps {
     bookingId: mongoose.Schema.Types.ObjectId;
     customerMail: string;
     driverId: mongoose.Schema.Types.ObjectId | string;
     dealerId: mongoose.Schema.Types.ObjectId;
     otp: {
          customer: string;
          driver?: string;
     };
     status: GetPassStatus;
     sentOn: Date;
     otpType: GetPassOTPType;
     feedback?: [
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
}

type GetPassStatus =
     | "accepted"
     | "rejected"
     | "not_verified"
     | "muted"
     | "otp_generated"
     | "otp_sent"
     | "feedback_taken"
     | "verified";
type GetPassOTPType = "customer_only" | "customer_driver";
type statusType = "yes" | "no";
