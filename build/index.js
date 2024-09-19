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
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const morgan_1 = __importDefault(require("morgan"));
const socket_io_1 = require("socket.io");
const routes_1 = require("./routes");
const utils_1 = require("./utils");
const dotenv_1 = require("dotenv");
const middleware_1 = require("./middleware");
const passport_1 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
const auction_model_1 = require("./model/auction.model");
(0, dotenv_1.configDotenv)({});
const API_ENDPOINT = process.env.API_ENDPOINT;
const app = (0, express_1.default)();
const port = 8080;
const httpServer = http_1.default.createServer(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
    },
});
io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
    io.emit("connection");
    const emitAuctionsList = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const auctions = yield auction_model_1.Auction.find()
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
        }
        catch (error) {
            console.error("Error fetching auctions list:", error);
        }
    });
    // Emit auctions list when a new client connects
    emitAuctionsList();
    socket.on("newAuction", (_a) => __awaiter(void 0, [_a], void 0, function* ({ currentPrice: currentPrice, duration, item: item, startingPrice: startingPrice }) {
        const auction = yield new auction_model_1.Auction({
            currentPrice,
            duration,
            item,
            startingPrice,
        }).save();
        io.emit("updateAuction", auction);
    }));
    socket.on("newBid", (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, amount, email, phone, username }) {
        if (id) {
            try {
                const auction = yield auction_model_1.Auction.findById({ _id: id });
                if (auction) {
                    const updatedAuction = yield auction_model_1.Auction.findByIdAndUpdate(id, {
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
                    }, { new: true });
                    if (updatedAuction) {
                        const latestAuction = yield auction_model_1.Auction.find().sort({ createdAt: -1 });
                        io.emit("auctionsList", latestAuction);
                        io.emit("updateAuction", updatedAuction);
                    }
                }
            }
            catch (error) {
                console.error("Error updating auction with new bid:", error);
            }
        }
    }));
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
}));
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use((0, morgan_1.default)("dev"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(`${API_ENDPOINT}`, routes_1.BaseRouter);
app.use(`${API_ENDPOINT}`, routes_1.AdminAuthRouter);
app.use(`${API_ENDPOINT}`, routes_1.MasterRoute);
app.use(`${API_ENDPOINT}`, routes_1.CatalogueRoute);
app.use(`${API_ENDPOINT}`, routes_1.DealerRoute);
app.use(`${API_ENDPOINT}`, routes_1.BranchRouter);
app.use(`${API_ENDPOINT}`, routes_1.BranchEmployeeRoute);
app.use(`${API_ENDPOINT}`, routes_1.StockRoute);
app.use(`${API_ENDPOINT}`, routes_1.LeadRoute);
app.use(`${API_ENDPOINT}`, routes_1.EnquiryRoute);
app.use(`${API_ENDPOINT}`, routes_1.BookingRouter);
app.use(`${API_ENDPOINT}`, routes_1.FollowUpRouter);
app.use(`${API_ENDPOINT}`, routes_1.DeliveryOptionRoute);
app.use(`${API_ENDPOINT}`, routes_1.GetPassRouter);
app.use(`${API_ENDPOINT}`, routes_1.TestDriveRouter);
app.use(`${API_ENDPOINT}`, routes_1.CarSellRoute);
app.use(`${API_ENDPOINT}`, routes_1.PackageRoute);
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
// app.use(LoggerService);
app.use(middleware_1.errorHandler);
app.use(middleware_1.notFoundMiddleware);
(0, utils_1.database)("mongodb+srv://akaashmistry:kjGDG7QLOjZB0nBf@car-project.aqr9k.mongodb.net/?retryWrites=true&w=majority&appName=car-project");
httpServer.listen(port, () => {
    console.log(`car service running on port ${port}`);
});
