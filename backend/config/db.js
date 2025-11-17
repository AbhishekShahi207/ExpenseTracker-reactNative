import {neon} from "@neondatabase/serverless"
import { ENV } from "./env.js"


//create a sql connection with the database
export const sql =neon(ENV.DATABASE_URL)