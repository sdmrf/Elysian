// Imports
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import otp from "otp-generator";

// Models
import { User } from "../models/user.model.js";
import { OTP } from "../models/otp.model.js";

// Handlers
import { ErrorHandler } from "../utils/errorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { responseHandler } from "../utils/responseHandler.js";
import { sendEmail } from "../utils/sendEmailHandler.js";

//* Send OTP verification email controller
const sendOTP = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("User already exists", 400));

    const generatedOTP = otp.generate(6, {
      digits: true,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const hashedOTP = await bcrypt.hash(generatedOTP, 10);
    const newOTPSchema = OTP.create({ email, otp: hashedOTP });
    if (!newOTPSchema) return next(new ErrorHandler("Error creating OTP", 500));
    sendEmail(email, generatedOTP);
    return res
      .status(200)
      .json(new responseHandler(200, "OTP sent successfully", newOTPSchema));
  }
);

//* Verify OTP controller
const verifyOTP = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(new ErrorHandler("User not found", 404));

    const otpSchema = await OTP.findOne({ email });
    if (!otpSchema) return next(new ErrorHandler("OTP not found", 404));

    const isMatch = await bcrypt.compare(otp, otpSchema.otp);
    if (!isMatch) return next(new ErrorHandler("OTP is incorrect", 400));

    await otpSchema.save();

    return res.status(200).json(new responseHandler(200, "OTP verified", {}));
  }
);

//* Exporting the controllers
export { sendOTP, verifyOTP };
