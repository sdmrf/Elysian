// Imports
import express from "express";

// Instance of router
const router = express.Router();

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
router.route("/placeNewOrder").post(verifyToken, placeNewOrder);
router.route("/getAllOrders").get(verifyToken, adminAuthHandler, getAllOrders);
router.route("/myOrders").get(verifyToken, myOrders);
router.route("/getSingleOrder/:id").get(verifyToken, getSingleOrder);
router.route("/processOrder/:id").put(verifyToken, adminAuthHandler, processOrder);
router.route("/cancelOrder/:id").put(verifyToken, cancelOrder);


// Exporting the router
export default router;
