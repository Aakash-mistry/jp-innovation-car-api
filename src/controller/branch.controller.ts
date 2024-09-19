import { Request, Response } from "express";
import { Ok, UnAuthorized, verifyToken } from "../utils";
import { Branch, Role, User } from "../model";
import { IBranchProps, SERVER_MESSAGES } from "../interface";
import { ObjectId } from "mongodb";

class BranchControllers {
     GetMyRoles = async (req: Request, res: Response) => {
          try {
               const token = req.headers.authorization;
               const verify = verifyToken(token as string);
               const role = await Role.find({ dealerId: verify.id });
               return Ok(res, role);
          } catch (err) {
               return UnAuthorized(res, err as unknown as string);
          }
     };

     CreateRole = async (req: Request, res: Response) => {
          try {
               const { label } = req.body;
               const token = req.headers.authorization;
               const verify = verifyToken(token as string);
               const role = await Role.findOne({ label: label });
               if (role) {
                    return UnAuthorized(res, SERVER_MESSAGES.DATA_EXIST);
               }
               const newRole = await new Role({ dealerId: verify.id, label: label }).save();
               return Ok(res, `${newRole.label} is created`);
          } catch (err) {
               return UnAuthorized(res, err as unknown as string);
          }
     };

     UpdateRole = async (req: Request, res: Response) => {
          try {
               const { label } = req.body;
               const token = req.headers.authorization;
               const verify = verifyToken(token as string);
               const role = await Role.findOne({ label: label });
               if (role?.dealerId !== verify.id) {
                    return UnAuthorized(res, SERVER_MESSAGES.ACCESS_DENIED);
               }
               const newRole = await Role.findByIdAndUpdate(
                    { _id: role?._id },
                    { $set: { dealerId: verify.id, label: label } },
               );
               return Ok(res, `role is updated`);
          } catch (err) {
               return UnAuthorized(res, err as unknown as string);
          }
     };

     DeleteRole = async (req: Request, res: Response) => {
          try {
               const { id } = req.params;
               const token = req.headers.authorization;
               const verify = verifyToken(token as string);

               const role = await Role.findOne({ _id: new ObjectId(id) });
               if (new ObjectId(role?.dealerId as unknown as string).toString() !== verify.id) {
                    return UnAuthorized(res, SERVER_MESSAGES.ACCESS_DENIED);
               }
               const DeleteRole = await Role.findByIdAndDelete({ _id: role?._id });
               return Ok(res, "role is deleted");
          } catch (err) {
               console.log(err);
               return UnAuthorized(res, err as unknown as string);
          }
     };

     GetMyBranches = async (req: Request, res: Response) => {
          try {
               const token = req.headers.authorization;
               const verify = verifyToken(token as string);
               const branches = await Branch.find({ dealerId: verify.id });
               return Ok(res, branches);
          } catch (err) {
               console.log(err);
               return UnAuthorized(res, err as unknown as string);
          }
     };
     CreateNewBranch = async (req: Request, res: Response) => {
          try {
               const {
                    address,
                    branchRole,
                    city,
                    dealerId,
                    email,
                    phone,
                    state,
                    transactionCount,
                    zip,
                    branchName,
                    photo,
               }: IBranchProps = req.body;

               const newBranch = await new Branch({
                    address,
                    branchRole,
                    city,
                    dealerId,
                    email,
                    phone,
                    state,
                    transactionCount,
                    zip,
                    branchName,
                    photo,
               }).save();
               return Ok(res, `${newBranch.branchName} is uploaded`);
          } catch (err) {
               return UnAuthorized(res, err as unknown as string);
          }
     };

     UpdateBranch = async (req: Request, res: Response) => {
          try {
               const { label } = req.body;
               const token = req.headers.authorization;
               const verify = verifyToken(token as string);
               const branch = await Branch.findOne({ label: label });
               if (branch?.dealerId !== verify.id) {
                    return UnAuthorized(res, SERVER_MESSAGES.ACCESS_DENIED);
               }
               await Branch.findByIdAndUpdate({ _id: req.params.id }, { $set: { ...req.body } });
               return Ok(res, "branch is updated");
          } catch (err) {
               return UnAuthorized(res, err as unknown as string);
          }
     };
     DeleteBranch = async (req: Request, res: Response) => {
          try {
               const { label } = req.body;
               const token = req.headers.authorization;
               const verify = verifyToken(token as string);
               const branch = await Branch.findOne({ label: label });
               if (branch?.dealerId !== verify.id) {
                    return UnAuthorized(res, SERVER_MESSAGES.ACCESS_DENIED);
               }
               await Branch.findByIdAndDelete({ _id: req.params.id });
               return Ok(res, "branch is deleted");
               return;
          } catch (err) {
               return UnAuthorized(res, err as unknown as string);
          }
     };
}

export const BranchController = new BranchControllers();
