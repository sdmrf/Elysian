// Imports
import mongoose, { Document, Schema } from "mongoose";
import { orderSchemaValidation } from "../validation/order.validation.js";

// Define order interface extending mongoose Document
interface IOrder extends Document {
  shippingInfo: {
    address: string;
    city: string;
    state: string;
    country: string;
    pinCode: number;
  };
  user: string;
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  status: "Processing" | "Shipped" | "Delivered";
  orderItems: {
    name: string;
    photo: string;
    price: number;
    quantity: number;
    productId: string;
  }[];
}

// Mongoose schema
const orderSchema = new Schema<IOrder>(
  {
    shippingInfo: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      pinCode: {
        type: Number,
        required: true,
      },
    },
    user: {
      type: String,
      ref: "User",
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    shippingCharges: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered"],
      default: "Processing",
    },
    orderItems: [
      {
        name: String,
        photo: String,
        price: Number,
        quantity: Number,
        productId: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Perform validation before saving
orderSchema.pre<IOrder>("save", async function () {
  await orderSchemaValidation.parseAsync(this.toObject());
});

// Export
export const Order = mongoose.model<IOrder>("Order", orderSchema);
