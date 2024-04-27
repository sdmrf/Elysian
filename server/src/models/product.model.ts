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

// Mongoose schema
const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  description: String,
  category: String,
  stock: {
    type: Number,
    default: 0,
  },
});

// Perform validation before saving
productSchema.pre<IProduct>("save", async function () {
  await productSchemaValidation.parseAsync(this.toObject());
});

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
