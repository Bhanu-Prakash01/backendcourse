const mongoose=require('mongoose');

const Courses =new mongoose.Schema({
    maintittle:{
        type:String,
        required:true
    },
    sectittls:{
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
    }
})

module.exports =mongoose.model("Courses",Courses)


// exports.Mail=Maildb