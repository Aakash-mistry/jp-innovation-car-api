import { Router } from "express";
import { BookingController } from "../controller";
import { Validate } from "../utils";
import { BookingValidationRule } from "../validations";

export const BookingRouter = Router();

BookingRouter.get("/bookings", BookingController.GetAllMyBooking);
BookingRouter.post(
     "/bookings",
     // BookingValidationRule,
     // Validate,
     BookingController.CreateBooking,
);
BookingRouter.put("/bookings/:bookingId/ledger", BookingController.UpdateLedger);
BookingRouter.put("/bookings/update/:bookingId", BookingController.UpdateBooking);
