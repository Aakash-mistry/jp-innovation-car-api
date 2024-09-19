import { body } from "express-validator";

export const BookingValidationRule = [
     // Vehicle validation
     body("vehicle.selectedColor").isString().withMessage("Selected color must be a string"),
     body("vehicle.chaseNo").isString().notEmpty().withMessage("Chase No is required and must be a string"),
     body("vehicle.engineNo").isString().notEmpty().withMessage("Engine No is required and must be a string"),
     body("vehicle.manufacturingYear").notEmpty().withMessage("Manufacturing Year is required and must be a string"),
     body("vehicle.milage").isString().notEmpty().withMessage("Milage is required and must be a string"),
     body("vehicle.vehicleId").isString().notEmpty().withMessage("Vehicle ID is required and must be a string"),

     // Exchange validation
     body("exchange.exchangedVehicleChaseNo")
          .isString()
          .withMessage("Exchanged Vehicle Chase No is required and must be a string"),
     body("exchange.exchangedVehicleColor")
          .isString()
          .withMessage("Exchanged Vehicle Color is required and must be a string"),
     body("exchange.exchangedVehicleEngineNo")
          .isString()
          .withMessage("Exchanged Vehicle Engine No is required and must be a string"),
     body("exchange.exchangedVehicleFuelType")
          .isString()
          .withMessage("Exchanged Vehicle Fuel Type is required and must be a string"),
     body("exchange.exchangedVehicleManufacturing")
          .isString()
          .withMessage("Exchanged Vehicle Manufacturing Year is required and must be a string"),
     body("exchange.exchangedVehicleMilage")
          .isString()
          .withMessage("Exchanged Vehicle Milage is required and must be a string"),
     body("exchange.exchangedVehicleName")
          .isString()
          .withMessage("Exchanged Vehicle Name is required and must be a string"),

     // Bank validation
     body("bank.loanAmount").isString().withMessage("Loan Amount is required and must be a string"),
     body("bank.bankName").isString().withMessage("Bank Name must be a string"),
     body("bank.tenuredMonths").isString().withMessage("Tenured Months is required and must be a string"),
     body("bank.installmentAmount").isString().withMessage("Installment Amount is required and must be a string"),

     // Customer validation
     body("customer.customerName").isString().notEmpty().withMessage("Customer Name is required and must be a string"),
     body("customer.address").isString().notEmpty().withMessage("Address is required and must be a string"),
     body("customer.email").isEmail().notEmpty().withMessage("Valid Email is required"),
     body("customer.mobile").isString().notEmpty().withMessage("Mobile number is required and must be a string"),

     // Signature validation
     body("signature.customerSignature")
          .isString()
          .notEmpty()
          .withMessage("Customer Signature is required and must be a string"),
     body("signature.dealerSignature")
          .isString()
          .notEmpty()
          .withMessage("Dealer Signature is required and must be a string"),

     // Billing validation
     body("billing.accessoriesCost")
          .isNumeric()
          .notEmpty()
          .withMessage("Accessories Cost is required and must be a number"),
     body("billing.advanceAmount")
          .isNumeric()
          .notEmpty()
          .withMessage("Advance Amount is required and must be a number"),
     body("billing.balanceAmount")
          .isNumeric()
          .notEmpty()
          .withMessage("Balance Amount is required and must be a number"),
     body("billing.dealDate").notEmpty().withMessage("Deal Date is required and must be a valid date"),
     body("billing.gst").isString().notEmpty().withMessage("GST is required and must be a string"),
     body("billing.lessExchange").isNumeric().notEmpty().withMessage("Less Exchange is required and must be a number"),
     body("billing.rtoCharge").isNumeric().notEmpty().withMessage("RTO Charge is required and must be a number"),
     body("billing.vehiclePrice").isNumeric().notEmpty().withMessage("Vehicle Price is required and must be a number"),
];
