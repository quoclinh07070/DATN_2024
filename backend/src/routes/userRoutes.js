// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
<<<<<<< HEAD
const { forgotPassword, resetPassword } = require("../controllers/userController");
=======
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513
const multer = require('multer');
// const  {authentication, authorization}= require("../auth/auth.Utils");

// Cấu hình multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Đường dẫn lưu hình ảnh
  },
  filename: (req, file, cb) => {
    // cb(null, Date.now() + '-' + file.originalname);
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Lấy danh sách
router.get('/users', userController.getAllUsers);

// authorization("[admin,user]"),

// Lấy theo ID
router.get('/users/:id', userController.getUserById);

// Cập nhật
router.put('/users/:id', userController.updateUser);

// Xóa
router.delete('/users/:id', userController.deleteUser);

<<<<<<< HEAD
// Quên mật khẩu
router.post("/forgot-password", forgotPassword);

// Đặt lại mật khẩu
router.post("/reset-password", resetPassword);

=======
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513
module.exports = router;
