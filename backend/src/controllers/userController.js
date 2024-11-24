// userController.js
const db = require('../config/db');
const User = require('../models/user');
<<<<<<< HEAD
const crypto = require("crypto");
const { sendForgotPassEmail } = require("./emailController");
=======
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513

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
<<<<<<< HEAD

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email là bắt buộc!" });
    }

    try {
        // Kiểm tra email có tồn tại không
        const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        const user = rows[0]; // Lấy hàng đầu tiên từ mảng `rows`

        if (!user) {
            return res.status(404).json({ message: "Email không tồn tại!" });
        }

        console.log('User email:', user.email);
        console.log('User name:', user.fullname);

        // Tạo token và thời gian hết hạn
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetExpires = new Date(Date.now() + 3600 * 1000); // Token hết hạn sau 1 giờ

        // Lưu token vào cơ sở dữ liệu
        await db.query("UPDATE users SET reset_token = ?, reset_expires = ? WHERE id = ?", [
            resetToken,
            resetExpires,
            user.id,
        ]);

        // Tạo link reset
        const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
        console.log('CLIENT_URL:', process.env.CLIENT_URL);
        console.log('Reset Link:', resetLink);

        // Gửi email
        await sendForgotPassEmail({
            email: user.email,
            name: user.fullname,
            resetLink,
        });

        res.status(200).json({ message: "Email đặt lại mật khẩu đã được gửi." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Đã xảy ra lỗi, vui lòng thử lại!" });
    }
};


exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        // Tìm user theo token và kiểm tra thời hạn
        const [rows] = await db.query("SELECT * FROM users WHERE reset_token = ? AND reset_expires > ?", [
            token,
            new Date(),
        ]);
        const user = rows[0]; // Lấy hàng đầu tiên từ kết quả truy vấn

        if (!user) {
            return res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn!" });
        }

        // Hash mật khẩu mới (sử dụng bcrypt hoặc thư viện hash khác)
        const bcrypt = require("bcryptjs");
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Cập nhật mật khẩu và xóa token
        const [updateResult] = await db.query(
            "UPDATE users SET password = ?, reset_token = NULL, reset_expires = NULL WHERE id = ?",
            [hashedPassword, user.id]
        );

        // Kiểm tra xem mật khẩu có được cập nhật không
        if (updateResult.affectedRows === 0) {
            return res.status(500).json({ message: "Không thể cập nhật mật khẩu. Vui lòng thử lại!" });
        }

        res.status(200).json({ message: "Mật khẩu đã được đặt lại thành công!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Đã xảy ra lỗi, vui lòng thử lại!" });
    }
};


=======
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513
