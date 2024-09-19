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
exports.StockController = void 0;
const utils_1 = require("../utils");
const model_1 = require("../model");
const interface_1 = require("../interface");
const mongodb_1 = require("mongodb");
class StockControllers {
    constructor() {
        this.GetMyStock = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const verify = (0, utils_1.verifyToken)(token);
                const stock = yield model_1.Stock.find({ deaderId: verify.id })
                    .populate("branchId")
                    .populate("brandId")
                    .populate("colorId")
                    .populate("fuelTypeId")
                    .populate("deaderId")
                    .populate("variantId")
                    .populate({
                    path: "cardId",
                    model: "Catalogue",
                    populate: [
                        {
                            path: "carModel",
                            model: "Model",
                        },
                        {
                            path: "colors",
                            model: "Color",
                        },
                        {
                            path: "fuelType",
                            model: "FuelType",
                        },
                    ],
                })
                    .sort({ createdAt: -1 });
                for (const item of stock) {
                    if (!item.status) {
                        yield model_1.Stock.findByIdAndUpdate(item._id, { status: "in_stock" });
                    }
                }
                return (0, utils_1.Ok)(res, stock);
            }
            catch (err) {
                return (0, utils_1.UnAuthorized)(res, err);
            }
        });
        this.GetStockById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const stock = yield model_1.Stock.findById({ _id: req.params.id })
                    .populate("branchId")
                    .populate("brandId")
                    .populate("colorId")
                    .populate("fuelTypeId")
                    .populate("deaderId")
                    .populate("variantId")
                    .populate({
                    path: "cardId",
                    model: "Catalogue",
                    populate: [
                        {
                            path: "carModel",
                            model: "Model",
                        },
                        {
                            path: "colors",
                            model: "Color",
                        },
                        {
                            path: "fuelType",
                            model: "FuelType",
                        },
                    ],
                });
                return (0, utils_1.Ok)(res, stock);
            }
            catch (err) {
                return (0, utils_1.UnAuthorized)(res, err);
            }
        });
        this.CreateNewStock = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const verify = (0, utils_1.verifyToken)(token);
                const dealarId = new mongodb_1.ObjectId(`${verify.id}`);
                const newStock = yield new model_1.Stock(Object.assign(Object.assign({}, req.body), { deaderId: dealarId, status: "in_stock" })).save();
                return (0, utils_1.Ok)(res, "stock created");
            }
            catch (err) {
                console.log(err);
                return (0, utils_1.UnAuthorized)(res, err);
            }
        });
        this.UpdateStock = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const verify = (0, utils_1.verifyToken)(token);
                const currentStock = yield model_1.Stock.findOne({ _id: req.params.id });
                if ((currentStock === null || currentStock === void 0 ? void 0 : currentStock.deaderId) !== verify.id) {
                    return (0, utils_1.UnAuthorized)(res, interface_1.SERVER_MESSAGES.ACCESS_DENIED);
                }
                if (currentStock) {
                    yield model_1.Stock.findByIdAndUpdate({ _id: currentStock._id }, { $set: Object.assign({}, req.body) });
                    return (0, utils_1.Ok)(res, "stock updated");
                }
            }
            catch (err) {
                return (0, utils_1.UnAuthorized)(res, err);
            }
        });
        this.DeleteStock = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield model_1.Stock.findByIdAndDelete({ _id: req.params.id });
                return (0, utils_1.Ok)(res, "stock delete");
            }
            catch (err) {
                return (0, utils_1.UnAuthorized)(res, err);
            }
        });
    }
}
exports.StockController = new StockControllers();
