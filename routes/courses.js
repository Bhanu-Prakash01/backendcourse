const express=require('express');
const Course = require('../models/coursesdb');
const router=express.Router();
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const verify =require('./verfiytoken');
// const { route } = require('./razorpay');

//getting data from all the courses
router.get('/get',async (req,res)=>{
    const savedCourses= await Course.find()
    res.status(200).send(savedCourses)
})

//getting data from unique course
router.get('/get/:id',async(req,res)=>{
    try{
        const savedCourse= await Course.find({_id:req.params.id})
        res.send(savedCourse)
    }
    catch{
        res.status(400).json('no user found related to this  id')
    }
    
})

//deleting the all courses
router.delete('/delete',verify,async (req,res)=>{
    const coursesdeletedetials= await Course.deleteMany()
    res.send(coursesdeletedetials)
})

//delete the one course
router.delete('/delete/:id',verify,async (req,res)=>{
    
    const coursedeletedetial=await Course.deleteOne({_id:req.body.id})
    res.send(coursedeletedetial)
})


//register --new course
router.post('/post',verify,async(req,res)=>{
    const {maintittle,sectittle,technologies,duration,lectures,typeofcourse,price,types}=req.body
    if(!(maintittle && sectittle && technologies && duration && lectures && typeofcourse && price && types)){
        res.status(400).json('please fill all fields')
    }else{
        const course=new Course({
            maintittle:maintittle,
            sectittle:sectittle,
            technologies:technologies,
            duration:duration,
            lectures:lectures,
            typeofcourse:typeofcourse,
            price:price,
            types:types,
            faq:
            [
                {
                    q:req.body.q,
                    ans:req.body.ans
                }
            ]
        })
        const savecourse= await course.save()
        res.status(201).send(savecourse)
    }
    
})



module.exports=router;
