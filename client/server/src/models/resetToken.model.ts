import mongoose, { Document, Schema } from "mongoose"; // Importing mongoose for schema and model creation
import { resetTokenSchemaValidation } from "../validation/resetToken.validation.js";

//! Interface for OTP document
interface IResetToken extends Document {
  userId: string;
  token: string;
  createdAt: Date;
}

//! reset Token Schema
const resetTokenSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 3600, // This will be valid for 1 hour
      get: (createdAt: Date) => createdAt.getTime(),
      set: (createdAt: number) => new Date(createdAt),
    },
  },
  { timestamps: true }
);

//? Mongoose Methods

resetTokenSchema.pre<IResetToken>("save", async function (next) {
  await resetTokenSchemaValidation.parseAsync(this.toObject());
  next();
});

//* export OTP model
export const ResetToken = mongoose.model<IResetToken>(
  "ResetToken",
  resetTokenSchema
);
