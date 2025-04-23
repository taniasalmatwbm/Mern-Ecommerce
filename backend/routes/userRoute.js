const express= require('express')
const router = express.Router()
const { registerUser,
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
        deleteUser} = require('../controller/userController')
const { isAuthenticatedUser, authorizeRole } = require('../middleware/auth')

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/password/forget').post(forgetPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/logout').get(logoutUser)
router.route('/me').get(isAuthenticatedUser, getUserProfileDetail)
router.route('/password/update').put(isAuthenticatedUser, updatePassword)
router.route('/me/update').put(isAuthenticatedUser, updateUserProfile)
router.route('/admin/users').get(isAuthenticatedUser, authorizeRole('admin'), getAllUsers)
router.route('/admin/user/:id')
.get(isAuthenticatedUser, authorizeRole('admin'), getSingleUserDetailByAdmin)
.put(isAuthenticatedUser, authorizeRole('admin'),updateUserProfileRole)
.delete(isAuthenticatedUser, authorizeRole('admin'),deleteUser)
module.exports = router