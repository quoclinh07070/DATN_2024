// models/review.js
class Review {
  constructor(id, product_id, user_id, rating, reviews_text, created_at, updated_at) {
      this.id = id;
      this.product_id = product_id;
      this.user_id = user_id;
      this.rating = rating;
      this.reviews_text = reviews_text;
      this.created_at = created_at;
      this.updated_at = updated_at;
  }
}

module.exports = Review;
