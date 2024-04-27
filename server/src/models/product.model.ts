// Imports
import mongoose, { Document, Schema } from "mongoose";
import { productSchemaValidation } from "../validation/product.validation.js";

// Define product interface extending mongoose Document
interface IProduct extends Document {
  name: string;
  price: number;
  description?: string;
  category?: string;
  stock: number;
}

// Mongoose schema for Product
const productSchema = new Schema<IProduct>({
  // Defining the schema fields with their types and validation
  name: {
    type: String,
    required: [true, "Name is required"],
    validate: {
      validator: (value: string) => productSchemaValidation.parse({ name: value }), // Validate name against Zod schema
      message: (props: any) => props.reason?.message || "Invalid name",
    },
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    validate: {
      validator: (value: number) => productSchemaValidation.parse({ price: value }), // Validate price against Zod schema
      message: (props: any) => props.reason?.message || "Invalid price",
    },
  },
  description: String,
  category: String,
  stock: {
    type: Number,
    default: 0,
    validate: {
      validator: (value: number) => productSchemaValidation.parse({ stock: value }), // Validate stock against Zod schema
      message: (props: any) => props.reason?.message || "Invalid stock",
    },
  },
});

// Creating the Product model
const Product = mongoose.model<IProduct>("Product", productSchema);

// Exporting the Product model
export default Product;
