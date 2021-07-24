const mongoose=require('mongoose');

const PromocodeSchema=new mongoose.Schema({
    promocode:{
        type:String,
        required:true,
        uniquie:true
    },
    discount:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports =mongoose.model("Promocodes",PromocodeSchema)
