import { Request, Response } from "express";
import { Ok, UnAuthorized, verifyToken } from "../utils";
import { Feedback } from "../model";
import { IFeedbackProps, SERVER_MESSAGES } from "../interface";
import { Server } from "http";

class FeedbackControllers {
     private handleError(res: Response, err: unknown) {
          const message = (err as Error).message || (err as unknown as string);
          return UnAuthorized(res, message);
     }

     GetMyFeedbacks = async (req: Request, res: Response) => {
          try {
               const token: string = req.headers.authorization as string;
               const verify = verifyToken(token);
               const feedbacks = await Feedback.find({ dealerId: verify.id });
               return Ok(res, feedbacks);
          } catch (err) {
               return this.handleError(res, err);
          }
     };

     CreateFeedback = async (req: Request, res: Response) => {
          try {
               const { address, dealerId, email, message, name, phone, ratings }: IFeedbackProps = req.body;
               const isExist = await Feedback.findOne({ email });
               if (isExist) {
                    return UnAuthorized(res, SERVER_MESSAGES.DATA_EXIST);
               }

               const newFeedback = await new Feedback({
                    address,
                    dealerId,
                    email,
                    message,
                    name,
                    phone,
                    ratings,
               }).save();

               return Ok(res, `${newFeedback.name} is successfully saved`);
          } catch (err) {
               return this.handleError(res, err);
          }
     };

     DeleteFeedback = async (req: Request, res: Response) => {
          try {
               const token: string = req.headers.authorization as string;
               const verify = verifyToken(token);

               const feedbackId = req.params.id;
               const feedback = await Feedback.findById(feedbackId);
               if (!feedback) {
                    return UnAuthorized(res, SERVER_MESSAGES.DATA_NOT_EXIST);
               }
               await feedback.deleteOne();
               return Ok(res, `${feedback.name} is successfully deleted`);
          } catch (err) {
               return this.handleError(res, err);
          }
     };
}

export const FeedbackController = new FeedbackControllers();
