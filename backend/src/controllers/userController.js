// userController.js
const db = require('../config/db');
const User = require('../models/user');

exports.getAllUsers = (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi lấy thông tin người dùng', error: err });
        }
        res.json({
            message: 'Lấy thông tin người dùng thành công',
            users: results.map(user => new User(
                user.id,
                user.fullname,
                user.email,
                user.password,
                user.role,
                user.phone_number,
                user.status
            ))
        });
    });
};

exports.getUserById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi lấy thông tin người dùng', error: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy thông tin người dùng' });
        }
        const user = results[0];
        res.json({
            message: 'Lấy thông tin người dùng thành công',
            user: new User(
                user.id,
                user.fullname,
                user.email,
                user.password,
                user.role,
                user.phone_number,
                user.status
            )
        });
    });
};


exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { role, status } = req.body;

    const sql = 'UPDATE users SET role = ?, status = ? WHERE id = ?';
    db.query(sql, [role, status, id], (err) => {
        if (err) {
            console.error('Error updating user:', err);
            return res.status(500).json({ message: 'Lỗi khi cập nhật người dùng', error: err });
        }
        res.json({
            message: 'Cập nhật người dùng thành công',
            user: new User(role, status)
        });
    });
};



exports.deleteUser = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], (err) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi xóa người dùng', error: err });
        }
        res.status(200).json({ message: 'Xóa người dùng thành công' });
    });
};