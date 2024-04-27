// Imports
import { app } from "./app.js";
import { PORT } from "./constants/constants.js";
import { connectDB } from "./database/database.js";

// Listen to the server
const appListen = () =>
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

// Conneting to the database
connectDB()
  .then(() => {
    appListen();
  })
  .catch((err) => {
    console.log(`Database connection failed: ${err}`);
  });
