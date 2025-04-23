const express = require('express')
const morgan = require('morgan'); 
const cors= require('cors')
const app = express()
// Add at the top with other requires
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const errorMidleware =require('./middleware/error')
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv')


// 3. Morgan Logs Kya Dikhaega?
// Jab bhi koi API call hogi, terminal mein aisa dikhega:

// Log	Meaning
// GET /api/products 200 15ms	Successful request (200 status)
// POST /api/login 401 3ms	Unauthorized (401 status)
// DELETE /api/orders 404 7ms	Not found (404 status)
//  Development mode mein request logging enable karo
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // Logs: GET /api/products 200 12ms
}

app.use(cors({
  // here paste frontend vercel app
       origin:"http://localhost:5173",
    // origin: process.env.FRONTEND_URL.split(','),
    // [
      //"http://localhost:5173", // For local development
    //   "https://your-frontend-domain.vercel.app" // Your production frontend URL
    // ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));

// Security headers
app.use(helmet());
// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests
});
app.use('/api/', limiter);
  //For complex requests (e.g., with cookies), 
  // browsers send an OPTIONS preflight. Ensure your backend handles it:

  // Add this before routes

app.options('*', cors());  // Enable preflight for all routes

app.use(express.json()); //json mein data le ga or de ga b
app.use(cookieParser()); //cookie as middleware taking in frontend
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb"  }));   //object formet
// file ye folder apne server pr store krwane k liye public rakhein gy koi b acces kr sakta h
app.use(express.static("public"))
// Better file upload handling
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/",
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  abortOnLimit: true
}));
// app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));



//configure of dotenv file foe accessing var in any file
dotenv.config({path: 'backend/config/.env'})



//====================================
//Product Routes ko yaha import krna h
const product = require('./routes/productRoute')
app.use('/api/v1', product);
//=====================================
//User Routes ko yaha import krna  
const user =require('./routes/userRoute')
app.use('/api/v1', user);
//======================================
//Order Routes ko yaha import krana h 
const order = require('./routes/orderRoute')
app.use('/api/v1', order);
//=====================================
//Payment Routes ko yaha import krana h 
const payment = require('./routes/paymentRoute')
app.use('/api/v1', payment);

//node-Error-handler-middleware //kesi b request k baad koi error mily 
//product na mily jesy k 
app.use(errorMidleware)

module.exports = app


//note for all error handler

// 1)-- 404 error handler
//node-Error-handler-middleware //kesi b request k baad koi error mily 
//product na mily jesy k 

// 2)-- catchAsyncError method es liye bnaya h taky try catch mein all meth ko wrap kr dein
// or req k waqt koi data missing hu jaya to postman infinite hu jata h us k liye catch se error
// ko handle krna h

// 3)-- server.js k last pr deni h 
//Unhandled Promise Rejection //mongodb k urI mein koi issue hu to


//4)-- first pr likhe gy
//handling uncaught  Exception //ksi method ya vari ko banye 
//bagir console krwane pr error handle

//5)-- wrong http url id 
//wrong id pr to product foun k error a jaye ga lkn agr id k num khxh missing hu to cast-error
// a jayega us k liye error handler bnana h
// middleware error.js mein hi bna liya h es se valid id path k error hi aya ga 