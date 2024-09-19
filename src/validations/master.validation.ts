import { body, ValidationChain } from "express-validator";

export const MasterValidationRule: ValidationChain[] = [
     body("label", "label is required").isString(),
     // body("image", "image is required").isString(),
     // body("desc").isString(),
];

export const MasterColorRule: ValidationChain[] = [body(["name", "hex"], "missing field").isString()];
