const express = require('express');
const { sendEmail , sendWelcomeEmail  } = require('../controllers/emailController');

const router = express.Router();

// Route để gửi email
router.post('/send-email', sendEmail);

router.post('/send-welcome-email', sendWelcomeEmail);

module.exports = router;
