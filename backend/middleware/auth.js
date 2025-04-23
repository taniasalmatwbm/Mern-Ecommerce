const allAsyncMethod = require('./catchAsyncError');
const ErrorHandler =require('../utils/errorHandler')
const jwt = require('jsonwebtoken')
const User =require('../model/userModel')

exports.isAuthenticatedUser = allAsyncMethod(async(req,res,next)=>{
    // const token = req.cookies;  //{token: etc....}
    const {token} = req.cookies;    //etc..... srf token mil jaye ga  
   // console.log(token)

   if(!token){
    return next(new ErrorHandler('Please login to access this resources', 401));
   }
   
   const decodedData = jwt.verify(token, process.env.JWT_SECRET)
   //user jb tak login rahe ga req.user mein ham user ki properties access ke sakte hn
  req.user = await User.findById(decodedData.id);
 
  next();
})

exports.authorizeRole =(...roles)=>{
  return (req,res,next)=>{
    //roles ak array h kiya wo match h user k data role se 
    if(!roles.includes(req.user.role)){
      return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access to this resource`))
    };
    next()
  }
}