// productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');
const  {authentication, authorization}= require("../auth/auth.Utils");

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

// Lấy danh sách sản phẩm
router.get('/products', productController.getAllProducts);

// authorization("[admin,user]"),

// Lấy sản phẩm theo ID
router.get('/products/:id', productController.getProductById);

// Thêm sản phẩm mới
router.post('/products', upload.single('image'), productController.createProduct);

// Cập nhật sản phẩm
router.put('/products/:id', upload.single('image'), productController.updateProduct);

// Xóa sản phẩm
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
