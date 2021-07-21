const mongoose=require('mongoose');

const MailSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    review:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports =mongoose.model("Mails",MailSchema)


// exports.Mail=Maildb