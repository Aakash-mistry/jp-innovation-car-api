import { Request, Response } from "express";
import { Ok, UnAuthorized, verifyToken } from "../utils";
import { Packages } from "../model";
import { IPackagesProps, SERVER_MESSAGES } from "../interface";

class PackagesControllers {
     private handleError(res: Response, err: unknown) {
          const message = (err as Error).message || (err as unknown as string);
          return UnAuthorized(res, message);
     }

     getAllPackages = async (req: Request, res: Response) => {
          try {
               const packages = await Packages.find();
               return Ok(res, packages);
          } catch (err) {
               return this.handleError(res, err);
          }
     };

     createPackages = async (req: Request, res: Response) => {
          try {
               const {
                    carListedOnWebsite,
                    duration,
                    features,
                    packageName,
                    stocksLength,
                    hotPackage,
                    remark,
                    price,
                    status,
               }: IPackagesProps = req.body;

               const token = req.headers.authorization;
               const verify = verifyToken(token as string);

               const packageExist = await Packages.findOne({ packageName, price });

               if (packageExist) {
                    return UnAuthorized(res, SERVER_MESSAGES.DATA_EXIST);
               }

               const newPackage = await new Packages({
                    carListedOnWebsite,
                    duration,
                    features,
                    packageName,
                    stocksLength,
                    hotPackage,
                    remark,
                    price,
                    status,
                    adminId: verify.id,
               }).save();

               return Ok(res, `${newPackage.packageName} is uploaded`);
          } catch (err) {
               return this.handleError(res, err);
          }
     };
     updatePackages = async (req: Request, res: Response) => {
          try {
               const packages = await Packages.findByIdAndUpdate({ _id: req.params.id }, { $set: { ...req.body } });
               return Ok(res, "packages updated");
          } catch (err) {
               return this.handleError(res, err);
          }
     };
     deletePackages = async (req: Request, res: Response) => {
          try {
               await Packages.findByIdAndDelete({ _id: req.params.id });
               return Ok(res, "packages removed");
          } catch (err) {
               return this.handleError(res, err);
          }
     };
}

export const PackagesController = new PackagesControllers();
