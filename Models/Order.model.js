import mongoose from "mongoose";

let orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  orderID: {
    type: String,
    unique: true,
    default: Date.now(),
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  status: {
    type: String,
    enum: [
      "confirmed",
      "design",
      "manufacturing",
      "printing",
      "packing",
      "shipped",
    ],
    default: "confirmed",
    required: true,
  },
  ShipmentLink: {
    type: String,
    trim: true,
  },
  ShipmentCode: {
    type: String,
    trim: true,
  },
  messageAr: {
    type: String,
    trim: true,
  },
  messageEn: {
    type: String,
    trim: true,
  },
  messageBr: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

let Order = mongoose.model("Order", orderSchema);
export default Order;
