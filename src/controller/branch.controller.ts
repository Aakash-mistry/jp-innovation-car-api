import { Request, Response } from "express";
import { NotFound, Ok, UnAuthorized, verifyToken } from "../utils";
import { Branch } from "../model";
import { IBranchProps, SERVER_MESSAGES } from "../interface";
import { ObjectId } from "mongodb";

class BranchControllers {
     GetMyBranches = async (req: Request, res: Response) => {
          try {
               const token = req.headers.authorization;
               const verify = verifyToken(token as string);
               const branches = await Branch.find({ dealerId: verify.id });
               return Ok(res, branches);
          } catch (err) {
               return UnAuthorized(res, err as unknown as string);
          }
     };

     GetBranchById = async (req: Request, res: Response) => {
          try {
               const id = req.params.id;
               const branch = await Branch.findById({ _id: id });
               return Ok(res, branch);
          } catch (err) {
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
               const branch = await Branch.findOne({ _id: new ObjectId(`${req.params.id}`) });
               if (!branch) {
                    return NotFound(res, "Branch not found");
               }

               const token = req.headers.authorization;
               const verify = verifyToken(token as string);
               const id = new ObjectId(`${verify.id}`); // Assuming verify.id is an ObjectId or convertible to ObjectId

               // Make sure both are ObjectId instances before comparing
               if (!branch.dealerId || !(branch.dealerId as any)._id.equals(id)) {
                    return UnAuthorized(res, SERVER_MESSAGES.ACCESS_DENIED);
               }

               await Branch.findByIdAndUpdate(req.params.id, { $set: { ...req.body } });
               return Ok(res, "Branch is updated");
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
