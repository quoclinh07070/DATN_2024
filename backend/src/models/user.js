const db = require('../config/db'); // Đảm bảo đường dẫn chính xác tới file db.js

module.exports = class User {
    constructor(UserID, FullName, Email, Password, Role, PhoneNumber, Status) {
        this.UserID = UserID;
        this.FullName = FullName;
        this.Email = Email;
        this.Password = Password;
        this.Role = Role;
        this.PhoneNumber = PhoneNumber;
        this.Status = Status;
    }

    // Lưu user mới vào database
    static async save(user) {
        const query = `
            INSERT INTO users (fullname, email, password, phone_number, role, status)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        try {
            const [result] = await db.execute(query, [
                user.FullName,
                user.Email,
                user.Password,
                user.PhoneNumber,
                user.Role || 'user', // Nếu không có giá trị Role thì mặc định là 'user'
                user.Status || 'active' // Nếu không có giá trị Status thì mặc định là 'active'
            ]);

            if (result.affectedRows === 0) {
                throw new Error('User insert failed');
            }

            return result.insertId; // Trả về id của người dùng mới
        } catch (err) {
            console.error('Error inserting user:', err.message);
            throw err;
        }
    }

    // Tìm người dùng bằng email
    static async findUserByEmail(email) {
        const query = `SELECT *
                       FROM users
                       WHERE email = ?`;

        try {
            const [rows] = await db.execute(query, [email]);
            return rows.length > 0 ? rows[0] : null; // Trả về thông tin người dùng nếu tìm thấy, nếu không thì null
        } catch (err) {
            console.error('Error finding user:', err.message);
            throw new Error('Error finding user: ' + err.message);
        }
    }
};
