import { Request, Response } from "express";
import { Ok, UnAuthorized, verifyToken } from "../utils";
import { Stock } from "../model";
import { SERVER_MESSAGES } from "../interface";
import { ObjectId } from "mongodb";

class StockControllers {
     public GetAllStock = async (req: Request, res: Response) => {
          try {
               const stock = await Stock.find()
                    // .populate("branchId")
                    .populate("brand")
                    .populate("color")
                    .populate("variant")

                    .populate({
                         path: "catalogue",
                         populate: [
                              {
                                   path: "variants.fuelType",
                              },
                              {
                                   path: "variants.colors",
                              },
                              {
                                   path: "carModel",
                              },
                              {
                                   path: "vehicleSubType",
                              },
                         ],
                    })
                    .populate("model")

                    .sort({ createdAt: -1 });
               return Ok(res, stock);
          } catch (err) {
               console.log(err);
               return UnAuthorized(res, err as any);
          }
     };

     public GetMyStock = async (req: Request, res: Response) => {
          try {
               const token = req.headers.authorization;
               const verify = verifyToken(
                    token
                         ? token
                         : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MWY4ZDVhZjYzNDAwNTVkODZkMzhlNCIsImlhdCI6MTcyNzE2MDMwMywiZXhwIjoxNzI3NDE5NTAzfQ.PINPA3xT_kB6f0oyzz_65ZmPWvjZJvElSBudlAuPyQ0`,
               );
               const stock = await Stock.find({ dealerId: verify.id })
                    .sort({ createdAt: -1 })
                    .populate("brand")
                    .populate("variant")
                    .populate("model")
                    .populate("color")
                    .populate({
                         path: "catalogue",
                         model: "Catalogue",
                         populate: [
                              {
                                   path: "vehicleSubType",
                              },
                              {
                                   path: "vehicleType",
                              },
                              {
                                   path: "wheels",
                              },
                              {
                                   path: "variants.fuelType",
                              },
                         ],
                    });
               return Ok(res, stock);
          } catch (err) {
               console.log(err);
               return UnAuthorized(res, err as unknown as string);
          }
     };

     public GetStockById = async (req: Request, res: Response) => {
          try {
               const stock = await Stock.findById({ _id: req.params.id })
                    .populate("branchId")
                    .populate("brandId")
                    .populate("colorId")
                    .populate("fuelTypeId")
                    .populate("deaderId")
                    .populate("variantId")
                    .populate({
                         path: "cardId",
                         model: "Catalogue",
                         populate: [
                              {
                                   path: "carModel",
                                   model: "Model",
                              },
                              {
                                   path: "colors",
                                   model: "Color",
                              },
                              {
                                   path: "fuelType",
                                   model: "FuelType",
                              },
                         ],
                    });
               return Ok(res, stock);
          } catch (err) {
               return UnAuthorized(res, err as unknown as string);
          }
     };

     public CreateNewStock = async (req: Request, res: Response) => {
          try {
               const token = req.headers.authorization;
               const verify = verifyToken(token as string);
               const dealarId = new ObjectId(`${verify.id}`);
               const newStock = await new Stock({ ...req.body, deaderId: dealarId, status: "in_stock" }).save();
               return Ok(res, "stock created");
          } catch (err) {
               console.log(err);
               return UnAuthorized(res, err as unknown as string);
          }
     };

     public UpdateStock = async (req: Request, res: Response) => {
          try {
               const token = req.headers.authorization;
               const verify = verifyToken(token as string);
               const currentStock = await Stock.findOne({ _id: req.params.id });
               if (currentStock?.dealerId !== verify.id) {
                    return UnAuthorized(res, SERVER_MESSAGES.ACCESS_DENIED);
               }
               if (currentStock) {
                    await Stock.findByIdAndUpdate({ _id: currentStock._id }, { $set: { ...req.body } });
                    return Ok(res, "stock updated");
               }
          } catch (err) {
               return UnAuthorized(res, err as unknown as string);
          }
     };

     public DeleteStock = async (req: Request, res: Response) => {
          try {
               await Stock.findByIdAndDelete({ _id: req.params.id });
               return Ok(res, "stock delete");
          } catch (err) {
               return UnAuthorized(res, err as unknown as string);
          }
     };
}

export const StockController = new StockControllers();
