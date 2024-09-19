import { Router } from "express";
import { FollowUpController } from "../controller";

export const FollowUpRouter = Router();

FollowUpRouter.get("/follow-up", FollowUpController.GetMyFollowUp);
FollowUpRouter.post("/follow-up", FollowUpController.CreateFollowUp);
FollowUpRouter.post("/follow-up/:id", FollowUpController.UpdateFollowUp);
FollowUpRouter.delete("/follow-up/:id", FollowUpController.DeleteFollowUp);
