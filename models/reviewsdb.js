const mongoose=require('mongoose');

const ReviewsSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    review:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports =mongoose.model("Reviews",ReviewsSchema)
