import mongoose from "mongoose";
import { IStockProps } from "../interface";

const StockSchema = new mongoose.Schema<IStockProps>(
     {
          accessories: [{ type: mongoose.Schema.Types.String }],
          beforeSalePrice: { type: mongoose.Schema.Types.Number, required: true },
          carTitle: { type: mongoose.Schema.Types.String, required: true },
          commission: { type: mongoose.Schema.Types.Number },
          brand: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
          color: { type: mongoose.Schema.Types.ObjectId, ref: "Color", required: true },
          dealerId: { type: mongoose.Schema.Types.ObjectId, ref: "Dealer", required: true },
          catalogue: { type: mongoose.Schema.Types.ObjectId, ref: "Catalogue", required: true },
          exterior: [{ type: mongoose.Schema.Types.String }],
          features: [
               {
                    category: { type: mongoose.Schema.Types.String },
                    features: [
                         {
                              name: { type: mongoose.Schema.Types.String },
                              status: { type: mongoose.Schema.Types.Boolean },
                         },
                    ],
               },
          ],
          insurance: { type: mongoose.Schema.Types.String, required: true },
          insuranceComDate: { type: mongoose.Schema.Types.String },
          insuranceTPDate: { type: mongoose.Schema.Types.String },
          insuranceType: { type: mongoose.Schema.Types.String },
          insuranceUrl: { type: mongoose.Schema.Types.String },
          interior: [{ type: mongoose.Schema.Types.String }],
          kmUsed: { type: mongoose.Schema.Types.String, required: true },
          mfgDate: { type: mongoose.Schema.Types.String, required: true },
          model: { type: mongoose.Schema.Types.ObjectId, ref: "Model", required: true },
          otherDoc: { type: mongoose.Schema.Types.String },
          ownerStage: { type: mongoose.Schema.Types.String },
          puc: { type: mongoose.Schema.Types.String },
          rcBook: { type: mongoose.Schema.Types.String },
          registerDate: { type: mongoose.Schema.Types.String },
          registrationNo: { type: mongoose.Schema.Types.String },
          registrationState: { type: mongoose.Schema.Types.String },
          registrationType: { type: mongoose.Schema.Types.String, required: true },
          remark: { type: mongoose.Schema.Types.String },
          sellPrice: { type: mongoose.Schema.Types.Number, required: true },
          stockType: { type: mongoose.Schema.Types.String, required: true },
          transmission: { type: mongoose.Schema.Types.String, required: true },
          tyres: [{ type: mongoose.Schema.Types.String }],
          variant: { type: mongoose.Schema.Types.ObjectId, ref: "Variant", required: true },
          status: { type: mongoose.Schema.Types.String, default: "in_stock" },
     },
     {
          timestamps: true,
     },
);
StockSchema.index({ dealer: 1 });

export const Stock = mongoose.model("Stock", StockSchema);
