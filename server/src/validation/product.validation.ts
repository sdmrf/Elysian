import { z } from "zod";

// Define Zod schema for validation
export const ProductSchemaValidation = z.object({
  name: z.string().min(3, "Name should be at least 3 characters long"),
  price: z.number().positive("Price should be a positive number"),
  category: z.string().optional(),
  photo: z.string().url("Photo should be a valid URL"),
  stock: z.number().min(0, "Stock should not be negative"),
  description: z.string().optional(),
});