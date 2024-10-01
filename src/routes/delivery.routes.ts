import { Router } from "express";
import { DeliveryController } from "../controller";

export const DeliveryRoute = Router();

DeliveryRoute.post("/delivery", DeliveryController.AllotGatePass);
DeliveryRoute.get("/delivery", DeliveryController.GetDeliveryList);
// DeliveryRoute.delete("/delivery/:id", DeliveryController.DeleteDelivery);
DeliveryRoute.put("/delivery/driver", DeliveryController.VerifyDriverForDelivery);
DeliveryRoute.put("/delivery/customer", DeliveryController.VerifyCustomerForDelivery);
