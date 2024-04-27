import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const MONGO_URI = process.env.MONGO_URL || 'mongodb://localhost:27017';
export const JWT_SECRET = process.env.PASS_SECRET;
export const DB_NAME = process.env.DB_NAME || 'test';