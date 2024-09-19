import { Request, Response } from "express";
import { Document } from "mongoose";
import MasterServices from "../services/master.services";
import { NotFound, Ok, UnAuthorized } from "../utils";

class MasterController<T extends Document> {
     private service: MasterServices<T>;

     constructor(service: MasterServices<T>) {
          this.service = service;
     }

     create = async (req: Request, res: Response) => {
          try {
               const existData = await this.service.findOne(req.body.label);
               if (existData?._id) {
                    return UnAuthorized(res, "DATA_ALREADY_EXIST");
               } else {
                    const data = await this.service.create(req.body);
                    return Ok(res, `DATA_CREATED`);
               }
          } catch (error) {
               return UnAuthorized(res, error as unknown as string);
          }
     };

     findAll = async (req: Request, res: Response) => {
          try {
               const data = await this.service.findAll();
               return Ok(res, data);
          } catch (error) {
               return UnAuthorized(res, error as unknown as string);
          }
     };

     update = async (req: Request, res: Response) => {
          try {
               const data = await this.service.update(req.params.id, req.body);
               if (!data) {
                    return res.status(404).json({ message: "Not found" });
               }
               return Ok(res, data);
          } catch (error) {
               return UnAuthorized(res, error as unknown as string);
          }
     };

     delete = async (req: Request, res: Response) => {
          try {
               const data = await this.service.delete(req.params.id);
               if (!data) {
                    return NotFound(res, "no data found");
               }
               return Ok(res, "Deleted successfully");
          } catch (error) {
               return UnAuthorized(res, error as unknown as string);
          }
     };
}

export default MasterController;
