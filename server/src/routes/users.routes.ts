//* Imports
import express from "express";

//* Instance of router
const router = express.Router();

//* Importing the controller
import {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getSingleUser,
  updateUserProfile,
  deleteUser,
  updatePassword,
} from "../controllers/user.controller.js";
import { sendOTP, verifyOTP } from "../controllers/otp.controller.js";
import {
  resetPassword,
  sendResetPasswordEmail,
} from "../controllers/resetPassword.controller.js";

//* Impoting middlewares
import { singleUpload } from "../middlewares/multer.middleware.js";
import { verifyToken } from "../middlewares/verify.middleware.js";
import { adminAuthHandler } from "../middlewares/auth.middleware.js";

//* Routes
router.route("/register").post(singleUpload, registerUser);
router.route("/login").post(loginUser);
router.route("/admin-login").post(adminAuthHandler, loginUser);
router.route("/logout").post(verifyToken, logoutUser);
router.route("/send-otp").post(sendOTP);
router.route("/verify-otp").post(verifyOTP);
router.route("/send-reset-password-email").post(sendResetPasswordEmail);
router.route("/reset-password/:id").put(resetPassword);
router.route("/get-all-users").get(verifyToken, getAllUsers);
router.route("/get-single-user/:id").get(verifyToken, adminAuthHandler, getSingleUser);
router.route("/update-profile").put(verifyToken, updateUserProfile);
router.route("/update-password").put(verifyToken, updatePassword);
router.route("/delete-user/:id").delete(verifyToken, deleteUser);

// Exporting the router
export default router;
