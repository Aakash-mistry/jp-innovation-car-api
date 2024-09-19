import { body, ValidationChain } from "express-validator";

export const CatalogueRule: ValidationChain[] = [
     body(
          [
               "adminId",
               "company",
               "wheel",
               "vehicleType",
               "vehicleSubType",
               "carModel",
               "fuelType",
               "variant",
               "engineSize",
               "transmission",
               "seat",
               "bodyHeight",
               "bodyWidth",
               "bodyLength",
               "launchYear",
               "discontinuedYear",
               "generation",
               "price",
               "thumbnailImage",
               "exteriorImage",
               "interiorImage",
               "wheelerImage",
               "colors",
          ],
          "missing field",
     ).notEmpty(),
];
