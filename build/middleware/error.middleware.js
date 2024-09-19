"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const interface_1 = require("../interface");
const errorHandler = (err, _, res, next) => {
    if (err.name === "ApiError") {
        return res.status(interface_1.STATUS_CODES.BAD_REQUEST).json({
            success: false,
            status_code: interface_1.STATUS_CODES.BAD_REQUEST,
            message: err.message,
        });
    }
    if (err.name === "AuthError") {
        return res.status(interface_1.STATUS_CODES.UNAUTHORIZED).json({
            success: false,
            status_code: interface_1.STATUS_CODES.UNAUTHORIZED,
            message: err.message,
        });
    }
    if (err instanceof Error) {
        return res.status(interface_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            status_code: interface_1.STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
        });
    }
    next();
};
exports.errorHandler = errorHandler;
