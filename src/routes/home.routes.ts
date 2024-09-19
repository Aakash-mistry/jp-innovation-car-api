import express from "express";
import { BaseControllers } from "../controller";

export const BaseRouter = express.Router();

BaseRouter.get("/", BaseControllers.BaseController);
