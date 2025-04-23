const ErrorHandler = require('../utils/errorHandler')
const allAsyncMethod = require('../middleware/catchAsyncError');
const User = require('../model/userModel');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const cloudinary = require('cloudinary')

//register User 
const registerUser =allAsyncMethod(async (req,res,next)=>{
  try{
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
      folder: "avatars",
      width:  150,
      crop:   "scale",
    });
  
  
         const {name, email, password}  = req.body;
         const user = await User.create({
          name,
          email,
          password,
          avatar: {
              public_id: myCloud.public_id,
              url: myCloud.secure_url,
          }
         });
        
        //  const token = user.getJwtToken()
        //  res.status(200).json({
        //   succes: true,
        //   //user
        //   token
        //  })
  
        sendToken(user, 201, res)
  }catch(err){
    next(err)
  }
      
  
})

//login user
//login karne pr user b mil jaye ga or token b
const loginUser= allAsyncMethod( async(req, res, next)=>{
    const {email, password} = req.body;
   
    if(!email || !password){
      return next(new ErrorHandler('Please Enter Email and Password', 400))
    }
   
    const user = await User.findOne({email}).select('+password')

    if(!user){
      return next(new ErrorHandler('Invalid Email or Password', 401))
    }

    const isPasswordCorrect = await user.comparePassword(password)

    if(!isPasswordCorrect){
      return next(new ErrorHandler('Invalid Email or Password', 401))
    }
     
    // const token = user.getJwtToken()
    // res.status(200).json({
    //   succes: true,
    //   token
    // })
   sendToken(user, 200, res)
   
})

const logoutUser = allAsyncMethod(async (req, res, next) => {
    
  res.cookie('token',null,{
    httpOnly: true,
    expires: new Date(Date.now()),
  })

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  })

});

