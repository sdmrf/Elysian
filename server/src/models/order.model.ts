// Imports
import mongoose, { Document, Schema } from "mongoose";
import { OrderSchemaValidation } from "../validation/order.validation.js";

// Define order interface extending mongoose Document
interface IOrder extends Document {
  shippingInfo: {
    address: string;
    city: string;
    state: string;
    country: string;
    pinCode: number;
  };
  userId: Schema.Types.ObjectId;
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  status: "Processing" | "Shipped" | "Delivered" | "Already Delivered";
  orderItems: {
    name: string;
    photo: string;
    price: number;
    quantity: number;
    productId: Schema.Types.ObjectId;
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
    userId: {
      type: Schema.Types.ObjectId,
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
      enum: ["Processing", "Shipped", "Delivered", "Already Delivered"],
      default: "Processing",
    },
    orderItems: [
      {
        name: String,
        photo: String,
        price: Number,
        quantity: Number,
        productId: {
          type: Schema.Types.ObjectId,
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
  await OrderSchemaValidation.parseAsync(this.toObject());
});

// Export
export const Order = mongoose.model<IOrder>("Order", orderSchema);
