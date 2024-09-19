import mongoose from "mongoose";

export const database = async (uri: string) => {
     try {
          const conn = await mongoose.connect(uri, { dbName: "car-project" });
          console.log("car service database connected");
     } catch (err) {
          console.error(err);
     }
};
