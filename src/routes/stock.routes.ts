import { Router } from "express";
import { StockController } from "../controller";
import { Stock } from "../model";

export const StockRoute = Router();

StockRoute.get("/stock", StockController.GetMyStock);
StockRoute.post("/stock", StockController.CreateNewStock);
StockRoute.put("/stock/:id", StockController.UpdateStock);
StockRoute.delete("/stock/:id", StockController.DeleteStock);
StockRoute.get("/stock/:id", StockController.GetStockById);
StockRoute.get("/stocks", StockController.GetAllStock);
