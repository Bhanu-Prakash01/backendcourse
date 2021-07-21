const express=require('express');
const Course = require('../models/coursesdb');
const router=express.Router();
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const verify =require('./verfiytoken');
// const { route } = require('./razorpay');

//getting data from all the users
router.get('/get',verify,async (req,res)=>{
    const savedCourses=await Course.find()
    res.send(savedUsers)
})

//getting data from unique user
router.get('/get/:id',verify,async(req,res)=>{

    const savedCourse= await Course.find({_id:req.params.id})
    res.send(savedCourse)
})

//deleting the all users
router.delete('/delete',verify,async (req,res)=>{
    const coursesdeletedetials= await Course.deleteMany()
    res.send(coursesdeletedetials)
})

//delete the one user
router.delete('/delete/:id',verify,async (req,res)=>{
    const coursedeletedetial=await Course.deleteOne({_id:req.body.id})
    res.send(coursedeletedetial)
})


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
            const token=await jwt.sign({_id:saveduserdata._id},'sec')
            await res.header('auth-token',token).send('token has been given')
        }
    }catch(err){
        console.log(err)
    }
    
})

//login --user
router.post('/login',async (req,res)=>{
    
    const {email,password}= await req.body;
    if(!(email && password)){
        res.send('please fill all input fields')
    }
    const logincheck=await User.findOne({email:email})
    const passwrdcheck= await bcrypt.compare(password,logincheck.password)
    if(passwrdcheck){
        //creating the jwt token
        const token=jwt.sign({_id:passwrdcheck._id},'sec')
        return res.header('auth-token',token).send(token)
        // res.) 
    }else{
        res.status(401).send('please try again')
    }
    
})



module.exports=router;
