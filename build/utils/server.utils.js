"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Forbidden = exports.UnAuthorized = exports.NotFound = exports.BadRequest = exports.NoContent = exports.Created = exports.Ok = exports.ERROR_MESSAGE = exports.ApiError = exports.AuthError = exports.normalizePort = void 0;
const interface_1 = require("../interface");
const normalizePort = (val) => {
    const normolizedPort = typeof val === "string" ? parseInt(val, 10) : val;
    if (isNaN(normolizedPort)) {
        return val;
    }
    if (normolizedPort >= 0) {
        return normolizedPort;
    }
    return false;
};
exports.normalizePort = normalizePort;
class AuthError extends Error {
    constructor(message) {
        super(message);
        this.name = "AuthError";
    }
}
exports.AuthError = AuthError;
class ApiError extends Error {
    constructor(message) {
        super(message);
        this.name = "ApiError";
    }
}
exports.ApiError = ApiError;
var ERROR_MESSAGE;
(function (ERROR_MESSAGE) {
    ERROR_MESSAGE["INVALID_JWT_TOKEN"] = "Invalid jwt token";
})(ERROR_MESSAGE || (exports.ERROR_MESSAGE = ERROR_MESSAGE = {}));
const Ok = (res, data) => {
    res.status(interface_1.STATUS_CODES.OK).json({
        success: true,
        data,
        status_code: interface_1.RESPONSE_MESSAGE.OK,
    });
};
exports.Ok = Ok;
const Created = (res, data) => {
    res.status(interface_1.STATUS_CODES.CREATED).json({
        success: true,
        data,
        status_code: interface_1.RESPONSE_MESSAGE.CREATED,
    });
};
exports.Created = Created;
const NoContent = (res) => {
    res.status(interface_1.STATUS_CODES.NO_CONTENT).json({
        success: true,
        status_code: interface_1.STATUS_CODES.NO_CONTENT,
    });
};
exports.NoContent = NoContent;
const BadRequest = (res, message) => {
    res.status(interface_1.STATUS_CODES.BAD_REQUEST).json({
        success: false,
        status_code: interface_1.STATUS_CODES.BAD_REQUEST,
        message,
    });
};
exports.BadRequest = BadRequest;
const NotFound = (res, message) => {
    res.status(interface_1.STATUS_CODES.NOT_FOUND).json({
        success: false,
        status_code: interface_1.STATUS_CODES.NOT_FOUND,
        message,
    });
};
exports.NotFound = NotFound;
const UnAuthorized = (res, message) => {
    res.status(interface_1.STATUS_CODES.UNAUTHORIZED).json({
        success: false,
        status_code: interface_1.STATUS_CODES.UNAUTHORIZED,
        message,
    });
};
exports.UnAuthorized = UnAuthorized;
const Forbidden = (res, message) => {
    res.status(interface_1.STATUS_CODES.FORBIDDEN).json({
        success: false,
        status_code: interface_1.STATUS_CODES.FORBIDDEN,
        message,
    });
};
exports.Forbidden = Forbidden;
