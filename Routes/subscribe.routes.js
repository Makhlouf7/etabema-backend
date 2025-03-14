import express from "express";
import {
  addSubscriber,
  getAllSubscribers,
  subscriberConfirmed,
  sendToAllSubscribers,
  newsUnsubscribe,
} from "../Controllers/subscribe.controller.js";
const subscribeRoutes = express.Router();

subscribeRoutes.route("/").post(addSubscriber).get(getAllSubscribers);
subscribeRoutes.route("/verify").get(subscriberConfirmed);
subscribeRoutes.route("/unsubscribe").get(newsUnsubscribe);
// Authenticated routes
subscribeRoutes.route("/send").post(sendToAllSubscribers);
export default subscribeRoutes;
