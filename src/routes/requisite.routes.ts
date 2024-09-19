import { Router, Request, Response } from "express";
import MasterController from "../controller/requisite.controller";
import MasterServices from "../services/master.services";
import { Company, FuelType, VehicleSubType, VehicleType, Wheels, CarModel, Variant, Colors } from "../model";
import { MasterColorRule, MasterValidationRule } from "../validations";
import { Validate } from "../utils";
import { ColorController } from "../controller";

const wheelsService = new MasterServices(Wheels);
const vehicleTypeService = new MasterServices(VehicleType);
const vehicleSubTypeService = new MasterServices(VehicleSubType);
const modelService = new MasterServices(CarModel);
const companyService = new MasterServices(Company);
const FuelService = new MasterServices(FuelType);
const VariantService = new MasterServices(Variant);

const wheelsController = new MasterController(wheelsService); //
const vehicleTypeController = new MasterController(vehicleTypeService); //
const vehicleSubTypeController = new MasterController(vehicleSubTypeService); //
const modelController = new MasterController(modelService); //
const companyController = new MasterController(companyService); //
const fuelController = new MasterController(FuelService); //
const variantController = new MasterController(VariantService); //

export const MasterRoute = Router();

// Set up routes for each model
MasterRoute.post("/wheels", MasterValidationRule, Validate, wheelsController.create);
MasterRoute.get("/wheels", wheelsController.findAll);
MasterRoute.put("/wheels/:id", wheelsController.update);
MasterRoute.delete("/wheels/:id", wheelsController.delete);

MasterRoute.post("/vehicle-types", MasterValidationRule, Validate, vehicleTypeController.create);
MasterRoute.get("/vehicle-types", vehicleTypeController.findAll);
MasterRoute.put("/vehicle-types/:id", vehicleTypeController.update);
MasterRoute.delete("/vehicle-types/:id", vehicleTypeController.delete);

MasterRoute.post("/vehicle-sub-types", MasterValidationRule, Validate, vehicleSubTypeController.create);
MasterRoute.get("/vehicle-sub-types", vehicleSubTypeController.findAll);
MasterRoute.put("/vehicle-sub-types/:id", vehicleSubTypeController.update);
MasterRoute.delete("/vehicle-sub-types/:id", vehicleSubTypeController.delete);

MasterRoute.post("/models", MasterValidationRule, Validate, modelController.create);
MasterRoute.get("/models", modelController.findAll);
MasterRoute.put("/models/:id", modelController.update);
MasterRoute.delete("/models/:id", modelController.delete);

MasterRoute.post("/companies", MasterValidationRule, Validate, companyController.create);
MasterRoute.get("/companies", companyController.findAll);
MasterRoute.put("/companies/:id", companyController.update);
MasterRoute.delete("/companies/:id", companyController.delete);

MasterRoute.post("/fuel-type", MasterValidationRule, Validate, fuelController.create);
MasterRoute.get("/fuel-type", fuelController.findAll);
MasterRoute.put("/fuel-type/:id", fuelController.update);
MasterRoute.delete("/fuel-type/:id", fuelController.delete);

MasterRoute.post("/variant", MasterValidationRule, Validate, variantController.create);
MasterRoute.get("/variant", variantController.findAll);
MasterRoute.put("/variant/:id", variantController.update);
MasterRoute.delete("/variant/:id", variantController.delete);

MasterRoute.post("/color", MasterColorRule, Validate, ColorController.CreateColor);
MasterRoute.get("/color", ColorController.GetAllColor);
MasterRoute.put("/color/:id", ColorController.UpdateColor);
MasterRoute.delete("/color/:id", ColorController.DeleteColor);
MasterRoute.post("/colors/multiple", ColorController.CreateMultiColors);
