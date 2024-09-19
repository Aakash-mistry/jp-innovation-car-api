import { Router } from "express";
import { TestDriveController } from "../controller";

export const TestDriveRouter = Router();

TestDriveRouter.get("/test-drive", TestDriveController.getMyTestDrive);
TestDriveRouter.post("/test-drive", TestDriveController.createTestDrive);
TestDriveRouter.put("/test-drive/:id", TestDriveController.updateTestDrive);
TestDriveRouter.delete("/test-drive/:id", TestDriveController.deleteTestDrive);
