//paymentRoutes.js
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
router.post('/callback', (req, res) => {
  const { resultCode, message, orderId, transId } = req.body;

  // Xử lý callback từ MoMo (cập nhật trạng thái đơn hàng)
  if (resultCode === '0') {
    console.log(`Thanh toán thành công, mã giao dịch: ${transId}`);
    // Cập nhật trạng thái đơn hàng trong DB (tùy chỉnh theo ứng dụng của bạn)
  } else {
    console.log(`Thanh toán thất bại: ${message}`);
  }

  return res.status(200).json({ message: `Callback nhận thành công, mã giao dịch: ${transId}` });
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

module.exports = router;
