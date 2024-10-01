import { Request, Response } from "express";
import { Ok, UnAuthorized, verifyToken } from "../utils";
import { TestDrive } from "../model";
import { ITestDriveProps, SERVER_MESSAGES } from "../interface";
import { ObjectId } from "mongodb";

class TestDriveControllers {
     private handleError(res: Response, err: unknown) {
          const message = (err as Error).message || (err as unknown as string);
          console.log(err);
          return UnAuthorized(res, message);
     }

     getMyTestDrive = async (req: Request, res: Response) => {
          try {
               const token = req.headers.authorization;
               const verify = verifyToken(token as string);
               const drives = await TestDrive.find({ dealerId: verify.id })
                    .populate("dealerId")
                    .populate({
                         path: "stockId",
                         model: "Stock",
                         populate: [
                              {
                                   path: "model",
                              },
                              {
                                   path: "brand",
                              },
                              {
                                   path: "variant",
                              },
                              {
                                   path: "catalogue",
                              },
                         ],
                    })
                    .sort({ createdAt: -1 });
               return Ok(res, drives);
          } catch (err) {
               return this.handleError(res, err);
          }
     };

     createTestDrive = async (req: Request, res: Response) => {
          try {
               const { budgetRange, city, email, mobile, name, stockId, message, date, dealerId }: ITestDriveProps =
                    req.body;
               const driveExist = await TestDrive.findOne({ email, mobile });
               if (driveExist) {
                    return UnAuthorized(res, SERVER_MESSAGES.DATA_EXIST);
               }

               const newDrive = await new TestDrive({
                    budgetRange,
                    city,
                    dealerId,
                    email,
                    date,
                    mobile,
                    name,
                    stockId,
                    message,
               }).save();

               return Ok(
                    res,
                    `${newDrive.name} your drive is scheduled!  Our Sales Advisor will contact you promptly to confirm your appointment. `,
               );
          } catch (err) {
               console.log(err);
               return this.handleError(res, err);
          }
     };

     updateTestDrive = async (req: Request, res: Response) => {
          try {
               const drive = await TestDrive.findByIdAndUpdate({ _id: req.params.id }, { $set: { ...req.body } });
               return Ok(res, "drive updated");
          } catch (err) {
               return this.handleError(res, err);
          }
     };
     deleteTestDrive = async (req: Request, res: Response) => {
          try {
               await TestDrive.findByIdAndDelete({ _id: req.params.id });
               return Ok(res, "drive deleted");
          } catch (err) {
               return this.handleError(res, err);
          }
     };
}

export const TestDriveController = new TestDriveControllers();
