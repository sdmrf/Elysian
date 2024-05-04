// Imports
import { NextFunction, Request, Response } from "express";

// Models
import { Order } from "../models/order.model.js";

// Utils
import { ErrorHandler } from "../utils/errorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { responseHandler } from "../utils/responseHandler.js";
import {
  InvalidateCache,
  reduceStock,
  restoreStock,
} from "../utils/featuresHandler.js";
import { redisClient } from "../config/redis.config.js";
import { OrderItemRequest } from "../types/types.js";

// Controller Functions

//* Place new order
const placeNewOrder = asyncHandler(
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

//* Get all orders - Admin
const getAllOrders = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let orders;
    if (await redisClient.exists("all-orders")) {
      orders = await redisClient.get("all-orders");
    } else {
      orders = await Order.find().populate("userId", "name email phone address").populate("orderItems.productId", "name price category photos stock description");
      await redisClient.set("all-orders", JSON.stringify(orders));
    }

    res.json(new responseHandler(200, "All orders", { orders }));
  }
);

//* My Orders - User
const myOrders = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: userId } = req.query;
    let orders;
    if (await redisClient.exists(`my-orders:${userId}`)) {
      orders = await redisClient.get(`my-orders:${userId}`);
    } else {
      orders = await Order.find({ userId });
      await redisClient.set(`my-orders:${userId}`, JSON.stringify(orders));
    }
    res.json(new responseHandler(200, "My Orders", { orders }));
  }
);

//* Get single order - Admin

const getSingleOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let order;
    if (await redisClient.exists(`order:${id}`)) {
      order = await redisClient.get(`order:${id}`);
    } else {
      order = await Order.findById(id);
      await redisClient.set(`order:${id}`, JSON.stringify(order));
    }
    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }
    res.json(new responseHandler(200, "Order", { order }));
  }
);

//* Process Order - Admin

const processOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }

    switch (order.status) {
      case "Processing":
        order.status = "Shipped";
        break;
      case "Shipped":
        order.status = "Delivered";
        break;
      default:
        order.status = "Already Delivered";
        break;
    }

    await order.save();
    res
      .status(200)
      .json(new responseHandler(200, "Order processed successfully", order));
  }
);

//* Cancel Order - User
const cancelOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }

    if (order.status !== "Processing") {
      return next(new ErrorHandler("You cannot cancel this order", 400));
    }

    InvalidateCache({
      order: true,
      product: true,
      admin: true,
      userId: String(order.userId),
      orderId: String(order._id),
      productId: order.orderItems.map((item) => String(item.productId)),
    });

    await restoreStock(order.orderItems);
    await order.deleteOne();

    res
      .status(200)
      .json(new responseHandler(200, "Order canceled successfully", {}));
  }
);
export {
  placeNewOrder,
  getAllOrders,
  myOrders,
  getSingleOrder,
  processOrder,
  cancelOrder,
};
