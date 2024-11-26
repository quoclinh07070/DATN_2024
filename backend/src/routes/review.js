const express = require('express');
const reviewController = require('../controllers/reviewController');
const router = express.Router();

// Route để thêm đánh giá
router.post('/reviews', reviewController.createReview);

// Route để lấy tất cả đánh giá của một sản phẩm
router.get('/reviews/:product_id', reviewController.getProductReviews);

// Route để cập nhật đánh giá
router.put('/reviews/:id', reviewController.updateReview);

// Route để xóa đánh giá
router.delete('/reviews/:id', reviewController.deleteReview);

// Route để lấy đánh giá theo ID
router.get('/reviews/id/:id', reviewController.getReviewById);

router.post('/hasPurchased', reviewController.hasPurchasedProduct);

module.exports = router;