import { Request, Response } from "express";
import { Ok, UnAuthorized, verifyToken } from "../utils";
import { BranchEmployee } from "../model";
import { IBranchEmployeeProps, SERVER_MESSAGES } from "../interface";
import { ObjectId } from "mongodb";

class EmployeeControllers {
     GetAllEmployees = async (req: Request, res: Response) => {
          try {
               const token = req.headers.authorization;
               const verify = verifyToken(token as string);
               const employees = await BranchEmployee.find({ dealerId: verify.id }).populate("role");
               return Ok(res, employees);
          } catch (err) {
               return UnAuthorized(res, err as unknown as string);
          }
     };
     GetAllMyEmployees = async (req: Request, res: Response) => {
          try {
               const token = req.headers.authorization;
               const verify = verifyToken(token as string);
               const branchId = req.params.branchId;
               const employees = await BranchEmployee.find({ dealerId: verify.id, branchId });
               return Ok(res, employees);
          } catch (err) {
               return UnAuthorized(res, err as unknown as string);
          }
     };

     NewBranchEmployee = async (req: Request, res: Response) => {
          try {
               const { branchId, email, fullName, image, mobile, password, role }: IBranchEmployeeProps = req.body;
               const token = req.headers.authorization;
               const verify = verifyToken(token as string);
               const newEmployee = await new BranchEmployee({
                    branchId,
                    email,
                    fullName,
                    image,
                    mobile,
                    password,
                    role,
                    dealerId: verify.id,
               }).save();

               return Ok(res, `${newEmployee.fullName} is registered`);
          } catch (err) {
               return UnAuthorized(res, err as unknown as string);
          }
     };

     UpdateBranchEmployee = async (req: Request, res: Response) => {
          try {
               const updateBranchEmployee = await BranchEmployee.findById(
                    { _id: req.params.id },
                    { $set: { ...req.body } },
               );
               return Ok(res, "branch employee details updated");
          } catch (err) {
               return UnAuthorized(res, err as unknown as string);
          }
     };

     DeleteBranchEmployee = async (req: Request, res: Response) => {
          try {
               const token = req.headers.authorization;
               const verify = verifyToken(token as string);
               const branchEmployee = await BranchEmployee.findById({ _id: new ObjectId(req.params.id) });

               if (verify.id !== branchEmployee?.dealerId) {
                    return UnAuthorized(res, SERVER_MESSAGES.ACCESS_DENIED);
               }

               await BranchEmployee.findByIdAndDelete({ _id: new ObjectId(branchEmployee?._id) });
               return Ok(res, "branch employee deleted");
          } catch (err) {
               return UnAuthorized(res, err as unknown as string);
          }
     };
}

export const EmployeeController = new EmployeeControllers();
