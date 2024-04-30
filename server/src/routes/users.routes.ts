//* Imports
import express from 'express';

//* Instance of router
const router = express.Router();

//* Importing the controller
import { registerUser, loginUser, logoutUser} from '../controllers/user.controller.js';
import { sendOTP, verifyOTP } from '../controllers/otp.controller.js';

//* Impoting middlewares
import { singleUpload } from '../middlewares/multer.middleware.js';
import { verifyToken } from '../middlewares/verify.middleware.js';

//* Routes
router.route('/register').post(singleUpload, registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyToken, logoutUser);
router.route('/send-otp').post(sendOTP);
router.route('/verify-otp').post(verifyOTP);

// Exporting the router
export default router