import mongoose, { Document, Schema, set } from "mongoose"; // Importing mongoose for schema and model creation
import { OTPSchemaValidation } from "../validation/otp.validation.js"; // Importing user schema validation

//! Interface for OTP document
interface IOTP extends Document {
  email: string;
  otp: string;
  createdAt: Date;
  isVerified: boolean;
}

//! OTP Schema
const OTPSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide an email"],
    },
    otp: {
      type: String,
      required: [true, "Please provide an OTP"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 3000,
      get: (timestamp: Date) => timestamp.getTime(),
      set: (timestamp: number) => new Date(timestamp),
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//? Mongoose Methods

OTPSchema.pre<IOTP>("save", async function (next) {
  await OTPSchemaValidation.parseAsync(this.toObject());
  next();
});

//* export OTP model
export const OTP = mongoose.model<IOTP>("OTP", OTPSchema);
