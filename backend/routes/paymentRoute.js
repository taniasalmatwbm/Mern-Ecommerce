const express = require("express");
const {
  processPayment,
  sendStripeApiKey, 
  // handleStripeWebhook 
} = require("../controller/paymentController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");
router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);



//  Stripe Webhook Route (UNPROTECTED - No auth needed)
router.post(
  "/webhook", 
  express.raw({ type: "application/json" }), // Stripe requires raw body
  processPayment
  // handleStripeWebhook
);

module.exports = router;    // paymentRoute.js ka code review karo