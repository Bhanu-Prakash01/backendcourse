const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    phonenumber:{
        type:String,
        
    },
    email:{
        type:String,
        required:true,
    },
    fname:{
        type:String,
     
    },
    lname:{
        type:String,
   
    },
    password:{
        type:String,
    },
    signupwith:{
        type:String,
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