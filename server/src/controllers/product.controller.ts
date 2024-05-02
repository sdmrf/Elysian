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
import { redisClient } from "../config/redis.config.js";

// Controller Functions

//* Add product
const addProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, stock, photos } = req.body;

  const product = new Product({
    name,
    description,
    price,
    category,
    stock,
    photos,
  });

  await product.save();

  res.status(201).json(
    new responseHandler(201, "Product added successfully", product)
  );
});

//* Get all products
