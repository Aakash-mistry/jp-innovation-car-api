import mongoose, { Document, Model, model, Schema } from "mongoose";
import { IColorsProps, IRequisiteProps } from "../interface";

const MasterSchema = new Schema<IRequisiteProps>(
     {
          desc: { type: mongoose.Schema.Types.String },
          image: { type: mongoose.Schema.Types.String },
          label: { type: mongoose.Schema.Types.String, required: true },
     },
     {
          timestamps: true,
     },
);

function createMasterModel<T extends Document>(modelName: string): Model<T> {
     return model<T>(modelName, MasterSchema as Schema);
}

export const Wheels = createMasterModel<IRequisiteProps>("Wheels");
export const VehicleType = createMasterModel<IRequisiteProps>("VehicleType");
export const VehicleSubType = createMasterModel<IRequisiteProps>("VehicleSubType");
export const Company = createMasterModel<IRequisiteProps>("Company");
export const CarModel = createMasterModel<IRequisiteProps>("Model");
export const FuelType = createMasterModel<IRequisiteProps>("FuelType");
export const Variant = createMasterModel<IRequisiteProps>("Variant");
