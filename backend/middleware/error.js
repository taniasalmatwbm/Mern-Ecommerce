const ErrorHandler = require('../utils/errorHandler')

module.exports=(err,req,res,next)=>{
    //kesi b req method mein koi issue hu to us k liye ye sary error as middleware req se pahle
    //handle hu gy
    err.statusCode = err.statusCode || 500;  //500 entrnal error
    err.message = err.message || 'Enternal Server Error';


    //wrong http url id
    if(err.name === 'CastError'){
        const message=`Resouces not Found Invalid: ${err.path}`
        err = new ErrorHandler(message, 404)
    }
     //mongodb duplicate key error
     if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400)
     }

     //wrong jsonWebToken error
     if(err.code === 'jsonWebTokenError'){
        const message = `JsonWebToken Error is invalid, try again`;
        err = new ErrorHandler(message, 400)
     }

     //jsonWebToken Expired error
     if(err.code === 'tokenExpireError'){
        const message = `JsonWebToken Expire Please, try again`;
        err = new ErrorHandler(message, 400)
     }

    //agr koi url match na hu ya id na mily us k error k liye
    res.status(err.statusCode).json({
        success:false,
        //error:err,
        message:err.message,
        //error:err.stack
    })
}