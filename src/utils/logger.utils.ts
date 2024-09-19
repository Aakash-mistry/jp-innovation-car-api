import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import winston from "winston";
import { BadRequest } from "./server.utils";

export const logger = winston.createLogger({
     level: "info",
     format: winston.format.json(),
     transports: [new winston.transports.Console(), new winston.transports.File({ filename: "combined.log" })],
});

export const Validate = (req: Request, res: Response, next: NextFunction) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
          return BadRequest(
               res,
               errors.array().map((prop) => prop.msg),
          );
     }
     next();
};
