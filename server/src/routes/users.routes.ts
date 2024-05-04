//* Imports
import express from "express";

//* Instance of router
const usersRouter = express.Router();

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
  firebaseRegisterController,
  firebaseLoginAndUpdateUid,
} from "../controllers/user.controller.js";
import { sendOTP, verifyOTP } from "../controllers/otp.controller.js";
import {
  resetPassword,
  sendResetPasswordEmail,
} from "../controllers/resetPassword.controller.js";

//* Importing middlewares
import { singleUpload } from "../middlewares/multer.middleware.js";
import { verifyToken } from "../middlewares/verify.middleware.js";
import { adminAuthHandler } from "../middlewares/auth.middleware.js";

//* Routes
usersRouter.route("/register").post(singleUpload, registerUser);
usersRouter.route("/login").post(loginUser);
usersRouter.route("/admin-login").post(adminAuthHandler, loginUser);
usersRouter.route("/logout").post(verifyToken, logoutUser);
usersRouter.route("/firebase-register").post(firebaseRegisterController);
usersRouter.route("/firebase-login").post(firebaseLoginAndUpdateUid);
usersRouter.route("/send-otp").post(sendOTP);
usersRouter.route("/verify-otp").post(verifyOTP);
usersRouter.route("/send-reset-password-email").post(sendResetPasswordEmail);
usersRouter.route("/reset-password/:id").put(resetPassword);
usersRouter.route("/get-all-users").get(verifyToken, getAllUsers);
usersRouter
  .route("/get-single-user/:id")
  .get(verifyToken, adminAuthHandler, getSingleUser);
usersRouter.route("/update-profile").put(verifyToken, updateUserProfile);
usersRouter.route("/update-password").put(verifyToken, updatePassword);
usersRouter.route("/delete-user/:id").delete(verifyToken, deleteUser);

// Exporting the usersRouter
export { usersRouter };
