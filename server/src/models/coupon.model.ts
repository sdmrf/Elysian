// Imports
import mongoose, { Document, Schema } from "mongoose";
import { couponSchemaValidation } from "../validation/coupon.validation.js";

// Define coupon interface extending mongoose Document
interface ICoupon extends Document {
  code: string;
  amount: number;
  expiry: Date;
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
  expiry: {
    type: Date,
    default: Date.now,
    expires: 60,
    get: (createdAt: Date) => createdAt.getTime(),
    set: (createdAt: number) => new Date(createdAt),
  },
});

// Perform validation before saving
couponSchema.pre("save", async function () {
  await couponSchemaValidation.parseAsync(this.toObject());
});

// Export
export const Coupon = mongoose.model<ICoupon>("Coupon", couponSchema);
