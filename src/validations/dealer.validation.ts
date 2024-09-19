import { body, ValidationChain } from "express-validator";

export const DealerSignUpRule: ValidationChain[] = [
     body("email").notEmpty().withMessage("missing credentials"),
     body("name").notEmpty().withMessage("name is required"),
     body("password").notEmpty().withMessage("password is required"),
];

export const DealerSignInRule: ValidationChain[] = [
     body("email").notEmpty().withMessage("email is required"),
     body("password").notEmpty().withMessage("password is required"),
];
