const express=require('express');
const User= require('../models/userdb');
const router=express.Router();
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const verify =require('./verfiytoken');
require('dotenv').config()
// const { route } = require('./razorpay');

//getting data from all the users
router.get('/get',verify,async (req,res)=>{
    const savedUsers=await User.find()
    res.send(savedUsers)
})

//getting data from unique user
router.get('/get/:id',verify,async(req,res)=>{
    try{
        const saveduser= await User.find({_id:req.params.id})
        res.send(saveduser)
    }
    catch{
        res.status(400).json('no user found related to this  id')
    }
    
})

//deleting the all users
router.delete('/delete',verify,async (req,res)=>{
    const userdeletedetials= await User.deleteMany()
    res.send(userdeletedetials)
})

//delete the one user
router.delete('/delete/:id',verify,async (req,res)=>{
    try{
        const userdeletedetial=await User.deleteOne({_id:req.body.id})
        res.send(userdeletedetial)
    }
    catch{
        res.status(400).json('no user found related to this  id')
    }
    
})


//update user for course\
// router.post('/update',async (req,res)=>{
//     const coursesbuy= req.body.coursesby
//     const userId=req.body.userid
//     const
// })



//register --user 
router.post('/post',async(req,res)=>{
    if (!(req.body.fname && req.body.lname && req.body.password && req.body.phonenumber && req.body.email)) {
        res.status(400).json("All input is required");
    }
    try{
        const findinguser=await User.findOne({email:req.body.email})
        if(findinguser){
            res.status(400).json('user already exist')
        }
        else{
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
            res.status(201).send(saveduserdata)
            // const token=jwt.sign({ _id: saveduserdata._id }, process.env.JWTSECRET)
            // res.header('auth-token', token).send('token has been given')
        }
    }catch(err){
        console.log(err) 
    }
    
})

//login --user
router.post('/login', async (req,res)=>{
    const email= req.body.email;
    const password= req.body.password;
    if(!(email && password)){
        res.status(400).json('please fill all input fields')
    }
    try{
        const logincheck= await User.findOne({email:email})
        if(logincheck){
            const passwrdcheck= await bcrypt.compare(password,logincheck.password)
            if(passwrdcheck){
                //creating the jwt token
                const token= jwt.sign({ _id: passwrdcheck._id }, process.env.JWTSECRET,{expiresIn:'1d'})
                
                res.json({auth:true,token:token,data:logincheck})
            }else{ 
                res.status(401).json('please try again')
            }
        }
        else{
            res.status(404).json('user does not exist')
        }
    }catch{
        res.status(404).json('user does not exist')
    }
     
})



module.exports=router;
