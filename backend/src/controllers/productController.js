// productController.js
const db = require('../config/db');
const Product = require('../models/product');

exports.getAllProducts = (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi lấy sản phẩm', error: err });
        }
        res.json({
            message: 'Lấy sản phẩm thành công',
            products: results.map(product => new Product(
                product.id,
                product.name,
                product.price,
                product.image,
                product.description,
                product.discount,
                product.quantity,
                product.status,
                product.categories_id,
                product.created_at,
                product.updated_at
            ))
        });
    });
};

exports.getProductById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM products WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi lấy sản phẩm', error: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }
        const product = results[0];
        res.json({
            message: 'Lấy sản phẩm thành công',
            product: new Product(
                product.id,
                product.name,
                product.price,
                product.image,
                product.description,
                product.discount,
                product.quantity,
                product.status,
                product.categories_id,
                product.created_at,
                product.updated_at
            )
        });
    });
};

exports.createProduct = (req, res) => {
    const { name, price, image, description, discount, quantity, status, categories_id } = req.body;
    const sql = 'INSERT INTO products (name, price, image, description, discount, quantity, status, categories_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, price, image, description, discount, quantity, status, categories_id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi tạo sản phẩm', error: err });
        }
        res.status(201).json({
            message: 'Tạo sản phẩm thành công',
            product: new Product(
                results.insertId,
                name,
                price,
                image,
                description,
                discount,
                quantity,
                status,
                categories_id,
                new Date(),
                new Date()
            )
        });
    });
};

exports.updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, price, image, description, discount, quantity, status, categories_id } = req.body;
    const sql = 'UPDATE products SET name = ?, price = ?, image = ?, description = ?, discount = ?, quantity = ?, status = ?, categories_id = ? WHERE id = ?';
    db.query(sql, [name, price, image, description, discount, quantity, status, categories_id, id], (err) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi cập nhật sản phẩm', error: err });
        }
        res.json({
            message: 'Cập nhật sản phẩm thành công',
            product: new Product(
                id,
                name,
                price,
                image,
                description,
                discount,
                quantity,
                status,
                categories_id,
                null, //ngay tao giu nguyen khi update
                new Date()
            )
        });
    });
};

exports.deleteProduct = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM products WHERE id = ?';
    db.query(sql, [id], (err) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi xóa sản phẩm', error: err });
        }
        res.status(200).json({ message: 'Xóa sản phẩm thành công' });
    });
};