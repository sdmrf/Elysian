// Imports
import express from "express";

// Instance of orderRouter
const orderRouter = express.Router();

// Importing the controller
import {
  placeNewOrder,
  getAllOrders,
  myOrders,
  getSingleOrder,
  processOrder,
  cancelOrder,
} from "../controllers/order.controller.js";

// Importing middlewares
import { adminAuthHandler } from "../middlewares/auth.middleware.js";
import { verifyToken } from "../middlewares/verify.middleware.js";

// Routes
orderRouter.route("/placeNewOrder").post(verifyToken, placeNewOrder);
orderRouter
  .route("/getAllOrders")
  .get(verifyToken, adminAuthHandler, getAllOrders);
orderRouter.route("/myOrders").get(verifyToken, myOrders);
orderRouter.route("/getSingleOrder/:id").get(verifyToken, getSingleOrder);
orderRouter
  .route("/processOrder/:id")
  .put(verifyToken, adminAuthHandler, processOrder);
orderRouter.route("/cancelOrder/:id").put(verifyToken, cancelOrder);

// Exporting the orderRouter
export { orderRouter };
