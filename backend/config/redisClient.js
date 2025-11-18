import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import dotenv from "dotenv";

dotenv.config();

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Ratelimiter: 50 requests per 60 seconds per IP
export const rateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "60 s"),
  analytics: true,
});