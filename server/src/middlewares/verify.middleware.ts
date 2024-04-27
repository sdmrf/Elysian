// Imports
import jwt, { Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../constants/constants.js";
import { CustomRequest, AuthorisedUser } from "../types/types.js";

/**
 * Middleware to verify the JWT token in the request header.
 * If the token is valid, it adds the decoded user information to the request object.
 * @param req Request object
 * @param res Response object
 * @param next Next function to call the next middleware
 */
const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  // Extract token from request header
  const authHeader = req.headers.token as string;
  
  // Check if token exists in header
  if (authHeader) {
    // Extract token from header
    const token = authHeader.split(" ")[1];

    // Verify the token
    jwt.verify(token, JWT_SECRET as Secret, (err: jwt.VerifyErrors | any, user: AuthorisedUser | any) => {
      // If there's an error while verifying the token
      if (err) {
        // Send response with 403 status and error message
        res.status(403).json("Token is not valid");
      } else {
        // If token is valid, add user information to request object
        req.user = user;
        // Call the next middleware
        next();
      }
    });
  } else {
    // If token is not provided in header, send response with 401 status and error message
    res.status(401).json("Access denied. No token provided.");
  }
};

export default verifyToken;