//forget password 
const forgetPassword = allAsyncMethod(async (req,res,next)=>{

  const user = await User.findOne({email: req.body.email});
  if(!user){
    return next(new ErrorHandler('User Not Found', 404));
  }

   // userModel mein banya hua modle le kr aye hein
  const resetToken = user.generatResetPasswordToken();
   
  //save es liye krwa rahe hn ku k user to pahle bane gy forgetToken baad mein schema mein jaye 
  //es liye save krna pary ga
  await user.save({validateBeforeSave:false})

  // gmail pr link snd krne k liye link bnna hu ga
  //protocol mein http hu ya https mmil jaye ga req.get mein host mil jaye ga
  // const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`
   const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`
  //  console.log("reset url",resetUrl)
  const message = `your password reset token is  :- \n\n  ${resetUrl} \n\n if you
  have not requested this email then please ignore it`
   
  try{
    await sendEmail({
     email: user.email,
     subject: 'Ecommerece Password Recovery',
     message,

    });
    
    //  console.log(message)
    res.status(200).json({
       success:true,
       message: `Email sent successfully to ${req.body.email}`,
    })

  }catch(error) {
    //agr error ata h to token to mongodb mein save krwa chuke usy undefined kr 
    //k save krna pary ga
      user.resetPasswordToken =undefined;
      user.resetPasswordExpire = undefined;

      await user.save({validateBeforeSave: false});

      return next(new ErrorHandler(error.message, 500));

 //next(err)
  }
})

//resetToken
const resetPassword = allAsyncMethod(async (req, res, next) => {
 
 //creating hash token mongodb mein para hua token jo mail se gya h usy hash krna h
  const resetPasswordToken = crypto
               .createHash('sha256')
               .update(req.params.token) //jo mail mrin token gya h es se mil jaye ga
               .digest('hex');
        //user mil jaye ga jis ko token gya h
        const user = await User.findOne({
          resetPasswordToken,
          resetPasswordExpire: {$gt: Date.now()}
        });
        //agr user na mila tu error
        if(!user) {
          return next(
            new ErrorHandler(' Reset password token is Invalid or has been expired ', 400));
        }

        if(req.body.password !== req.body.confirmedPassword){
          return next(new ErrorHandler('Password does not match', 400))
        }

        user.password = req.body.password;

      user.resetPasswordToken =undefined;
      user.resetPasswordExpire = undefined;

      await user.save();
      sendToken(user, 200, res)

})

//get user Profile Detail
const getUserProfileDetail = allAsyncMethod(async (req, res, next) => {
  const user = await User.findById(req.user.id);
   // if condition lagne ki zroort nhi user milna hi h ye mehod login k baad hi accessable h
    res.status(200).json({
      success: true,
      user
    });
})

//update Password
const updatePassword = allAsyncMethod(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');
  //match Password
  const isPasswordMatch =await user.comparePassword(req.body.oldPassword);
  if(!isPasswordMatch) {
    
    return next(new ErrorHandler('old password is incorrect', 404));
  }
  
  if(req.body.newPassword !== req.body.confirmedPassword){
    return next(new ErrorHandler('password does not match', 404));
  }
  // user.password = user.body.newPassword;  
  // I fixed this error when I tried to updated password this is create error new Password 
  // Cannot read properties of undefined (reading 'newPassword') this error is in console

  user.password = req.body.newPassword;
  await user.save();

  // res.status(200).json({
  //   success: true,
  //   user
  // })
  sendToken(user, 200, res)
})

//Update UserFrofile just not password
const updateUserProfile = allAsyncMethod(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email
  };
  console.log("Avatar from Frontend: ", req.body.avatar);

  // image url from cloudinary
   if(req.body.avatar !== ""){
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id
    //pahle wala image delet krne k  liye 
    await cloudinary.v2.uploader.destroy(imageId)

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
      folder: "avatars",
      width:  150,
      crop:   "scale",
    });
    
    newUserData.avatar ={
      public_id : myCloud.public_id,
      url: myCloud.secure_url,
    }
   }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new:true,
    runValidators:true,
    // userFindAndUpdate:true,
  });
   
  res.status(200).json({
    success:true,
    user
  });
})

//Get all users of our website
const getAllUsers = allAsyncMethod(async (req, res, next) => {
  const users = await User.find().select('-password');
  res.status(200).json({
    success:true,
    users
  })
})

// if admin want to get single user detail
const  getSingleUserDetailByAdmin = allAsyncMethod(async(req,res,next)=>{
  const user = await User.findById(req.params.id).select('-password');

  if(!user){
    return next(new ErrorHandler(`User not found on this ${req.params.id}`))
  }

  res.status(200).json({
    success:true,
    user
  })
})

//Update UserFrofile role admin
const updateUserProfileRole = allAsyncMethod(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role
  };
  // const user = await User.findByIdAndUpdate(req.user.id, newUserData,{}) 
   //error req.user.id yani login kiye hue admin mein changing hu rehi the yaha error tha hame ne 
   // edit krne wale user ki params mein se id leni the 
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new:true,
    runValidators:true,
    userFindAndUpdate:true,
  });
   
  res.status(200).json({
    success:true,
    user
  });
})

//delete any user by admin
const deleteUser = allAsyncMethod(async (req, res, next) => {
  
  //we will remove cloudinary later
  const user = await User.findById(req.params.id);
   
  if(!user){
    return  next(
      new ErrorHandler(`User not found on this ${req.params.id}`))
  }

  const imageId = user.avatar.public_id
    //pahle wala image delet krne k  liye 
  await cloudinary.v2.uploader.destroy(imageId)

  await user.deleteOne();

  res.status(200).json({
    success:true,
    message:'User deleted successfully'
    
  });
})

module.exports={ 
    registerUser,
    loginUser,
    logoutUser,
    forgetPassword,
    resetPassword,
    getUserProfileDetail,
    updatePassword,
    updateUserProfile,
    getAllUsers,
    getSingleUserDetailByAdmin,
    updateUserProfileRole,
    deleteUser

}