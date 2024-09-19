import { Request, Response } from "express";
import { Ok, UnAuthorized } from "../utils";
import { Colors } from "../model";
import { IColorsProps } from "../interface";

class ColorControllers {
     public GetAllColor = async (req: Request, res: Response) => {
          try {
               const colors = await Colors.find();
               return Ok(res, colors);
          } catch (err) {
               return UnAuthorized(res, err as unknown as string);
          }
     };

     public CreateColor = async (req: Request, res: Response) => {
          try {
               const { hex, name } = req.body;
               const newColor = await new Colors({
                    hex,
                    name,
               }).save();
               return Ok(res, `${newColor.name} is uploaded`);
          } catch (err) {
               console.log(err);
               return UnAuthorized(res, err as unknown as string);
          }
     };

     public UpdateColor = async (req: Request, res: Response) => {
          try {
               await Colors.findByIdAndUpdate({ _id: req.params.id }, { $set: { ...req.body } });
               return Ok(res, "color is updated");
          } catch (err) {
               return UnAuthorized(res, err as unknown as string);
          }
     };

     public DeleteColor = async (req: Request, res: Response) => {
          try {
               await Colors.findByIdAndDelete({ _id: req.params.id });
               return Ok(res, "color is deleted");
          } catch (err) {
               return UnAuthorized(res, err as unknown as string);
          }
     };

     public CreateMultiColors = async (req: Request, res: Response) => {
          try {
               const { colors }: { colors: IColorsProps[] } = req.body;
               if (!colors) {
                    return UnAuthorized(res, "define array");
               }
               await Colors.insertMany(colors);
               return Ok(res, "uploaded");
          } catch (err) {
               return UnAuthorized(res, err as unknown as string);
          }
     };
}

export const ColorController = new ColorControllers();
