class ErrorHandler extends Error{
    constructor(message, statusCode){  //ErrorHandler k constructor h
    super(message);  // error k constructor h
    this.statusCode = statusCode;
    Error.captureStackTrace(this,this.constructor);

    }

}

module.exports= ErrorHandler