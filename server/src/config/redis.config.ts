// Imports
import { createClient } from "redis";

// Constants
const { REDIS_PASSWORD, REDIS_HOST, REDIS_PORT } = process.env;

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

// Connection to Redis
await redisClient.connect();

// Export
export { redisClient };
