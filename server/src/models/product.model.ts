// Imports
import mongoose, { Document, Schema } from "mongoose";
import { z } from "zod";

// Define Zod schema for validation
const productSchemaValidation = z.object({
  name: z.string().min(3, "Name should be at least 3 characters long"),
  price: z.number().positive("Price should be a positive number"),
  description: z.string().optional(),
  category: z.string().optional(),
  stock: z.number().min(0, "Stock should not be negative"),
});

// Define product interface extending mongoose Document
interface IProduct extends Document {
  name: string;
  price: number;
  description?: string;
  category?: string;
  stock: number;
}

// Mongoose schema
const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, "Name is required"],
    validate: {
      validator: async function (value: string) {
        await productSchemaValidation
          .pick({ name: true })
          .parseAsync({ name: value });
      },
      message: "Invalid name format",
    },
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    validate: {
      validator: async function (value: number) {
        await productSchemaValidation
          .pick({ price: true })
          .parseAsync({ price: value });
      },
      message: "Invalid price format",
    },
  },
  description: String,
  category: String,
  stock: {
    type: Number,
    default: 0,
    validate: {
      validator: async function (value: number) {
        await productSchemaValidation
          .pick({ stock: true })
          .parseAsync({ stock: value });
      },
      message: "Invalid stock format",
    },
  },
});

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
