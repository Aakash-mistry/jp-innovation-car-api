import { Router } from "express";
import { CarSellController } from "../controller";

export const CarSellRoute = Router();

CarSellRoute.get("/car-sell", CarSellController.getAllSellCars);
CarSellRoute.post("/car-sell", CarSellController.createNewSellCar);
