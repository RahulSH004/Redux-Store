import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.Razorpay_key_secret_id;
const verifyPayment = (req , res) => {
    try{
        const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;

        //create
        const text = razorpay_order_id + "|" + razorpay_payment_id;
        const generated_signature = crypto
        .createHmac("sha256", secret)
        .update(text)
        .digest('hex');
        

        if(generated_signature === razorpay_signature){
            res.status(200).json({
                success: true,
                message: "payment verified",
            });
        }else{
            res.status(400).json({
                success: false,
                message: "payment not verified",
            });
        }
    }catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "server error",
            error: error.message,
        });
    }
}

export {verifyPayment};