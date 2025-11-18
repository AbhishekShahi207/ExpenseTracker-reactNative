import { rateLimiter } from "../config/redisClient.js";

export const rateLimiterMiddleware = async (req, res, next) => {
  const ip = req.ip;

  const { success } = await rateLimiter.limit(ip);

  if (!success) {
    return res.status(429).json({ message: " Calm Down, Too many requests!" });
  }

  next();
};
