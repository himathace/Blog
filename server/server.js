const express=require("express")
const app=express()


const user={
    name:"himath",
    passwoed:12345
}

app.get("/pages",(req,res)=>{
    res.json("hello")
})

app.listen(3000)