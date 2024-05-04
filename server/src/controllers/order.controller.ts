// Imports
import { NextFunction, Request, Response } from "express";

// Models
import { Order } from "../models/order.model.js";

// Utils
import { ErrorHandler } from "../utils/errorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { responseHandler } from "../utils/responseHandler.js";
import { InvalidateCache, reduceStock } from "../utils/featuresHandler.js";
import { redisClient } from "../config/redis.config.js";
import { OrderItemRequest } from "../types/types.js";

// Controller Functions

//* Place new order
const newOrder = asyncHandler(
  async (
    req: Request<{}, {}, OrderItemRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const {
      orderItems,
      shippingInfo,
      userId,
      subtotal,
      shippingCharges,
      total,
      discount,
      tax,
    } = req.body;
    const order = await Order.create({
      orderItems,
      shippingInfo,
      userId,
      subtotal,
      shippingCharges,
      total,
      discount,
      tax,
    });

    await reduceStock(orderItems);

    InvalidateCache({
      product: true,
      order: true,
      admin: true,
      userId,
      productId: order.orderItems.map((item) => String(item.productId)),
    });

    res
      .status(201)
      .json(new responseHandler(200, "Order placed successfully", order));
  }
);

export { newOrder };
