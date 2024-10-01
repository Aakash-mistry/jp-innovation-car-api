import mongoose from "mongoose";

export interface IStockProps {
     // models & variant
     dealerId: mongoose.Schema.Types.ObjectId;
     variant: mongoose.Schema.Types.ObjectId;
     color: mongoose.Schema.Types.ObjectId;
     model: mongoose.Schema.Types.ObjectId;
     brand: mongoose.Schema.Types.ObjectId;
     catalogue: mongoose.Schema.Types.ObjectId;

     // car details
     carTitle: string;
     registerDate: string;
     kmUsed: string;
     ownerStage: ownerStageType;
     commission: number;
     stockType: stockType;
     transmission: string;
     sellPrice: number;
     mfgDate: string;
     beforeSalePrice: number;
     accessories: string[];
     features: StockFeatureCategory[];
     remark: string;
     registrationType?: string;
     registrationNo?: string;
     registrationState?: string;
     insurance?: string;
     insuranceType?: InsuranceType;
     insuranceTPDate?: string;
     insuranceComDate?: string;

     // docs
     rcBook: string;
     puc: string;
     exterior: string[];
     interior: string[];
     tyres: string[];
     insuranceUrl: string;
     otherDoc: string;
     status: StockStatus;
}

export type stockType = " park_and_sell" | "commission" | "own" | "other_dealer";
export type InsuranceType = "third_party" | "comprehensive" | "both";
export interface Feature {
     name: string;
     status: boolean;
}
export interface StockFeatureCategory {
     category: string;
     features: Feature[];
}
export type ownerStageType = "1st" | "2nd" | "3rd" | "4th" | "more then four";
export type StockStatus = "in_stock" | "booked" | "archived" | "out_of_stock" | "in_garage" | "dispatched_delivery";
