// Imports
import { NextFunction, Request, Response } from "express";

// Models
import { Coupon } from "../models/coupon.model.js";

// Utils
import { ErrorHandler } from "../utils/errorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { responseHandler } from "../utils/responseHandler.js";
import { InvalidateCache } from "../utils/featuresHandler.js";

// Controller Functions

// Add coupon
const addCoupon = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { code, discount } = req.body;

    const coupon = new Coupon({
      code,
      discount,
    });

    await coupon.save();
    res
      .status(201)
      .json(new responseHandler(201, "Coupon added successfully", coupon));
  }
);

// Get all coupons
const getCoupons = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const coupons = await Coupon.find();
    res.status(200).json(new responseHandler(200, "All Coupons", coupons));
  }
);

// Get coupon by code
const getCouponByCode = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const coupon = await Coupon.findOne({ code: req.params.code });
    if (!coupon) {
      return next(new ErrorHandler("Coupon not found", 404));
    }
    res.status(200).json(new responseHandler(200, "Coupon", coupon));
  }
);

// Apply coupon
const applyCoupon = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const coupon = await Coupon.findOne({ code: req.params.code });
    if (!coupon) {
      return next(new ErrorHandler("Coupon not found", 404));
    }

    res.status(200).json(new responseHandler(200, "Coupon applied", coupon));
  }
);

// Delete coupon
const deleteCoupon = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const coupon = await Coupon.findOneAndDelete({ code: req.params.code });
    if (!coupon) {
      return next(new ErrorHandler("Coupon not found", 404));
    }
    res
      .status(200)
      .json(new responseHandler(200, `Coupon ${coupon.code} deleted`, coupon));
  }
);

// Exports
export { addCoupon, getCoupons, getCouponByCode, applyCoupon, deleteCoupon };
