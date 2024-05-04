import { z } from "zod";

// Define Zod schema for validation
export const couponSchemaValidation = z.object({
    code: z.string().min(1, "Please enter the Coupon Code"),
    amount: z.number().positive("Please enter a positive Discount Amount"),
    expiry: z.date().optional(),
  });