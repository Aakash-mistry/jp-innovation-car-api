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
exports.DeliveryOptionController = void 0;
const utils_1 = require("../utils");
const model_1 = require("../model");
const interface_1 = require("../interface");
class DeliveryOptionControllers {
    constructor() {
        this.GetDeliveryOption = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const deliveryOption = yield model_1.DeliveryOption.findOne({ bookingId: req.params.bookingId })
                    .populate({
                    path: "bookingId",
                    model: "Booking",
                })
                    .populate({
                    path: "stockId",
                    model: "Stock",
                })
                    .populate({
                    path: "dealerId",
                    model: "Dealer",
                });
                if (!deliveryOption) {
                    return (0, utils_1.UnAuthorized)(res, interface_1.SERVER_MESSAGES.DATA_NOT_EXIST);
                }
                // Calculate the percentage of options with "yes" status
                const options = deliveryOption.options || [];
                const yesCount = options.reduce((count, option) => {
                    return option.status === "yes" ? count + 1 : count;
                }, 0);
                const percentage = (yesCount / options.length) * 100;
                return (0, utils_1.Ok)(res, {
                    deliveryOption,
                    percentage,
                });
            }
            catch (err) {
                this.handleError(res, err);
            }
        });
        this.CreateDeliveryOptions = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const { bookingId, dealerId, options, stockId } = req.body;
                const deliveryOption = yield model_1.DeliveryOption.findOne({ bookingId: req.body.bookingId })
                    .populate({
                    path: "bookingId",
                    model: "Booking",
                })
                    .populate({
                    path: "stockId",
                    model: "Stock",
                })
                    .populate({
                    path: "dealerId",
                    model: "Dealer",
                });
                if (deliveryOption) {
                    deliveryOption.options = options;
                    yield deliveryOption.save();
                    return (0, utils_1.Ok)(res, `${(_a = bookingId === null || bookingId === void 0 ? void 0 : bookingId.customer) === null || _a === void 0 ? void 0 : _a.customerName} is updated`);
                }
                yield new model_1.DeliveryOption({
                    bookingId,
                    dealerId,
                    options,
                    stockId,
                }).save();
                return (0, utils_1.Ok)(res, `${(_b = bookingId === null || bookingId === void 0 ? void 0 : bookingId.customer) === null || _b === void 0 ? void 0 : _b.customerName} is created`);
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
exports.DeliveryOptionController = new DeliveryOptionControllers();
