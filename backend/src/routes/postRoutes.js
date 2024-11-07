// postRoutes.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const multer = require('multer');

// Cấu hình multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Đường dẫn lưu hình ảnh
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Đặt tên file là tên gốc
  }
});

const upload = multer({ storage: storage });

// Lấy danh sách bài viết
router.get('/posts', postController.getAllPosts);

// Lấy bài viết theo ID
router.get('/posts/:id', postController.getPostById);

// Thêm bài viết mới
router.post('/posts', upload.single('image_url'), postController.createPost);

// Cập nhật bài viết
router.put('/posts/:id', upload.single('image_url'), postController.updatePost);

// Xóa bài viết
router.delete('/posts/:id', postController.deletePost);

module.exports = router;
