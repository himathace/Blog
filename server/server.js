const express=require("express")
const cors=require("cors")
const app=express()
const jwt=require("jsonwebtoken")
const cookieparder=require("cookie-parser")
const { body , validationResult, check }=require("express-validator")
require("dotenv").config()
const mongoose=require("mongoose")
const users=require("./schema/user")  // import model(collection)
const bcrypt=require("bcrypt")

app.use(express.json())  // converting a JSON string  into a JavaScript object
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieparder())


mongoose.connect(process.env.connection_string)
.then(()=>console.log("database connected"))
.catch((error)=>console.error(error))



app.post("/register",[

    check("inputname").notEmpty().withMessage("username cannot be empty"),
    check("inputname").isAlphanumeric().withMessage("username can be only string and int"),

    check("inputemail").notEmpty().withMessage("email cannot be empty"),
    check("inputemail").isEmail().withMessage("email is not valid"),

    check("inputpassword").notEmpty().withMessage("password cannot be empty"),
    check("inputpassword").isLength({min:8}).withMessage("password must be 8 charaters")

],(req,res)=>{
    const enterusername=req.body.inputname
    const enteremail=req.body.inputemail
    const enterpassword=req.body.inputpassword

    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    else{

        let newobject={name:enterusername,password:enterpassword,email:enteremail}
        user.push(newobject)
        

        const createuser=async ()=>{

            try{

                const hashedPassword = await bcrypt.hash(enterpassword, 10); // hash password
                const newuser=new users({username:enterusername,email:enteremail,password:hashedPassword}) // create a new user
                await newuser.save()
                console.log("user created")
            }
            catch(error){
                console.log(error)
            }
        }
        createuser()

        res.status(200).json({status:200})
    }



})


app.post("/login",async(req,res)=>{


    try{

        const useremail=await users.findOne({email : req.body.username})
        if(!useremail){
            res.status(400).json({message:"username or password invalid",status:400})
        }

        const isMatch = await bcrypt.compare(req.body.password, useremail.password)
        if(!isMatch){
            res.status(400).json({message:"username or password invalid",status:400})
        }

        const token=jwt.sign({username:useremail.username},process.env.serect_key)
    
        res.cookie("logincookie",token,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:60*60*1000
        })
        res.status(200).json({message:"logged in",status:200})  // convert js object in to json string
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Server error", status:500})

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