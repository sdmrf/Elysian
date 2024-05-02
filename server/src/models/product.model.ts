//* Imports
import mongoose, { Document, Schema, Model } from "mongoose";
import { ProductSchemaValidation } from "../validation/product.validation.js";

//* Define product interface extending mongoose Document
interface IProduct extends Document {
  name: string;
  price: number;
  category: string;
  photos: string[];
  stock: number;
  description: string;
}

//* Mongoose schema for Product
const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a price"],
  },
  category: {
    type: String,
    required: [true, "Please provide a category"],
    trim: true,
  },
  photos: {
    type: [String],
    required: [true, "Please provide photos"],
  },
  stock: {
    type: Number,
    required: [true, "Please provide a stock"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
});

//* Mongoose methods for Product
ProductSchema.pre<IProduct>("save", async function (next) {
  await ProductSchemaValidation.parseAsync(this.toObject());
  next();
});

//* Exporting the Product model
export const Product: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  ProductSchema
);
