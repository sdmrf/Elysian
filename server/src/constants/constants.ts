import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URL || 'mongodb://localhost:27017';
const JWT_SECRET = process.env.PASS_SECRET || 'secret';
const DB_NAME = process.env.DB_NAME || 'test';
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'cloudinary_name'; 
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || 'cloudinary_api_key';
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || 'cloudinary_api_secret';

export { PORT, MONGO_URI, JWT_SECRET, DB_NAME, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET };