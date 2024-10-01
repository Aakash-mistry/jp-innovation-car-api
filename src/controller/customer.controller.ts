import { Request, Response } from "express";
import { Ok, UnAuthorized, verifyToken } from "../utils";
import { Booking, BranchEmployee, Customer, Delivery, Stock } from "../model";
import { ICustomerProps } from "../interface";
import mongoose from "mongoose";

class CustomerControllers {
     private handleError(res: Response, err: unknown) {
          const message = (err as Error).message || (err as unknown as string);
          return UnAuthorized(res, message);
     }

     GetMyCustomer = async (req: Request, res: Response) => {
          try {
               const token: string = req.headers.authorization as string;
               const verify = verifyToken(token);
               const customers = await Customer.aggregate([
                    { $match: { dealerId: new mongoose.Types.ObjectId(`${verify.id}`) } }, // Match customers by dealerId
                    {
                         $group: {
                              _id: { bookingId: "$bookingId", dealerId: "$dealerId" }, // Group by bookingId and dealerId
                              stockIds: { $addToSet: "$stockId" }, // Merge stockId into an array
                              bookingId: { $first: "$bookingId" },
                              dealerId: { $first: "$dealerId" },
                              feedbackId: { $first: "$feedbackId" },
                              status: { $first: "$status" },
                              deliveryId: { $first: "$deliveryId" },
                         },
                    },
                    {
                         $lookup: {
                              from: "bookings", // Collection name of bookings
                              localField: "bookingId",
                              foreignField: "_id",
                              as: "bookingId",
                         },
                    },
                    {
                         $unwind: "$bookingId", // Convert bookingId array to a single object
                    },
                    // Lookup for Dealer population
                    {
                         $lookup: {
                              from: "dealers", // Collection name of dealers
                              localField: "dealerId",
                              foreignField: "_id",
                              as: "dealerId",
                         },
                    },
                    {
                         $unwind: "$dealerId", // Convert dealerId array to a single object
                    },
                    // Lookup for Feedback population
                    {
                         $lookup: {
                              from: "feedbacks", // Collection name of feedbacks
                              localField: "feedbackId",
                              foreignField: "_id",
                              as: "feedbackId",
                         },
                    },
                    {
                         $unwind: "$feedbackId", // Convert feedbackId array to a single object
                    },
                    // Lookup for Stock population
                    {
                         $lookup: {
                              from: "stocks", // Collection name of stocks
                              localField: "stockIds", // Populate each stock in the merged stockIds array
                              foreignField: "_id",
                              as: "stockIds",
                         },
                    },
                    // Lookup for Delivery population
                    {
                         $lookup: {
                              from: "deliveries", // Collection name of deliveries
                              localField: "deliveryId",
                              foreignField: "_id",
                              as: "deliveryId",
                         },
                    },
                    {
                         $unwind: "$deliveryId", // Convert deliveryId array to a single object
                    },
                    // Populate employeeId from delivery
                    {
                         $lookup: {
                              from: "branchemployees", // Collection name of employees
                              localField: "deliveryId.employeeId", // Correct reference to nested employeeId
                              foreignField: "_id",
                              as: "employeeId",
                         },
                    },
                    {
                         $unwind: "$employeeId", // Convert employeeId array to a single object
                    },
                    // Optional: Project to shape the output
                    {
                         $project: {
                              _id: 1,
                              stockIds: 1,
                              bookingId: 1,
                              dealerId: 1,
                              feedbackId: 1,
                              status: 1,
                              deliveryId: {
                                   $mergeObjects: ["$deliveryId", { employeeId: "$employeeId" }], // Combine deliveryId with populated employeeId
                              },
                         },
                    },
               ]);
               console.log(customers);

               return Ok(res, customers);
          } catch (err) {
               return this.handleError(res, err);
          }
     };

     CreateCustomer = async (req: Request, res: Response) => {
          try {
               const { dealerId, stockId, bookingId, feedbackId, status, deliveryId }: ICustomerProps = req.body;

               await Booking.findByIdAndUpdate({ _id: bookingId }, { $set: { status: "delivered" } });
               await Stock.findByIdAndUpdate({ _id: stockId }, { $set: { status: "delivered" } });
               const delivery = await Delivery.findByIdAndUpdate(
                    { _id: deliveryId },
                    { $set: { status: "delivered" } },
                    { new: true },
               );
               const employee = await BranchEmployee.findByIdAndUpdate(
                    { _id: delivery?.employeeId },
                    { $set: { available: true } },
                    { new: true },
               );
               const newCustomer = await new Customer({
                    dealerId,
                    stockId,
                    bookingId,
                    feedbackId,
                    status,
                    deliveryId,
               }).save();
               return Ok(res, `New Customer record is created`);
          } catch (err) {
               return this.handleError(res, err);
          }
     };

     DeleteCustomer = async (req: Request, res: Response) => {
          try {
               const { id } = req.params;
               const customer = await Customer.findByIdAndDelete(id);
               return Ok(res, "customer deleted");
          } catch (err) {
               return this.handleError(res, err);
          }
     };
}

export const CustomerController = new CustomerControllers();
