'use strict'

const express = require('express')
const accessController = require('../../controllers/authController')
const asyncHandler = require("../../helpers/asyncHandler");
const {authentication,authorization} = require("../../auth/auth.Utils");
const router = express.Router()

router.post('/signup', asyncHandler(accessController.signUp))

router.post('/login', asyncHandler(accessController.login))
router.use(authentication)
<<<<<<< HEAD
router.post('/logout',asyncHandler(accessController.logout))
router.post('/handler-refresh-token', asyncHandler(accessController.handlerRefreshToken))


=======
router.post('/logout', authorization(['user']),asyncHandler(accessController.logout))
router.post('/handler-refresh-token', asyncHandler(accessController.handlerRefreshToken))

>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513
module.exports = router;