const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer'); // Import nodemailer

const postRoutes = require('./src/routes/postRoutes');
const voucherRoutes = require('./src/routes/voucherRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const productRoutes = require('./src/routes/productRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const postcategoryRoutes = require('./src/routes/postcategoryRoutes');
const commentpostRoutes = require('./src/routes/commentpostRoutes');;
const reviewRoutes = require('./src/routes/review');
const userRoutes = require('./src/routes/userRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');  // Import routes thanh toán MoMo
const emailRoutes = require('./src/routes/emailRoutes');
const ghtkRoutes = require("./src/routes/ghtkRoutes");

const db = require('./src/config/db'); // Nhập db từ config
const dbmomo = require('./src/config/momo'); // Nhập db từ config


// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());
// Use CORS middleware
app.use(cors());

// Middleware để phục vụ tệp tĩnh
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Cấu hình transporter cho nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Thay thế bằng máy chủ của Gmail
  port: 587,
  secure: false, // true nếu sử dụng cổng 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


// Route để gửi email thông báo xóa tài khoản
// Endpoint để gửi email thông báo
app.post('/send-email', (req, res) => {
  const { email, fullName } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER, // Người gửi
    to: email,                   // Người nhận
    subject: 'Thông báo tài khoản bị xóa',
    text: `Xin chào ${fullName},\n\nTài khoản của bạn đã bị xóa khỏi hệ thống. Nếu bạn nghĩ đây là một nhầm lẫn, vui lòng liên hệ với quản trị viên.\n\nTrân trọng,\nQuản trị hệ thống.`,
  };

  // Gửi email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Lỗi khi gửi email:', error);
      return res.status(500).send('Lỗi khi gửi email');
    }
    console.log('Email đã được gửi:', info.response);
    res.status(200).send('Email đã được gửi thành công');
  });
});



// Routes
app.use('/api', productRoutes);
app.use('/api', postRoutes);
app.use('/api', voucherRoutes);
app.use('/api', orderRoutes);
app.use('/api', categoryRoutes);
app.use('/api', postcategoryRoutes);
app.use('/api', commentpostRoutes);
app.use('/api', reviewRoutes);
app.use('/api', userRoutes);
app.use('/api', emailRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/orders', ghtkRoutes);
app.use('/api', require("./src/routes/index"));


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
