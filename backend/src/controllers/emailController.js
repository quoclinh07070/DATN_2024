const transporter = require('../config/emailConfig');
const crypto = require('crypto');
const User = require('../models/user');

// Hàm gửi email thông báo tài khoản bị xóa
const sendEmail = (req, res) => {
  const { email, fullName } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Thông báo tài khoản bị xóa',
    text: `Xin chào ${fullName},\n\nTài khoản của bạn đã bị xóa khỏi hệ thống do bạn vi phạm điều khoản của website chúng tôi. Nếu bạn nghĩ đây là một nhầm lẫn, vui lòng liên hệ với quản trị viên.\n\nTrân trọng,\nQuản trị hệ thống.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Lỗi khi gửi email:', error);
      return res.status(500).send('Lỗi khi gửi email');
    }
    console.log('Email đã được gửi:', info.response);
    res.status(200).send('Email đã được gửi thành công');
  });
};

// Hàm gửi email chúc mừng đăng ký tài khoản thành công
const sendWelcomeEmail = (req, res) => {
  const { email, name } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Thông báo đăng ký tài khoản thành công!',
    text: `Xin chào ${name},\n\nChúc mừng bạn đã đăng ký tài khoản thành công! Chúng tôi rất vui được đồng hành cùng bạn. Nếu có bất kỳ thắc mắc nào, đừng ngần ngại liên hệ với chúng tôi.\n\nTrân trọng,\nĐội ngũ hỗ trợ.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Lỗi khi gửi email:', error);
      return res.status(500).send('Lỗi khi gửi email chúc mừng');
    }
    console.log('Email chúc mừng đã được gửi:', info.response);
    res.status(200).send('Email chúc mừng đã được gửi thành công');
  });
};


module.exports = { sendEmail, sendWelcomeEmail};
