import mongoose from "mongoose";

export interface IDealerProps {
     name: string;
     email: string;
     password: string;
     photo: string;
     roleId?: mongoose.Schema.Types.ObjectId;
     packageId?: mongoose.Schema.Types.ObjectId | string;
     packageEnd?: Date;
     blocked?: boolean;
}

export interface IDepartmentProps {
     label: string;
     dealerId: mongoose.Schema.Types.ObjectId;
}
