import mongoose, { Document, Schema, set } from "mongoose"; // Importing mongoose for schema and model creation
import { OTPSchemaValidation } from "../validation/otp.validation.js"; // Importing user schema validation
import { ErrorHandler } from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmailHandler.js";
import bcrypt from "bcrypt";

//! Interface for OTP document
interface IOTP extends Document {
  email: string;
  otp: string;
  createdAt: Date;
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
  },
  { timestamps: true }
);

//? Mongoose Methods

const sendVerificationEmail = async (email: string, otp: string) => {
  try {
    const mailResponse = await sendEmail(email, otp);
    console.log(mailResponse);
  } catch (err: any) {
    throw new ErrorHandler("Error sending verification email", 500);
  }
};

OTPSchema.pre<IOTP>("save", async function (next) {
  if (this.isNew) {
    const { email, otp } = this;
    await sendVerificationEmail(email, otp);
  }
  await OTPSchemaValidation.parseAsync(this.toObject());
  next();
});

//* export OTP model
export const OTP = mongoose.model<IOTP>("OTP", OTPSchema);
