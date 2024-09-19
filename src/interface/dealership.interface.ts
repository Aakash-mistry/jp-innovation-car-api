import mongoose from "mongoose";

export interface IDealerProps {
     name: string;
     email: string;
     password: string;
     photo: string;
     roleId?: mongoose.Schema.Types.ObjectId;
     branchId?: mongoose.Schema.Types.ObjectId;
     packageId?: mongoose.Schema.Types.ObjectId;
     packageEnd?: Date;
}

export interface IRoleProps {
     label: string;
     dealerId: mongoose.Schema.Types.ObjectId;
}
