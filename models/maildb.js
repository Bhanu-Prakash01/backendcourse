const mongoose=require('mongoose');

const MailSchema=new mongoose.Schema({
    msg:{
        type:String,
        required:true
    },
    phonenumber:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    copy:{
        type:Boolean,
        required: true,
        default:false
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports =mongoose.model("Mails",MailSchema)


// exports.Mail=Maildb