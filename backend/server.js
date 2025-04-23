const dotenv = require('dotenv')
dotenv.config({path: '.env'})
const app = require('./app')
const connectdatabase = require('./config/db')
const cloudinary = require('cloudinary').v2
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
module.exports.stripe = stripe;
//first pr likhe gy
//handling uncaught  Exception //ksi method ya vari ko banye 
//bagir console krwane pr error handle
process.on('uncaughtException',(err)=>{
    console.log(`Error:${err.message}`);
    console.log('Shutting down the server due to uncaught Exeption');
    process.exit(1)
})



//configure of dotenv file foe accessing var in any file

// console.log("Stripe Secret Key server:", process.env.STRIPE_SECRET_KEY);
//connected with data base hamsha dotenv k baad kare
connectdatabase()
 
// console.log("Cloudinay variable", process.env.CLOUDINARY_CLOUD_NAME, 
//     process.env.CLOUDINARY_API_KEY, 
//     process.env.CLOUDINARY_API_SECRET
// );  // checking on console  error resolve 

cloudinary.config({
cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
api_key: process.env.CLOUDINARY_API_KEY,
api_secret: process.env.CLOUDINARY_API_SECRET
})

// 4) error part console.log(youtube) 
const server = app.listen(process.env.PORT || 5500 , ()=>{
    console.log(`server is running on this link http://localhost: ${process.env.PORT}`)
    console.log(`NODE_ENV IS DEVELOPMENT, ${process.env.NODE_ENV}`)
})

//3) server.js k last pr deni h 
//Unhandled Promise Rejection //mongodb k urI mein koi issue hu to
process.on('unhandledRejection',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1)
    })
})



// backend user and Api Authentication
// 1- npm i bcrypt, jsonwebtoken, cookie-parser, body-parser, nodemailer, validator

// 2- user register hua
// jb register hu ga token mil jaya ga 
// password b hash kiya 
// return mein postan pr user or token dono mily gy 

// 3- user ko successful login pr 
//return mein login or token mil jaye ga 

//Authentication kare gy 
//khch specific kaam wahi kar sakta h jo login h  

