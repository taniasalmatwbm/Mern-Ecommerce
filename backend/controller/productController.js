const Product = require('../model/productModel')
const ErrorHandler =require('../utils/errorHandler')
const allAsyncMethod = require('../middleware/catchAsyncError');
const ApiFeature = require('../utils/apifeatures');
const cloudinary = require("cloudinary")

// create-Product for admin

const createProduct = async (req, res, next) => {
  try {
    // console.log("Request Body:", req.body);
    // console.log("Request Files:", req.files);

    if (!req.files || !req.files.images) {
      return res.status(400).json({ success: false, message: "No images uploaded!" });
    }

    let images = Array.isArray(req.files.images) ? req.files.images : [req.files.images];

    const imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
      if (!images[i].tempFilePath) {
        return res.status(400).json({ success: false, message: "Temp file path missing!" });
      }

      const result = await cloudinary.v2.uploader.upload(images[i].tempFilePath, {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    console.log("Product Created:", product);

    res.status(201).json({ 
      
      success: true, 
      product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// const createProduct = async (req, res, next) => {
//   try {
//     console.log("Request Body:", req.body);
//     console.log("Request Files:", req.files);

//     if (!req.files || !req.files.images) {
//       return res.status(400).json({ success: false, message: "No images uploaded!" });
//     }

//     let images = Array.isArray(req.files.images) ? req.files.images : [req.files.images]; 

//     const imagesLinks = [];
//     for (let i = 0; i < images.length; i++) {
//       const result = await cloudinary.v2.uploader.upload(images[i].tempFilePath, {
//         folder: "products",
//       });

//       imagesLinks.push({
//         public_id: result.public_id,
//         url: result.secure_url,
//       });
//     }

//     req.body.images = imagesLinks;
//     req.body.user = req.user.id;

//     const product = await Product.create(req.body);

//     res.status(201).json({ success: true, product });
//   } catch (error) {
//     console.error("Error creating product:", error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };


// const createProduct = allAsyncMethod(async (req, res, next) => {
//   try {
//     let images = [];

//     if (req.body.images) {  // Check if images exist
//       if (typeof req.body.images === "string") {
//         images.push(req.body.images);
//       } else if (Array.isArray(req.body.images)) {
//         images = req.body.images;
//       }
//     }

//     const imagesLinks = [];

//     for (let i = 0; i < images.length; i++) {
//       try {
//         const result = await cloudinary.v2.uploader.upload(images[i], {
//           folder: "products",
//         });

//         imagesLinks.push({
//           public_id: result.public_id,
//           url: result.secure_url,
//         });
//       } catch (error) {
//         console.error(`Image upload failed for index ${i}:`, error.message);
//       }
//     }

//     // If no images were successfully uploaded, return an error
//     if (imagesLinks.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "No images were uploaded successfully. Please try again.",
//       });
//     }
//     console.log("backend",req.body)
//     const product = await Product.create({
//       ...req.body,
//       images: imagesLinks,
//       user: req.user.id,
//     });

//     res.status(201).json({
//       success: true,
//       product,
//     });

//   } catch (error) {
//     next(error);
//   }
// });

// const createProduct = allAsyncMethod(async (req, res, next) => {
//     try {
//       let images = [];
  
//       if (typeof req.body.images === "string") {
//         images.push(req.body.images); // Convert single image string to an array
//       } else if (Array.isArray(req.body.images)) {
//         images = req.body.images;
//       }
  
//       const imagesLinks = [];
  
//       for (let i = 0; i < images.length; i++) {
//         const result = await cloudinary.v2.uploader.upload(images[i], {
//           folder: "products",
//         });
  
//         imagesLinks.push({
//           public_id: result.public_id,
//           url: result.secure_url,
//         });
//       }
  
//       // Attach uploaded images and user to request body
//       req.body.images = imagesLinks;
//       req.body.user = req.user.id;
  
//       const product = await Product.create(req.body);
  
//       res.status(201).json({
//         success: true,
//         product,
//       });
//     } catch (error) {
//       next(error); // Pass errors to your error handler middleware
//     }
//   });
  
// const createProduct= allAsyncMethod(async (req,res,next)=>{
//       //login krne pr user ki id ko productmodel k ref jaha user k diya h product 
//       //create krte waqt le lein gi
      
//      let images =[];
//      if(typeof req.body.images === "string"){
//         images.push(req.body.images);
//      }else {
//         images = req.body.images;
//      }

//      const imagesLinks = [];
//      for(let i=0; i<=images.length; i++){
//         const result = await cloudinary.v2.uploader.upload(images[i],{
//             folder: "products"
//         })

//         imagesLinks.push({
//             public_id: result.public_id,
//             url: result.secure_url,
//         });
//      }
//      //cloudinary images k link
//      req.body.images = imagesLinks
//     req.body.user = req.user.id
//     const product = await Product.create(req.body);
//     res.status(201).json({
//         success:true,
//         product
//     })
// })

// Get All Products

const getAllProduct = allAsyncMethod(async (req,res)=>{
//req.query.keyword var h
const resultPerPage = 20
const productCount = await Product.countDocuments();
const apifeatures = new ApiFeature(Product.find(),req.query).search().filter()
apifeatures.pagination(resultPerPage);
let products = await apifeatures.query;
let filteredProductsCount= products.length;
 
 
 //query mein sara kamm wapis a rha h 
    //  products = await apifeatures.query;
    res.status(200).json({
        success:true,
        products,
        productCount,
        resultPerPage,
        filteredProductsCount
    })
})

// Get All Product (Admin)
const getAdminProducts = allAsyncMethod(async (req, res, next) => {
    const products = await Product.find();
  
    res.status(200).json({
      success: true,
      products,
    });
  });


// update Product by id
const updateProduct = allAsyncMethod(async (req,res,next)=>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return (new ErrorHandler('product not found', 404))
    }
     // images start h
    let images =[];
     if(typeof req.body.images === "string"){
        images.push(req.body.images);
     }else {
        images = req.body.images;
     }
      
     //agr iamges mei khh h tu
     if (images !== undefined) {
        // Deleting Images From Cloudinary
        for (let i = 0; i < product.images.length; i++) {
          await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }
    
        const imagesLinks = [];
    
        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
          });
    
          imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }
    
        req.body.images = imagesLinks;
      }

   
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        //update krwane k liye
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
   
    res.status(200).json({
        success:true,
        product
    })
})

//Delete Product By Id
const deleteProduct = allAsyncMethod(async (req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return (new ErrorHandler('product not found', 404))
    }

// Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
         await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    await product.deleteOne()
   
    res.status(200).json({
        success:true,
        message:'Product delete successfully'
    })


})

