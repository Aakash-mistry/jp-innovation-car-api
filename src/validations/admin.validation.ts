import { body, ValidationChain } from "express-validator";

export const AdminSignUpRule: ValidationChain[] = [
     body("name", "admin name is required").isString().withMessage("admin name must be in string"),
     body("email", "email is required").isEmail().withMessage("email should be valid email"),
     body("password", "password is required")
          .isString()
          .isLength({ min: 6, max: 22 })
          .withMessage("password should be min 6 & max 22 character"),
];

export const AdminSignInRule: ValidationChain[] = [
     body("email", "email is required").isEmail().withMessage("email should be valid email"),
     body("password", "password is required")
          .isString()
          .isLength({ min: 6, max: 22 })
          .withMessage("password should be min 6 & max 22 character"),
];
