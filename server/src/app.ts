// Imports 
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { errorMiddleware } from './middlewares/error.middleware.js';
// Importing the routes
import userRoutes from './routes/users.routes.js';

// Creating an instance of express
const app = express();


// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

// Base URL
app.get('/', (req, res) => {
  res.send('Welcome to the server');
});

// Routes
app.use("/api/v1/users", userRoutes);

// Error handler
app.use(errorMiddleware)

// exporting the app
export { app }

