const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Lấy danh sách đơn hàng
router.get('/orders', orderController.getAllOrders);

// Lấy đơn hàng theo ID
router.get('/orders/:id', orderController.getOrderById);

// Cập nhật đơn hàng
router.put('/orders/:id', orderController.updateOrderStatus);

// Lấy danh sách đơn hàng theo user_id
router.get('/user-orders', orderController.getOrdersByUserId);

module.exports = router;
