import { Request, Response } from "express";
import { NotFound, Ok, UnAuthorized, verifyToken } from "../utils";
import { Booking, DeliveryOption, Stock } from "../model";
import { SERVER_MESSAGES } from "../interface";
import { ObjectId } from "mongodb";

class BookingControllers {
     private handleError(res: Response, err: unknown) {
          const message = (err as Error).message || (err as unknown as string);
          return UnAuthorized(res, message);
     }

     GetAllMyBooking = async (req: Request, res: Response) => {
          try {
               const token: string = req.headers.authorization as string;
               const verify = verifyToken(token);

               if (!verify) {
                    return UnAuthorized(res, "Invalid token");
               }

               // Fetch the bookings with populated fields
               const bookings = await Booking.find({ dealerId: verify.id })
                    .populate([
                         {
                              path: "vehicle.vehicleId",
                              model: "Stock",
                              populate: [
                                   { path: "brandId" },
                                   { path: "colorId" },
                                   { path: "fuelTypeId" },
                                   {
                                        path: "cardId",
                                        populate: "carModel",
                                   },
                                   { path: "variantId" },
                              ],
                         },
                         { path: "vehicle.selectedColor" },
                    ])
                    .sort({ createdAt: -1 });

               // Iterate over each booking to calculate the percentage of "yes" statuses
               const enrichedBookings = await Promise.all(
                    bookings.map(async (booking) => {
                         const deliveryOption = await DeliveryOption.findOne({ bookingId: booking._id });

                         if (deliveryOption) {
                              const options = deliveryOption.options || [];
                              const yesCount = options.reduce((count, option) => {
                                   return option.status === "yes" ? count + 1 : count;
                              }, 0);
                              const percentageOfYes = (yesCount / options.length) * 100;

                              if (percentageOfYes) {
                                   await Booking.findByIdAndUpdate(
                                        { _id: deliveryOption._id },
                                        { $set: { status: "ready_for_deliver" } },
                                   );
                              }
                              return {
                                   ...booking.toObject(), // Convert Mongoose document to plain object
                                   percentageOfYes,
                              };
                         } else {
                              return {
                                   ...booking.toObject(),
                                   percentageOfYes: null, // No delivery option available
                              };
                         }
                    }),
               );
               return Ok(res, enrichedBookings);
          } catch (err) {
               return this.handleError(res, err);
          }
     };

     CreateBooking = async (req: Request, res: Response) => {
          try {
               const token: string = req.headers.authorization as string;
               const verify = verifyToken(token);
               const newBooking = await new Booking({ ...req.body, dealerId: verify.id }).save();
               return Ok(res, "booking created");
          } catch (err) {
               return this.handleError(res, err);
          }
     };

     UpdateBooking = async (req: Request, res: Response) => {
          try {
               console.log(req.body);
               const data = await Booking.findOneAndUpdate(
                    { _id: new ObjectId(req.params.bookingId) },
                    { $set: { ...req.body, status: req.body.status } },
               );
               return Ok(res, "booking updated");
          } catch (err) {
               console.log("ERROR", err);
               return this.handleError(res, err);
          }
     };

     UpdateLedger = async (req: Request, res: Response) => {
          try {
               const bookingId = req.params.bookingId;
               const newLedgerEntry = req.body;

               const booking = await Booking.findOne({ _id: new ObjectId(bookingId) });

               if ((booking?.billing.balanceAmount as number) < 0 || (booking?.billing.balanceAmount as number) === 0) {
                    return UnAuthorized(res, "ledger balance is zero cannot make more entries");
               }

               const correction = (booking?.billing.advanceAmount as number) - newLedgerEntry.credit;
               const updatedBooking = await Booking.findByIdAndUpdate(
                    bookingId,
                    {
                         $push: { ledger: newLedgerEntry },
                         $set: {
                              "billing.advanceAmount": correction,
                              status: correction === 0 || correction < 0 ? "ready_for_deliver" : "in_stock",
                         },
                    },
                    { new: true, useFindAndModify: false },
               );

               if (!updatedBooking) {
                    return NotFound(res, SERVER_MESSAGES.DATA_NOT_EXIST);
               }
               const defaultOption = {
                    reason: "",
                    status: false,
               };
               const defaultTitle: string = "none";
               if (correction === 0 || correction < 0) {
                    new DeliveryOption({
                         bookingId: booking?._id,
                         dealerId: booking?.dealerId,
                         stockId: booking?.vehicle.vehicleId,
                         options: [
                              {
                                   milage: defaultTitle,
                                   option: defaultOption,
                              },
                              {
                                   engineNo: defaultTitle,
                                   option: defaultOption,
                              },
                              {
                                   chasis: defaultTitle,
                                   option: defaultOption,
                              },
                              {
                                   doors: defaultTitle,
                                   option: defaultOption,
                              },

                              {
                                   bonnet: defaultTitle,
                                   option: defaultOption,
                              },
                         ],
                    }).save();
                    return Ok(res, "ledger entry updated");
               } else {
                    return Ok(res, "ledger entry updated");
               }
          } catch (err) {
               return this.handleError(res, err);
          }
     };
}

export const BookingController = new BookingControllers();
