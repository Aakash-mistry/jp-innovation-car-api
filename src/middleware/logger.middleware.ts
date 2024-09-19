import { Request, Response, NextFunction } from "express";
import { logger } from "../utils";

export const LoggerService = (req: Request, res: Response, next: NextFunction) => {
     logger.log({
          level: "info",
          message: "🌐 Received API Request",
          url: req.url,
          method: req.method,
     });
     next();
};
