# Project Setup Guide

This project consists of a server and a client directory. Follow the steps below to set up and run the project:

## Step 1: Copy the project folder 'Assignment'

## Step 2: Move to the server directory inside Assignment 

Run commands:
1) npm install
2) nodemon server.js

## Step 3: Move to the client directory inside Assignment

Run commands:

1) npm install
2) npm run start

## Step 4: Open http://localhost:3000 on any browser 

## Project Flow
Razorpay payment integration gateway is used in test mode for the project.

Whenever userId is entered on the frontend and 'make payment' button clicked an API is called '/api/payment' which creates an order with an order_id, then razorpay checkout modal pops out, a payment method is choosen, and after the payment in sucessfull an API '/api/verification'
which verifies that the order_id which was created is authentic and not a spam and also when then API called payment properties such as 
razorpay_order_id, razorpay_payment_id, razorpay_signature are stored in the database inside payments group in the MongoDB Atlas whose url to connect is present in .env in server directory, model used for storing in database is payment inside models in server directory. After data is saved , backend redirectory to payment success page in the frontend '/paymentsuccess' along with the transaction_id. 

In the client directory frontend is present, inside src/components there are 2 pages, one which displays UserId input page i.e. 'UserIdPage.jsx' and one that displays success message after the payment i.e. 'SuccessPage.jsx', userid page takes the userid as input and then use that id for display when payment is made after 'make payment' button is clicked and when button is clicked razorpay checkout tab pops out for further process. Also to open the razorpay checkout tab razorpay key_id required which is stored in server directory in .env file and to get that from backend an API is running '/api/get_key'.   


