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

<<<<<<< HEAD
// Hàm gửi email quên mật khẩu
const sendForgotPassEmail = async ({ email, name, resetLink }) => {
  console.log("Email:", email); // Thêm log để kiểm tra
  console.log("Reset Link:", resetLink);
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "🔑 Yêu cầu đặt lại mật khẩu!",
    html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f4f4f9; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); padding: 20px;">
          <!-- Header -->
          <div style="text-align: center; padding-bottom: 20px;">
          </div>
      
          <!-- Body -->
          <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="text-align: center; color: #333; font-size: 22px;">Xin chào ${name},</h2>
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn. Nếu bạn đã yêu cầu điều này, vui lòng nhấn vào liên kết dưới đây để đặt lại mật khẩu:
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" style="display: inline-block; padding: 15px 25px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px; font-weight: bold; transition: background-color 0.3s;">
                Đặt lại mật khẩu
              </a>
            </div>
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Nếu bạn không yêu cầu, vui lòng bỏ qua email này. Mật khẩu của bạn sẽ không bị thay đổi.
            </p>
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Trân trọng,<br>
              <strong>IN7</strong>
            </p>
          </div>
      
          <!-- Footer -->
          <div style="text-align: center; margin-top: 20px; color: #999; font-size: 14px;">
            <p>
              Đây là email tự động, vui lòng không trả lời.<br>
              Nếu bạn gặp bất kỳ vấn đề nào, hãy liên hệ với chúng tôi qua trang hỗ trợ của công ty.
            </p>
            <p>
              © 2024 IN7. Tất cả các quyền được bảo lưu.
            </p>
          </div>
        </div>
        `,
=======
    // Hàm gửi email quên mật khẩu
    const sendForgotPassEmail = async ({ email, name, resetLink }) => {
      console.log('Email:', email); // Thêm log để kiểm tra
      console.log('Reset Link:', resetLink);
      const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Yêu cầu đặt lại mật khẩu!',
          html: `<p>Xin chào ${name},</p>
                 <p>Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn. Nếu bạn đã yêu cầu điều này, vui lòng nhấn vào liên kết dưới đây để đặt lại mật khẩu: <a href="${resetLink}">${resetLink}</a></p>
                 <p>Nếu bạn không yêu cầu, vui lòng bỏ qua email này. Mật khẩu của bạn sẽ không bị thay đổi.</p>
                 <p>Trân trọng,<br>[Tên công ty của bạn]</p>`,
      };
  
      try {
          const info = await transporter.sendMail(mailOptions);
          console.log('Email đã được gửi:', info.response);
          return { success: true };
      } catch (error) {
          console.error('Lỗi khi gửi email:', error);
          throw new Error('Lỗi khi gửi email');
      }
>>>>>>> d58cdb7109333951d275d7d475f1a6a37f05a0f0
  };
   
module.exports = { sendEmail, sendWelcomeEmail, sendForgotPassEmail};
