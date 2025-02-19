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
import { emailValidationMiddellware } from "../Middelwares/validation.middelwares.js";

let orderRoutes = express.Router();

orderRoutes.route("/").get(getAllOrders);
orderRoutes.route("/:id").get(getOrderById);

orderRoutes.use(authencatication);
orderRoutes
  .route("/create-order")
  .post(emailValidationMiddellware, createOrder);

orderRoutes
  .route("/:id")
  .delete(restrictTo("admin"), deleteOrder)
  .patch(restrictTo("admin"), emailValidationMiddellware, updateOrder);

export default orderRoutes;
