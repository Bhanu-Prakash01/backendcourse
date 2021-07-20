const mongoose=require('mongoose');

const MailSchema=mongoose.Schema({
    msg:{
        type:String,
    },
    phonenumber:{
        type:Number
    },
    email:{
        type:String
    },
    username:{
        type:String
    }
})

// const Mail=mongoose.model("User",MailSchema)

// exports.Mail=Maildb