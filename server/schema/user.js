const mongoose=require("mongoose")


const userschema=new mongoose.Schema({
    username:String,
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})

module.exports=mongoose.model("user",userschema)