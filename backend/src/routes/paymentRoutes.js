//paymentRoutes.js
const db = require('../config/db');
const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const router = express.Router();
const  momoConfig  = require('../config/momo');  // Import cấu hình MoMo

// API tạo yêu cầu thanh toán
router.post('/create-payment', async (req, res) => {
  const { amount, orderId, orderInfo } = req.body;

  const MAX_AMOUNT_PER_DAY = 50000000; // Giới hạn số tiền thanh toán trong ngày (50 triệu)

  // Kiểm tra số tiền thanh toán trong ngày
  try {
    if (amount > MAX_AMOUNT_PER_DAY) {
      return res.status(400).json({
        statusCode: 400,
        message: `Số tiền thanh toán trên momo không được vượt quá 50.000.000đ/ngày!`,
      });
    }
  } catch (error) {
    console.error('Lỗi khi kiểm tra số tiền thanh toán trong ngày:', error);
    return res.status(500).json({ statusCode: 500, message: 'Lỗi khi kiểm tra giao dịch' });
  }
  const {
    accessKey,
    secretKey,
    partnerCode,
    redirectUrl,
    ipnUrl,
    requestType,
    lang,
    extraData,
  } = momoConfig;

  const requestId = partnerCode + new Date().getTime();
  
  // Tạo chuỗi dữ liệu dùng để ký
  const rawSignature =
    `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
  
  // Tạo chữ ký HMAC SHA256
  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(rawSignature)
    .digest('hex');

  // Dữ liệu gửi đi MoMo
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    partnerName: 'Test',
    storeId: 'TestStore',
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    lang: lang,
    requestType: requestType,
    extraData: extraData,
    signature: signature,
  });

  const options = {
    method: 'POST',
    url: 'https://test-payment.momo.vn/v2/gateway/api/create',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(requestBody),
    },
    data: requestBody,
  };

  try {
    console.log("Request body:", req.body);

    const response = await axios(options);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
});

// API callback MoMo sau khi thanh toán
router.post('/callback', async (req, res) => {
  const { resultCode, orderId, transId, amount, extraData } = req.body;

  console.log('Dữ liệu callback từ MoMo:', req.body);

  if (resultCode === '0') {
    try {
      const parsedExtraData = JSON.parse(extraData);
      const { userId, address, phoneNumber } = parsedExtraData;

      console.log('ExtraData sau khi parse:', parsedExtraData);

      // Kiểm tra xem đơn hàng đã tồn tại chưa
      const [existingOrder] = await db.query('SELECT orderId FROM orders WHERE orderId = ?', [orderId]);

      if (!existingOrder || existingOrder.length === 0) {
        console.log('Thêm đơn hàng mới vào bảng orders...');
        const insertOrderQuery = `
          INSERT INTO orders (orderId, user_id, total_amount, payment_method, status, payment_amount, address, phone_number, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
        `;
        await db.query(insertOrderQuery, [
          orderId,
          userId,
          amount,
          'momo',
          'delivered',
          amount,
          address,
          phoneNumber,
        ]);
        console.log('Đơn hàng mới đã được thêm:', orderId);
      } else {
        console.log('Cập nhật trạng thái đơn hàng đã tồn tại...');
        const updateOrderQuery = `
          UPDATE orders
          SET status = 'delivered', payment_method = 'momo', payment_amount = ?
          WHERE orderId = ?
        `;
        await db.query(updateOrderQuery, [amount, orderId]);
        console.log('Đơn hàng đã được cập nhật:', orderId);
      }

      res.status(200).json({ message: 'Đơn hàng đã được xử lý thành công.' });
    } catch (error) {
      console.error('Lỗi khi xử lý callback MoMo:', error.message);
      res.status(500).json({ message: 'Lỗi khi xử lý callback MoMo.', error: error.message });
    }
  } else {
    console.error(`Thanh toán thất bại với mã lỗi: ${resultCode}`);
    res.status(400).json({ message: 'Thanh toán thất bại' });
  }
});


// API kiểm tra trạng thái giao dịch MoMo
router.post('/check-status', async (req, res) => {
  const { orderId } = req.body;
  
  const { accessKey, secretKey, partnerCode } = momoConfig;

  const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=${partnerCode}&requestId=${orderId}`;

  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(rawSignature)
    .digest('hex');

  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    requestId: orderId,
    orderId: orderId,
    signature: signature,
    lang: 'vi',
  });

  const options = {
    method: 'POST',
    url: 'https://test-payment.momo.vn/v2/gateway/api/query',
    headers: {
      'Content-Type': 'application/json',
    },
    data: requestBody,
  };

  try {
    const result = await axios(options);
    res.status(200).json(result.data);
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
});

