const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Lấy danh sách đơn hàng
router.get('/orders', orderController.getAllOrders);

// Lấy đơn hàng theo ID
router.get('/orders/:id', orderController.getOrderById);

// Thêm đơn hàng mới
router.post('/orders', orderController.createOrder);

// Cập nhật đơn hàng
router.put('/orders/:id', orderController.updateOrder);

// Xóa đơn hàng
router.delete('/orders/:id', orderController.deleteOrder);

module.exports = router;
