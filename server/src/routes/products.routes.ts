// Imports
import express from "express";

// Instance of router
const router = express.Router();

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
router.route("/addNewProduct").post(verifyToken, adminAuthHandler, multipleUpload, addProduct);
router.route("/getAllProducts").get(getAllProducts);
router.route("/getProductById/:id").get(getProductById);
router.route("/getProductsByQuery").get(getProductsByQuery);
router.route("/getAllCategories").get(getAllCategories);
router.route("/getLatestProducts").get(getLatestProducts);
router.route("/updateProduct/:id").put(verifyToken, adminAuthHandler, multipleUpload, updateProduct);
router.route("/deleteProduct/:id").delete(verifyToken, adminAuthHandler, deleteProduct);

// Exporting the router
export default router;