import { Request, Response } from "express";
import { Ok, UnAuthorized, verifyToken } from "../utils";
import { Enquiry } from "../model";
import { IEnquiryProps, SERVER_MESSAGES } from "../interface";
import { ObjectId } from "mongodb";

class EnquiryControllers {
     private handleError(res: Response, err: unknown) {
          const message = (err as Error).message || (err as unknown as string);
          return UnAuthorized(res, message);
     }

     getMyEnquiry = async (req: Request, res: Response) => {
          try {
               const token: string = req.headers.authorization as string;
               const verify = verifyToken(token);
               const enquiry = await Enquiry.find({ dealerId: verify.id })
                    .sort({ createdAt: -1 })
                    .populate({
                         path: "stockId",
                         select: "-dealerId",
                         model: "Stock",
                         populate: [
                              {
                                   path: "brandId",
                              },
                              {
                                   path: "variantId",
                              },
                              {
                                   path: "engineNo",
                              },
                              {
                                   path: "fuelTypeId",
                              },
                              {
                                   path: "cardId",
                                   populate: "carModel",
                              },
                         ],
                    });
               return Ok(res, enquiry);
          } catch (err) {
               return this.handleError(res, err);
          }
     };
     createEnquiry = async (req: Request, res: Response) => {
          try {
               const { city, contact, email, name, stockId, message }: IEnquiryProps = req.body;
               const existedEnquiry = await Enquiry.findOne({ email, name, stockId });
               if (existedEnquiry) {
                    return UnAuthorized(res, SERVER_MESSAGES.ALREADY_EXIST);
               }

               const newEnquiry = await new Enquiry({
                    city,
                    contact,
                    dealerId: new ObjectId("66cdadcda4e5ac2deea39a64"),
                    email,
                    name,
                    stockId,
                    status: "created",
                    message,
               }).save();
               return Ok(res, `enquiry created for ${newEnquiry.name}`);
          } catch (err) {
               return this.handleError(res, err);
          }
     };
     updateEnquiry = async (req: Request, res: Response) => {
          try {
               const token: string = req.headers.authorization as string;
               const verify = verifyToken(token);

               const enquiry = await Enquiry.findById({ _id: req.params.id, dealerId: verify.id });
               if (!enquiry) {
                    return UnAuthorized(res, SERVER_MESSAGES.ACCESS_DENIED);
               }

               const updateEnquiry = await Enquiry.findByIdAndUpdate({ _id: enquiry?._id }, { $set: { ...req.body } });
               return Ok(res, "update enquiry");
          } catch (err) {
               return this.handleError(res, err);
          }
     };
     deleteEnquiry = async (req: Request, res: Response) => {
          try {
               const token: string = req.headers.authorization as string;
               const verify = verifyToken(token);
               const enquiry = await Enquiry.findById({ _id: req.params.id, dealerId: verify.id });
               if (!enquiry) {
                    return UnAuthorized(res, SERVER_MESSAGES.ACCESS_DENIED);
               }

               const deletedEnquiry = await Enquiry.findByIdAndDelete({ _id: enquiry._id });

               return Ok(res, "enquiry deleted");
          } catch (err) {
               return this.handleError(res, err);
          }
     };
}

export const EnquiryController = new EnquiryControllers();
