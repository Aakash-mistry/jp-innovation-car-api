"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryOptionRoute = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
exports.DeliveryOptionRoute = (0, express_1.Router)();
exports.DeliveryOptionRoute.get("/delivery-options/:bookingId", controller_1.DeliveryOptionController.GetDeliveryOption);
exports.DeliveryOptionRoute.post("/delivery-options", controller_1.DeliveryOptionController.CreateDeliveryOptions);
