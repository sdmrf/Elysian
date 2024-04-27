// Imports
import jwt, { Secret } from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { Response, NextFunction } from "express";
import { JWT_SECRET } from "../constants/constants.js";
import { CustomRequest, User as IUser } from "../types/types.js";

const verifyToken = asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ErrorHandler("Access denied. No token provided.", 401);
    }
    const decodedToken = jwt.verify(token, JWT_SECRET as Secret) as IUser;
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken") as IUser;

    if(!user){
      throw new ErrorHandler("Invalid Access Token", 401);
    }
    req.user = user;
    next();
  } catch (err : any) {
    throw new ErrorHandler(err?.message|| "Unauthorized Access", 401);
  }
});

// const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
//   const authHeader = req.headers.token as string;
//   if (authHeader) {
//     const token = authHeader.split(" ")[1];
//     jwt.verify(token, JWT_SECRET as Secret, (err: jwt.VerifyErrors | any, user: User | any) => {
//       if (err) {
//         res.status(403).json("Token is not valid");
//       } else {
//         req.user = user;
//         next();
//       }
//     });
//   } else {
//     res.status(401).json("Access denied. No token provided.");
//   }
// };

export default verifyToken;
