"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidationRule = void 0;
const express_validator_1 = require("express-validator");
exports.BookingValidationRule = [
    // Vehicle validation
    (0, express_validator_1.body)("vehicle.selectedColor").isString().withMessage("Selected color must be a string"),
    (0, express_validator_1.body)("vehicle.chaseNo").isString().notEmpty().withMessage("Chase No is required and must be a string"),
    (0, express_validator_1.body)("vehicle.engineNo").isString().notEmpty().withMessage("Engine No is required and must be a string"),
    (0, express_validator_1.body)("vehicle.manufacturingYear").notEmpty().withMessage("Manufacturing Year is required and must be a string"),
    (0, express_validator_1.body)("vehicle.milage").isString().notEmpty().withMessage("Milage is required and must be a string"),
    (0, express_validator_1.body)("vehicle.vehicleId").isString().notEmpty().withMessage("Vehicle ID is required and must be a string"),
    // Exchange validation
    (0, express_validator_1.body)("exchange.exchangedVehicleChaseNo")
        .isString()
        .withMessage("Exchanged Vehicle Chase No is required and must be a string"),
    (0, express_validator_1.body)("exchange.exchangedVehicleColor")
        .isString()
        .withMessage("Exchanged Vehicle Color is required and must be a string"),
    (0, express_validator_1.body)("exchange.exchangedVehicleEngineNo")
        .isString()
        .withMessage("Exchanged Vehicle Engine No is required and must be a string"),
    (0, express_validator_1.body)("exchange.exchangedVehicleFuelType")
        .isString()
        .withMessage("Exchanged Vehicle Fuel Type is required and must be a string"),
    (0, express_validator_1.body)("exchange.exchangedVehicleManufacturing")
        .isString()
        .withMessage("Exchanged Vehicle Manufacturing Year is required and must be a string"),
    (0, express_validator_1.body)("exchange.exchangedVehicleMilage")
        .isString()
        .withMessage("Exchanged Vehicle Milage is required and must be a string"),
    (0, express_validator_1.body)("exchange.exchangedVehicleName")
        .isString()
        .withMessage("Exchanged Vehicle Name is required and must be a string"),
    // Bank validation
    (0, express_validator_1.body)("bank.loanAmount").isString().withMessage("Loan Amount is required and must be a string"),
    (0, express_validator_1.body)("bank.bankName").isString().withMessage("Bank Name must be a string"),
    (0, express_validator_1.body)("bank.tenuredMonths").isString().withMessage("Tenured Months is required and must be a string"),
    (0, express_validator_1.body)("bank.installmentAmount").isString().withMessage("Installment Amount is required and must be a string"),
    // Customer validation
    (0, express_validator_1.body)("customer.customerName").isString().notEmpty().withMessage("Customer Name is required and must be a string"),
    (0, express_validator_1.body)("customer.address").isString().notEmpty().withMessage("Address is required and must be a string"),
    (0, express_validator_1.body)("customer.email").isEmail().notEmpty().withMessage("Valid Email is required"),
    (0, express_validator_1.body)("customer.mobile").isString().notEmpty().withMessage("Mobile number is required and must be a string"),
    // Signature validation
    (0, express_validator_1.body)("signature.customerSignature")
        .isString()
        .notEmpty()
        .withMessage("Customer Signature is required and must be a string"),
    (0, express_validator_1.body)("signature.dealerSignature")
        .isString()
        .notEmpty()
        .withMessage("Dealer Signature is required and must be a string"),
    // Billing validation
    (0, express_validator_1.body)("billing.accessoriesCost")
        .isNumeric()
        .notEmpty()
        .withMessage("Accessories Cost is required and must be a number"),
    (0, express_validator_1.body)("billing.advanceAmount")
        .isNumeric()
        .notEmpty()
        .withMessage("Advance Amount is required and must be a number"),
    (0, express_validator_1.body)("billing.balanceAmount")
        .isNumeric()
        .notEmpty()
        .withMessage("Balance Amount is required and must be a number"),
    (0, express_validator_1.body)("billing.dealDate").notEmpty().withMessage("Deal Date is required and must be a valid date"),
    (0, express_validator_1.body)("billing.gst").isString().notEmpty().withMessage("GST is required and must be a string"),
    (0, express_validator_1.body)("billing.lessExchange").isNumeric().notEmpty().withMessage("Less Exchange is required and must be a number"),
    (0, express_validator_1.body)("billing.rtoCharge").isNumeric().notEmpty().withMessage("RTO Charge is required and must be a number"),
    (0, express_validator_1.body)("billing.vehiclePrice").isNumeric().notEmpty().withMessage("Vehicle Price is required and must be a number"),
];
