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
exports.EmployeeController = void 0;
const utils_1 = require("../utils");
const model_1 = require("../model");
const interface_1 = require("../interface");
const mongodb_1 = require("mongodb");
class EmployeeControllers {
    constructor() {
        this.GetAllEmployees = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const verify = (0, utils_1.verifyToken)(token);
                const employees = yield model_1.BranchEmployee.find({ dealerId: verify.id }).populate("role");
                return (0, utils_1.Ok)(res, employees);
            }
            catch (err) {
                return (0, utils_1.UnAuthorized)(res, err);
            }
        });
        this.GetAllMyEmployees = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const verify = (0, utils_1.verifyToken)(token);
                const branchId = req.params.branchId;
                const employees = yield model_1.BranchEmployee.find({ dealerId: verify.id, branchId });
                return (0, utils_1.Ok)(res, employees);
            }
            catch (err) {
                return (0, utils_1.UnAuthorized)(res, err);
            }
        });
        this.NewBranchEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { branchId, email, fullName, image, mobile, password, role } = req.body;
                const token = req.headers.authorization;
                const verify = (0, utils_1.verifyToken)(token);
                const newEmployee = yield new model_1.BranchEmployee({
                    branchId,
                    email,
                    fullName,
                    image,
                    mobile,
                    password,
                    role,
                    dealerId: verify.id,
                }).save();
                return (0, utils_1.Ok)(res, `${newEmployee.fullName} is registered`);
            }
            catch (err) {
                return (0, utils_1.UnAuthorized)(res, err);
            }
        });
        this.UpdateBranchEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updateBranchEmployee = yield model_1.BranchEmployee.findById({ _id: req.params.id }, { $set: Object.assign({}, req.body) });
                return (0, utils_1.Ok)(res, "branch employee details updated");
            }
            catch (err) {
                return (0, utils_1.UnAuthorized)(res, err);
            }
        });
        this.DeleteBranchEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const verify = (0, utils_1.verifyToken)(token);
                const branchEmployee = yield model_1.BranchEmployee.findById({ _id: new mongodb_1.ObjectId(req.params.id) });
                if (verify.id !== (branchEmployee === null || branchEmployee === void 0 ? void 0 : branchEmployee.dealerId)) {
                    return (0, utils_1.UnAuthorized)(res, interface_1.SERVER_MESSAGES.ACCESS_DENIED);
                }
                yield model_1.BranchEmployee.findByIdAndDelete({ _id: new mongodb_1.ObjectId(branchEmployee === null || branchEmployee === void 0 ? void 0 : branchEmployee._id) });
                return (0, utils_1.Ok)(res, "branch employee deleted");
            }
            catch (err) {
                return (0, utils_1.UnAuthorized)(res, err);
            }
        });
    }
}
exports.EmployeeController = new EmployeeControllers();
