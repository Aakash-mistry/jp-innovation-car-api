import { Router } from "express";
import { DeliveryOptionController } from "../controller";

export const DeliveryOptionRoute = Router();

DeliveryOptionRoute.get("/delivery-options/:bookingId", DeliveryOptionController.GetDeliveryOption);
DeliveryOptionRoute.post("/delivery-options", DeliveryOptionController.CreateDeliveryOptions);
