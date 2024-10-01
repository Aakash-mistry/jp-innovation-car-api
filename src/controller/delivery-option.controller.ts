import { Request, Response } from "express";
import { Ok, UnAuthorized, verifyToken } from "../utils";
import { Booking, DeliveryOption } from "../model";
import { IBookingProps, IDeliveryOptionProps, SERVER_MESSAGES } from "../interface";
import { ObjectId } from "mongodb";

class DeliveryOptionControllers {
     private handleError(res: Response, err: unknown) {
          const message = (err as Error).message || (err as unknown as string);
          return UnAuthorized(res, message);
     }

     GetDeliveryOption = async (req: Request, res: Response) => {
          try {
               const deliveryOption = await DeliveryOption.findOne({ bookingId: req.params.bookingId });
               return Ok(res, deliveryOption);
          } catch (err) {
               this.handleError(res, err);
          }
     };
     GetDeliveryOptions = async (req: Request, res: Response) => {
          try {
               const token = req.headers.authorization;
               const verify = verifyToken(token as string);

               const aggregationResult = await DeliveryOption.aggregate([
                    { $match: { dealerId: new ObjectId(`${verify.id}`) } },
                    { $unwind: "$options" },
                    { $unwind: "$options.option" },

                    {
                         $group: {
                              _id: "$_id",
                              bookingId: { $first: "$bookingId" },
                              dealerId: { $first: "$dealerId" },
                              stockId: { $first: "$stockId" },
                              options: { $push: "$options" },
                              status: { $first: "$status" },
                              createdAt: { $first: "$createdAt" },
                              updatedAt: { $first: "$updatedAt" },
                              totalOptions: { $sum: 1 },
                              passedOptions: {
                                   $sum: {
                                        $cond: [{ $eq: ["$options.option.status", "pass"] }, 1, 0],
                                   },
                              },
                         },
                    },

                    {
                         $project: {
                              _id: 0,
                              bookingId: 1,
                              dealerId: 1,
                              stockId: 1,
                              status: 1,
                              options: 1,
                              createdAt: 1,
                              updatedAt: 1,
                              totalOptions: 1,
                              passedOptions: 1,
                              passPercentage: {
                                   $multiply: [{ $divide: ["$passedOptions", "$totalOptions"] }, 100],
                              },
                         },
                    },
               ]);

               const populatedResult = await DeliveryOption.populate(aggregationResult, [
                    { path: "bookingId", model: "Booking" },
                    { path: "stockId", model: "Stock" },
               ]);

               return Ok(res, populatedResult);
          } catch (error) {
               console.log(error);
               return this.handleError(res, error);
          }
     };

     GetDeliveryOptionByBookingId = async (req: Request, res: Response) => {
          try {
               const { bookingId } = req.params;
               const options = await DeliveryOption.findOne({ bookingId: new ObjectId(bookingId) })
                    .populate({
                         path: "bookingId",
                    })
                    .populate({
                         path: "stockId",
                    });
               return Ok(res, options);
          } catch (err) {
               console.log(err);
               return this.handleError(res, err);
          }
     };

     CreateDeliveryOptions = async (req: Request, res: Response) => {
          try {
               const { bookingId, dealerId, options, stockId }: IDeliveryOptionProps = req.body;

               await Booking.findOneAndUpdate(
                    { _id: new ObjectId(`${bookingId}`) },
                    { $set: { status: "in_progress" } },
               );

               await new DeliveryOption({
                    bookingId,
                    dealerId,
                    options,
                    stockId,
               }).save();
               return Ok(res, `${(bookingId as unknown as IBookingProps)?.customer?.customerName} is created`);
          } catch (err) {
               console.log(err);
               return this.handleError(res, err);
          }
     };

     UpdateDeliveryOptionById = async (req: Request, res: Response) => {
          try {
               const { bookingId } = req.params;

               // Prepare update query - directly use $set with the entire body
               const updateQuery = {
                    $set: req.body,
               };

               // Perform the update
               const updatedOptions = await DeliveryOption.findOneAndUpdate(
                    { bookingId }, // Filter by bookingId from params
                    updateQuery, // Use $set to update everything in req.body
                    { new: true }, // Return the updated document
               );

               // Check if the document was found and updated
               if (!updatedOptions) {
                    return UnAuthorized(res, "not found");
               }

               // Return a success response
               return Ok(res, "updated");
          } catch (error) {
               console.error("Error updating delivery options:", error);
               return this.handleError(res, error);
          }
     };
}

export const DeliveryOptionController = new DeliveryOptionControllers();
