const express=require('express')
const router=express.Router()
const Razorpay=require('razorpay')
const request=require('request');
require('dotenv').config()
const Promocode=require('../models/promocodedb')

const razorInstance = new Razorpay({
    key_id: process.env.RAZORID,
    key_secret: process.env.RAZORSECRET
})

router.get('/order/:amount',(req,res)=>{

    try{
        const options={
            amount: req.params.amount*100,
            currency:"USD",
            receipt:'receipt3',
            payment_capture:0,
        };
        razorInstance.orders.create(options, async (err,order)=>{
            if(err){
                return res.status(500).json({
                    message:'somting err'
                })
            }
            return res.status(200).json(order)
        })
    }
    catch(err){
        return res.status(500).json({
            message: 'something err '
        })
    }
})

router.post('/capture/:paymentId/:amount',(req,res)=>{
    try{
        return request({
            method: 'POST',
            url: `https://${process.env.RAZORID}:${process.env.RAZORSECRET}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
            form:{
                amount:req.params.amount*100,
                currency:'USD'
            },

        },
        async (err,response,body)=>{
            if(err){
                return res.status(500).json({
                    message: 'something err '
                })
            }
            return res.status(200).json(body)
        }
        
        )
    }
    catch(err){
        return res.status(500).json({
            message: err.body
        })
    }
})

module.exports=router;