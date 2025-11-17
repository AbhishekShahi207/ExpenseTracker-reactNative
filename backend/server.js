import express from "express";
import dotenv from "dotenv"
dotenv.config()

const app=express()
const PORT = process.env.PORT

app.get("/home",(req,res)=>{
    res.send("hii")
})


app.listen(PORT,()=>{
    console.log("Ap is running on port",PORT)
})