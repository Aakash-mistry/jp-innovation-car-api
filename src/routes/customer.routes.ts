import { Router } from "express";
import { CustomerController } from "../controller";

export const CustomerRouter = Router();

CustomerRouter.get("/customer", CustomerController.GetMyCustomer);
CustomerRouter.post("/customer", CustomerController.CreateCustomer);
CustomerRouter.delete("/customer/:id", CustomerController.DeleteCustomer);
