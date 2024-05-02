// Imports
import { NextFunction, Request, Response } from "express";

// Models
import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";

// Utils
import { ErrorHandler } from "../utils/errorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { responseHandler } from "../utils/responseHandler.js";
import { uploadOnCloudinary } from "../config/cloudinary.config.js";
import { InvalidateCache } from "../utils/featuresHandler.js";

// Controller Functions

//* Add product
const addProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, price, category, stock } = req.body;

    const photos = req.files as Express.Multer.File[];
    const photoUrls = [];

    for (const photo of photos) {
      const { path } = photo;
      const response = await uploadOnCloudinary(path);
      if (!response) {
        return next(
          new ErrorHandler("Files are not uploaded successfully", 500)
        );
      }
      photoUrls.push(response?.url);
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      photos: photoUrls,
    });

    await product.save();

    InvalidateCache({ product: true, admin: true });
    res
      .status(201)
      .json(new responseHandler(201, "Product added successfully", product));
  }
);

//* Get all products
