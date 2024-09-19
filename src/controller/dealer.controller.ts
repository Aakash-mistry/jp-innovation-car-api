import { Request, Response } from "express";
import { generateToken, hashPassword, matchPassword, Ok, UnAuthorized, verifyToken } from "../utils";
import { Dealer } from "../model";
import { IDealerProps, SERVER_MESSAGES } from "../interface";
import { ObjectId } from "mongodb";

class DealerControllers {
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
               const { email, name, password, photo, roleId, branchId }: IDealerProps = req.body;

               const dealerExist = await Dealer.findOne({ email });

               if (dealerExist) {
                    return UnAuthorized(res, SERVER_MESSAGES.ACCESS_DENIED);
               }

               const newUser = await new Dealer({
                    email,
                    name,
                    photo,
                    password: await hashPassword(password),
                    roleId,
                    branchId,
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
               const updated = await Dealer.findByIdAndUpdate(
                    { _id: new ObjectId(req.params.id) },
                    { $set: { ...req.body } },
                    { new: true },
               );
               const dealer = await Dealer.findById({ _id: updated?._id }).populate("packageId");
               console.log(dealer);
               return Ok(res, {
                    updateDealer: dealer,
                    message: `${dealer?.name} your profile is updated`,
               });
          } catch (err) {
               console.log(err);
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
