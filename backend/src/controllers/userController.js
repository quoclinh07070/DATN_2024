const db = require('../config/db');
const User = require('../models/user');

exports.getAllUsers = async (req, res) => {
    try {
        const sql = 'SELECT * FROM users';
        const [results] = await db.query(sql);
        res.json({
            message: 'Lấy người dùng thành công',
            users: results.map(user => new User(
                user.id,
                user.fullname,
                user.password,
                user.phone_number,
                user.role,
                user.email,
                user.status,
                user.created_at,
                user.updated_at
            ))
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy người dùng', error: err });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = 'SELECT * FROM users WHERE id = ?';
        const [results] = await db.query(sql, [id]);

        if (results.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }

        const user = results[0];
        res.json({
            message: 'Lấy người dùng thành công',
            user: new User(
                user.id,
                user.fullname,
                user.password,
                user.phone_number,
                user.role,
                user.email,
                user.status,
                user.created_at,
                user.updated_at
            )
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy người dùng', error: err });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { fullname, password, phone_number, role, email, status } = req.body;
        const sql = 'INSERT INTO users (fullname, password, phone_number, role, email, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())';
        const [results] = await db.query(sql, [fullname, password, phone_number, role, email, status]);

        res.status(201).json({
            message: 'Tạo người dùng thành công',
            user: new User(
                results.insertId,
                fullname,
                password,
                phone_number,
                role,
                email,
                status,
                new Date(),
                new Date()
            )
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi tạo người dùng', error: err });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullname, password, phone_number, role, email, status } = req.body;

        const sql = 'UPDATE users SET fullname = ?, password = ?, phone_number = ?, role = ?, email = ?, status = ?, updated_at = NOW() WHERE id = ?';
        await db.query(sql, [fullname, password, phone_number, role, email, status, id]);

        res.json({
            message: 'Cập nhật người dùng thành công',
            user: new User(
                id,
                fullname,
                password,
                phone_number,
                role,
                email,
                status,
                null, // Ngày tạo giữ nguyên khi cập nhật
                new Date()
            )
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi cập nhật người dùng', error: err });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = 'DELETE FROM users WHERE id = ?';
        await db.query(sql, [id]);
        res.status(200).json({ message: 'Xóa người dùng thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi xóa người dùng', error: err });
    }
};
