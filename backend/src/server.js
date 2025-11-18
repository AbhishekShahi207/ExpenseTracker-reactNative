import express from "express";
import { ENV } from "./config/env.js";
import { rateLimiterMiddleware } from "./middleware/rateLimiter.js";
import transactionRoute from "./routes/transactionsRoute.js"
import { initDB } from "./config/db.js";

const app = express();
const PORT = ENV.PORT;

//middleware
app.use(express.json());
app.use(rateLimiterMiddleware)



//routes
app.use("/api/transactions",transactionRoute)

//server starting
initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Ap is running on port", PORT);
  });
});
