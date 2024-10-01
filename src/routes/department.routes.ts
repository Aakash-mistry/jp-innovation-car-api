import { Router } from "express";
import { DepartmentController } from "../controller";

export const DepartmentRouter = Router();

DepartmentRouter.get("/departments", DepartmentController.GetDepartments);
DepartmentRouter.post("/departments", DepartmentController.CreateDepartment);
DepartmentRouter.put("/departments/:id", DepartmentController.UpdateDepartment);
DepartmentRouter.delete("/departments/:id", DepartmentController.DeleteDepartment);
DepartmentRouter.get("/departments/:id", DepartmentController.GetDepartmentById);
