const db = require("../config/db");
const Review = require("../models/reviewModel");

// Lấy tất cả đánh giá
exports.getAllReviews = async (req, res) => {
  try {
    const [results] = await db.query(
      "SELECT id, product_id, user_id, rating, reviews_text, status, created_at, updated_at FROM reviews"
    );

    if (results.length === 0) {
      return res.status(404).json({ message: "Không có đánh giá nào" });
    }

    res.json({
      message: "Lấy tất cả đánh giá thành công",
      reviews: results, // Trả về kết quả từ truy vấn
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy tất cả đánh giá", error: err.message });
  }
};

// Tạo đánh giá mới
exports.createReview = async (req, res) => {
  const { product_id, rating, reviews_text, user_id } = req.body;

  if (!product_id || !rating || !reviews_text || !user_id) {
    return res.status(400).json({ message: "Thiếu thông tin cần thiết" });
  }

  try {
    // Kiểm tra user_id có tồn tại
    const [user] = await db.query("SELECT id FROM users WHERE id = ?", [
      user_id,
    ]);
    if (user.length === 0) {
      return res
        .status(400)
        .json({ message: "user_id không hợp lệ hoặc không tồn tại" });
    }

    // Kiểm tra xem người dùng đã mua sản phẩm này chưa (trạng thái đơn hàng là đã hoàn thành)
    const [order] = await db.query(
      "SELECT id FROM orders WHERE user_id = ? AND status = 1 AND id IN (SELECT order_id FROM orderdetails WHERE product_id = ?)",
      [user_id, product_id]
    );

    if (order.length === 0) {
      return res.status(403).json({
        message:
          "Bạn cần hoàn tất đơn hàng và mua sản phẩm này trước khi có thể gửi đánh giá.",
      });
    }

    // Lưu đánh giá vào cơ sở dữ liệu
    const [results] = await db.query(
      "INSERT INTO reviews (product_id, user_id, rating, reviews_text, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
      [product_id, user_id, rating, reviews_text]
    );

    res.status(201).json({
      message: "Tạo đánh giá thành công",
      review: {
        id: results.insertId,
        product_id,
        user_id,
        rating,
        reviews_text,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
  } catch (err) {
    console.error("Lỗi khi tạo đánh giá:", err);
    if (err.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({
        message:
          "Khóa ngoại không hợp lệ: user_id hoặc product_id không tồn tại",
      });
    }
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi tạo đánh giá", error: err.message });
  }
};

// Lấy tất cả đánh giá của một sản phẩm
exports.getProductReviews = async (req, res) => {
  const { product_id } = req.params;
  try {
    const [results] = await db.query(
      "SELECT * FROM reviews WHERE product_id = ?",
      [product_id]
    );
    res.json({
      message: "Lấy đánh giá thành công",
      reviews: results.map(
        (review) =>
          new Review(
            review.id,
            review.product_id,
            review.user_id,
            review.rating,
            review.status, // Thêm trường status
            review.reviews_text,
            review.created_at,
            review.updated_at
          )
      ),
    });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy đánh giá", error: err });
  }
};

// Cập nhật đánh giá
exports.updateReview = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // Chỉ cần nhận status từ request body

  // Kiểm tra xem status có bị thiếu không
  if (status === undefined) {
    return res.status(400).json({ message: "Trạng thái không được để trống" });
  }

  try {
    // Cập nhật chỉ trường status
    const [result] = await db.query(
      "UPDATE reviews SET status = ? WHERE id = ?",
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy đánh giá để cập nhật" });
    }

    res.json({
      message: "Cập nhật trạng thái đánh giá thành công",
      review: {
        id,
        status,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi cập nhật trạng thái đánh giá", error: err });
  }
};

// Xóa đánh giá
exports.deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query("DELETE FROM reviews WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy đánh giá để xóa" });
    }

    res.status(200).json({ message: "Xóa đánh giá thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi xóa đánh giá", error: err });
  }
};

// Lấy đánh giá theo ID
exports.getReviewById = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await db.query("SELECT * FROM reviews WHERE id = ?", [
      id,
    ]);
    if (results.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy đánh giá" });
    }
    const review = results[0];
    res.json({
      message: "Lấy đánh giá thành công",
      review: new Review(
        review.id,
        review.product_id,
        review.user_id,
        review.rating,
        review.status, // Thêm trường status
        review.reviews_text,
        review.created_at,
        review.updated_at
      ),
    });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy đánh giá", error: err });
  }
};
