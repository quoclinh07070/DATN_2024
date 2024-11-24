'use strict'

const express = require('express')
const accessController = require('../../controllers/authController')
const asyncHandler = require("../../helpers/asyncHandler");
const {authentication,authorization} = require("../../auth/auth.Utils");
const router = express.Router()

<<<<<<< HEAD
const authController = require('../../controllers/authController');


router.post('/admin',authorization('[admin]'), asyncHandler(authController.Admin))
=======
const productController = require('../../controllers/productController');


router.post('/admin',authorization('[admin]'), asyncHandler(productController.Admin))
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513



module.exports = router;