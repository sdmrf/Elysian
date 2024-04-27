import { z } from "zod";

// Define Zod schema for validation
export const productSchemaValidation = z.object({
  name: z.string().min(3, "Name should be at least 3 characters long"),
  price: z.number().positive("Price should be a positive number"),
  description: z.string().optional(),
  category: z.string().optional(),
  stock: z.number().min(0, "Stock should not be negative"),
});