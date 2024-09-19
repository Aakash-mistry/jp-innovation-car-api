import { Request, Response } from "express";
import { Booking, BranchEmployee, GetPass } from "../model";
import { generateOTP, Ok, UnAuthorized, verifyToken } from "../utils";
import { IGetPassProps, SERVER_MESSAGES } from "../interface";
import nodemailer from "nodemailer";
import { ObjectId } from "mongodb";
import { populate } from "dotenv";

class GetPassControllers {
     private handleError(res: Response, err: unknown) {
          const message = (err as Error).message || (err as unknown as string);
          return UnAuthorized(res, message);
     }

     GetMyPasses = async (req: Request, res: Response) => {
          try {
               const token: string = req.headers.authorization as string;
               const verify = verifyToken(token);
               const getPass = await GetPass.find({ dealerId: verify.id })
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

               return Ok(res, getPass);
          } catch (err) {
               return this.handleError(res, err);
          }
     };

     getGatePassById = async (req: Request, res: Response) => {
          try {
               const getPass = await GetPass.findById({ _id: req.params.id })
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

               return Ok(res, getPass);
          } catch (err) {
               return this.handleError(res, err);
          }
     };

     CreateGetPass = async (req: Request, res: Response) => {
          try {
               const { bookingId, customerMail, dealerId, driverId, otp, otpType, sentOn, status }: IGetPassProps =
                    req.body;

               const getPassExist = await GetPass.findOne({ bookingId, customerMail });
               const employee = await BranchEmployee.findOne({ _id: new ObjectId(driverId as string) });
               if (getPassExist) {
                    return UnAuthorized(res, SERVER_MESSAGES.DATA_EXIST);
               }

               const customerOtp: string = generateOTP();
               const driverOtp: string = generateOTP();

               const transporter = nodemailer.createTransport({
                    host: "smtp.ethereal.email",
                    port: 587,
                    secure: false,
                    auth: {
                         user: "mistryaksh1998@gmail.com",
                         pass: "ggbddhitcaaybzdq",
                    },
               });

               const newGetPass = await new GetPass({
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

               transporter.sendMail(
                    {
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
                    },
                    (err, response) => {
                         if (err) {
                              console.log(err);
                         } else {
                              return console.log(response);
                         }
                    },
               );
               transporter.sendMail(
                    {
                         from: "dealershipsoftware2024@gmail.com",
                         to: employee?.email,
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
                    },
                    (err, response) => {
                         if (err) {
                              console.log(err);
                         } else {
                              return console.log(response);
                         }
                    },
               );

               return Ok(
                    res,
                    `email sent to this mail ${newGetPass.otpType === "customer_driver" ? "customer & driver" : newGetPass.customerMail}`,
               );
          } catch (err) {
               return this.handleError(res, err);
          }
     };

     UpdateGetPass = async (req: Request, res: Response) => {
          try {
               const update = await GetPass.findOneAndUpdate(
                    { _id: new ObjectId(req.params.id as string) },
                    { $set: { ...req.body } },
               );
               const booking = await Booking.findByIdAndUpdate({ _id: update?.bookingId }, { status: "delivered" });
               return Ok(res, `data updated`);
          } catch (err) {
               return this.handleError(res, err);
          }
     };
}

export const GetPassController = new GetPassControllers();
