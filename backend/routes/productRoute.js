const express = require('express')
const router = express.Router()
const { getAllProduct,
       getAdminProducts,
        createProduct,
        updateProduct,
        deleteProduct, 
        getSingleProduct,
        createReviewAndUpdate,
        getAllReviews,
        deleteReview} = require("../controller/productController")
const { isAuthenticatedUser, authorizeRole } = require('../middleware/auth')


//isAuthenticatedUser se pta chale ga k login h ya nhi token same h ya nhi to hi wo ye route
//access kr sakta h
router.route('/products').get(getAllProduct);

router.route("/admin/products").get(isAuthenticatedUser, authorizeRole('admin'), getAdminProducts);

router
.route('/admin/product/new')
.post(isAuthenticatedUser, authorizeRole('admin'), createProduct);

router
.route('/admin/product/:id')
.put(isAuthenticatedUser, authorizeRole('admin'), updateProduct)
.delete(isAuthenticatedUser, authorizeRole('admin'), deleteProduct);

router.route('/product/:id').get(getSingleProduct)
router.route('/review').put(isAuthenticatedUser, createReviewAndUpdate)

router
.route('/allReviews')
.get(getAllReviews)
.delete(isAuthenticatedUser, deleteReview)

module.exports = router

