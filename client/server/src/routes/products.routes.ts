// Imports
import express from "express";

// Instance of router
const productsRouter = express.Router();

// Importing the controller
import {
  addProduct,
  getAllProducts,
  getAllCategories,
  getLatestProducts,
  getProductById,
  getProductsByQuery,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

// Importing middlewares
import { adminAuthHandler } from "../middlewares/auth.middleware.js";
import { verifyToken } from "../middlewares/verify.middleware.js";
import { multipleUpload } from "../middlewares/multer.middleware.js";

// Routes
productsRouter
  .route("/addNewProduct")
  .post(verifyToken, adminAuthHandler, multipleUpload, addProduct);
productsRouter.route("/getAllProducts").get(getAllProducts);
productsRouter.route("/getProductById/:id").get(getProductById);
productsRouter.route("/getProductsByQuery").get(getProductsByQuery);
productsRouter.route("/getAllCategories").get(getAllCategories);
productsRouter.route("/getLatestProducts").get(getLatestProducts);
productsRouter
  .route("/updateProduct/:id")
  .put(verifyToken, adminAuthHandler, multipleUpload, updateProduct);
productsRouter
  .route("/deleteProduct/:id")
  .delete(verifyToken, adminAuthHandler, deleteProduct);

// Exporting the productsRouter
export { productsRouter };
