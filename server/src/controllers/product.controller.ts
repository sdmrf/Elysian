// Imports
import { NextFunction, Request, Response } from "express";

// Models
import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";

// Utils
import { ErrorHandler } from "../utils/errorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { responseHandler } from "../utils/responseHandler.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../config/cloudinary.config.js";
import { InvalidateCache } from "../utils/featuresHandler.js";
import { redisClient } from "../config/redis.config.js";
import { PAGE_LIMIT } from "../constants/constants.js";
import {
  BaseQuery,
  SearchRequestQuery,
  ProductsRequest,
} from "../types/types.js";

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
const getAllProducts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let products;
    if (await redisClient.exists("all-products")) {
      products = await redisClient.get("all-products");
    } else {
      products = await Product.find();
      await redisClient.set("all-products", JSON.stringify(products));
    }
    res.json(new responseHandler(200, "All products", { products }));
  }
);

//* Get single product by id
const getProductById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let product;
    const { id } = req.params;
    if (await redisClient.exists(`product:${id}`)) {
      product = await redisClient.get(`product:${id}`);
    } else {
      product = await Product.findById(id);
      if (!product) return next(new ErrorHandler("Product not found", 404));
      await redisClient.set(`product:${id}`, JSON.stringify(product));
    }
    res.json(new responseHandler(200, "Product", { product }));
  }
);

//* Get Products by query
const getProductsByQuery = asyncHandler(
  async (
    req: Request<{}, {}, {}, SearchRequestQuery>,
    res: Response,
    next: NextFunction
  ) => {
    const { search, category, price, sort } = req.query;

    const page = Number(req.query.page) || 1;
    const limit = PAGE_LIMIT;
    const skip = (page - 1) * limit;
    const baseQuery: BaseQuery = {};

    if (search) {
      baseQuery.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      baseQuery.category = category;
    }

    if (price) {
      baseQuery.price = {
        $lte: Number(price),
      };
    }

    const [products, totalProductsCount] = await Promise.all([
      Product.find(baseQuery)
        .sort(sort && { price: sort === "asc" ? 1 : -1 })
        .limit(limit)
        .skip(skip),
      Product.countDocuments(baseQuery),
    ]);

    const totalPages = Math.ceil(totalProductsCount / limit);

    return res.json(
      new responseHandler(200, "All products", {
        products,
        totalPages,
        totalProductsCount,
        currentPage: page,
      })
    );
  }
);

//* Get products by category
const getAllCategories = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let categories;
    if (await redisClient.exists("all-categories")) {
      categories = await redisClient.get("all-categories");
    } else {
      categories = await Product.find().distinct("category");
      await redisClient.set("all-categories", JSON.stringify(categories));
    }
    res.json(new responseHandler(200, "All categories", { categories }));
  }
);

//* Get latest products
const getLatestProducts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let products;
    if (await redisClient.exists("latest-products")) {
      products = await redisClient.get("latest-products");
    } else {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
      await redisClient.set("latest-products", JSON.stringify(products));
    }
    res.json(new responseHandler(200, "Latest products", { products }));
  }
);

//* Update product by id
const updateProduct = asyncHandler(
  async (req: Request<{ id?: string }, {}, ProductsRequest, {}>, res, next) => {
    const { id } = req.params;
    const { name, description, price, category, stock, images } = req.body;

    // Extracting Image files from multer
    const photosFromMulter = req.files as Express.Multer.File[];

    // Uploading images to cloudinary in parallel
    const photoUploadPromises = photosFromMulter.map(async (photo) => {
      const { path } = photo;
      const response = await uploadOnCloudinary(path);
      if (!response) {
        throw new ErrorHandler("Files are not uploaded successfully", 500);
      }
      return response.url;
    });

    try {
      const photoUrls = await Promise.all(photoUploadPromises);

      // Finding product by id
      const product = await Product.findById(id);
      if (!product) {
        throw new ErrorHandler("Product not found", 404);
      }

      // Updating product
      product.name = name ?? product.name;
      product.description = description ?? product.description;
      product.price = price ?? product.price;
      product.category = category ?? product.category;
      product.stock = stock ?? product.stock;

      // Updating product images
      if (images && Array.isArray(images)) {
        const deletePromises = images.map(async (image) => {
          if (image.url) {
            await deleteFromCloudinary(image.url).catch((error) => {
              console.error("Error deleting image from Cloudinary:", error);
            });
          }
        });
        await Promise.all(deletePromises);
        images.forEach((image, i) => {
          product.photos[image.index ?? i] = photoUrls[i];
        });
      }

      // Saving product
      await product.save();

      // Invalidating cache
      InvalidateCache({
        product: true,
        productId: String(product._id),
        admin: true,
      });

      // Sending response
      return res.json(
        new responseHandler(200, "Product updated successfully", { product })
      );
    } catch (error) {
      return next(error);
    }
  }
);

//* delete product by id
const deleteProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Extracting id from request params
    const { id } = req.params;

    // Finding product by id
    const product = await Product.findById(id);
    if (!product) {
      throw new ErrorHandler("Product not found", 404);
    }

    // Deleting images from cloudinary
    const deletePromises = product.photos.map(async (photo) => {
      await deleteFromCloudinary(photo).catch((error) => {
        console.error("Error deleting image from Cloudinary:", error);
      });
    });
    await Promise.all(deletePromises);

    // Deleting product from database
    await product.deleteOne();

    // Invalidating cache
    InvalidateCache({
      product: true,
      productId: String(product._id),
      admin: true,
    });

    // Sending response
    return res.json(
      new responseHandler(200, "Product deleted successfully", {})
    );
  }
);

// Exports
export {
  addProduct,
  getAllProducts,
  getProductById,
  getProductsByQuery,
  getAllCategories,
  getLatestProducts,
  updateProduct,
  deleteProduct,
};
