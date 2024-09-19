import mongoose from "mongoose";

export type followUpStatusType = "wrong_number" | "not_interested" | "interested" | "follow_up" | "none";
export type notInterestedReasonType =
     | "already_brought"
     | "leave_plan"
     | "not_enough_budget"
     | "plan_postponed"
     | "none";
export type interestedType = "in_this_week" | "in_one_month" | "after_one_month" | "now";

export interface IFollowUpProps {
     status: followUpStatusType;
     notInterestedReasonOptions?: notInterestedReasonType;
     interested?: {
          status: interestedType;
          quotedPrice: number;
     };
     scheduledFollowUp?: Date; //
     stockId: mongoose.Schema.Types.ObjectId;
     dealerId: mongoose.Schema.Types.ObjectId;
     enquiryId?: mongoose.Schema.Types.ObjectId;
     type: "stock" | "insurance";
}
