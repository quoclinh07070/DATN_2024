const express = require('express');
const router = express.Router();
const ghtkController = require('../controllers/ghtkController');

router.post('/calculate-fee', ghtkController.calculateFee);
router.post('/create-order', ghtkController.createOrder);

module.exports = router;
