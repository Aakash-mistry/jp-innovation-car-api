import mongoose from "mongoose";

type DurationType = "1_month" | "3_months" | "6_months" | "12_months";

export interface IPackagesProps {
     packageName: string;
     duration: DurationType;
     stocksLength: number;
     carListedOnWebsite: number;
     remark?: string;
     features: string[];
     hotPackage?: boolean;
     adminId: mongoose.Schema.Types.ObjectId;
     price: number;
     status: boolean;
}
