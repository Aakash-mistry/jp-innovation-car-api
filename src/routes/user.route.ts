import express from "express";
import { UserControllers } from "../controller";
import { AdminSignInRule, AdminSignUpRule } from "../validations";
import { Validate } from "../utils";
import passport from "passport";
import { authAdminMiddleware } from "../middleware/auth.middleware";

export const AdminAuthRouter = express.Router();
const { SignIn, SignUp, SignedInProfile } = UserControllers;

AdminAuthRouter.post("/user/auth/sign-up", AdminSignUpRule, Validate, SignUp);
AdminAuthRouter.post("/user/auth/sign-in", AdminSignInRule, Validate, SignIn);
AdminAuthRouter.get("/user/auth/profile", SignedInProfile);
