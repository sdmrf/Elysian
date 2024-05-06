// Imports
import { InvalidateCacheProps, OrderItem } from "../types/types.js";
import { redisClient } from "../config/redis.config.js";


// Models
import { Product } from "../models/product.model.js";

// Utils
import { ErrorHandler } from "./errorHandler.js";


// Features 

// * Invalidate the cache of the specified keys
const InvalidateCache = ({
  product,
  order,
  productId,
  orderId,
  userId,
  admin,
}: InvalidateCacheProps) => {

  // If product is true, then we will delete the cache of the following keys
  if (product) {
    const productKeys: string[] = [
      "categories",
      "all-products",
      "latest-products",
    ];

    // If productId is an array, then we will loop through the array and delete the cache of each product
    if (productId) {
      if (Array.isArray(productId)) {
        productId.forEach((id) => {
          productKeys.push(`product:${id}`);
        });
      } else {
        productKeys.push(`product:${productId}`);
      }
    }

    // Deleting the cache of the product keys
    redisClient.del(productKeys);
  }

  // If order is true, then we will delete the cache of the following keys
  if (order) {
    const orderKeys: string[] = [
      `my-orders-${userId}`,
      "all-orders",
      `order:${orderId}`,
    ];

    // Deleting the cache of the order keys
    redisClient.del(orderKeys);
  }

  // If admin is true, then we will delete the cache of the following keys
  if (admin) {
    const adminKeys: string[] = [
      "admin-stats",
      "admin-pie-charts",
      "admin-bar-charts",
      "admin-line-charts",
    ];

    // Deleting the cache of the admin keys
    redisClient.del(adminKeys);
  }
};


// * Reduce the stock of the product by the quantity ordered
const reduceStock = async (orderItems: OrderItem[]) => {
  orderItems.forEach(async (item : OrderItem) => {
    const product = await Product.findById(item.productId);
    if(!product) throw new ErrorHandler("Product not found", 404);
    if(product.stock < item.quantity) throw new ErrorHandler("Out of stock", 400);
    product.stock -= item.quantity;
    await product.save({ validateBeforeSave: false });
  });
}


//* Restore the stock of the product by the quantity of canceled order
const restoreStock = async (orderItems: any) => {
  orderItems.forEach(async (item : any) => {
    const product = await Product.findById(item.productId);
    if(!product) throw new ErrorHandler("Product not found", 404);
    product.stock += item.quantity;
    await product.save({ validateBeforeSave: false });
  });
}



export { InvalidateCache, reduceStock, restoreStock };