// API xử lý thanh toán khi nhận hàng (COD)
router.post('/submit-cod-order', async (req, res) => {
  try {
    const { user, cartItems, totalAmount, orderId, shippingAddress } = req.body;

    if (!user || !user.id) {
      return res.status(400).json({ message: 'Thiếu thông tin người dùng hoặc ID người dùng.' });
    }

    const fullAddress = shippingAddress.address;

    // Lưu thông tin vào bảng orders
    const orderQuery = `
        INSERT INTO orders (user_id, total_amount, payment_method, status, payment_amount, address, phone_number, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
    `;
    await db.query(orderQuery, [
      user.id,
      totalAmount,
      'cod',
      'delivered',
      totalAmount,
      fullAddress,
      user.phoneNumber,
    ]);

    // Cập nhật địa chỉ và số điện thoại vào bảng users nếu cần
    const updateUserQuery = `
        UPDATE users
        SET address = ?, phone_number = ?
        WHERE id = ?
    `;
    await db.query(updateUserQuery, [fullAddress, user.phoneNumber, user.id]);

    res.status(200).json({ message: 'Đơn hàng COD đã được tạo thành công' });
  } catch (err) {
    console.error('Lỗi khi xử lý thanh toán COD:', err.message);
    res.status(500).json({ message: 'Lỗi khi xử lý thanh toán COD', error: err.message });
  }
});


// router.post('/callback', async (req, res) => {
//   const { resultCode, message, orderId, transId } = req.body;

//   try {
//     if (resultCode === '0') {
//       console.log(`Thanh toán thành công, mã giao dịch: ${transId}`);

//       // Lấy thông tin đơn hàng từ orderId (nếu orderId chứa thông tin user)
//       const [orderResult] = await db.query('SELECT user_id FROM orders WHERE id = ?', [orderId]);
//       const userId = orderResult?.[0]?.user_id;

//       if (!userId) {
//         console.error('Không tìm thấy người dùng cho orderId:', orderId);
//         return res.status(404).json({ message: 'Không tìm thấy thông tin đơn hàng.' });
//       }

//       // Cập nhật trạng thái đơn hàng
//       const updateOrderQuery = `
//           UPDATE orders
//           SET status = 'shipped', payment_method = 'momo', payment_amount = (SELECT total_amount FROM orders WHERE id = ?)
//           WHERE id = ?
//       `;
//       await db.query(updateOrderQuery, [orderId, orderId]);

//       // Nếu cần cập nhật thông tin người dùng (số điện thoại hoặc địa chỉ)
//       const userInfoQuery = `
//           UPDATE users
//           SET address = COALESCE((SELECT address FROM orders WHERE id = ?), address),
//               phone_number = COALESCE((SELECT phone_number FROM orders WHERE id = ?), phone_number)
//           WHERE id = ?
//       `;
//       await db.query(userInfoQuery, [orderId, orderId, userId]);

//       res.status(200).json({ message: 'Thanh toán MoMo thành công và dữ liệu đã được cập nhật.' });
//     } else {
//       console.error(`Thanh toán thất bại: ${message}`);
//       res.status(400).json({ message: `Thanh toán thất bại: ${message}` });
//     }
//   } catch (err) {
//     console.error('Lỗi khi xử lý callback MoMo:', err.message);
//     res.status(500).json({ message: 'Lỗi khi xử lý callback MoMo.', error: err.message });
//   }
// });



module.exports = router;
