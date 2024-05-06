// Imports
import express from "express";

// Instance of router
const paymentsRouter = express.Router();

// Importing the controller
import {
  addCoupon,
  getCoupons,
  getCouponByCode,
  applyCoupon,
  deleteCoupon,
} from "../controllers/coupon.controller.js";

// Importing middlewares
import { adminAuthHandler } from "../middlewares/auth.middleware.js";
import { verifyToken } from "../middlewares/verify.middleware.js";

// Routes
paymentsRouter.post("/addCoupon", verifyToken, adminAuthHandler, addCoupon);
paymentsRouter.get(
  "/getCoupon/:code",
  verifyToken,
  adminAuthHandler,
  getCouponByCode
);
paymentsRouter.get("/getCoupons", verifyToken, adminAuthHandler, getCoupons);
paymentsRouter.get("/applyCoupon/:code", verifyToken, applyCoupon);
paymentsRouter.delete(
  "/deleteCoupon/:code",
  verifyToken,
  adminAuthHandler,
  deleteCoupon
);

// Exporting the paymentsRouter
export { paymentsRouter };
