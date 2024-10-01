import { Request, Response } from "express";
import { Designation } from "../model";
import { Ok, UnAuthorized } from "../utils";
import { IDesignation } from "../interface";

class DesignationControllers {
     private handleError(res: Response, err: unknown) {
          const message = (err as Error).message || (err as unknown as string);
          return UnAuthorized(res, message);
     }

     public GetDesignation = async (req: Request, res: Response) => {
          try {
               const designation = await Designation.find().populate("department");
               return Ok(res, designation);
          } catch (err) {
               return this.handleError(res, err);
          }
     };

     public CreateDesignation = async (req: Request, res: Response) => {
          try {
               const { department, desc, label, dealerId }: IDesignation = req.body;
               const designation = await new Designation({
                    label,
                    department,
                    desc,
                    dealerId,
               }).save();
               return Ok(res, `${designation.label} is created`);
          } catch (err) {
               return this.handleError(res, err);
          }
     };

     public UpdateDesignation = async (req: Request, res: Response) => {
          try {
               const { department, desc, label }: IDesignation = req.body;
               const designation = await Designation.findByIdAndUpdate(
                    { _id: req.params.id },
                    { $set: { department, desc, label } },
               );
               return Ok(res, `${designation?.label} is updated`);
          } catch (err) {
               return this.handleError(res, err);
          }
     };
     public DeleteDesignation = async (req: Request, res: Response) => {
          try {
               const designation = await Designation.findByIdAndDelete({ _id: req.params.id });
               return Ok(res, `${designation?.label} is deleted`);
          } catch (err) {
               return this.handleError(res, err);
          }
     };
}

export const DesignationController = new DesignationControllers();
