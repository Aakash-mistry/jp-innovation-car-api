"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
exports.BookingRouter = (0, express_1.Router)();
exports.BookingRouter.get("/bookings", controller_1.BookingController.GetAllMyBooking);
exports.BookingRouter.post("/bookings", 
// BookingValidationRule,
// Validate,
controller_1.BookingController.CreateBooking);
exports.BookingRouter.put("/bookings/:bookingId/ledger", controller_1.BookingController.UpdateLedger);
exports.BookingRouter.put("/bookings/update/:bookingId", controller_1.BookingController.UpdateBooking);
