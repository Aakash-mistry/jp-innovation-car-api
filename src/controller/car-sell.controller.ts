import { Request, Response } from "express";
import { Ok, UnAuthorized, verifyToken } from "../utils";
import { CarSell } from "../model";
import { ISellCarProps, SERVER_MESSAGES } from "../interface";

class CarSellControllers {
     private handleError(res: Response, err: unknown) {
          const message = (err as Error).message || (err as unknown as string);
          return UnAuthorized(res, message);
     }

     getAllSellCars = async (req: Request, res: Response) => {
          try {
               const token: string = req.headers.authorization as string;
               const verify = verifyToken(token);
               const sellCars = await CarSell.find({ dealerId: verify.id })
                    .populate("brandName")
                    .populate("carModel")
                    .populate("carVariant")
                    .populate("fuelType")
                    .populate("color")
                    .sort({ createdAt: -1 });
               return Ok(res, sellCars);
          } catch (err) {
               return this.handleError(res, err);
          }
     };

     createNewSellCar = async (req: Request, res: Response) => {
          try {
               const {
                    brandName,
                    carExterior,
                    carInterior,
                    carModel,
                    carVariant,
                    city,
                    dealerId,
                    fuelType,
                    kmUsed,
                    modelYear,
                    phoneNumber,
                    regState,
                    rtoCode,
                    thumbnail,
                    // transmission,
                    whenToSell,
                    customer,
                    color,
                    condition,
               }: ISellCarProps = req.body;

               const carSellExist = await CarSell.findOne({ brandName, "customer.email": customer.email });

               if (carSellExist) {
                    return UnAuthorized(res, SERVER_MESSAGES.DATA_EXIST);
               }
               const token: string = req.headers.authorization as string;
               const verify = verifyToken(token);

               const newCarSell = await new CarSell({
                    brandName,
                    carExterior,
                    carInterior,
                    carModel,
                    carVariant,
                    city,
                    fuelType,
                    kmUsed,
                    modelYear,
                    phoneNumber,
                    regState,
                    dealerId: verify.id as string,
                    rtoCode,
                    thumbnail,
                    // transmission,
                    whenToSell,
                    customer,
                    color,
                    condition,
               }).save();

               return Ok(res, `${customer.firstName} ${customer.lastName} your request is saved`);
          } catch (err) {
               return this.handleError(res, err);
          }
     };
}

export const CarSellController = new CarSellControllers();
