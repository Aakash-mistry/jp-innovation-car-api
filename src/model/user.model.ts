import mongoose from "mongoose";
import { IUserProps } from "../interface";

const AdminSchema = new mongoose.Schema<IUserProps>(
     {
          email: { type: mongoose.Schema.Types.String, required: true, lowercase: true },
          name: { type: mongoose.Schema.Types.String, required: true, lowercase: true },
          password: { type: mongoose.Schema.Types.String, required: true },
          role: { type: mongoose.Schema.Types.String, default: "dealer", required: true },
     },
     {
          timestamps: true,
     },
);

export const User = mongoose.model("User", AdminSchema);
