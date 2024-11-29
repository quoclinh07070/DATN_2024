const db = require('../config/db');
const Review = require('../models/reviewModel');


// Kiểm tra đơn hàng
exports.hasPurchasedProduct = async (req, res) => {
  const { user_id, product_id } = req.body;

  if (!user_id || !product_id) {
    return res.status(400).json({ message: 'Thiếu thông tin user_id hoặc product_id' });
  }

  try {
    // Kiểm tra xem người dùng đã đặt hàng sản phẩm chưa
    const [orderResults] = await db.query(
      'SELECT * FROM orders WHERE user_id = ? AND product_id = ? AND status = "completed"',
      [user_id, product_id]
    );

    if (orderResults.length > 0) {
      // Người dùng đã đặt hàng sản phẩm
      return res.status(200).json({ hasPurchased: true });
    } else {
      // Người dùng chưa đặt hàng
      return res.status(403).json({
        hasPurchased: false,
        message: 'Bạn cần đặt hàng sản phẩm này trước khi có thể bình luận.',
      });
    }
  } catch (err) {
    console.error('Lỗi khi kiểm tra trạng thái đặt hàng:', err);
    return res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Tạo đánh giá mới
exports.createReview = async (req, res) => {
  const { product_id, rating, reviews_text, user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ message: 'Không tìm thấy user_id' });
  }

  try {
    // Kiểm tra nếu người dùng đã mua sản phẩm
    const [orderResults] = await db.query(
      'SELECT * FROM orders WHERE user_id = ? AND product_id = ? AND status = "completed"',
      [user_id, product_id]
    );

    if (orderResults.length === 0) {
      return res.status(403).json({
        message: 'Bạn cần đặt hàng sản phẩm này trước khi đánh giá.',
      });
    }

    // Lưu đánh giá vào cơ sở dữ liệu
    const [results] = await db.query(
      'INSERT INTO reviews (product_id, user_id, rating, reviews_text) VALUES (?, ?, ?, ?)',
      [product_id, user_id, rating, reviews_text]
    );

    res.status(201).json({
      message: 'Tạo đánh giá thành công',
      review: {
        id: results.insertId,
        product_id,
        user_id,
        rating,
        reviews_text,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  } catch (err) {
    console.error('Lỗi khi tạo đánh giá:', err);
    return res.status(500).json({ message: 'Lỗi khi tạo đánh giá', error: err.message });
  }
};

// Lấy tất cả đánh giá của một sản phẩm
exports.getProductReviews = async (req, res) => {
  const { product_id } = req.params;
  try {
      const [results] = await db.query('SELECT * FROM reviews WHERE product_id = ?', [product_id]);
      res.json({
          message: 'Lấy đánh giá thành công',
          reviews: results.map(review => new Review(
              review.id,
              review.product_id,
              review.user_id,
              review.rating,
              review.reviews_text,
              review.created_at,
              review.updated_at
          ))
      });
  } catch (err) {
      res.status(500).json({ message: 'Lỗi khi lấy đánh giá', error: err });
  }
};

// Cập nhật đánh giá
exports.updateReview = async (req, res) => {
  const { id } = req.params;
  const { product_id, user_id, rating, reviews_text } = req.body;
  try {
      const [result] = await db.query(
          'UPDATE reviews SET product_id = ?, user_id = ?, rating = ?, reviews_text = ? WHERE id = ?',
          [product_id, user_id, rating, reviews_text, id]
      );

      if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Không tìm thấy đánh giá để cập nhật' });
      }

      res.json({
          message: 'Cập nhật đánh giá thành công',
          review: new Review(
              id,
              product_id,
              user_id,
              rating,
              reviews_text,
              null, // giữ nguyên ngày tạo khi cập nhật
              new Date()
          )
      });
  } catch (err) {
      res.status(500).json({ message: 'Lỗi khi cập nhật đánh giá', error: err });
  }
};

// Xóa đánh giá
exports.deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
      const [result] = await db.query('DELETE FROM reviews WHERE id = ?', [id]);

      if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Không tìm thấy đánh giá để xóa' });
      }

      res.status(200).json({ message: 'Xóa đánh giá thành công' });
  } catch (err) {
      res.status(500).json({ message: 'Lỗi khi xóa đánh giá', error: err });
  }
};

// Lấy đánh giá theo ID
exports.getReviewById = async (req, res) => {
  const { id } = req.params;
  try {
      const [results] = await db.query('SELECT * FROM reviews WHERE id = ?', [id]);
      if (results.length === 0) {
          return res.status(404).json({ message: 'Không tìm thấy đánh giá' });
      }
      const review = results[0];
      res.json({
          message: 'Lấy đánh giá thành công',
          review: new Review(
              review.id,
              review.product_id,
              review.user_id,
              review.rating,
              review.reviews_text,
              review.created_at,
              review.updated_at
          )
      });
  } catch (err) {
      res.status(500).json({ message: 'Lỗi khi lấy đánh giá', error: err });
  }
};