import { Request, Response } from "express";
import { Ok, UnAuthorized, verifyToken } from "../utils";
import { Lead } from "../model";
import { ILeadProps, SERVER_MESSAGES } from "../interface";
import { ObjectId } from "mongodb";

class LeadControllers {
     private handleError(res: Response, err: unknown) {
          const message = (err as Error).message || (err as unknown as string);
          return UnAuthorized(res, message);
     }

     getMyLeads = async (req: Request, res: Response) => {
          try {
               const token: string = req.headers.authorization as string;
               const verify = verifyToken(token);
               const leads = await Lead.find({ dealerId: verify.id })
                    .populate({
                         path: "interestedVehicle",
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
                    })
                    .sort({ createdAt: -1 });
               return Ok(res, leads);
          } catch (err) {
               return this.handleError(res, err);
          }
     };
     createNewLeads = async (req: Request, res: Response) => {
          try {
               const {
                    address,
                    city,
                    email,
                    interestedVehicle,
                    name,
                    phone,
                    source,
                    state,
                    zip,
                    budgetRange,
                    remark,
               }: ILeadProps = req.body;
               const leadExist = await Lead.findOne({ phone, interestedVehicle, email });

               if (leadExist) {
                    return UnAuthorized(res, SERVER_MESSAGES.ALREADY_EXIST);
               }

               const token: string = req.headers.authorization as string;
               const verify = verifyToken(token);
               const newLead = await new Lead({
                    address,
                    city,
                    email,
                    interestedVehicle,
                    name,
                    phone,
                    source,
                    state,
                    zip,
                    budgetRange,
                    remark,
                    dealerId: new ObjectId(verify.id),
               }).save();

               return Ok(res, `lead has been created for ${newLead.name}`);
          } catch (err) {
               return this.handleError(res, err);
          }
     };

     updateLead = async (req: Request, res: Response) => {
          try {
               const updateLead = await Lead.findByIdAndUpdate({ _id: req.params.id }, { $set: { ...req.body } });
          } catch (err) {
               return this.handleError(res, err);
          }
     };

     deleteLead = async (req: Request, res: Response) => {
          try {
               const deleteLead = await Lead.findByIdAndDelete({ _id: req.params.id });
               return Ok(res, "lead has been removed");
          } catch (err) {
               return this.handleError(res, err);
          }
     };
}

export const LeadController = new LeadControllers();
