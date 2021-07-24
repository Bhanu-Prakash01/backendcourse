const mongoose=require('mongoose');

const faqsec=mongoose.Schema({
    q:{
        type:String,
    },
    ans:{
        type:[String]
    }
})

const Courses =new mongoose.Schema({
    maintittle:{
        type:String,
        required:true
    },
    sectittle:{
        type:String,
        required:true
    },
    technologies:{
        type:Array,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    lectures:{
        type:Number,
       required:true
    },
    typeofcourse:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    faq:[faqsec],
    types:{
        type:Number,
        required:true
    }
})

module.exports =mongoose.model("Courses",Courses)


// exports.Mail=Maildb