const express=require('express');
const app=express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose=require('mongoose');
const Razorpay=require('razorpay');
const Payment= require("./models/paymentModel.js");
const crypto=require('crypto')

require("dotenv").config();

app.use(cors());
app.use(express.urlencoded({extended:true}));

const instance=new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret
});

const connectDB = async () => {
    const { connection } = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Mongodb is connected with ${connection.host}`);
  };

  connectDB()

app.get('/api/get_key',(req,res)=>{
    res.status(200).json({
        key:process.env.key_id
    })
})

app.post('/api/payment',async (req,res)=>{
    const options={
        amount:1000, //amount in the smallest currency unit
        currency:'INR',
    };
    const order=await instance.orders.create(options)
    console.log(order)
    res.status(200).json({
        success:true,
        order
    })
})

app.post('/api/verification',async (req,res)=>{
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.key_secret)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    res.redirect(
      `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
})


app.listen(8000,()=>{
    console.log('server running on port 8000')
})