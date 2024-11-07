const db = require('../config/db');
const Order = require('../models/order');

// Lấy danh sách đơn hàng
exports.getAllOrders = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM orders');
        res.json({
            message: 'Lấy đơn hàng thành công',
            orders: results.map(order => new Order(
                order.id,
                order.user_id,
                order.total_amount,
                order.payment_method,
                order.status,
                order.payment_amount,
                order.address,
                order.phone_number,
                order.voucher_id,
                order.created_at,
                order.updated_at
            ))
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy đơn hàng', error: err });
    }
};

// Lấy đơn hàng theo ID
exports.getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await db.query('SELECT * FROM orders WHERE id = ?', [id]);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
        }
        const order = results[0];
        res.json({
            message: 'Lấy đơn hàng thành công',
            order: new Order(
                order.id,
                order.user_id,
                order.total_amount,
                order.payment_method,
                order.status,
                order.payment_amount,
                order.address,
                order.phone_number,
                order.voucher_id,
                order.created_at,
                order.updated_at
            )
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy đơn hàng', error: err });
    }
};

// Tạo đơn hàng mới
exports.createOrder = async (req, res) => {
    const { user_id, total_amount, payment_method, status, payment_amount, address, phone_number, voucher_id } = req.body;
    try {
        const [results] = await db.query(
            'INSERT INTO orders (user_id, total_amount, payment_method, status, payment_amount, address, phone_number, voucher_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
            [user_id, total_amount, payment_method, status, payment_amount, address, phone_number, voucher_id]
        );
        res.status(201).json({
            message: 'Tạo đơn hàng thành công',
            order: new Order(
                results.insertId,
                user_id,
                total_amount,
                payment_method,
                status,
                payment_amount,
                address,
                phone_number,
                voucher_id,
                new Date(),
                new Date()
            )
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi tạo đơn hàng', error: err });
    }
};

// Cập nhật đơn hàng
exports.updateOrder = async (req, res) => {
    const { id } = req.params;
    const { user_id, total_amount, payment_method, status, payment_amount, address, phone_number, voucher_id } = req.body;
    try {
        await db.query(
            'UPDATE orders SET user_id = ?, total_amount = ?, payment_method = ?, status = ?, payment_amount = ?, address = ?, phone_number = ?, voucher_id = ?, updated_at = NOW() WHERE id = ?',
            [user_id, total_amount, payment_method, status, payment_amount, address, phone_number, voucher_id, id]
        );
        res.json({
            message: 'Cập nhật đơn hàng thành công',
            order: new Order(
                id,
                user_id,
                total_amount,
                payment_method,
                status,
                payment_amount,
                address,
                phone_number,
                voucher_id,
                null, // Giữ nguyên ngày tạo khi cập nhật
                new Date()
            )
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi cập nhật đơn hàng', error: err });
    }
};

// Xóa đơn hàng
exports.deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM orders WHERE id = ?', [id]);
        res.status(200).json({ message: 'Xóa đơn hàng thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi xóa đơn hàng', error: err });
    }
};
