import mongoose from "mongoose";
import { IColorsProps } from "../interface";

const ColorSchema = new mongoose.Schema<IColorsProps>(
     {
          hex: { type: mongoose.Schema.Types.String, required: true },
          name: { type: mongoose.Schema.Types.String, required: true },
     },
     {
          timestamps: true,
     },
);

export const Colors = mongoose.model("Color", ColorSchema);
