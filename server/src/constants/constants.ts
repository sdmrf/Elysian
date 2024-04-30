import dotenv from 'dotenv';
dotenv.config();

// MongoDB
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URL || 'mongodb://localhost:27017';
const JWT_SECRET = process.env.PASS_SECRET || 'secret';
const DB_NAME = process.env.DB_NAME || 'test';

// Cloudinary
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'cloudinary_name'; 
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || 'cloudinary_api_key';
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || 'cloudinary_api_secret';

// Mail Services
const MAIL_SERVICE = process.env.MAIL_SERVICE;
const MAIL_USER = process.env.MAIL_USER;
const MAIL_EMAIL = process.env.MAIL_EMAIL;
const MAIL_PASS = process.env.MAIL_PASS;
const MAIL_HOST = process.env.MAIL_HOST;
const MAIL_PORT = process.env.MAIL_PORT;

// Api Endpoints

const RESET_PASSWORD_LINK = process.env.RESET_PASSWORD_LINK;


export { PORT, MONGO_URI, JWT_SECRET, DB_NAME, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, MAIL_SERVICE, MAIL_USER, MAIL_EMAIL, MAIL_PASS, MAIL_HOST, MAIL_PORT, RESET_PASSWORD_LINK};