// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');

// Cấu hình multer (nếu cần tải lên hình ảnh hoặc tệp liên quan)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Đường dẫn lưu trữ file
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Lấy danh sách người dùng
router.get('/users', userController.getAllUsers);

// Lấy người dùng theo ID
router.get('/users/:id', userController.getUserById);

// Thêm người dùng mới
router.post('/users', upload.none(), userController.createUser);

// Cập nhật người dùng
router.put('/users/:id', upload.none(), userController.updateUser);

// Xóa người dùng
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
