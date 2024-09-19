import mongoose from "mongoose";
import { IAuctionProps, IBidsProps } from "../interface";

const bidSchema = new mongoose.Schema<IBidsProps>(
     {
          amount: { type: mongoose.Schema.Types.Number, required: true },
          username: { type: mongoose.Schema.Types.String, required: true },
          email: { type: mongoose.Schema.Types.String, required: true },
          phone: { type: mongoose.Schema.Types.String, required: true },
          timestamp: { type: mongoose.Schema.Types.Date, required: true },
     },
     {
          timestamps: true,
     },
);

const auctionSchema = new mongoose.Schema<IAuctionProps>(
     {
          item: { type: mongoose.Schema.Types.ObjectId, ref: "Stock", required: true },
          duration: {
               start: { type: mongoose.Schema.Types.Date, required: true },
               end: { type: mongoose.Schema.Types.Date, required: true },
          },
          startingPrice: { type: mongoose.Schema.Types.Number, required: true },
          currentPrice: { type: mongoose.Schema.Types.Number, required: true },
          bids: [bidSchema],
     },
     {
          timestamps: true,
     },
);

export const Auction = mongoose.model("Auction", auctionSchema);
export const Bids = mongoose.model("Bid", bidSchema);
