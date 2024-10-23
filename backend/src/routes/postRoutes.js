const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Lấy danh sách bài viết
router.get('/posts', postController.getAllPosts);

// Lấy bài viết theo ID
router.get('/posts/:id', postController.getPostById);

// Thêm bài viết mới
router.post('/posts', postController.createPost);

// Cập nhật bài viết
router.put('/posts/:id', postController.updatePost);

// Xóa bài viết
router.delete('/posts/:id', postController.deletePost);

module.exports = router;
