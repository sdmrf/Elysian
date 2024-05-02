import { z } from "zod";

// Define Zod schema for validation
export const ProductSchemaValidation = z.object({
  name: z.string().min(3, "Name should be at least 3 characters long"),
  price: z.number().positive("Price should be a positive number"),
  category: z.string().optional(),
  photos: z.array(z.string()).min(1, "At least one photo is required").optional(),
  stock: z.number().min(0, "Stock should not be negative"),
  description: z.string().optional(),
});