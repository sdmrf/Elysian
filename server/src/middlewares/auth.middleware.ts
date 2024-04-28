//* Import
import { User } from "../models/user.model.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//* Middleware to check if the user is an admin
const adminAuthHandler = asyncHandler(async (req, res, next) => {
    const { id } = req.query;
    if (!id) return next(new ErrorHandler("Please provide admin id", 400));
    const user = await User.findById(id);
    if(!user) return next(new ErrorHandler("Admin not found", 404));
    if(user.role !== "admin") return next(new ErrorHandler("You are not authorized to access this route", 401));
    next();
});

export { adminAuthHandler };