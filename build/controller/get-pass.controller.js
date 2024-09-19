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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPassController = void 0;
const model_1 = require("../model");
const utils_1 = require("../utils");
const interface_1 = require("../interface");
const nodemailer_1 = __importDefault(require("nodemailer"));
const mongodb_1 = require("mongodb");
class GetPassControllers {
    constructor() {
        this.GetMyPasses = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const verify = (0, utils_1.verifyToken)(token);
                const getPass = yield model_1.GetPass.find({ dealerId: verify.id })
                    .populate({
                    path: "bookingId",
                    populate: [
                        {
                            path: "vehicle.selectedColor",
                            model: "Color",
                        },
                        {
                            path: "vehicle.vehicleId",
                            model: "Stock",
                            populate: [
                                {
                                    path: "brandId",
                                    model: "Company",
                                },
                                {
                                    path: "variantId",
                                    model: "Variant",
                                },
                                {
                                    path: "fuelTypeId",
                                    model: "FuelType",
                                },
                                {
                                    path: "cardId",
                                    model: "Catalogue",
                                    populate: {
                                        path: "carModel",
                                        model: "Model",
                                    },
                                },
                            ],
                        },
                    ],
                })
                    .populate({
                    path: "dealerId",
                    model: "Dealer",
                })
                    .populate({
                    path: "driverId",
                    model: "BranchEmployee",
                })
                    .sort({ createdAt: -1 });
                return (0, utils_1.Ok)(res, getPass);
            }
            catch (err) {
                return this.handleError(res, err);
            }
        });
        this.getGatePassById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const getPass = yield model_1.GetPass.findById({ _id: req.params.id })
                    .populate({
                    path: "bookingId",
                    populate: [
                        {
                            path: "vehicle.selectedColor",
                            model: "Color",
                        },
                        {
                            path: "vehicle.vehicleId",
                            model: "Stock",
                            populate: [
                                {
                                    path: "brandId",
                                    model: "Company",
                                },
                                {
                                    path: "variantId",
                                    model: "Variant",
                                },
                                {
                                    path: "fuelTypeId",
                                    model: "FuelType",
                                },
                                {
                                    path: "cardId",
                                    model: "Catalogue",
                                    populate: {
                                        path: "carModel",
                                        model: "Model",
                                    },
                                },
                            ],
                        },
                    ],
                })
                    .populate({
                    path: "dealerId",
                    model: "Dealer",
                })
                    .populate({
                    path: "driverId",
                    model: "BranchEmployee",
                });
                return (0, utils_1.Ok)(res, getPass);
            }
            catch (err) {
                return this.handleError(res, err);
            }
        });
        this.CreateGetPass = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { bookingId, customerMail, dealerId, driverId, otp, otpType, sentOn, status } = req.body;
                const getPassExist = yield model_1.GetPass.findOne({ bookingId, customerMail });
                const employee = yield model_1.BranchEmployee.findOne({ _id: new mongodb_1.ObjectId(driverId) });
                if (getPassExist) {
                    return (0, utils_1.UnAuthorized)(res, interface_1.SERVER_MESSAGES.DATA_EXIST);
                }
                const customerOtp = (0, utils_1.generateOTP)();
                const driverOtp = (0, utils_1.generateOTP)();
                const transporter = nodemailer_1.default.createTransport({
                    host: "smtp.ethereal.email",
                    port: 587,
                    secure: false,
                    auth: {
                        user: "mistryaksh1998@gmail.com",
                        pass: "ggbddhitcaaybzdq",
                    },
                });
                const newGetPass = yield new model_1.GetPass({
                    bookingId,
                    customerMail,
                    dealerId,
                    driverId,
                    otp: {
                        customer: customerOtp,
                        driver: driverOtp,
                    },
                    otpType,
                    sentOn,
                    status,
                }).save();
                transporter.sendMail({
                    from: "dealershipsoftware2024@gmail.com",
                    to: customerMail,
                    subject: "Car Delivery OTP Verification",
                    html: `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Car Delivery OTP Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .header {
      background-color: #1a73e8;
      color: #ffffff;
      text-align: center;
      padding: 20px;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }

    .header h1 {
      margin: 0;
      font-size: 24px;
    }

    .content {
      padding: 20px;
      text-align: center;
    }

    .content h2 {
      font-size: 22px;
      margin: 0 0 10px 0;
      color: #333333;
    }

    .content p {
      font-size: 16px;
      color: #666666;
      line-height: 1.6;
    }

    .otp {
      display: inline-block;
      padding: 15px;
      font-size: 20px;
      color: #ffffff;
      background-color: #1a73e8;
      border-radius: 4px;
      letter-spacing: 4px;
      margin-top: 20px;
    }

    .footer {
      margin-top: 30px;
      font-size: 12px;
      color: #999999;
      text-align: center;
    }

    .footer p {
      margin: 0;
      line-height: 1.6;
    }

    .footer a {
      color: #1a73e8;
      text-decoration: none;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="header">
      <h1>Car Delivery OTP Verification</h1>
    </div>
    <div class="content">
      <h2>Verify Your OTP</h2>
      <p>Dear Customer,</p>
      <p>We are excited to inform you that your car delivery is scheduled soon. To confirm and proceed with the delivery,
        please use the One-Time Password (OTP) below to verify your identity.</p>

      <div class="otp">${customerMail}</div>

      <p>If you didn't request this delivery, please contact our support team immediately.</p>
    </div>
    <div class="footer">
      <p>&copy; 2024 Car Dealership. All rights reserved.</p>
      <p><a href="#">Visit our website</a> | <a href="#">Support</a></p>
    </div>
  </div>
</body>

</html>
`,
                }, (err, response) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        return console.log(response);
                    }
                });
                transporter.sendMail({
                    from: "dealershipsoftware2024@gmail.com",
                    to: employee === null || employee === void 0 ? void 0 : employee.email,
                    subject: "Car Delivery OTP Verification",
                    html: `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Car Delivery OTP Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .header {
      background-color: #1a73e8;
      color: #ffffff;
      text-align: center;
      padding: 20px;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }

    .header h1 {
      margin: 0;
      font-size: 24px;
    }

    .content {
      padding: 20px;
      text-align: center;
    }

    .content h2 {
      font-size: 22px;
      margin: 0 0 10px 0;
      color: #333333;
    }

    .content p {
      font-size: 16px;
      color: #666666;
      line-height: 1.6;
    }

    .otp {
      display: inline-block;
      padding: 15px;
      font-size: 20px;
      color: #ffffff;
      background-color: #1a73e8;
      border-radius: 4px;
      letter-spacing: 4px;
      margin-top: 20px;
    }

    .footer {
      margin-top: 30px;
      font-size: 12px;
      color: #999999;
      text-align: center;
    }

    .footer p {
      margin: 0;
      line-height: 1.6;
    }

    .footer a {
      color: #1a73e8;
      text-decoration: none;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="header">
      <h1>Car Delivery OTP Verification</h1>
    </div>
    <div class="content">
      <h2>Verify Your OTP</h2>
      <p>Dear Driver,</p>
      <p>We are excited to inform you that your car delivery is scheduled soon. To confirm and proceed with the delivery,
        please use the One-Time Password (OTP) below to verify your identity.</p>

      <div class="otp">${driverOtp}</div>

      <p>If you didn't request this delivery, please contact our support team immediately.</p>
    </div>
    <div class="footer">
      <p>&copy; 2024 Car Dealership. All rights reserved.</p>
      <p><a href="#">Visit our website</a> | <a href="#">Support</a></p>
    </div>
  </div>
</body>

</html>
`,
                }, (err, response) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        return console.log(response);
                    }
                });
                return (0, utils_1.Ok)(res, `email sent to this mail ${newGetPass.otpType === "customer_driver" ? "customer & driver" : newGetPass.customerMail}`);
            }
            catch (err) {
                return this.handleError(res, err);
            }
        });
        this.UpdateGetPass = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const update = yield model_1.GetPass.findOneAndUpdate({ _id: new mongodb_1.ObjectId(req.params.id) }, { $set: Object.assign({}, req.body) });
                const booking = yield model_1.Booking.findByIdAndUpdate({ _id: update === null || update === void 0 ? void 0 : update.bookingId }, { status: "delivered" });
                return (0, utils_1.Ok)(res, `data updated`);
            }
            catch (err) {
                return this.handleError(res, err);
            }
        });
    }
    handleError(res, err) {
        const message = err.message || err;
        return (0, utils_1.UnAuthorized)(res, message);
    }
}
exports.GetPassController = new GetPassControllers();
