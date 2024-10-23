const db = require('../config/db');
const Post = require('../models/post');

// Lấy tất cả bài viết
exports.getAllPosts = (req, res) => {
    const sql = 'SELECT * FROM posts';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi lấy bài viết', error: err });
        }
        res.json({
            message: 'Lấy bài viết thành công',
            posts: results.map(post => new Post(
                post.id,
                post.title,
                post.content,
                post.post_category_id,
                post.status,
                post.created_at,
                post.updated_at
            ))
        });
    });
};

// Lấy bài viết theo ID
exports.getPostById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM posts WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi lấy bài viết', error: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy bài viết' });
        }
        const post = results[0];
        res.json({
            message: 'Lấy bài viết thành công',
            post: new Post(
                post.id,
                post.title,
                post.content,
                post.post_category_id,
                post.status,
                post.created_at,
                post.updated_at
            )
        });
    });
};

// Tạo bài viết
exports.createPost = (req, res) => {
    const { title, content, post_category_id, status } = req.body;
    const sql = 'INSERT INTO posts (title, content, post_category_id, status) VALUES (?, ?, ?, ?)';
    db.query(sql, [title, content, post_category_id, status], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi tạo bài viết', error: err });
        }
        res.status(201).json({
            message: 'Tạo bài viết thành công',
            post: new Post(
                results.insertId,
                title,
                content,
                post_category_id,
                status,
                new Date(),
                new Date()
            )
        });
    });
};

// Cập nhật bài viết
exports.updatePost = (req, res) => {
    const { id } = req.params;
    const { title, content, post_category_id, status } = req.body;
    const sql = 'UPDATE posts SET title = ?, content = ?, post_category_id = ?, status = ? WHERE id = ?';
    db.query(sql, [title, content, post_category_id, status, id], (err) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi cập nhật bài viết', error: err });
        }
        res.json({
            message: 'Cập nhật bài viết thành công',
            post: new Post(
                id,
                title,
                content,
                post_category_id,
                status,
                null, // Giữ nguyên ngày tạo khi cập nhật
                new Date()
            )
        });
    });
};

// Xóa bài viết
exports.deletePost = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM posts WHERE id = ?';
    db.query(sql, [id], (err) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi xóa bài viết', error: err });
        }
        res.status(200).json({ message: 'Xóa bài viết thành công' });
    });
};
