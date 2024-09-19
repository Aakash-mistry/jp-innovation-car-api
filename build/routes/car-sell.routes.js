"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarSellRoute = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
exports.CarSellRoute = (0, express_1.Router)();
exports.CarSellRoute.get("/car-sell", controller_1.CarSellController.getAllSellCars);
exports.CarSellRoute.post("/car-sell", controller_1.CarSellController.createNewSellCar);
