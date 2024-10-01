import { Router } from "express";
import { FeedbackController } from "../controller";

export const FeedbackRoute = Router();

FeedbackRoute.get("/feedback", FeedbackController.GetMyFeedbacks);
FeedbackRoute.post("/feedback", FeedbackController.CreateFeedback);
FeedbackRoute.delete("/feedback/:id", FeedbackController.DeleteFeedback);
