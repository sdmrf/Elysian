// Imports
import { NextFunction, Request, Response } from "express";

// Models
import { User } from "../models/user.model.js";

// Handlers
import { ErrorHandler } from "../utils/errorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { responseHandler } from "../utils/responseHandler.js";

// Utils
import { sendPasswordResetLink } from "../utils/resetPasswordHandler.js";

// Constants
import { RESET_PASSWORD_LINK } from "../constants/constants.js";


//* Send reset password email
const sendResetPasswordEmail = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(new ErrorHandler("User not found", 404));
  
    const id = user._id;
    const resetLink = `${RESET_PASSWORD_LINK}/${id}`;

    await sendPasswordResetLink(email, resetLink);

    return res.status(200).json(new responseHandler(200, "Password reset link sent successfully", {}));
  })


  
//* Reset password controller
const resetPassword = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { password }, { new: true });

    if (!user) return next(new ErrorHandler("User not found", 404));

    return res.status(200).json(new responseHandler(200, "Password reset successfully", {}));
});

export { sendResetPasswordEmail, resetPassword }