<<<<<<< HEAD
=======
// server.js
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer'); // Import nodemailer

const productRoutes = require('./src/routes/productRoutes');
<<<<<<< HEAD
const categoryRoutes = require('./src/routes/categoryRoutes');
const postcategoryRoutes = require('./src/routes/postcategoryRoutes');
const commentpostRoutes = require('./src/routes/commentpostRoutes');
// const userRoutes = require('./src/routes/userRoutes');
const reviewRoutes = require('./src/routes/review');
const userRoutes = require('./src/routes/userRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');  // Import routes thanh toán MoMo
const emailRoutes = require('./src/routes/emailRoutes');
const checkoutRoutes = require('./src/routes/checkoutRoutes');

=======
const userRoutes = require('./src/routes/userRoutes');
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7
const db = require('./src/config/db'); // Nhập db từ config
const dbmomo = require('./src/config/momo'); // Nhập db từ config


const multer = require('multer');
const upload = multer(); // Tạo một instance multer để xử lý multipart/form-data

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
<<<<<<< HEAD
app.use('/api', postRoutes);
app.use('/api', voucherRoutes);
app.use('/api', orderRoutes);
app.use('/api', categoryRoutes);
app.use('/api', postcategoryRoutes);
app.use('/api', commentpostRoutes);
// app.use('/api', userRoutes);

app.use('/api', reviewRoutes);
app.use('/api', userRoutes);
app.use('/api', emailRoutes);
// app.use('/api', checkoutRoutes);
app.use('/api/payment', paymentRoutes);  // Thêm route thanh toán MoMo
app.use('/api', require("./src/routes/index"));
=======
app.use(upload.none());
app.use('/api', userRoutes);
app.use('/api', require("./src/routes/index"));

app.use((req,res,next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7

app.use((error,req,res,next) => {
  const statusCode = error.status || 500
  return  res.status(statusCode).json({
    status : 'error',
    code :statusCode,
    // stack:error.stack,
    message: error.message || 'Internal Server Error'
  })
})

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
