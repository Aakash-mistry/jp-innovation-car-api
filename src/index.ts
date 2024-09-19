import bodyParser from "body-parser";
import express, { Express } from "express";
import http from "http";
import morgan from "morgan";
import { Server } from "socket.io";
import {
     AdminAuthRouter,
     BaseRouter,
     MasterRoute,
     CatalogueRoute,
     DealerRoute,
     BranchRouter,
     BranchEmployeeRoute,
     StockRoute,
     LeadRoute,
     EnquiryRoute,
     FollowUpRouter,
     BookingRouter,
     DeliveryOptionRoute,
     GetPassRouter,
     TestDriveRouter,
     CarSellRoute,
     PackageRoute,
} from "./routes";
import { database } from "./utils";
import { configDotenv } from "dotenv";
import { errorHandler, notFoundMiddleware } from "./middleware";
import passport from "passport";
import cors from "cors";
import { Auction } from "./model/auction.model";
import { IAuctionProps, IBidsProps } from "./interface";

configDotenv({});

const API_ENDPOINT: string = process.env.API_ENDPOINT!;
const app: Express = express();
const port: string | number = 8080;
const httpServer: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse> = http.createServer(app);

const io = new Server(httpServer, {
     cors: {
          origin: "*",
     },
});

io.on("connection", async (socket) => {
     io.emit("connection");
     const emitAuctionsList = async () => {
          try {
               const auctions = await Auction.find()
                    .populate({
                         path: "item",
                         select: "-dealerId",
                         model: "Stock",
                         populate: [
                              {
                                   path: "brandId",
                              },
                              {
                                   path: "variantId",
                              },
                              {
                                   path: "engineNo",
                              },
                              {
                                   path: "fuelTypeId",
                              },
                              {
                                   path: "cardId",
                                   populate: "carModel",
                              },
                         ],
                    })
                    .sort({ createdAt: -1 }); // Fetch all auctions
               io.emit("auctionsList", auctions); // Emit to all connected clients
          } catch (error) {
               console.error("Error fetching auctions list:", error);
          }
     };

     // Emit auctions list when a new client connects
     emitAuctionsList();
     socket.on(
          "newAuction",
          async ({ currentPrice: currentPrice, duration, item: item, startingPrice: startingPrice }: IAuctionProps) => {
               const auction = await new Auction({
                    currentPrice,
                    duration,
                    item,
                    startingPrice,
               }).save();

               io.emit("updateAuction", auction);
          },
     );
     socket.on("newBid", async ({ id, amount, email, phone, username }: IBidsProps) => {
          if (id) {
               try {
                    const auction = await Auction.findById({ _id: id });
                    if (auction) {
                         const updatedAuction = await Auction.findByIdAndUpdate(
                              id,
                              {
                                   $push: {
                                        bids: {
                                             amount,
                                             email,
                                             phone,
                                             username,
                                             timestamp: new Date(),
                                             userId: "abc123",
                                        },
                                   },
                              },
                              { new: true },
                         );
                         if (updatedAuction) {
                              const latestAuction = await Auction.find().sort({ createdAt: -1 });
                              io.emit("auctionsList", latestAuction);
                              io.emit("updateAuction", updatedAuction);
                         }
                    }
               } catch (error) {
                    console.error("Error updating auction with new bid:", error);
               }
          }
     });

     socket.on("disconnect", () => {
          console.log("Client disconnected");
     });
});
app.use(
     cors({
          origin: "*",
     }),
);
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(`${API_ENDPOINT}`, BaseRouter);
app.use(`${API_ENDPOINT}`, AdminAuthRouter);
app.use(`${API_ENDPOINT}`, MasterRoute);
app.use(`${API_ENDPOINT}`, CatalogueRoute);
app.use(`${API_ENDPOINT}`, DealerRoute);
app.use(`${API_ENDPOINT}`, BranchRouter);
app.use(`${API_ENDPOINT}`, BranchEmployeeRoute);
app.use(`${API_ENDPOINT}`, StockRoute);
app.use(`${API_ENDPOINT}`, LeadRoute);
app.use(`${API_ENDPOINT}`, EnquiryRoute);
app.use(`${API_ENDPOINT}`, BookingRouter);
app.use(`${API_ENDPOINT}`, FollowUpRouter);
app.use(`${API_ENDPOINT}`, DeliveryOptionRoute);
app.use(`${API_ENDPOINT}`, GetPassRouter);
app.use(`${API_ENDPOINT}`, TestDriveRouter);
app.use(`${API_ENDPOINT}`, CarSellRoute);
app.use(`${API_ENDPOINT}`, PackageRoute);

app.use(express.json());
app.use(passport.initialize());

// app.use(LoggerService);
app.use(errorHandler);
app.use(notFoundMiddleware);

database(
     "mongodb+srv://akaashmistry:kjGDG7QLOjZB0nBf@car-project.aqr9k.mongodb.net/?retryWrites=true&w=majority&appName=car-project",
);

httpServer.listen(port, () => {
     console.log(`car service running on port ${port}`);
});
