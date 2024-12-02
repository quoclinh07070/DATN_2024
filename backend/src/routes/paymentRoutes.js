//paymentRoutes.js
const db = require('../config/db');
const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const router = express.Router();
const  momoConfig  = require('../config/momo');  // Import cấu hình MoMo
// API tạo yêu cầu thanh toán
router.post('/create-payment', async (req, res) => {
  const { amount, orderId, orderInfo, extraData, cartItems } = req.body;
  const { userId, address, phoneNumber, note } = JSON.parse(extraData); // Lấy thông tin người dùng từ extraData
  
  console.log(cartItems);
  
  const MAX_AMOUNT_PER_DAY = 50000000; // Giới hạn số tiền thanh toán trong ngày (50 triệu)
  const MIN_AMOUNT = 10000; // Tối thiểu số tiền thanh toán

  // Kiểm tra số tiền thanh toán trong ngày
  if (amount > MAX_AMOUNT_PER_DAY) {
    return res.status(400).json({
      statusCode: 400,
      message: "Số tiền thanh toán trên momo không được vượt quá 50.000.000đ/ngày!",
    });
  } else if (amount < MIN_AMOUNT) {
    return res.status(401).json({
      statusCode: 401,
      message: "Số tiền thanh toán tối thiểu 10.000đ!",
    });
  }

  // Logic tạo đơn hàng thanh toán qua MoMo
  try {
    const { accessKey, secretKey, partnerCode, redirectUrl, ipnUrl, requestType, lang } = momoConfig;
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

    // Gửi yêu cầu đến MoMo và nhận phản hồi
    const response = await axios(options);
    console.log('MoMo Response:', response.data); // Log toàn bộ dữ liệu trả về từ MoMo

    if (response.data.resultCode === 0) {
      const orderId = response.data.orderId;  // Mã giao dịch từ MoMo

      // Lưu các giá trị voucher từ `cartItems`
      const voucherCode = cartItems[0]?.voucherCode || null;  // Lấy voucher code từ sản phẩm đầu tiên (nếu có)
      const voucherDiscount = cartItems[0]?.voucherDiscount || null;  // Lấy voucher discount từ sản phẩm đầu tiên (nếu có)
      const voucherId = cartItems[0]?.voucherId || null;  // Lấy voucher ID từ sản phẩm đầu tiên (nếu có)

      // Lưu thông tin đơn hàng vào DB khi thanh toán qua MoMo
      const orderQuery = `
        INSERT INTO orders (user_id, orderId, total_amount, payment_method, status,
        address, phone_number, voucher_id, voucher_code, voucher_discount, note, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
      `;

      const orderResult = await db.query(orderQuery, [
        userId,
        orderId,  // Lưu transId ngay sau khi lấy từ phản hồi MoMo
        amount,
        'momo',
        'processing', // Trạng thái đơn hàng
        address,
        phoneNumber,
        voucherId,
        voucherCode,
        voucherDiscount,
        note || null,
      ]);

      const orderIdFromDB = orderResult[0].insertId;
      
      if (!orderIdFromDB) {
        return res.status(500).json({
          statusCode: 500,
          message: 'Không thể tạo đơn hàng, vui lòng thử lại!',
        });
      }

      // Chèn chi tiết đơn hàng vào DB
      const insertOrderDetailsPromises = cartItems.map((item) => {
        const { productId, productName, quantity, unitPrice, totalPrice, voucherCode, voucherDiscount } = item;

        const orderDetailQuery = `
          INSERT INTO order_details (order_id, product_id, product_name, quantity, unit_price, total_price, created_at, updated_at, voucher_code, voucher_discount)
          VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW(), ?, ?)
        `;

        return db.query(orderDetailQuery, [
          orderIdFromDB, // orderId đã có
          productId,
          productName,
          quantity,
          unitPrice,
          totalPrice,
          voucherCode || null,
          voucherDiscount || 0,
        ]);
      });

      // Chờ tất cả các Promise hoàn thành
      await Promise.all(insertOrderDetailsPromises);

      // Trả về phản hồi thành công
      res.status(200).json(response.data);
    } else {
      res.status(500).json({
        statusCode: 500,
        message: 'Thanh toán thất bại',
      });
    }
  } catch (error) {
    console.error('Thanh toán thất bại:', error);
    res.status(500).json({ statusCode: 500, message: error.message });
  }
});



