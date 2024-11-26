'use strict'

const express = require('express')
// const {permission} = require("../auth/checkAuth");
const router = express.Router()

// check permission
// router.use(permission('0000'))
// router.use('', require('./product'))
router.use('', require('./access'))
<<<<<<< HEAD
router.use('', require('./admin'))
=======
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7
module.exports = router