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
const blog=require("./schema/blogdata")

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

    check("inputname").notEmpty().withMessage("Username Cannot be Empty*"),
    check("inputname").isAlphanumeric().withMessage("Username can be only string and int"),

    check("inputemail").notEmpty().withMessage("Email Cannot be Empty"),
    check("inputemail").isEmail().withMessage("Email is not valid"),

    check("inputpassword").notEmpty().withMessage("Password Cannot be Empty"),
    check("inputpassword").isLength({min:8}).withMessage("Password must be 8 Charaters Long")

],(req,res)=>{
    const enterusername=req.body.inputname
    const enteremail=req.body.inputemail
    const enterpassword=req.body.inputpassword

    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    else{

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


const auth=async (req,res,next)=>{   //  async middlewere

    try{

        const token=req.cookies.logincookie
        
        if(!token){

            const pageid=req.params.id // get id 
            const fulldetails=await blog.findOne({_id:pageid})
            const getbloginfo=await blog.find()
            return res.status(401).json({message:"unauthorized",status:401,dbdata:getbloginfo,fulldata:fulldetails})
        }
        
        jwt.verify(token,process.env.serect_key,(error,data)=>{
            if(error){
                return res.status(401).json({message:"invlaid auth",status:401})
            }
            req.userinfo=data
            next()
        })
    }
    catch(error){
        res.json({message:error})
    }
}    




app.get("/dashboard",auth,async(req,res)=>{

    try{
        const getbloginfo=await blog.find()
        res.status(200).json({message:"this is dashboard",status:200,name:req.userinfo.username,dbdata:getbloginfo})
    }
    catch(error){
        res.json({message:"error"})
        
    }
})


app.post("/create",auth,async(req,res)=>{

    try{

        const blogpostdata=new blog({title:req.body.blogtitle,content:req.body.blogcontent,username:req.userinfo.username,catogary:req.body.blogcatogary})
        await blogpostdata.save()
        res.status(200).json({status:200})
    }
    catch(error){
        console.log(error)
    }

})

app.get("/details/:id",auth,async(req,res)=>{

    try{
        const pageid=req.params.id // get id 
        const fulldetails=await blog.findOne({_id:pageid})
        res.json({fulldata:fulldetails,status:200,checkvalid:req.userinfo.username})
    }
    catch(error){
        console.log(error)
    }

})

app.put("/update/:id",auth,async(req,res)=>{

    try{

        const updatebyid=req.params.id

        const newbtitle=req.body.uptitle
        const newbcontent=req.body.upcontent

        await blog.findByIdAndUpdate(updatebyid,{
            title:newbtitle,
            content:newbcontent
        },{
            new:true
        })
        res.status(200).json({status:200})
    }
    catch(error){
        res.status(400).json({status:400})
        
    }

})

app.delete("/delete/:id",auth,async(req,res)=>{

    try{

        const deletebyid=req.params.id
        const deleteblog=await blog.findByIdAndDelete(deletebyid)
        if(!deleteblog){
            return res.status(404).json({status:404})
        }
        res.status(200).json({status:200})

    }
    catch(error){
        res.status(400).json({status:400})
    }

})


app.get("/",async(req,res)=>{

    try{

        const search=req.query.search
        const cat=req.query.category

        if(search){

            const searchblogs=await blog.find({
                $or:[
                    { title: { $regex: search, $options: "i" } },
                    { username: { $regex: search, $options: "i" } }
                ]
            })
    
            return res.json({message:searchblogs})
        }

        const query={}

        if(cat){
            query.catogary=cat
        }

        const getbloginfo=await blog.find(query)
        res.json({message:getbloginfo})

    }
    catch(error){

        res.status(400).json({message:400})
    }

})





app.post("/logout",(req,res)=>{
    res.clearCookie("logincookie")
    res.json({message:"logged out"})
})

app.listen(3000)