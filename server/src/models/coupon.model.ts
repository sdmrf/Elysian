// Imports
import mongoose, { Document, Schema } from "mongoose";
import { couponSchemaValidation } from "../validation/coupon.validation.js";

  // Define coupon interface extending mongoose Document
  interface ICoupon extends Document {
    code: string;
    amount: number;
  }
  
  // Mongoose schema
  const couponSchema = new Schema({
    code: {
      type: String,
      required: [true, "Please enter the Coupon Code"],
      unique: true,
    },
    amount: {
      type: Number,
      required: [true, "Please enter the Discount Amount"],
    },
  });
  
  // Perform validation before saving
  couponSchema.pre("save", async function () {
    await couponSchemaValidation.parseAsync(this.toObject());
  });
  
  // Export
  export const Coupon = mongoose.model("Coupon", couponSchema);
  