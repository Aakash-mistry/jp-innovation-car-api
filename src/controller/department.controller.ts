import { Request, Response } from "express";
import { Department } from "../model";
import { Ok, UnAuthorized, verifyToken } from "../utils";
import { IDepartmentProps, SERVER_MESSAGES } from "../interface";
import mongoose from "mongoose";

class DepartmentControllers {
     private handleError(res: Response, err: unknown) {
          const message = (err as Error).message || (err as unknown as string);
          return UnAuthorized(res, message);
     }

     public GetDepartments = async (req: Request, res: Response) => {
          try {
               const token = req.headers.authorization;
               const verify = verifyToken(token as string);
               const departments = await Department.find({ dealerId: verify.id });
               return Ok(res, departments);
          } catch (err) {
               return this.handleError(res, err);
          }
     };
     public CreateDepartment = async (req: Request, res: Response) => {
          try {
               const { dealerId, label }: IDepartmentProps = req.body;
               const isExist = await Department.findOne({ label, dealerId });

               if (isExist) {
                    return UnAuthorized(res, SERVER_MESSAGES.DATA_EXIST);
               }
               const department = await new Department({
                    label,
                    dealerId,
               }).save();
               return Ok(res, `${department.label} is created`); // 201
          } catch (err) {
               return this.handleError(res, err);
          }
     };

     public UpdateDepartment = async (req: Request, res: Response) => {
          try {
               const department = await Department.findByIdAndUpdate(
                    { _id: new mongoose.Types.ObjectId(req.params.id) },
                    { $set: { ...req.body } },
                    { new: true },
               );
               return Ok(res, `${department?.label} is updated`);
          } catch (err) {
               return this.handleError(res, err);
          }
     };
     public DeleteDepartment = async (req: Request, res: Response) => {
          try {
               await Department.findByIdAndDelete({ _id: req.params.id });
               return Ok(res, "department deleted");
          } catch (err) {
               return this.handleError(res, err);
          }
     };

     public GetDepartmentById = async (req: Request, res: Response) => {
          try {
               const department = await Department.findById({ _id: req.params.id });
               return Ok(res, department);
          } catch (err) {
               return this.handleError(res, err);
          }
     };
}

export const DepartmentController = new DepartmentControllers();
