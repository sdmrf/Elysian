// Imports
import { Request, Response, NextFunction } from "express"; // Importing Request, Response, and NextFunction types from express
import ErrorHandler from "../utils/utility-class.js"; // Importing ErrorHandler class from utility-class file

/**
 * Middleware to handle errors in the application.
 * @param err The error object
 * @param req Request object
 * @param res Response object
 * @param next Next function in middleware chain
 * @returns Response with error message and status code
 */
export const errorMiddleware = (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  // Set default error message if not provided
  err.message ||= "Internal Server Error";
  // Set default status code if not provided
  err.statusCode ||= 500;
  
  // Send response with error message and status code
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
