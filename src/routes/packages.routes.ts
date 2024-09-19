import { Router } from "express";
import { PackagesController } from "../controller";

export const PackageRoute = Router();

PackageRoute.get("/packages", PackagesController.getAllPackages);
PackageRoute.post("/packages", PackagesController.createPackages);
PackageRoute.put("/packages/:id", PackagesController.updatePackages);
PackageRoute.delete("/packages/:id", PackagesController.deletePackages);
