// 2) catchAsyncError method es liye bnaya h taky try catch mein all meth ko wrap kr dein
// or req k waqt koi data missing hu jaya to postman infinite hu jata h us k liye catch se error
// ko handle krna h

module.exports=(allAsyncMethod)=>(req,res,next)=>{
    
    Promise.resolve(allAsyncMethod(req,res,next)).catch(next);

}