//getSingle Product
const getSingleProduct = allAsyncMethod(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
  
    if(!product){
      return next(new ErrorHandler('Product not found',404));
    }
  
    res.status(200).json({
      success:true,
      product,
    })
  }
  
  )

//Create New Review and update the review
const createReviewAndUpdate =allAsyncMethod(async(req,res,next)=>{
    const {rating,comment,productId} = req.body

    const review  ={
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment
    }
    const product = await Product.findById(productId);

    //agr pahle se review diya hua h
    const isReviewed = product.reviews.find(
        rev=>rev.user.toString() ===req.user._id.toString()
    );

    if(isReviewed){
       product.reviews.forEach((rev)=>{
        //sary reviews check kare gy jaha id mach hu gai waha rating or comment update kr le gy
        if(rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment)
       });

    }else{
        //product k reviews schema mein array add kr do
     product.reviews.push(review);
     product.numOfReviews = product.reviews.length

    }
    //product k rating ki avarge nikal le
    // differ user ne rating add ki h 4+4+4 = 12/3 =4....ye sab array mein add hu jaye ga 
    let avg=0;

    product.reviews.forEach((rev)=>{
        avg+=rev.rating
    })

    product.ratings=avg / product.reviews.length;


    await product.save({validateBeforeSave:false});

    res.status(200).json({
        success:true,
    });

})

//Get All Reviews
const getAllReviews = allAsyncMethod(async(req,res,next)=>{
    const product = await Product.findById(req.query.id);
    if(!product){
        return next(new ErrorHandler('Product not found', 404))
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

//Get All Reviews of one product
const deleteReview = allAsyncMethod(async(req,res,next)=>{
    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler('Product not found', 404))
    }

    const reviews = product.reviews.filter(
        (review) => review._id.toString() !== req.query.id.toString()
    )


    let avg=0;
    reviews.forEach((rev)=>{
        avg+=rev.rating
    })
    // const ratings =  avg / reviews.length;   //error  agar sary ration delete hu jaye 0/0 =NAN database mein ajye ga jo k thek nhi h
    const ratings = reviews.length > 0 ? avg / reviews.length : 0;
    // const ratings = reviews.length ? avg / reviews.length : 0;  // upr aur neche dono thek hu gy
    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
        reviews,
        ratings,
        numOfReviews,
        },
        {
        new: true,
        runValidators:true,
        useFindAndModify:false,
        }
    )
    res.status(200).json({
        success:true,
        message:'Review deleted successfully',
    })

    

})
// const deleteReview = allAsyncMethod(async (req, res, next) => {
//   const product = await Product.findById(req.query.productId);

//   if (!product) {
//       return next(new ErrorHandler("Product not found", 404));
//   }

//   const reviews = product.reviews.filter(
//       (review) => review._id.toString() !== req.query.id.toString()
//   );

//   let avg = 0;
//   reviews.forEach((rev) => {
//       avg += rev.rating;
//   });

//   const ratings = reviews.length > 0 ? avg / reviews.length : 0;
//   const numOfReviews = reviews.length;

//   await Product.findByIdAndUpdate(
//       req.query.productId,
//       {
//           reviews,
//           ratings,
//           numOfReviews,
//       },
//       {
//           new: true,
//           runValidators: true,
//           useFindAndModify: false,
//       }
//   );

//   res.status(200).json({
//       success: true,
//       message: "Review deleted successfully",
//   });
// });


module.exports = { 
    createProduct,
    getAllProduct,
    getAdminProducts,
    updateProduct,
    deleteProduct,
    getSingleProduct,
    createReviewAndUpdate,
    getAllReviews,
    deleteReview

}