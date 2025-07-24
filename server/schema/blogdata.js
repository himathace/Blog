const mongoose=require("mongoose")

const postdata=new mongoose.Schema({
    title:String,
    content:String,
    username:String
})

module.exports=mongoose.model("blogdata",postdata)