"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogueRoute = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
exports.CatalogueRoute = (0, express_1.Router)();
exports.CatalogueRoute.get("/catalogue", controller_1.CatalogueControllers.GetCatalogue);
exports.CatalogueRoute.post("/catalogue", controller_1.CatalogueControllers.CreateCatalogue);
exports.CatalogueRoute.put("/catalogue/:id", controller_1.CatalogueControllers.UpdateCatalogue);
exports.CatalogueRoute.delete("/catalogue/:id", controller_1.CatalogueControllers.DeleteCatalogue);
// others
exports.CatalogueRoute.get("/catalogue/:companyId", controller_1.CatalogueControllers.GetCatalogueByCompany);
