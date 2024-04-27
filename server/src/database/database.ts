// Imports
import mongoose from "mongoose";
import { DB_NAME, MONGO_URI } from "../constants/constants.js";

// Connecting to the database
export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed");
  }
};