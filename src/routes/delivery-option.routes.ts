import { Router } from "express";
import { DeliveryOptionController } from "../controller";

export const DeliveryOptionRoute = Router();

DeliveryOptionRoute.get("/delivery-options", DeliveryOptionController.GetDeliveryOptions);
DeliveryOptionRoute.post("/delivery-options", DeliveryOptionController.CreateDeliveryOptions);
DeliveryOptionRoute.get("/delivery-options/:bookingId", DeliveryOptionController.GetDeliveryOptionByBookingId);
DeliveryOptionRoute.put("/delivery-options/:bookingId", DeliveryOptionController.UpdateDeliveryOptionById);
