const express=require("express")
const cors=require("cors")
const app=express()
const jwt=require("jsonwebtoken")
const cookieparder=require("cookie-parser")
require("dotenv").config()

app.use(express.json())  // converting a JSON string  into a JavaScript object
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieparder())


const user={
    name:"jake",
    password:"12345"
}

app.post("/login",(req,res)=>{
    if(req.body.username===user.name && req.body.password===user.password){

        const token=jwt.sign({username:req.body.username},process.env.serect_key)

        res.cookie("logincookie",token,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:60*60*1000
        })

        res.json({message:"logged in"})  // convert js object in to json string
 
    }else{
        res.json({message:"username or password invalid"})
    }
})


app.get("/dashboard",auth,(req,res)=>{
    res.json({message:"this is dashboard"})
})


function auth(req,res,next){

    const token=req.cookies.logincookie

    if(!token){
        return res.status(401).json({message:"unauthorized",status:401})
    }

    jwt.verify(token,process.env.serect_key,(error,data)=>{
        if(error){
            return res.status(401).json({message:"invlaid auth",status:401})
        }
        next()
    })
}

app.post("/logout",(req,res)=>{
    res.clearCookie("logincookie")
    res.json({message:"logged out"})
})

app.listen(3000)