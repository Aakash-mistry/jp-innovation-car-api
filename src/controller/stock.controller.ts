import { Request, Response } from "express";
import { Ok, UnAuthorized, verifyToken } from "../utils";
import { Stock } from "../model";
import { SERVER_MESSAGES } from "../interface";
import { ObjectId } from "mongodb";

class StockControllers {
     public GetAllStock = async (req: Request, res: Response) => {
          try {
               const stock = await Stock.find()
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
                    })

                    .sort({ createdAt: -1 });
               return Ok(res, stock);
          } catch (err) {
               return UnAuthorized(res, err as any);
          }
     };

     public GetMyStock = async (req: Request, res: Response) => {
          try {
               const token = req.headers.authorization;
               const verify = verifyToken(token as string);
               const stock = await Stock.find({ deaderId: verify.id })
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
                    })

                    .sort({ createdAt: -1 });
               for (const item of stock) {
                    if (!item.status) {
                         await Stock.findByIdAndUpdate(item._id, { status: "in_stock" });
                    }
               }
               return Ok(res, stock);
          } catch (err) {
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
               if (currentStock?.deaderId !== verify.id) {
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
