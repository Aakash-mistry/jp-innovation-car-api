import mongoose from "mongoose";
import { IDepartmentProps } from "./dealership.interface";
import { IDesignation } from "./designation.interface";

export interface IBranchEmployeeProps {
     fullName: string;
     email: string;
     mobile: string;
     password: string;
     dealerId: mongoose.Schema.Types.ObjectId;
     branchId: mongoose.Schema.Types.ObjectId;
     image: string;
     available: boolean;
     permissions: IPermissionProps[];
     department: mongoose.Schema.Types.ObjectId;
     designation: mongoose.Schema.Types.ObjectId;
     topLevel: mongoose.Schema.Types.ObjectId;
     midLevel: mongoose.Schema.Types.ObjectId;
     entryLevel: mongoose.Schema.Types.ObjectId;
}

export interface IPermissionProps {
     leads: IPermissionOptionsProps;
     enquiry: IPermissionOptionsProps;
     stock: IPermissionOptionsProps;
     booking: IPermissionOptionsProps;
     followUp: IPermissionOptionsProps;
     getPass: IPermissionOptionsProps;
     testDrive: IPermissionOptionsProps;
     sellCar: IPermissionOptionsProps;
     packages: IPermissionOptionsProps;
     feedback: IPermissionOptionsProps;
     customer: IPermissionOptionsProps;
     dealer: IPermissionOptionsProps;
     branch: IPermissionOptionsProps;
     delivery: IPermissionOptionsProps;
}

export interface IPermissionOptionsProps {
     read: boolean;
     write: boolean;
     update: boolean;
     delete: boolean;
}
