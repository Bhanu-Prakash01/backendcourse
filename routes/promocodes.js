const express=require('express');
const { verify } = require('jsonwebtoken');
const router=express.Router();
const Promocode=require('../models/promocodedb')

//adding new promocode 
router.post('/post',verify ,async (req,res)=>{
    const promocode=req.body.promocode;
    const discount=req.body.discount
    const promosearch= await Promocode.findOne({promocode:promocode})
    if(!promosearch){
        const data = new Promocode({
            promocode:promocode,
            discount:discount
        })
        const savedpromo = await data.save() 
        res.send(savedpromo)
        // res.send('pealse add promocode')
        
    }
    else{
        res.status(400).send("promocode is already exist")
        // res.send(promosearch)
    }
    
})


//geting all promocode 
router.get('/get', async (req,res)=>{
    const savedpromocodes= await Promocode.find()
    res.send(savedpromocodes)
})


//geting single promocode
router.post('/get/single', async (req,res)=>{
    const promocode=req.body.promocode;
    try{
        const savedpromocode= await Promocode.find({promocode:promocode})
        if(savedpromocode){
            res.send(savedpromocode)
        }
        else{
            res.status(404).json("invaild token")
        }
        
    }
    catch{
        res.status(400).json("invaild token")
    }
})


//deleting all promocodes
router.delete('/delete', async (req,res)=>{
    const deletedpromocodes= await Promocode.deleteMany()
    res.send(deletedpromocodes)
})


//geting single promocode
router.delete('/delete/single', async (req,res)=>{
    const promocode=req.body.promocode;
    const deletedpromocode= await Promocode.deleteOne({promocode:promocode})
    res.send(deletedpromocode)
})


module.exports=router;