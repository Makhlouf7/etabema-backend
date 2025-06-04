import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
} from "../Controllers/order.controller.js";
import {
  authencatication,
  restrictTo,
} from "../Middelwares/auth.middelware.js";

let orderRoutes = express.Router();

orderRoutes.route("/").get(getAllOrders);
orderRoutes.route("/:id").get(getOrderById);

orderRoutes.use(authencatication, restrictTo("admin"));
orderRoutes.route("/create-order").post(createOrder);

orderRoutes.route("/:id").delete(deleteOrder).patch(updateOrder);

export default orderRoutes;
