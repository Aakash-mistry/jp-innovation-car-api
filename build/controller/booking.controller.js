"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const utils_1 = require("../utils");
const model_1 = require("../model");
const interface_1 = require("../interface");
const mongodb_1 = require("mongodb");
class BookingControllers {
    constructor() {
        this.GetAllMyBooking = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const verify = (0, utils_1.verifyToken)(token);
                if (!verify) {
                    return (0, utils_1.UnAuthorized)(res, "Invalid token");
                }
                // Fetch the bookings with populated fields
                const bookings = yield model_1.Booking.find({ dealerId: verify.id })
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
                const enrichedBookings = yield Promise.all(bookings.map((booking) => __awaiter(this, void 0, void 0, function* () {
                    const deliveryOption = yield model_1.DeliveryOption.findOne({ bookingId: booking._id });
                    if (deliveryOption) {
                        const options = deliveryOption.options || [];
                        const yesCount = options.reduce((count, option) => {
                            return option.status === "yes" ? count + 1 : count;
                        }, 0);
                        const percentageOfYes = (yesCount / options.length) * 100;
                        if (percentageOfYes) {
                            yield model_1.Booking.findByIdAndUpdate({ _id: deliveryOption._id }, { $set: { status: "ready_for_deliver" } });
                        }
                        return Object.assign(Object.assign({}, booking.toObject()), { // Convert Mongoose document to plain object
                            percentageOfYes });
                    }
                    else {
                        return Object.assign(Object.assign({}, booking.toObject()), { percentageOfYes: null });
                    }
                })));
                return (0, utils_1.Ok)(res, enrichedBookings);
            }
            catch (err) {
                return this.handleError(res, err);
            }
        });
        this.CreateBooking = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const verify = (0, utils_1.verifyToken)(token);
                const newBooking = yield new model_1.Booking(Object.assign(Object.assign({}, req.body), { dealerId: verify.id })).save();
                return (0, utils_1.Ok)(res, "booking created");
            }
            catch (err) {
                return this.handleError(res, err);
            }
        });
        this.UpdateBooking = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const data = yield model_1.Booking.findOneAndUpdate({ _id: new mongodb_1.ObjectId(req.params.bookingId) }, { $set: Object.assign(Object.assign({}, req.body), { status: req.body.status }) });
                return (0, utils_1.Ok)(res, "booking updated");
            }
            catch (err) {
                console.log("ERROR", err);
                return this.handleError(res, err);
            }
        });
        this.UpdateLedger = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const bookingId = req.params.bookingId;
                const newLedgerEntry = req.body;
                const booking = yield model_1.Booking.findOne({ _id: new mongodb_1.ObjectId(bookingId) });
                if ((booking === null || booking === void 0 ? void 0 : booking.billing.balanceAmount) < 0 || (booking === null || booking === void 0 ? void 0 : booking.billing.balanceAmount) === 0) {
                    return (0, utils_1.UnAuthorized)(res, "ledger balance is zero cannot make more entries");
                }
                const correction = (booking === null || booking === void 0 ? void 0 : booking.billing.advanceAmount) - newLedgerEntry.credit;
                const updatedBooking = yield model_1.Booking.findByIdAndUpdate(bookingId, {
                    $push: { ledger: newLedgerEntry },
                    $set: {
                        "billing.advanceAmount": correction,
                        status: correction === 0 || correction < 0 ? "ready_for_deliver" : "in_stock",
                    },
                }, { new: true, useFindAndModify: false });
                if (!updatedBooking) {
                    return (0, utils_1.NotFound)(res, interface_1.SERVER_MESSAGES.DATA_NOT_EXIST);
                }
                const defaultOption = {
                    reason: "",
                    status: false,
                };
                const defaultTitle = "none";
                if (correction === 0 || correction < 0) {
                    new model_1.DeliveryOption({
                        bookingId: booking === null || booking === void 0 ? void 0 : booking._id,
                        dealerId: booking === null || booking === void 0 ? void 0 : booking.dealerId,
                        stockId: booking === null || booking === void 0 ? void 0 : booking.vehicle.vehicleId,
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
                    return (0, utils_1.Ok)(res, "ledger entry updated");
                }
                else {
                    return (0, utils_1.Ok)(res, "ledger entry updated");
                }
            }
            catch (err) {
                return this.handleError(res, err);
            }
        });
    }
    handleError(res, err) {
        const message = err.message || err;
        return (0, utils_1.UnAuthorized)(res, message);
    }
}
exports.BookingController = new BookingControllers();
