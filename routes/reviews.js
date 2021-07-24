const express=require('express');
const router=express.Router();
const Review=require('../models/reviewsdb')

router.post('/post', async (req,res)=>{
    const username=req.body.username;
    const review=req.body.review
    const data = new Review({
        username:username,
        review:review
    })
    const savedreview = await data.save() 
    res.send(savedreview)
})

router.get('/get', async (req,res)=>{
    const savereviewdata= await Review.find()
    res.send(savereviewdata)
})

module.exports=router;