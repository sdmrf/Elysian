import { app } from './app.js';
import dotenv from 'dotenv';
import { PORT, MONGO_URI, JWT_SECRET} from "./constants/constants.js"
dotenv.config();

// Listen to the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});