// API callback MoMo sau khi thanh toán
router.post('/callback', (req, res) => {
  const { resultCode, message, orderId, transId } = req.body;
  console.log('Callback MoMo:', req.body);

  // Xử lý callback từ MoMo (cập nhật trạng thái đơn hàng)
  if (resultCode === '0') {
    console.log(`Thanh toán thành công, mã giao dịch: ${orderId}`);
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

// API xử lý thanh toán khi nhận hàng (COD)
router.post('/submit-cod-order', async (req, res) => {
  try {
    const { user, totalAmount, shippingAddress, cartItems } = req.body;

    if (!user || !user.id) {
      return res.status(400).json({ message: 'Thiếu thông tin người dùng hoặc ID người dùng.' });
    }

    const fullAddress = shippingAddress.address;
    // Lưu các giá trị voucher từ `cartItems`
    const voucherCode = cartItems[0]?.voucherCode || null;  // Lấy voucher code từ sản phẩm đầu tiên (nếu có)
    const voucherDiscount = cartItems[0]?.voucherDiscount || null;  // Lấy voucher discount từ sản phẩm đầu tiên (nếu có)
    const voucherId = cartItems[0]?.voucherId || null;  // Lấy voucher ID từ sản phẩm đầu tiên (nếu có)

    // Lưu thông tin vào bảng orders
    const orderQuery = `
        INSERT INTO orders (user_id, total_amount, payment_method, status, 
        address, phone_number, voucher_id, voucher_code, voucher_discount, note, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;
    const orderResult = await db.query(orderQuery, [
      user.id,
      totalAmount,
      'cod',
      'processing',
      fullAddress,
      user.phoneNumber,
      voucherId,
      voucherCode,
      voucherDiscount,
      user.note,
    ]);
      // Lấy orderId của đơn hàng vừa tạo (insertId từ câu lệnh INSERT)
    const orderIdFromDB = orderResult[0].insertId;
 // Kiểm tra xem orderIdFromDB có giá trị (trường hợp lỗi), trả lỗi ngay
 if (!orderIdFromDB) {
  return res.status(500).json({
    statusCode: 500,
    message: 'Không thể tạo đơn hàng, vui lòng thử lại!',
  });
}

    // Sau khi đã có orderId, bạn có thể thực hiện chèn các chi tiết đơn hàng đồng thời
    const insertOrderDetailsPromises = cartItems.map((item) => {
      console.log('Saving cart item:', item);  // Log cart item

      const { productId, productName, quantity, unitPrice, totalPrice, voucherCode, voucherDiscount } = item;

      const orderDetailQuery = `
        INSERT INTO order_details (order_id, product_id, product_name, quantity, unit_price, total_price, created_at, updated_at, voucher_code, voucher_discount)
        VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW(), ?, ?)
      `;

      // Trả về Promise cho mỗi truy vấn chèn chi tiết đơn hàng
      return db.query(orderDetailQuery, [
        orderIdFromDB, // orderId đã có
        productId,
        productName,
        quantity,
        unitPrice,
        totalPrice,
        voucherCode || null,
        voucherDiscount || 0
      ]);
    });

    // Chờ tất cả các Promise hoàn thành
    await Promise.all(insertOrderDetailsPromises);

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

// API cập nhật transId vào đơn hàng
router.post('/update-order-transid', async (req, res) => {
  const { orderId, transId } = req.body;  // Thay vì orderId, bạn nhận orderIdFromDB từ body  
  if (!orderId || !transId) {
    return res.status(400).json({ message: 'orderId và transId là bắt buộc' });
  }

  try {
    const query = `UPDATE orders SET transIdMomo = ? WHERE orderId = ?`;
    const result = await db.query(query, [transId, orderId]);
    // console.log('Kết quả truy vấn:', result);

    if (result[0].affectedRows > 0) {  // Kiểm tra xem có bản ghi nào khớp không
      if (result[0].changedRows > 0) {
        return res.status(200).json({ message: 'Cập nhật transId thành công' });
      } else {
        return res.status(200).json({ message: 'Giá trị transId đã giống với trước đó, không cần thay đổi' });
      }
    } else {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng với orderId này' });
    }
    
  } catch (err) {
    console.error('Lỗi khi cập nhật transId:', err);
    res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật transId' });
  }
});


// API hoàn tiền cho giao dịch qua MoMo
router.post('/refund', async (req, res) => {
  const { orderId, amount, transId, description } = req.body;

  // Kiểm tra tham số đầu vào
  if (!orderId || !amount || !transId) {
    return res.status(400).json({ message: 'Thiếu thông tin đơn hàng, số tiền hoặc mã giao dịch' });
  }

  // Kiểm tra số tiền hợp lệ (theo yêu cầu của MoMo)
  if (amount <= 0 || amount > 50000000) {
    return res.status(400).json({ message: 'Số tiền hoàn tiền không hợp lệ (1.000 VND - 50.000.000 VND)' });
  }

  try {
    // Lấy thông tin cấu hình MoMo từ config
    const { accessKey, secretKey, partnerCode, lang, ipnUrl } = momoConfig;

    // Tạo requestId duy nhất cho yêu cầu hoàn tiền
    const requestId = partnerCode + new Date().getTime(); // Mã yêu cầu hoàn tiền

    // Tạo chuỗi dữ liệu để ký (dùng HMAC SHA256)
    const rawSignature = `accessKey=${accessKey}&amount=${amount}&description=${description || ''}&orderId=${orderId}&partnerCode=${partnerCode}&requestId=${requestId}&transId=${transId}`;

    // Tạo chữ ký HMAC SHA256
    const signature = crypto
      .createHmac('sha256', secretKey)
      .update(rawSignature)
      .digest('hex');

    // Dữ liệu gửi yêu cầu hoàn tiền đến MoMo
    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      orderId: orderId,
      requestId: requestId,
      amount: amount,
      transId: transId,
      lang: lang || 'vi',
      description: description || '',
      signature: signature,
    });

    // Cấu hình HTTP request
    const options = {
      method: 'POST',
      url: 'https://test-payment.momo.vn/v2/gateway/api/refund',  // URL của MoMo API hoàn tiền
      headers: {
        'Content-Type': 'application/json',
      },
      data: requestBody,
    };

    // Gửi yêu cầu hoàn tiền
    const response = await axios(options);

    // Kiểm tra kết quả trả về từ MoMo
    if (response.data.resultCode === 0) {
      // Nếu hoàn tiền thành công, cập nhật trạng thái đơn hàng trong cơ sở dữ liệu
      const updateOrderQuery = `UPDATE orders SET status = 'canceled' WHERE order_id = ?`;
      await db.query(updateOrderQuery, orderId);

      // Ghi lại lịch sử thanh toán hoàn tiền nếu cần
      const refund_log = `INSERT INTO refund_log (order_id, amount, status, created_at) VALUES (?, ?, 'completed', NOW())`;
      await db.query(refund_log, [orderId, amount]);

      res.status(200).json({
        message: 'Hoàn tiền thành công',
        result: response.data,
      });
    } else {
      // Nếu trả về lỗi, thông báo lỗi từ MoMo
      res.status(500).json({
        message: `Lỗi khi hoàn tiền: ${response.data.message}`,
      });
    }
  } catch (error) {
    console.error('Lỗi khi xử lý hoàn tiền:', error.message);
    res.status(500).json({ message: 'Lỗi khi xử lý hoàn tiền', error: error.message });
  }
});




module.exports = router;
