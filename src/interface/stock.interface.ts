import mongoose from "mongoose";

export interface IStockProps {
     accessories: string;
     carExteriorUrl: string[];
     carInteriorUrl: string[];
     certificateTitle: string;
     rc_book: string;
     puc: string;
     insurance: string;
     chaseNo: string;
     engineNo: string;
     insuranceExpDate: Date;
     insuranceType: string;
     insuranceValidity: string;
     manufacturingYear: number;
     mileage: number;
     registrationNumber: string;
     registrationType: string;
     registrationYear: string;
     salePrice: number;
     branchId: mongoose.Schema.Types.ObjectId;
     brandId: mongoose.Schema.Types.ObjectId;
     cardId: mongoose.Schema.Types.ObjectId;
     colorId: mongoose.Schema.Types.ObjectId;
     fuelTypeId: mongoose.Schema.Types.ObjectId;
     variantId: mongoose.Schema.Types.ObjectId;
     thumbnailUrl: string;
     tyresUrl: string[];
     deaderId: mongoose.Schema.Types.ObjectId;
     features?: string;
     sellerComment?: string;
     commission: number;
     customerPrice: number;
     otherDealerStock?: {
          dealerPrice: number;
          addedPrice: number;
          ownStock: boolean;
     };
     status: StockStatusType;
}

export type StockStatusType = "in_stock" | "out_of_stock" | "ready_for_deliver";
