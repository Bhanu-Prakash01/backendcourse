const express=require('express');
const router=express.Router();
const Mail=require('../models/maildb')
const verify =require('./verfiytoken');


//get all mails
router.get('/get',verify,async (req,res)=>{
    const savedmails=await Mail.find()
    res.json(savedmails)
})

//delete the mails
router.delete('/delete',verify,async (req,res)=>{
    const deletemails=await Mail.deleteMany()
    res.json(deletemails)
})

//delete the one mail
router.delete('/delete/:id',verify,async (req,res)=>{
    const maildeletedetial=await Mail.deleteOne({_id:req.body.id})
    res.send(maildeletedetial)
})


//posting the mails
router.post('/post',async(req,res)=>{
    if(!(req.body.msg && req.body.phonenumber && req.body.username && req.body.email)){
        res.send('please all inputs')
    }
    const data=new Mail({
        msg:req.body.msg,
        phonenumber:req.body.phonenumber,
        username:req.body.username,
        email:req.body.email
    })
    const savedmail= await data;
    res.send(savedmail)
})

module.exports=router;