// Imports
import mongoose, { Document, Schema } from "mongoose";
import { couponSchemaValidation } from "../validation/coupon.validation.js";

// Define coupon interface extending mongoose Document
interface ICoupon extends Document {
  code: string;
  amount: number;
  expiry: Date;
}

// Function to calculate expiry one month from now
function calculateExpiry() {
  const now = new Date();
  // Adding one month to the current date
  now.setMonth(now.getMonth() + 1);
  return now;
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
    default: calculateExpiry, // Set default expiry to one month from now
  },
});

// Perform validation before saving
couponSchema.pre("save", async function () {
  await couponSchemaValidation.parseAsync(this.toObject());
});

// Export
export const Coupon = mongoose.model<ICoupon>("Coupon", couponSchema);
