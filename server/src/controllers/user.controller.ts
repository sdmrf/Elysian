//* Imports
import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { responseHandler } from "../utils/responseHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { CustomRequest } from "../types/types.js";

//* Helper functions
const generateAccessAndRefereshTokens = async (userId: string) => {
  try {
    const user = await User.findById(userId);
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
    const { fb_id, fullname, username, email, password, gender, dob } = req.body;

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) throw new ErrorHandler("User already exists", 400);

    const photoPath = req.file?.path || ""; // Provide a default value for photoPath
    const photo = await uploadOnCloudinary(photoPath);

    const user = await User.create({
      fb_id,
      fullname,
      username,
      email,
      password,
      gender,
      dob,
      photo: photo?.url,
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    if (!createdUser) throw new ErrorHandler("Error creating user", 500);

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
    if (!user) throw new ErrorHandler("User does not exist", 404);

    const isPasswordValid = await user.isValidPassword(password);
    if (!isPasswordValid) throw new ErrorHandler("Invalid credentials", 401);

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
      user._id
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
    if (!req.user) throw new ErrorHandler("User not found", 404);
    await User.findByIdAndUpdate(
      req.user._id,
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

export { registerUser, loginUser, logoutUser };
