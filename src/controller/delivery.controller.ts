import { Request, Response } from "express";
import { generateOTP, Ok, UnAuthorized, verifyToken } from "../utils";
import { Booking, BranchEmployee, Delivery, DeliveryOption, Stock } from "../model";
import { ObjectId } from "mongodb";
import nodemailer from "nodemailer";
import path from "path";

class DeliveryControllers {
     private handleError(res: Response, err: unknown) {
          const message = (err as Error).message || (err as unknown as string);
          return UnAuthorized(res, message);
     }
     AllotGatePass = async (req: Request, res: Response) => {
          try {
               const { bookingId, stockId, dealerId, employeeId, optionId, status, deliveryType } = req.body;

               const deliveryExist = await Delivery.findOne({
                    bookingId,
                    stockId,
                    dealerId,
                    employeeId,
                    optionId,
                    status,
                    deliveryType,
               });

               if (deliveryExist) {
                    return UnAuthorized(res, "Gate Pass Already Alloted");
               }

               const employee = await BranchEmployee.findByIdAndUpdate(
                    { _id: new ObjectId(`${employeeId}`) },
                    { $set: { available: false } },
                    { new: true },
               );
               const stock = await Stock.findByIdAndUpdate(
                    { _id: new ObjectId(`${stockId}`) },
                    { $set: { status: "dispatched_delivery" } },
                    { new: true },
               );
               const booking = await Booking.findByIdAndUpdate(
                    { _id: new ObjectId(`${bookingId}`) },
                    { $set: { status: "dispatched_delivery" } },
                    { new: true },
               );
               const deliveryOption = await DeliveryOption.findByIdAndUpdate(
                    { _id: new ObjectId(`${optionId}`) },
                    { $set: { status: "dispatched_delivery" } },
                    { new: true },
               );

               const driverOtp = generateOTP();
               const customerOtp = generateOTP();
               if (driverOtp || customerOtp || employee || stock || booking || deliveryOption) {
                    const transporter = nodemailer.createTransport({
                         service: "gmail",
                         port: 465,
                         secure: true,
                         auth: {
                              user: "mistryaksh1998@gmail.com",
                              pass: "brexgtluroolwwcf",
                         },
                    });

                    transporter.sendMail(
                         {
                              from: "dealershipsoftware2024@gmail.com",
                              to: booking?.customer.email,
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

      <div class="otp">${customerOtp}</div>

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
                                   return console.log("MAIL SENT SUCCESSFULLY TO CUSTOMER", booking?.customer.email);
                              }
                         },
                    );
                    deliveryType === "delivery" &&
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
                                        return console.log("MAIL SENT SUCCESSFULLY TO DRIVER", employee?.email);
                                   }
                              },
                         );

                    const newDelivery = await new Delivery({
                         bookingId,
                         dealerId,
                         employeeId,
                         otp: {
                              customer: customerOtp,
                              driver: driverOtp,
                         },
                         optionId,
                         status: "otp_sent",
                         stockId,
                    }).save();

                    return Ok(res, `Delivery Configred Successfully, please check the delivery page for status`);
               }
          } catch (err) {
               return this.handleError(res, err);
          }
     };

     GetDeliveryList = async (req: Request, res: Response) => {
          try {
               const token = req.headers.authorization;
               const verify = verifyToken(token as string);
               const deliveries = await Delivery.find({ dealerId: verify.id })
                    .populate("employeeId")
                    .populate({
                         path: "stockId",
                         model: "Stock",
                         populate: [
                              {
                                   path: "model",
                              },
                              {
                                   path: "brand",
                              },
                              {
                                   path: "variant",
                              },
                              {
                                   path: "color",
                              },
                         ],
                    })
                    .populate("bookingId")
                    .populate("dealerId")
                    .sort({ createdAt: -1 });
               return Ok(res, deliveries);
          } catch (err) {
               return this.handleError(res, err);
          }
     };

     VerifyDriverForDelivery = async (req: Request, res: Response) => {
          try {
               const { deliveryId, otp, type } = req.body;
               const delivery = await Delivery.findById({ _id: new ObjectId(`${deliveryId}`) });
               if (type === "driver") {
                    if (delivery?.otp?.driver === otp) {
                         await Delivery.findByIdAndUpdate(
                              { _id: delivery?._id },
                              {
                                   $set: {
                                        verification: {
                                             driver: true,
                                        },
                                        status: "out_for_delivery",
                                   },
                              },
                         );
                         return Ok(res, "Delivery By Driver Is Confirmed");
                    } else {
                         return UnAuthorized(res, "Invalid OTP");
                    }
               } else {
                    return UnAuthorized(res, "invalid type found");
               }
          } catch (err) {
               console.log(err);
               return this.handleError(res, err);
          }
     };
     VerifyCustomerForDelivery = async (req: Request, res: Response) => {
          try {
               const { deliveryId, otp, type } = req.body;
               const delivery = await Delivery.findById({ _id: new ObjectId(`${deliveryId}`) });
               if (type === "customer") {
                    if (delivery?.otp?.customer === otp) {
                         await Delivery.findByIdAndUpdate(
                              { _id: delivery?._id },
                              {
                                   $set: {
                                        verification: {
                                             customer: true,
                                             driver: true,
                                        },
                                        status: "delivered",
                                   },
                              },
                         );
                         return Ok(res, "Delivery By Customer Is Confirmed");
                    } else {
                         return UnAuthorized(res, "Invalid OTP");
                    }
               } else {
                    return UnAuthorized(res, "invalid type found");
               }
          } catch (err) {
               return this.handleError(res, err);
          }
     };
}

export const DeliveryController = new DeliveryControllers();
