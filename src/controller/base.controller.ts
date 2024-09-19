import { Request, Response } from "express";
import { Ok } from "../utils";

class BaseController {
     public BaseController = async (req: Request, res: Response) => {
          return Ok(res, "hello world");
     };
}

export const BaseControllers = new BaseController();
