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
const utils_1 = require("../utils");
class MasterController {
    constructor(service) {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const existData = yield this.service.findOne(req.body.label);
                if (existData === null || existData === void 0 ? void 0 : existData._id) {
                    return (0, utils_1.UnAuthorized)(res, "DATA_ALREADY_EXIST");
                }
                else {
                    const data = yield this.service.create(req.body);
                    return (0, utils_1.Ok)(res, `DATA_CREATED`);
                }
            }
            catch (error) {
                return (0, utils_1.UnAuthorized)(res, error);
            }
        });
        this.findAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.service.findAll();
                return (0, utils_1.Ok)(res, data);
            }
            catch (error) {
                return (0, utils_1.UnAuthorized)(res, error);
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.service.update(req.params.id, req.body);
                if (!data) {
                    return res.status(404).json({ message: "Not found" });
                }
                return (0, utils_1.Ok)(res, data);
            }
            catch (error) {
                return (0, utils_1.UnAuthorized)(res, error);
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.service.delete(req.params.id);
                if (!data) {
                    return (0, utils_1.NotFound)(res, "no data found");
                }
                return (0, utils_1.Ok)(res, "Deleted successfully");
            }
            catch (error) {
                return (0, utils_1.UnAuthorized)(res, error);
            }
        });
        this.service = service;
    }
}
exports.default = MasterController;
