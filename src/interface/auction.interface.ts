import mongoose from "mongoose";

export interface IBidsProps {
     amount: number;
     userId: string;
     timestamp: Date;
     username: string;
     email: string;
     phone: string;
     id?: string;
}

export interface IAuctionProps {
     item: mongoose.Schema.Types.ObjectId;
     startingPrice: number;
     duration: {
          start: Date;
          end: Date;
     };
     currentPrice: number;
     bids: IBidsProps[];
}
