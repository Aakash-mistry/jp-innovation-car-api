import { Request, Response } from "express";
import { Ok, UnAuthorized, verifyToken } from "../utils";
import { Enquiry, FollowUp } from "../model";
import { IEnquiryProps, IFollowUpProps, SERVER_MESSAGES } from "../interface";

class FollowUpControllers {
     private handleError(res: Response, err: unknown) {
          console.log(err);
          const message = (err as Error).message || (err as unknown as string);
          return UnAuthorized(res, message);
     }

     GetMyFollowUp = async (req: Request, res: Response) => {
          try {
               const token: string = req.headers.authorization as string;
               const verify = verifyToken(token);
               const followUps = await FollowUp.find({ dealerId: verify.id }).populate("enquiryId");
               return Ok(res, followUps);
          } catch (err) {
               return this.handleError(res, err);
          }
     };

     CreateFollowUp = async (req: Request, res: Response) => {
          try {
               const {
                    dealerId,
                    status,
                    interested,
                    notInterestedReasonOptions,
                    scheduledFollowUp,
                    enquiryId,
                    stockId,
                    type,
               }: IFollowUpProps = req.body;

               const newFollowUp = await new FollowUp({
                    dealerId,
                    status,
                    interested,
                    notInterestedReasonOptions,
                    scheduledFollowUp,
                    enquiryId,
                    stockId,
                    type,
               }).save();

               const newFollow = await FollowUp.findById({ _id: newFollowUp._id }).populate("enquiryId");

               return Ok(res, {
                    message: `${(newFollow?.enquiryId as unknown as IEnquiryProps)?.name} is successfully saved`,
                    followUpId: newFollow?._id,
               });
          } catch (err) {
               return this.handleError(res, err);
          }
     };

     UpdateFollowUp = async (req: Request, res: Response) => {
          try {
               const updatedFollowUp = await FollowUp.findByIdAndUpdate(
                    { _id: req.params.id },
                    { $set: { ...req.body } },
               );
               return Ok(res, "follow up updated");
          } catch (err) {
               return this.handleError(res, err);
          }
     };

     DeleteFollowUp = async (req: Request, res: Response) => {
          try {
               await FollowUp.findByIdAndDelete({ _id: req.params.id });
               return Ok(res, "follow up deleted");
          } catch (err) {
               return this.handleError(res, err);
          }
     };
}

export const FollowUpController = new FollowUpControllers();
