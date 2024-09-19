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
exports.CatalogueControllers = void 0;
const utils_1 = require("../utils");
const model_1 = require("../model");
class CatalogueController {
    constructor() {
        this.GetCatalogue = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const catalogue = yield model_1.Catalogue.find({})
                    .populate("carModel")
                    .populate("company")
                    .populate("fuelType")
                    .populate("vehicleSubType")
                    .populate("vehicleType")
                    .populate("wheel")
                    .populate("variant")
                    .populate("colors");
                return (0, utils_1.Ok)(res, catalogue);
            }
            catch (err) {
                return (0, utils_1.UnAuthorized)(res, err);
            }
        });
        this.GetCatalogueByCompany = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const carModels = yield model_1.Catalogue.find({
                    company: req.params.companyId,
                })
                    .populate("carModel")
                    .populate("company")
                    .populate("fuelType")
                    .populate("vehicleSubType")
                    .populate("vehicleType")
                    .populate("wheel")
                    .populate("variant")
                    .populate("colors");
                return (0, utils_1.Ok)(res, carModels);
            }
            catch (err) {
                return (0, utils_1.UnAuthorized)(res, err);
            }
        });
        this.CreateCatalogue = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield new model_1.Catalogue(Object.assign({}, req.body)).save();
                return (0, utils_1.Ok)(res, `catalogue is uploaded`);
            }
            catch (err) {
                console.log(err);
                return (0, utils_1.UnAuthorized)(res, err);
            }
        });
        this.UpdateCatalogue = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updateCatalogue = yield model_1.Catalogue.findByIdAndUpdate({ _id: req.params.id }, { $set: Object.assign({}, req.body) }, { upsert: false });
                return (0, utils_1.Ok)(res, `catalogue is updated`);
            }
            catch (err) {
                return (0, utils_1.UnAuthorized)(res, err);
            }
        });
        this.DeleteCatalogue = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield model_1.Catalogue.findByIdAndDelete({ _id: req.params.id });
                return (0, utils_1.Ok)(res, "catalogue is deleted");
            }
            catch (err) {
                return (0, utils_1.UnAuthorized)(res, err);
            }
        });
    }
}
exports.CatalogueControllers = new CatalogueController();
