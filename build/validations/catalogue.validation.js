"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogueRule = void 0;
const express_validator_1 = require("express-validator");
exports.CatalogueRule = [
    (0, express_validator_1.body)([
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
    ], "missing field").notEmpty(),
];
