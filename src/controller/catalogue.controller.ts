import { Request, Response } from "express";
import { Ok, UnAuthorized } from "../utils";
import { Catalogue } from "../model";
import { ICatalogueProps } from "../interface";

class CatalogueController {
     public GetCatalogue = async (req: Request, res: Response) => {
          try {
               const catalogue = await Catalogue.find({})
                    .populate("adminId", "name email")
                    .populate("brand")
                    .populate("carModel")
                    .populate("vehicleSubType")
                    .populate("vehicleType")
                    .populate("wheels")
                    .populate("variants.colors")
                    .populate("variants.variant")
                    .populate("variants.fuelType")
                    .sort({ createdAt: -1 });

               return Ok(res, catalogue);
          } catch (err) {
               return UnAuthorized(res, err as never as string);
          }
     };

     public GetCatalogueByCompany = async (req: Request, res: Response) => {
          try {
               const carModels = await Catalogue.find({
                    brand: req.params.companyId,
               });
               return Ok(res, carModels);
          } catch (err) {
               return UnAuthorized(res, err as unknown as string);
          }
     };

     public CreateCatalogue = async (req: Request, res: Response) => {
          try {
               await new Catalogue({ ...req.body }).save();
               return Ok(res, `catalogue is uploaded`);
          } catch (err) {
               console.log(err);
               return UnAuthorized(res, err as never as string);
          }
     };

     public UpdateCatalogue = async (req: Request, res: Response) => {
          try {
               const updateCatalogue = await Catalogue.findByIdAndUpdate(
                    { _id: req.params.id },
                    { $set: { ...req.body } },
                    { upsert: false },
               );
               return Ok(res, `catalogue is updated`);
          } catch (err) {
               return UnAuthorized(res, err as never as string);
          }
     };

     public DeleteCatalogue = async (req: Request, res: Response) => {
          try {
               await Catalogue.findByIdAndDelete({ _id: req.params.id });
               return Ok(res, "catalogue is deleted");
          } catch (err) {
               return UnAuthorized(res, err as never as string);
          }
     };
}

export const CatalogueControllers = new CatalogueController();
