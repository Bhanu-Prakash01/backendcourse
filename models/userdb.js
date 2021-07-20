const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    phonenumber:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})

module.exports =mongoose.model("Users",UserSchema)


// exports.Mail=Maildb