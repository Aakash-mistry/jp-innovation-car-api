"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterRoute = void 0;
const express_1 = require("express");
const requisite_controller_1 = __importDefault(require("../controller/requisite.controller"));
const master_services_1 = __importDefault(require("../services/master.services"));
const model_1 = require("../model");
const validations_1 = require("../validations");
const utils_1 = require("../utils");
const controller_1 = require("../controller");
const wheelsService = new master_services_1.default(model_1.Wheels);
const vehicleTypeService = new master_services_1.default(model_1.VehicleType);
const vehicleSubTypeService = new master_services_1.default(model_1.VehicleSubType);
const modelService = new master_services_1.default(model_1.CarModel);
const companyService = new master_services_1.default(model_1.Company);
const FuelService = new master_services_1.default(model_1.FuelType);
const VariantService = new master_services_1.default(model_1.Variant);
const wheelsController = new requisite_controller_1.default(wheelsService); //
const vehicleTypeController = new requisite_controller_1.default(vehicleTypeService); //
const vehicleSubTypeController = new requisite_controller_1.default(vehicleSubTypeService); //
const modelController = new requisite_controller_1.default(modelService); //
const companyController = new requisite_controller_1.default(companyService); //
const fuelController = new requisite_controller_1.default(FuelService); //
const variantController = new requisite_controller_1.default(VariantService); //
exports.MasterRoute = (0, express_1.Router)();
// Set up routes for each model
exports.MasterRoute.post("/wheels", validations_1.MasterValidationRule, utils_1.Validate, wheelsController.create);
exports.MasterRoute.get("/wheels", wheelsController.findAll);
exports.MasterRoute.put("/wheels/:id", wheelsController.update);
exports.MasterRoute.delete("/wheels/:id", wheelsController.delete);
exports.MasterRoute.post("/vehicle-types", validations_1.MasterValidationRule, utils_1.Validate, vehicleTypeController.create);
exports.MasterRoute.get("/vehicle-types", vehicleTypeController.findAll);
exports.MasterRoute.put("/vehicle-types/:id", vehicleTypeController.update);
exports.MasterRoute.delete("/vehicle-types/:id", vehicleTypeController.delete);
exports.MasterRoute.post("/vehicle-sub-types", validations_1.MasterValidationRule, utils_1.Validate, vehicleSubTypeController.create);
exports.MasterRoute.get("/vehicle-sub-types", vehicleSubTypeController.findAll);
exports.MasterRoute.put("/vehicle-sub-types/:id", vehicleSubTypeController.update);
exports.MasterRoute.delete("/vehicle-sub-types/:id", vehicleSubTypeController.delete);
exports.MasterRoute.post("/models", validations_1.MasterValidationRule, utils_1.Validate, modelController.create);
exports.MasterRoute.get("/models", modelController.findAll);
exports.MasterRoute.put("/models/:id", modelController.update);
exports.MasterRoute.delete("/models/:id", modelController.delete);
exports.MasterRoute.post("/companies", validations_1.MasterValidationRule, utils_1.Validate, companyController.create);
exports.MasterRoute.get("/companies", companyController.findAll);
exports.MasterRoute.put("/companies/:id", companyController.update);
exports.MasterRoute.delete("/companies/:id", companyController.delete);
exports.MasterRoute.post("/fuel-type", validations_1.MasterValidationRule, utils_1.Validate, fuelController.create);
exports.MasterRoute.get("/fuel-type", fuelController.findAll);
exports.MasterRoute.put("/fuel-type/:id", fuelController.update);
exports.MasterRoute.delete("/fuel-type/:id", fuelController.delete);
exports.MasterRoute.post("/variant", validations_1.MasterValidationRule, utils_1.Validate, variantController.create);
exports.MasterRoute.get("/variant", variantController.findAll);
exports.MasterRoute.put("/variant/:id", variantController.update);
exports.MasterRoute.delete("/variant/:id", variantController.delete);
exports.MasterRoute.post("/color", validations_1.MasterColorRule, utils_1.Validate, controller_1.ColorController.CreateColor);
exports.MasterRoute.get("/color", controller_1.ColorController.GetAllColor);
exports.MasterRoute.put("/color/:id", controller_1.ColorController.UpdateColor);
exports.MasterRoute.delete("/color/:id", controller_1.ColorController.DeleteColor);
exports.MasterRoute.post("/colors/multiple", controller_1.ColorController.CreateMultiColors);
