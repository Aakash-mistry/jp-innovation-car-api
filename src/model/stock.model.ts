import mongoose from "mongoose";
import { IStockProps } from "../interface";

const StockSchema = new mongoose.Schema<IStockProps>(
     {
          accessories: { type: mongoose.Schema.Types.String, required: true },
          carExteriorUrl: [{ type: mongoose.Schema.Types.String, required: true }],
          carInteriorUrl: [{ type: mongoose.Schema.Types.String, required: true }],
          certificateTitle: { type: mongoose.Schema.Types.String, required: true },
          insurance: { type: mongoose.Schema.Types.String, required: true },
          puc: { type: mongoose.Schema.Types.String, required: true },
          rc_book: { type: mongoose.Schema.Types.String, required: true },
          chaseNo: { type: mongoose.Schema.Types.String, required: true },
          engineNo: { type: mongoose.Schema.Types.String, required: true },
          insuranceType: { type: mongoose.Schema.Types.String, required: true },
          insuranceValidity: { type: mongoose.Schema.Types.String, required: true },
          registrationNumber: { type: mongoose.Schema.Types.String, required: true },
          registrationType: { type: mongoose.Schema.Types.String, required: true },
          registrationYear: { type: mongoose.Schema.Types.String, required: true },
          thumbnailUrl: { type: mongoose.Schema.Types.String, required: true },
          tyresUrl: [{ type: mongoose.Schema.Types.String, required: true }],
          manufacturingYear: { type: mongoose.Schema.Types.Number, required: true },
          mileage: { type: mongoose.Schema.Types.Number, required: true },
          salePrice: { type: mongoose.Schema.Types.Number, required: true },
          branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
          brandId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
          cardId: { type: mongoose.Schema.Types.ObjectId, ref: "Catalogue", required: true },
          colorId: { type: mongoose.Schema.Types.ObjectId, ref: "Color", required: true },
          deaderId: { type: mongoose.Schema.Types.ObjectId, ref: "Dealer", required: true },
          fuelTypeId: { type: mongoose.Schema.Types.ObjectId, ref: "FuelType", required: true },
          variantId: { type: mongoose.Schema.Types.ObjectId, ref: "Variant", required: true },
          features: { type: mongoose.Schema.Types.String },
          sellerComment: { type: mongoose.Schema.Types.String },
          commission: { type: mongoose.Schema.Types.Number, required: true },
          customerPrice: { type: mongoose.Schema.Types.Number, required: true },
          otherDealerStock: {
               dealerPrice: { type: mongoose.Schema.Types.Number },
               addedPrice: { type: mongoose.Schema.Types.Number },
               ownStock: { type: mongoose.Schema.Types.Boolean },
          },
          status: { type: mongoose.Schema.Types.String, default: "in_stock", required: true },
     },
     {
          timestamps: true,
     },
);
StockSchema.index({ email: 1, stockId: 1, dealerId: 1 });

export const Stock = mongoose.model("Stock", StockSchema);
