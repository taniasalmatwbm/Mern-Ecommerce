require('dotenv').config(); 
const allAsyncMethod = require('../middleware/catchAsyncError');
// console.log("Stripe Secret Key payment controller:", process.env.STRIPE_SECRET_KEY);
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


exports.processPayment = allAsyncMethod(async (req, res, next) => {
      // 👈 move it inside function

    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        metadata: {
            company: "Ecommerce"
        },
    });

    res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret
    });
});

exports.sendStripeApiKey = allAsyncMethod(async (req, res, next) => {
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    });
});
