import { Router } from "express";
import { DesignationController } from "../controller";

export const DesignationRoute = Router();

DesignationRoute.get("/designation", DesignationController.GetDesignation);
DesignationRoute.post("/designation", DesignationController.CreateDesignation);
DesignationRoute.put("/designation/:id", DesignationController.UpdateDesignation);
DesignationRoute.delete("/designation/:id", DesignationController.DeleteDesignation);
