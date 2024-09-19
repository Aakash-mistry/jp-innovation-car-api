import { Router } from "express";
import { GetPassController } from "../controller";

export const GetPassRouter = Router();

GetPassRouter.get("/get-pass", GetPassController.GetMyPasses);
GetPassRouter.post("/get-pass", GetPassController.CreateGetPass);
GetPassRouter.put("/get-pass/:id", GetPassController.UpdateGetPass);
GetPassRouter.get("/get-pass/:id", GetPassController.getGatePassById);
