// Imports 
import express from 'express';
import cors from 'cors';

// Importing the routes
import userRoutes from './routes/users.route.js';

// Creating an instance of express
const app = express();


// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Base URL
app.get('/', (req, res) => {
  res.send('Welcome to the server');
});

// Routes
app.use("/api/v1/users", userRoutes);

// exporting the app
export { app }

