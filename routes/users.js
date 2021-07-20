const express=require('express');
const User= require('../models/userdb');
const router=express.Router();
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const verify =require('./verfiytoken');
// const { route } = require('./razorpay');

//getting data from all the users
router.get('/get',verify,async (req,res)=>{
    const savedUsers=await User.find()
    res.send(savedUsers)
})

//getting data from unique user
router.get('/get/:id',verify,async(req,res)=>{

    const saveduser= await User.find({_id:req.params.id})
    res.send(saveduser)
})

//deleting the all users
router.delete('/delete',verify,async (req,res)=>{
    const userdeletedetials= await User.deleteMany()
    res.send(userdeletedetials)
})

//delete the one user
router.delete('/delete/:id',verify,async (req,res)=>{
    const userdeletedetial=await User.deleteOne({_id:req.body.id})
    res.send(userdeletedetial)
})


//register --user
router.post('/post',async(req,res)=>{
    if (!(req.body.fname && req.body.lname && req.body.password && req.body.phonenumber && req.body.email)) {
        res.status(400).send("All input is required");
    }
    const findinguser=await User.findOne({$and:[{phonenumber:req.body.phonenumber},{email:req.body.email}]})
    if(findinguser){
        res.status(400).send('user already exist')
    }else{
        const encryptedPassword = await bcrypt.hash(req.body.password, 10);
        const data=new User({
            fname:req.body.fname,
            lname:req.body.lname,
            password:encryptedPassword,
            phonenumber:req.body.phonenumber,
            email:req.body.email,
            isAdmin:req.body.isAdmin
        })
        const saveduserdata= await data.save();
        const token=await jwt.sign({_id:saveduserdata._id},'sec')
        await res.header('auth-token',token).send('token has been given')
    }
})

//login --user
router.post('/login',async (req,res)=>{
    const {email,password}=req.body;
    if(!(email && password)){
        res.send('please fill all input fields')
    }
    const logincheck=await User.findOne({email:email})
    const passwrdcheck= await bcrypt.compare(password,logincheck.password)
    if(passwrdcheck){
        //creating the jwt token
        const token=await jwt.sign({_id:passwrdcheck._id},'sec')
        await res.headers('auth-token',token).send(token)
        res.send('5')
    }else{
        res.status(401).send('please try again')
    }
    
})



module.exports=router;
