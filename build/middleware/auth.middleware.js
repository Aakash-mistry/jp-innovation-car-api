"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authAdminMiddleware = void 0;
const passport_1 = __importDefault(require("passport"));
exports.authAdminMiddleware = passport_1.default.authenticate("admin", { session: false });
