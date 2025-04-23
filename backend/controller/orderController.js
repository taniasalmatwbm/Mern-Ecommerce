const Order= require('../model/orderModel')
const Product = require('../model/productModel')
const ErrorHandler =require('../utils/errorHandler')
const allAsyncMethod = require('../middleware/catchAsyncError');

// create new order
exports.newOrder = allAsyncMethod(async(req,res,next)=>{
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    });

    res.status(200).json({
        success: true,
        order
    });
});

//get order detail
exports.getSingleOrder = allAsyncMethod(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)
    .populate('user', 'name email')

    if(!order){
        return next(new ErrorHandler('Order not found with this ID', 404))
    }

    res.status(200).json({
        success :true,
        order
    })
})

//logged in user can view self order detail
exports.myOrders = allAsyncMethod(async(req,res,next)=>{
    const orders = await Order.find({user: req.user._id})
    


    res.status(200).json({
        success :true,
        orders
    })
})

//get all order detail by admin
exports.getAllOrders = allAsyncMethod(async(req,res,next)=>{
    const orders = await Order.find()
    
    let totalAmount= 0;
      
    orders.forEach((order)=>{
        totalAmount+= order.totalPrice;
    })
   

    res.status(200).json({
        success :true,
        totalAmount,
        orders
    })
})



//update order status by admin

exports.updateOrder = allAsyncMethod(async (req, res, next) => {
    // Validate MongoDB ID format
    // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    //     return next(new ErrorHandler("Invalid Order ID format", 400));
    // }
  
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }
  
    // Validate the order status coming from the frontend
    const { status } = req.body;
  
    // Ensure the status is valid
    const validStatuses = ["Shipped", "Delivered", "Pending"];
    if (!validStatuses.includes(status)) {
      return next(new ErrorHandler("Invalid status", 400));
    }
  
    // Check if the order is already delivered
    if (order.orderStatus === "Delivered" && status === "Shipped") {
      return next(new ErrorHandler("Cannot mark as Shipped if already Delivered", 400));
    }
  
    // Update stock if order is shipped
    if (status === "Shipped") {
      for (const o of order.orderItems) {
        await updateStock(o.product, o.quantity);
      }
    }
  
    // Update the order status
    order.orderStatus = status;
  
    // Mark as Delivered if status is "Delivered"
    if (status === "Delivered") {
      order.deliveredAt = Date.now();
    }
  
    await order.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      order,
    });
  });
  
// exports.updateOrder = allAsyncMethod(async(req,res,next)=>{
//     const order = await Order.findById(req.params.id);

//     if(!order){
//         return next(new ErrorHandler('Order not found', 404))
//     }
    
//     if(order.orderStatus ==="Delivered"){
//         return next(new ErrorHandler('You have already delivered this order', 400))
//     }

//     if (req.body.status === "Shipped") {
//         order.orderItems.forEach(async (o) => {
//           await updateStock(o.product, o.quantity);
//         });
//       }

//     order.orderStatus = req.body.status;

//     if(req.body.status === 'Delivered'){
//         order.deliveredAt = Date.now();
//     }

//     await order.save({validateBeforeSave: false})
//     res.status(200).json({
//         success :true,
       
//     })
// })


async function updateStock(id, quantity){
     const product = await Product.findById(id);
     if (!product) throw new ErrorHandler("Product not found", 404);
     product.stock -= quantity;
     await product.save()
}

//Delete order  by admin
exports.deleteOrder = allAsyncMethod(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler('Order not found', 404))
    }

    await order.deleteOne(); // Replaces deprecated remove()

    res.status(200).json({
        success: true,
        message: "Order deleted successfully"
    });
})



// module.exports ={
//     newOrder,
//     getSingleOrder,
//     myOrders,
//     getAllOrders,
//     updateOrders,
//     deleteOrders
// }
