import { Router } from "express";
import { BranchController } from "../controller";

export const BranchRouter = Router();

BranchRouter.get("/branch/personal", BranchController.GetMyBranches);
BranchRouter.get("/branch/personal/:id", BranchController.GetBranchById);
BranchRouter.post("/branch/personal", BranchController.CreateNewBranch);
BranchRouter.put("/branch/personal/:id", BranchController.UpdateBranch);
BranchRouter.delete("/branch/personal/:id", BranchController.DeleteBranch);
