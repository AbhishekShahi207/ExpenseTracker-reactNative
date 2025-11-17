import express from "express";
import { ENV } from "./config/env.js";
import { sql } from "./config/db.js";


const app=express()
const PORT = ENV.PORT

async function initDB(){
    try{
        await sql`CREATE TABLE IF NOT EXISTS transactios(
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`; 
        console.log("database Initialized Successfully")
    }
    catch(error){
        console.log("Error Initializing Database",error)
        process.exit(1)
    }
}

app.get("/home",(req,res)=>{
    res.send("hii")
})




initDB().then(()=>{
    app.listen(PORT,()=>{
    console.log("Ap is running on port",PORT)
})
})