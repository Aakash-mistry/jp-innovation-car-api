import { Request, Response } from "express";
import { generateToken, hashPassword, matchPassword, Ok, UnAuthorized, verifyToken } from "../utils";
import { Dealer, Packages } from "../model";
import { DurationType, IDealerProps, SERVER_MESSAGES } from "../interface";
import { ObjectId } from "mongodb";
import moment from "moment";

class DealerControllers {
     private handleDuration(duration: DurationType) {
          switch (duration) {
               case "1_month":
                    // Add specific logic for 1 month
                    moment().add(30, "days");
                    break;
               case "3_months":
                    // Add specific logic for 3 months
                    moment().add(90, "days");
                    break;
               case "6_months":
                    // Add specific logic for 6 months
                    moment().add(180, "days");
                    break;
               case "12_months":
                    // Add specific logic for 12 months
                    moment().add(365, "days");
                    break;
               default:
                    null;
                    break;
          }
     }
     GetAllDealers = async (req: Request, res: Response) => {
          try {
               const dealers = await Dealer.find().populate("packageId").sort({ createdAt: -1 });
               return Ok(res, dealers);
          } catch (err) {
               return UnAuthorized(res, err as unknown as string);
          }
     };

     SignUpDealer = async (req: Request, res: Response) => {
          try {
               const { email, name, password, photo, roleId, packageId }: IDealerProps = req.body;

               const dealerExist = await Dealer.findOne({ email });

               if (dealerExist) {
                    return UnAuthorized(res, SERVER_MESSAGES.ACCESS_DENIED);
               }

               const packages = await Packages.findById({
                    _id: new ObjectId(packageId as string),
               });

               const packagesDuration = this.handleDuration(packages?.duration as DurationType);

               const newUser = await new Dealer({
                    email,
                    name,
                    photo,
                    password: await hashPassword(password),
                    roleId,
                    packageEnd: packagesDuration,
                    packageId: packages,
               }).save();

               return Ok(res, `${newUser.name} is registered`);
          } catch (err) {
               return UnAuthorized(res, err as unknown as string);
          }
     };

     SignInDealer = async (req: Request, res: Response) => {
          try {
               const { email, password } = req.body;
               const dealerExist = await Dealer.findOne({ email }).populate("packageId");
               if (!dealerExist) {
                    return UnAuthorized(res, SERVER_MESSAGES.ACCOUNT_NOT_FOUND);
               }
               if (dealerExist.blocked) {
                    return UnAuthorized(res, SERVER_MESSAGES.ACCESS_DENIED);
               }
               if (!(await matchPassword(dealerExist.password, password))) {
                    return UnAuthorized(res, SERVER_MESSAGES.INVALID_PASSWORD);
               }
               const token = generateToken(dealerExist.id);
               if (!dealerExist.roleId) {
                    return Ok(res, { token, user: dealerExist });
               } else {
                    const popDealer = await Dealer.findById({ _id: dealerExist._id }).populate("roleId");
                    return Ok(res, { token, user: popDealer });
               }
          } catch (err) {
               return UnAuthorized(res, err as unknown as string);
          }
     };

     UpdateDealer = async (req: Request, res: Response) => {
          try {
               console.log(req.body);
               const updated = await Dealer.findByIdAndUpdate(
                    { _id: new ObjectId(req.params.id) },
                    { $set: { ...req.body } },
                    { new: true },
               );
               console.log(updated);
               const dealer = await Dealer.findById({ _id: updated?._id }).populate("packageId");
               return Ok(res, {
                    updateDealer: dealer,
                    message: `${dealer?.name} your profile is updated`,
               });
          } catch (err) {
               return UnAuthorized(res, err as any);
          }
     };

     SignOut = async (req: Request, res: Response) => {
          try {
               res.removeHeader("Authorization");
               return Ok(res, "logged out");
          } catch (err) {
               return UnAuthorized(res, err as unknown as string);
          }
     };
}

export const DealerController = new DealerControllers();
