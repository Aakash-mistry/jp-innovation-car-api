import { Request, Response } from "express";
import { Ok, UnAuthorized } from "../utils";
import { DeliveryOption } from "../model";
import { IBookingProps, IDeliveryOptionProps, SERVER_MESSAGES } from "../interface";

class DeliveryOptionControllers {
     private handleError(res: Response, err: unknown) {
          const message = (err as Error).message || (err as unknown as string);
          return UnAuthorized(res, message);
     }

     GetDeliveryOption = async (req: Request, res: Response) => {
          try {
               const deliveryOption = await DeliveryOption.findOne({ bookingId: req.params.bookingId })
                    .populate({
                         path: "bookingId",
                         model: "Booking",
                    })
                    .populate({
                         path: "stockId",
                         model: "Stock",
                    })
                    .populate({
                         path: "dealerId",
                         model: "Dealer",
                    });
               if (!deliveryOption) {
                    return UnAuthorized(res, SERVER_MESSAGES.DATA_NOT_EXIST);
               }
               // Calculate the percentage of options with "yes" status
               const options = deliveryOption.options || [];
               const yesCount = options.reduce((count, option) => {
                    return option.status === "yes" ? count + 1 : count;
               }, 0);
               const percentage = (yesCount / options.length) * 100;
               return Ok(res, {
                    deliveryOption,
                    percentage,
               });
          } catch (err) {
               this.handleError(res, err);
          }
     };

     CreateDeliveryOptions = async (req: Request, res: Response) => {
          try {
               const { bookingId, dealerId, options, stockId }: IDeliveryOptionProps = req.body;

               const deliveryOption = await DeliveryOption.findOne({ bookingId: req.body.bookingId })
                    .populate({
                         path: "bookingId",
                         model: "Booking",
                    })
                    .populate({
                         path: "stockId",
                         model: "Stock",
                    })
                    .populate({
                         path: "dealerId",
                         model: "Dealer",
                    });
               if (deliveryOption) {
                    deliveryOption.options = options;
                    await deliveryOption.save();
                    return Ok(res, `${(bookingId as unknown as IBookingProps)?.customer?.customerName} is updated`);
               }

               await new DeliveryOption({
                    bookingId,
                    dealerId,
                    options,
                    stockId,
               }).save();
               return Ok(res, `${(bookingId as unknown as IBookingProps)?.customer?.customerName} is created`);
          } catch (err) {
               return this.handleError(res, err);
          }
     };
}

export const DeliveryOptionController = new DeliveryOptionControllers();
