import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { ResetToken } from "../models/resetToken.model.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { responseHandler } from "../utils/responseHandler.js";
import { sendPasswordResetLink } from "../utils/resetPasswordHandler.js";
import { RESET_PASSWORD_LINK } from "../constants/constants.js";


//? Helper function to generate reset token
const generateResetToken = async (userId: string) => {
  const token = await bcrypt.hash(userId, 10);
  const resetToken = new ResetToken({ userId, token });
  await resetToken.save();
  return token;
};


//! Contrroller Functions

//* send reset password email with reset link controller
const sendResetPasswordEmail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return next(new ErrorHandler("User not found", 404));

  await ResetToken.deleteMany({ userId: user._id });

  const resetToken = await generateResetToken(user._id);
  const resetLink = `${RESET_PASSWORD_LINK}/${resetToken}`;

  await sendPasswordResetLink(email, resetLink);

  return res
    .status(200)
    .json(new responseHandler(200, "Password reset link sent successfully", {}));
});


//* reset password controller
const resetPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  const { id } = req.params;

  const resetTokenSchema = await ResetToken.findOne({ token: id });
  if (!resetTokenSchema) return next(new ErrorHandler("Invalid or expired reset token", 400));

  const isMatch = await bcrypt.compare(resetTokenSchema.userId, id);
  if (!isMatch) return next(new ErrorHandler("Invalid or expired reset token", 400));

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.findByIdAndUpdate(resetTokenSchema.userId, { password: hashedPassword }, { new: true });
  if (!user) return next(new ErrorHandler("User not found", 404));

  await ResetToken.deleteMany({ userId: user._id });

  return res
    .status(200)
    .json(new responseHandler(200, "Password reset successfully", {}));
});

export { sendResetPasswordEmail, resetPassword };
