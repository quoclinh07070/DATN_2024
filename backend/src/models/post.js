class Post {
  constructor(id, title, content, post_category_id, status, created_at, updated_at) {
      this.id = id;
      this.title = title;
      this.content = content;
      this.post_category_id = post_category_id;
      this.status = status;
      this.created_at = created_at;
      this.updated_at = updated_at;
  }
}

module.exports = Post;
