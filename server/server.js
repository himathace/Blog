const express=require("express")
const cors=require("cors")
const app=express()

app.use(express.json())
app.use(cors())


const user={
    name:"himath",
    passwoed:12345
}

app.get("/pages",(req,res)=>{
    res.json({message:"yoo"})
})

app.listen(3000)