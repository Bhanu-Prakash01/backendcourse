const express=require('express');
const router=express.Router();
const Mail=require('../models/maildb')
const verify =require('./verfiytoken');


//get all mails
router.get('/get',async (req,res)=>{
    const savedmails=await Mail.find()
    res.json(savedmails)
}) 

//delete the mails
router.delete('/delete',async (req,res)=>{
    const deletemails=await Mail.deleteMany()
    res.json(deletemails)
})

//delete the one mail
router.delete('/delete/:id',async (req,res)=>{
    const maildeletedetial=await Mail.deleteOne({_id:req.body.id})
    res.send(maildeletedetial)
})


//posting the mails
router.post('/post',async(req,res)=>{
    if(!(req.body.msg && req.body.phonenumber && req.body.username && req.body.email)){
        res.status(400).json('please all inputs')
    }
    const data=new Mail({
        msg:req.body.msg,
        phonenumber:req.body.phonenumber,
        username:req.body.username,
        email:req.body.email,
        copy:req.body.copy
    })
    const savedmail= await data.save();
    res.send(savedmail)
})

module.exports=router;