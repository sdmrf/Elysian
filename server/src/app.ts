// Imports
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { errorMiddleware } from "./middlewares/error.middleware.js";

// Importing the routes
import { usersRouter } from "./routes/users.routes.js";
import { productsRouter } from "./routes/products.routes.js";
import { orderRouter } from "./routes/orders.routes.js";
import { paymentsRouter } from "./routes/payments.routes.js";

// Creating an instance of express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Base URL
app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

// Routes
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/payments", paymentsRouter);

// Error handler
app.use(errorMiddleware);

// exporting the app
export { app };
