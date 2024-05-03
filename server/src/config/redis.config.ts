// Imports
import { createClient } from "redis";

// Constants
import { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } from "../constants/constants.js"

// Redis Client
const redisClient = createClient({
  password: REDIS_PASSWORD,
  socket: {
    host: REDIS_HOST,
    port: Number(REDIS_PORT),
  },
});

// Connection Handling for Redis
redisClient.on("connect", () => {
  console.log("Redis connected");
});

// Error Handling for Redis
redisClient.on("error", (err) => {
  console.error("Redis connection failed", err);
});

await redisClient.connect();

// Export
export { redisClient };
