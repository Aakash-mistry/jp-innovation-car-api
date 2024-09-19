import mongoose from "mongoose";

export interface ISellCarProps {
     brandName: mongoose.Schema.Types.ObjectId;
     modelYear: mongoose.Schema.Types.String;
     carModel: mongoose.Schema.Types.ObjectId;
     fuelType: mongoose.Schema.Types.ObjectId;
     color: mongoose.Schema.Types.ObjectId;
     // transmission: mongoose.Schema.Types.ObjectId;
     carVariant: mongoose.Schema.Types.ObjectId;
     dealerId: mongoose.Schema.Types.ObjectId;
     thumbnail: string;
     carExterior: string[];
     carInterior: string[];
     whenToSell: string; // with_in_week, next_week, after_2_week, just_checking_price
     regState: string; // indian states only (MH,DL)
     kmUsed: string; // 200-500 km
     city: string; // any indian city
     phoneNumber: string;
     rtoCode: string; // MH-02, DL-05
     customer: {
          firstName: string;
          lastName: string;
          email: string;
          phone: string;
          message: string;
     };
     condition: {
          exterior: string;
          interior: string;
          accident: boolean;
     };
}
