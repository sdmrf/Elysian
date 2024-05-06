import { z } from "zod";

// Define Zod schema for validation
export const OrderSchemaValidation = z.object({
  shippingInfo: z.object({
    address: z.string().min(2, { message: "Address should be at least 2 characters long" }),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    pinCode: z.number().min(100000, { message: "Pin code should be at least 6 digits long" }),
  }),
  userId: z.string().uuid(), // Ensure userId is a valid UUID string
  subtotal: z.number().positive("Subtotal should be a positive number"),
  tax: z.number().positive("Tax should be a positive number"),
  shippingCharges: z.number().positive("Shipping charges should be a positive number"),
  discount: z.number().positive("Discount should be a positive number"),
  total: z.number().positive("Total should be a positive number"),
  status: z.enum(["Processing", "Shipped", "Delivered"]).default("Processing"),
  orderItems: z.array(
    z.object({
      name: z.string(),
      photo: z.string(),
      price: z.number().positive(),
      quantity: z.number().positive(),
      productId: z.string().uuid(), // Ensure productId is a valid UUID string
    })
  ),
});
