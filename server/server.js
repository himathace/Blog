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
    name:"paul",
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
        res.status(200).json({message:"logged in",status:200})  // convert js object in to json string
 
    }else{
        res.status(400).json({message:"username or password invalid",status:400})
    }
})


app.get("/dashboard",auth,(req,res)=>{
    res.status(200).json({message:"this is dashboard",status:200,name:req.userinfo.username})
})

app.get("/create",auth,(req,res)=>{
    res.status(200).json({message:"this is create",status:200})
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
        req.userinfo=data
        next()
    })
}

app.post("/logout",(req,res)=>{
    res.clearCookie("logincookie")
    res.json({message:"logged out"})
})

app.listen(3000)