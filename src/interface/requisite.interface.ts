import { Document } from "mongoose";

export interface IRequisiteProps extends Document {
     desc?: string;
     image?: string;
     label: string;
}

export interface IColorsProps {
     hex: string;
     name: string;
}
