//* Imports
import mongoose, { Document, Schema } from "mongoose";
import { ProductSchemaValidation } from "../validation/product.validation.js";

//* Define product interface extending mongoose Document
interface IProduct extends Document {
  name: string;
  price: number;
  category?: string;
  photo: string;
  stock: number;
  description?: string;
}

//* Mongoose schema for Product
const ProductSchema = new Schema({
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
  photo: {
    type: String,
    required: [true, "Please provide a photo"],
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
export const Product = mongoose.model<IProduct>("Product", ProductSchema);
