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

               const bookings = await Booking.find({ dealerId: verify.id })
                    .sort({ createdAt: -1 })
                    .populate({
                         path: "vehicle.stockId",
                         model: "Stock",
                         populate: [
                              {
                                   path: "brand",
                              },
                         ],
                    })
                    .populate("vehicle.color")
                    .populate("vehicle.variant")
                    .populate("vehicle.model");

               return Ok(res, bookings);
          } catch (err) {
               return this.handleError(res, err);
          }
     };

     getBookingById = async (req: Request, res: Response) => {
          try {
               const booking = await Booking.findOne({ _id: new ObjectId(req.params.bookingId) })
                    .populate({
                         path: "vehicle.stockId",
                         model: "Stock",
                         populate: [
                              {
                                   path: "brand",
                              },
                         ],
                    })
                    .populate("vehicle.color")
                    .populate("vehicle.variant")
                    .populate("vehicle.model");
               return Ok(res, booking);
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

               const correction = (booking?.billing.balanceAmount as number) - newLedgerEntry.credit;
               const updatedBooking = await Booking.findByIdAndUpdate(
                    bookingId,
                    {
                         $push: { ledger: newLedgerEntry },
                         $set: {
                              "billing.balanceAmount": correction,
                              status: correction === 0 || correction < 0 ? "ready_for_deliver" : "in_stock",
                         },
                    },
                    { new: true, useFindAndModify: false },
               );

               if (!updatedBooking) {
                    return NotFound(res, SERVER_MESSAGES.DATA_NOT_EXIST);
               }

               return Ok(res, "ledger entry updated");
          } catch (err) {
               return this.handleError(res, err);
          }
     };
}

export const BookingController = new BookingControllers();
