'use strict'

const express = require('express')
const accessController = require('../../controllers/authController')
const asyncHandler = require("../../helpers/asyncHandler");
const {authentication,authorization} = require("../../auth/auth.Utils");
const router = express.Router()

const productController = require('../../controllers/productController');


router.post('/admin',authorization('[admin]'), asyncHandler(productController.Admin))



module.exports = router;