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
exports.BranchController = void 0;
const utils_1 = require("../utils");
const model_1 = require("../model");
const interface_1 = require("../interface");
const mongodb_1 = require("mongodb");
class BranchControllers {
    constructor() {
        this.GetMyRoles = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const verify = (0, utils_1.verifyToken)(token);
                const role = yield model_1.Role.find({ dealerId: verify.id });
                return (0, utils_1.Ok)(res, role);
            }
            catch (err) {
                return (0, utils_1.UnAuthorized)(res, err);
            }
        });
        this.CreateRole = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { label } = req.body;
                const token = req.headers.authorization;
                const verify = (0, utils_1.verifyToken)(token);
                const role = yield model_1.Role.findOne({ label: label });
                if (role) {
                    return (0, utils_1.UnAuthorized)(res, interface_1.SERVER_MESSAGES.DATA_EXIST);
                }
                const newRole = yield new model_1.Role({ dealerId: verify.id, label: label }).save();
                return (0, utils_1.Ok)(res, `${newRole.label} is created`);
            }
            catch (err) {
                return (0, utils_1.UnAuthorized)(res, err);
            }
        });
        this.UpdateRole = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { label } = req.body;
                const token = req.headers.authorization;
                const verify = (0, utils_1.verifyToken)(token);
                const role = yield model_1.Role.findOne({ label: label });
                if ((role === null || role === void 0 ? void 0 : role.dealerId) !== verify.id) {
                    return (0, utils_1.UnAuthorized)(res, interface_1.SERVER_MESSAGES.ACCESS_DENIED);
                }
                const newRole = yield model_1.Role.findByIdAndUpdate({ _id: role === null || role === void 0 ? void 0 : role._id }, { $set: { dealerId: verify.id, label: label } });
                return (0, utils_1.Ok)(res, `role is updated`);
            }
            catch (err) {
                return (0, utils_1.UnAuthorized)(res, err);
            }
        });
        this.DeleteRole = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const token = req.headers.authorization;
                const verify = (0, utils_1.verifyToken)(token);
                const role = yield model_1.Role.findOne({ _id: new mongodb_1.ObjectId(id) });
                if (new mongodb_1.ObjectId(role === null || role === void 0 ? void 0 : role.dealerId).toString() !== verify.id) {
                    return (0, utils_1.UnAuthorized)(res, interface_1.SERVER_MESSAGES.ACCESS_DENIED);
                }
                const DeleteRole = yield model_1.Role.findByIdAndDelete({ _id: role === null || role === void 0 ? void 0 : role._id });
                return (0, utils_1.Ok)(res, "role is deleted");
            }
            catch (err) {
                console.log(err);
                return (0, utils_1.UnAuthorized)(res, err);
            }
        });
        this.GetMyBranches = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const verify = (0, utils_1.verifyToken)(token);
                const branches = yield model_1.Branch.find({ dealerId: verify.id });
                return (0, utils_1.Ok)(res, branches);
            }
            catch (err) {
                console.log(err);
                return (0, utils_1.UnAuthorized)(res, err);
            }
        });
        this.CreateNewBranch = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { address, branchRole, city, dealerId, email, phone, state, transactionCount, zip, branchName, photo, } = req.body;
                const newBranch = yield new model_1.Branch({
                    address,
                    branchRole,
                    city,
                    dealerId,
                    email,
                    phone,
                    state,
                    transactionCount,
                    zip,
                    branchName,
                    photo,
                }).save();
                return (0, utils_1.Ok)(res, `${newBranch.branchName} is uploaded`);
            }
            catch (err) {
                return (0, utils_1.UnAuthorized)(res, err);
            }
        });
        this.UpdateBranch = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { label } = req.body;
                const token = req.headers.authorization;
                const verify = (0, utils_1.verifyToken)(token);
                const branch = yield model_1.Branch.findOne({ label: label });
                if ((branch === null || branch === void 0 ? void 0 : branch.dealerId) !== verify.id) {
                    return (0, utils_1.UnAuthorized)(res, interface_1.SERVER_MESSAGES.ACCESS_DENIED);
                }
                yield model_1.Branch.findByIdAndUpdate({ _id: req.params.id }, { $set: Object.assign({}, req.body) });
                return (0, utils_1.Ok)(res, "branch is updated");
            }
            catch (err) {
                return (0, utils_1.UnAuthorized)(res, err);
            }
        });
        this.DeleteBranch = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { label } = req.body;
                const token = req.headers.authorization;
                const verify = (0, utils_1.verifyToken)(token);
                const branch = yield model_1.Branch.findOne({ label: label });
                if ((branch === null || branch === void 0 ? void 0 : branch.dealerId) !== verify.id) {
                    return (0, utils_1.UnAuthorized)(res, interface_1.SERVER_MESSAGES.ACCESS_DENIED);
                }
                yield model_1.Branch.findByIdAndDelete({ _id: req.params.id });
                return (0, utils_1.Ok)(res, "branch is deleted");
                return;
            }
            catch (err) {
                return (0, utils_1.UnAuthorized)(res, err);
            }
        });
    }
}
exports.BranchController = new BranchControllers();
