const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const userSchema = new mongoose.Schema(
    { 
        name:{
            type: String,
            required:[true, 'Please Enter Your Name'],
            maxLength:[30, 'Please cannot exceed 30 character'],
            minLength:[3, 'Please cannot be less than 3 character']
        },
        email:{
            type:String,
            required:[true, 'Please Enter Your Email'],
            unique:true,
            validate:[validator.isEmail, 'Please Enter a valid Email']
        },
        password:{
            type:String,
            required:[true, 'Please Enter Your Password'],
            minLength:[8, 'Password should be minimum 8 character'],
            select:false,   //without password everything come from db user data
        },
        avatar:{
            public_id:{
                type:String,
                required:true
               },
               url:{
                type:String,
                required:true
               }
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'admin'
        },
        createdAt: {
            type: Date,
            default: Date.now,
          },
        
          resetPasswordToken: String,
          resetPasswordExpire: Date,
});

// jb b register hu gy password hash  kr k rakhne k liye mongodb mein
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }

   this.password = await bcrypt.hash(this.password, 10)
});

// get jseonweb token 
userSchema.methods.getJwtToken = function(){
    return jwt.sign(
        {id:this._id},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRE} 
   )
}

//compare password for login mrthod
userSchema.methods.comparePassword = async function(password){
    return  await bcrypt.compare(password, this.password);   //true or false
}
 
// generating reset password token
//ye token mail k through bhjein gy koi b link pr click kare to reset password hu ga
userSchema.methods.generatResetPasswordToken = function() {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');
  
    // Hash and set resetPasswordToken
    // userschema k resetPasswordToken min ja k save hua 
    this.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
  
    // Set token expiry time (e.g., 10 minutes from now)
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
  };

module.exports = mongoose.model('User', userSchema)

