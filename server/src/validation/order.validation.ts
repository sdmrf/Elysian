import { z } from "zod";

// Define Zod schema for validation
export const orderSchemaValidation = z.object({
  shippingInfo: z.object({
    address: z.string().min(2, "Address should be at least 2 characters long"),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    pinCode: z.number().min(100000, "Pin code should be at least 6 digits long"),
  }),
  user: z.string(),
  subtotal: z.number().positive("Subtotal should be a positive number"),
  tax: z.number().positive("Tax should be a positive number"),
  shippingCharges: z.number().positive("Shipping charges should be a positive number"),
  discount: z.number().positive("Discount should be a positive number"),
  total: z.number().positive("Total should be a positive number"),
  status: z.enum(["Processing", "Shipped", "Delivered"]).default("Processing"),
  OrderItems: z.array(
    z.object({
      name: z.string(),
      photo: z.string(),
      price: z.number().positive(),
      quantity: z.number().positive(),
      productId: z.string(),
    })
  ),
});