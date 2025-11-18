import {neon} from "@neondatabase/serverless"
import { ENV } from "./env.js"


//create a sql connection with the database
export const sql =neon(ENV.DATABASE_URL)

//database initialization
export async function initDB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions(
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`;
    console.log("database Initialized Successfully");
  } catch (error) {
    console.log("Error Initializing Database", error);
    process.exit(1);
  }
}