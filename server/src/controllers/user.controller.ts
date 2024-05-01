//* Imports
import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model.js";
import { OTP } from "../models/otp.model.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { responseHandler } from "../utils/responseHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { CustomRequest } from "../types/types.js";

//? Helper functions

//* Generate Access and Refresh Tokens
const generateAccessAndRefereshTokens = async (
  userId: string,
  firebaseId: string
) => {
  try {
    const user = await User.findById({ $or: [userId, firebaseId] });
    if (!user) throw new Error("User not found");

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (err: any) {
    throw new ErrorHandler(
      "Error generating access token and refresh token",
      500
    );
  }
};

//! Controller functions

//* User Registration Controller
const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { uid, fullname, username, email, password, gender, dob } = req.body;

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) return next(new ErrorHandler("User already exists", 400));

    const photoPath = req.file?.path || ""; // Provide a default value for photoPath
    const photo = await uploadOnCloudinary(photoPath);
    console.log(photo);

    const OTPSchema = await OTP.findOne({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    if (!OTPSchema || !OTPSchema.isVerified) {
      const errorMessage = !OTPSchema ? "OTP not found" : "OTP not verified";
      const statusCode = !OTPSchema ? 404 : 400;
      return next(new ErrorHandler(errorMessage, statusCode));
    }

    const user = await User.create({
      uid: uid || "",
      fullname,
      username,
      email,
      password,
      gender,
      dob: new Date(dob),
      photo: photo?.url,
    });

    const createdUser = await User.findById({
      $or: [user._id, user.uid],
    }).select("-password -refreshToken");
    if (!createdUser) return next(new ErrorHandler("Error creating user", 500));

    await OTP.deleteMany({ email });

    return res
      .status(201)
      .json(new responseHandler(200, "User created successfully", createdUser));
  }
);

//* User Login Controller
const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, username, password } = req.body;
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) return next(new ErrorHandler("User does not exist", 404));

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid)
      return next(new ErrorHandler("Invalid credentials", 401));

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
      user._id,
      user.uid
    );
    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)
      .json(
        new responseHandler(200, "User logged in successfully", {
          user: loggedInUser,
          accessToken,
          refreshToken,
        })
      );
  }
);


//* User Logout Controller
const logoutUser = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!req.user) return next(new ErrorHandler("User not found", 404));
    await User.findByIdAndUpdate(
      { $or: [req.user._id, req.user.uid] },
      { $unset: { refreshToken: 1 } },
      { new: true }
    );
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .clearCookie("refreshToken", options)
      .clearCookie("accessToken", options)
      .json(new responseHandler(200, "User logged out successfully", {}));
  }
);

//* Get All Users Controller
const getAllUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find();
    if (!users) return next(new ErrorHandler("No users found", 404));
    return res
      .status(200)
      .json(new responseHandler(200, "All users fetched successfully", users));
  }
);

//* Get Single User Controller
const getSingleUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.params.id);
    if (!user) return next(new ErrorHandler("User not found", 404));
    return res
      .status(200)
      .json(new responseHandler(200, "User fetched successfully", user));
  }
);

//* Update User Profile Controller
const updateUserProfile = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { fullname, username, email } = req.body;
    const updateFields = {
      fullname: fullname || req.user?.fullname,
      username: username || req.user?.username,
      email: email || req.user?.email,
    };

    const updatedUser = await User.findByIdAndUpdate(
      req.user?._id,
      updateFields,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return next(new ErrorHandler("User not found", 404));
    }

    return res
      .status(200)
      .json(new responseHandler(200, "User updated successfully", updatedUser));
  }
);

//* Delete User Controller
const deleteUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return next(new ErrorHandler("User not found", 404));
    return res
      .status(200)
      .json(new responseHandler(200, "User deleted successfully", {}));
  }
);

//* Update Password Controller
const updatePassword = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user?._id);
    if (!user) return next(new ErrorHandler("User not found", 404));

    const isPasswordValid = await user.isPasswordCorrect(currentPassword);
    if (!isPasswordValid)
      return next(new ErrorHandler("Invalid credentials", 401));

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(new responseHandler(200, "Password updated successfully", {}));
  }
);

export {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getSingleUser,
  updateUserProfile,
  deleteUser,
  updatePassword,
};
