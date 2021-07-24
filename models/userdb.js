const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    phonenumber:{
        type:String,
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
    signupwith:{
        type:String,
        required: true,
        default:'default'
    },
    coursesbuy:{
        type:Array,
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