// Imports
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
// Models
import { User } from "../models/user.model.js";
import { ResetToken } from "../models/resetToken.model.js";

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
    
    const newResetTokenSchema = await ResetToken.findOne({ userId: user._id });
    const newToken = await bcrypt.hash(user._id, 10);

    if(!newResetTokenSchema) {
        const resetToken = new ResetToken({
            userId: user._id,
            token: newToken
        });
        await resetToken.save();
    }
    const resetLink = `${RESET_PASSWORD_LINK}/${newToken}`;

    await sendPasswordResetLink(email, resetLink);

    return res.status(200).json(new responseHandler(200, "Password reset link sent successfully", {}));
  })


  
//* Reset password controller
const resetPassword = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;
    const { id } = req.params;

    const newResetTokenSchema = await ResetToken.findOne({ token : id });
    if (!newResetTokenSchema) return next(new ErrorHandler("Invalid or expired reset token", 400));

    const ismatch = await bcrypt.compare(newResetTokenSchema.userId, id);
    if (!ismatch) return next(new ErrorHandler("Invalid or expired reset token", 400));

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });
    if (!user) return next(new ErrorHandler("User not found", 404));

    await ResetToken.deleteMany({ userId: user._id });

    return res.status(200).json(new responseHandler(200, "Password reset successfully", {}));
});

export { sendResetPasswordEmail, resetPassword }