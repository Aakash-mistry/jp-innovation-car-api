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
exports.CarSellController = void 0;
const utils_1 = require("../utils");
const model_1 = require("../model");
const interface_1 = require("../interface");
class CarSellControllers {
    constructor() {
        this.getAllSellCars = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const verify = (0, utils_1.verifyToken)(token);
                const sellCars = yield model_1.CarSell.find({ dealerId: verify.id })
                    .populate("brandName")
                    .populate("carModel")
                    .populate("carVariant")
                    .populate("fuelType")
                    .populate("color")
                    .sort({ createdAt: -1 });
                return (0, utils_1.Ok)(res, sellCars);
            }
            catch (err) {
                return this.handleError(res, err);
            }
        });
        this.createNewSellCar = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { brandName, carExterior, carInterior, carModel, carVariant, city, dealerId, fuelType, kmUsed, modelYear, phoneNumber, regState, rtoCode, thumbnail, 
                // transmission,
                whenToSell, customer, color, condition, } = req.body;
                const carSellExist = yield model_1.CarSell.findOne({ brandName, "customer.email": customer.email });
                if (carSellExist) {
                    return (0, utils_1.UnAuthorized)(res, interface_1.SERVER_MESSAGES.DATA_EXIST);
                }
                const token = req.headers.authorization;
                const verify = (0, utils_1.verifyToken)(token);
                const newCarSell = yield new model_1.CarSell({
                    brandName,
                    carExterior,
                    carInterior,
                    carModel,
                    carVariant,
                    city,
                    fuelType,
                    kmUsed,
                    modelYear,
                    phoneNumber,
                    regState,
                    dealerId: verify.id,
                    rtoCode,
                    thumbnail,
                    // transmission,
                    whenToSell,
                    customer,
                    color,
                    condition,
                }).save();
                return (0, utils_1.Ok)(res, `${customer.firstName} ${customer.lastName} your request is saved`);
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
exports.CarSellController = new CarSellControllers();
