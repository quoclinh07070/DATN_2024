'use strict'

const express = require('express')
const accessController = require('../../controllers/authController')
const asyncHandler = require("../../helpers/asyncHandler");
const {authentication,authorization} = require("../../auth/auth.Utils");
const router = express.Router()

router.post('/signup', asyncHandler(accessController.signUp))

router.post('/login', asyncHandler(accessController.login))
<<<<<<< HEAD
router.use(authentication) //tạm ẩn để test checkout
=======
router.use(authentication)
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7
router.post('/logout',asyncHandler(accessController.logout))
router.post('/handler-refresh-token', asyncHandler(accessController.handlerRefreshToken))


module.exports = router;