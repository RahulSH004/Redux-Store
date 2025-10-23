import express from 'express';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();


const razorpay = new Razorpay ({
    key_id: process.env.Razorpay_key_id,
    key_secret: process.env.Razorpay_key_secret_id,
})

const createorder = async (req , res) => {
    try{
        const {amount , currency = "INR" , receipt} = req.body;

        const options = {
            amount: amount * 100,
            currency,
            receipt,
        };
        const order = await razorpay.orders.create(options);
        res.status(201).json({
            success: true,
            order,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'failed to create order',
            error: error.message,
        });
    }
}
export {createorder};