// Imports
import jwt, { Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../constants/constants.js";
import { CustomRequest, AuthorisedUser } from "../types/types.js";


const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.token as string;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, JWT_SECRET as Secret, (err: jwt.VerifyErrors | any, user: AuthorisedUser | any) => {
      if (err) {
        res.status(403).json("Token is not valid");
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(401).json("Access denied. No token provided.");
  }
};

export default verifyToken;
