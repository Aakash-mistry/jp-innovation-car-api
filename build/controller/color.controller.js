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
exports.ColorController = void 0;
const utils_1 = require("../utils");
const model_1 = require("../model");
class ColorControllers {
    constructor() {
        this.GetAllColor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const colors = yield model_1.Colors.find();
                return (0, utils_1.Ok)(res, colors);
            }
            catch (err) {
                return (0, utils_1.UnAuthorized)(res, err);
            }
        });
        this.CreateColor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { hex, name } = req.body;
                const newColor = yield new model_1.Colors({
                    hex,
                    name,
                }).save();
                return (0, utils_1.Ok)(res, `${newColor.name} is uploaded`);
            }
            catch (err) {
                console.log(err);
                return (0, utils_1.UnAuthorized)(res, err);
            }
        });
        this.UpdateColor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield model_1.Colors.findByIdAndUpdate({ _id: req.params.id }, { $set: Object.assign({}, req.body) });
                return (0, utils_1.Ok)(res, "color is updated");
            }
            catch (err) {
                return (0, utils_1.UnAuthorized)(res, err);
            }
        });
        this.DeleteColor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield model_1.Colors.findByIdAndDelete({ _id: req.params.id });
                return (0, utils_1.Ok)(res, "color is deleted");
            }
            catch (err) {
                return (0, utils_1.UnAuthorized)(res, err);
            }
        });
        this.CreateMultiColors = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { colors } = req.body;
                if (!colors) {
                    return (0, utils_1.UnAuthorized)(res, "define array");
                }
                yield model_1.Colors.insertMany(colors);
                return (0, utils_1.Ok)(res, "uploaded");
            }
            catch (err) {
                return (0, utils_1.UnAuthorized)(res, err);
            }
        });
    }
}
exports.ColorController = new ColorControllers();
