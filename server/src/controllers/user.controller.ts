//* Imports
import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
//* Helper functions

const generateAccessTokenAndRefreshToken = async(userId: string) => {

    try {
        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return {accessToken, refreshToken}
    } catch (err : any) {
        throw new ErrorHandler("Error generating access token and refresh token", 500);
    }
}

const register = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const {fullname, username, email, password, dob, address} = req.body;

    const userExists = await User.findOne({$or: [{email}, {username}]});
    if(userExists) throw new ErrorHandler("User already exists", 400);

    
    
});