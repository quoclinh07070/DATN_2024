// voucherRoutes.js
const express = require('express');
const router = express.Router();
const voucherController = require('../controllers/voucherController');

// Lấy danh sách voucher
router.get('/vouchers', voucherController.getAllVouchers);

// Lấy voucher theo ID
router.get('/vouchers/:id', voucherController.getVoucherById);

// Thêm voucher mới
router.post('/vouchers', voucherController.createVoucher);

// Cập nhật voucher
router.put('/vouchers/:id', voucherController.updateVoucher);

// Xóa voucher
router.delete('/vouchers/:id', voucherController.deleteVoucher);

module.exports = router;
