import { Router } from "express";
import { EmployeeController } from "../controller";

export const BranchEmployeeRoute = Router();

BranchEmployeeRoute.get("/employees", EmployeeController.GetAllEmployees);
BranchEmployeeRoute.get("/employees/:branchId", EmployeeController.GetAllMyEmployees);
BranchEmployeeRoute.post("/employees", EmployeeController.NewBranchEmployee);
BranchEmployeeRoute.put("/employees/:id", EmployeeController.UpdateBranchEmployee);
BranchEmployeeRoute.delete("/employees/:id", EmployeeController.DeleteBranchEmployee);
