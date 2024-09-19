import { Router } from "express";
import { BranchController } from "../controller";

export const BranchRouter = Router();

BranchRouter.get("/branch/personal", BranchController.GetMyBranches);
BranchRouter.post("/branch/personal", BranchController.CreateNewBranch);
BranchRouter.put("/branch/personal/:id", BranchController.UpdateBranch);
BranchRouter.delete("/branch/personal/:id", BranchController.DeleteBranch);

BranchRouter.get("/role/personal", BranchController.GetMyRoles);
BranchRouter.post("/role/personal", BranchController.CreateRole);
BranchRouter.put("/role/personal/:id", BranchController.UpdateRole);
BranchRouter.delete("/role/personal/:id", BranchController.DeleteRole);
