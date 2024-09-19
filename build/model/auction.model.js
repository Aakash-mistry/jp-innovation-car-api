"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bids = exports.Auction = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bidSchema = new mongoose_1.default.Schema({
    amount: { type: mongoose_1.default.Schema.Types.Number, required: true },
    username: { type: mongoose_1.default.Schema.Types.String, required: true },
    email: { type: mongoose_1.default.Schema.Types.String, required: true },
    phone: { type: mongoose_1.default.Schema.Types.String, required: true },
    timestamp: { type: mongoose_1.default.Schema.Types.Date, required: true },
}, {
    timestamps: true,
});
const auctionSchema = new mongoose_1.default.Schema({
    item: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Stock", required: true },
    duration: {
        start: { type: mongoose_1.default.Schema.Types.Date, required: true },
        end: { type: mongoose_1.default.Schema.Types.Date, required: true },
    },
    startingPrice: { type: mongoose_1.default.Schema.Types.Number, required: true },
    currentPrice: { type: mongoose_1.default.Schema.Types.Number, required: true },
    bids: [bidSchema],
}, {
    timestamps: true,
});
exports.Auction = mongoose_1.default.model("Auction", auctionSchema);
exports.Bids = mongoose_1.default.model("Bid", bidSchema);
