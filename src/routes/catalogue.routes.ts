import { Router } from "express";
import { CatalogueControllers } from "../controller";

export const CatalogueRoute = Router();

CatalogueRoute.get("/catalogue", CatalogueControllers.GetCatalogue);
CatalogueRoute.post("/catalogue", CatalogueControllers.CreateCatalogue);
CatalogueRoute.put("/catalogue/:id", CatalogueControllers.UpdateCatalogue);
CatalogueRoute.delete("/catalogue/:id", CatalogueControllers.DeleteCatalogue);

// others
CatalogueRoute.get("/catalogue/:companyId", CatalogueControllers.GetCatalogueByCompany);
