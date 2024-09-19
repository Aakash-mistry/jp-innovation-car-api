import mongoose from "mongoose";
import { IRequisiteProps } from "./requisite.interface";

export interface ICatalogueProps {
     bodyHeight: string;
     bodyWidth: string;
     bodyLength: string;
     lastRecordedPrice: string;
     thumbnail: string;
     specification: string;
     launchYear: string;
     discontinuedYear: string;
     generation: string;
     carModel: mongoose.Schema.Types.ObjectId;
     brand: mongoose.Schema.Types.ObjectId;
     vehicleSubType: mongoose.Schema.Types.ObjectId;
     vehicleType: mongoose.Schema.Types.ObjectId;
     wheels: mongoose.Schema.Types.ObjectId;
     variants: mongoose.Schema.Types.ObjectId;
     adminId: mongoose.Schema.Types.ObjectId;
     carExterior: string[];
     carInterior: string[];
     carTyres: string[];
}

export interface VariantsProps {
     engineSize: string;
     price: string;
     colors: mongoose.Schema.Types.ObjectId;
     variant: mongoose.Schema.Types.ObjectId;
     fuelType: mongoose.Schema.Types.ObjectId;
     transmission: string;
}
