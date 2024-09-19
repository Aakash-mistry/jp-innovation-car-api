import { Model, Document } from "mongoose";
import { IRequisiteProps } from "../interface";

class MasterServices<T extends Document> {
     private model: Model<T>;

     constructor(model: Model<T>) {
          this.model = model;
     }

     async create(data: Partial<T>): Promise<T> {
          const item = new this.model(data);
          return item.save();
     }

     async findAll(): Promise<T[]> {
          return await this.model.find().sort({ label: 1 }).exec();
     }

     async findOne({ label }: IRequisiteProps): Promise<T | null> {
          return this.model.findOne({ label }).exec();
     }

     async update(id: string, data: Partial<T>): Promise<T | null> {
          return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
     }

     async delete(id: string): Promise<T | null> {
          return this.model.findByIdAndDelete(id).exec();
     }
}

export default MasterServices;
