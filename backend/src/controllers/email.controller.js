const nodemailer = require('nodemailer');

// Cấu hình transporter cho nodemailer với SMTP server của FPT.edu.vn
const transporter = nodemailer.createTransport({
  host: 'smtp.fpt.edu.vn',  // SMTP server của FPT.edu.vn
  port: 465,  // Sử dụng port 465 cho SMTPS
  secure: true,  // Bật SSL/TLS cho kết nối bảo mật
  auth: {
    user: 'dienlmpc04195@fpt.edu.vn',  // Địa chỉ email của bạn
    pass: 'your-email-password',  // Mật khẩu email của bạn
  },
});

const sendEmail = (req, res) => {
  const { email } = req.body;

  // Cấu hình email
  const mailOptions = {
    from: 'dienlmpc04195@fpt.edu.vn',  // Địa chỉ email gửi
    to: email,  // Email người nhận
    subject: 'Thông báo xóa tài khoản',
    text: 'Tài khoản của bạn đã bị xóa khỏi hệ thống.',
  };

  // Gửi email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Lỗi khi gửi email');
    }
    res.status(200).send('Email đã được gửi');
  });
};

module.exports = {
  sendEmail,
};
