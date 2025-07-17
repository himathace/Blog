const express=require("express")
const app=express()

app.get("/pages",(req,res)=>{
    res.json("hello")
})

app.listen(3000)