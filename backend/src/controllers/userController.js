// userController.js
const db = require('../config/db');
const User = require('../models/user');

exports.getAllUsers = async (req, res) => {
    try {
        const sql = 'SELECT * FROM users';
        const [results] = await db.query(sql);
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
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy thông tin người dùng', error: err });
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
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy thông tin người dùng', error: err });
    }
};

// exports.createUser = async (req, res) => {
//     try {
//         const { fullname, email, password, role, phone_number, status } = req.body;
//         const sql = 'INSERT INTO users (fullname, email, password, role, phone_number, status) VALUES (?, ?, ?, ?, ?, ?)';
//         const [results] = await db.query(sql, [fullname, email, password, role, phone_number, status]);

//         res.status(201).json({
//             message: 'Tạo người dùng thành công',
//             user: new User(
//                 results.insertId,
//                 fullname,
//                 email,
//                 password,
//                 role,
//                 phone_number,
//                 status
//             )
//         });
//     } catch (err) {
//         res.status(500).json({ message: 'Lỗi khi tạo người dùng', error: err });
//     }
// };

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { role, status } = req.body;

        // // Lấy lại thông tin người dùng sau khi cập nhật
        // const getUserSql = 'SELECT * FROM users WHERE id = ?';
        // const [results] = await db.query(getUserSql, [id]);

        // if (results.length === 0) {
        //     return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        // }

        // const user = results[0];
        // Cập nhật role và status
        const sql = 'UPDATE users SET role = ?, status = ? WHERE id = ?';
        await db.query(sql, [role, status, id]);
        res.json({
            message: 'Cập nhật người dùng thành công',
            user: new User(
                id,
                role,
                status
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
