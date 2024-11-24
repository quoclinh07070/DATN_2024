const express = require('express');
const router = express.Router();
const { authentication } = require('../auth/auth.Utils');
const db = require('../config/db');

// API Place Order
router.post('/checkout', authentication, async (req, res) => {
    console.log('Middleware passed, User:', req.user);
    console.log('User ID:', req.user.userId);
      // Giả sử userId cần dùng trong keyStore hoặc cơ sở dữ liệu
  const keyStore = await findByUserId(req.user.userId);
  if (!keyStore) {
    return res.status(401).json({ message: 'User not found in keyStore.' });
  }
    const userId = req.user.userId;
    const { total_amount, payment_method, address, phone_number } = req.body;

  // Kiểm tra thông tin người dùng
  const user = await db.query('SELECT fullName, phone, address FROM users WHERE id = ?', [userId]);

  if (!user.length) {
    return res.status(400).json({ message: 'Người dùng không tồn tại.' });
  }

  const missingFields = [];
  if (!user[0].fullName) missingFields.push('fullName');
  if (!phone_number && !user[0].phone) missingFields.push('phone');
  if (!address && !user[0].address) missingFields.push('address');

  if (missingFields.length) {
    return res.status(400).json({
      message: 'Thông tin người dùng thiếu.',
      missingFields,
    });
  }

  // Tiến hành tạo đơn hàng
  try {
    const order = await db.query(
      'INSERT INTO orders (user_id, total_amount, payment_method, address, phone_number) VALUES (?, ?, ?, ?, ?)',
      [userId, total_amount, payment_method, address || user[0].address, phone_number || user[0].phone]
    );
    return res.status(201).json({ message: 'Đặt hàng thành công!', order_id: order.insertId });
  } catch (error) {
    console.error('Lỗi đặt hàng:', error);
    return res.status(500).json({ message: 'Lỗi đặt hàng.' });
  }
});

module.exports = router;
