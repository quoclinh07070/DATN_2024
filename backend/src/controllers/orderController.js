const db = require('../config/db');
const Order = require('../models/order');

// Lấy danh sách đơn hàng
exports.getAllOrders = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM orders ORDER BY id DESC');
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
                order.note,
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
                order.note,
                order.created_at,
                order.updated_at
            )
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy đơn hàng', error: err });
    }
};

// Cập nhật đơn hàng
exports.updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        await db.query(
            'UPDATE orders SET status = ? WHERE id = ?',
            [ status, id]
        );
        res.json({
            message: 'Cập nhật đơn hàng thành công',
            order: new Order(
                id,
                status,
            )
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi cập nhật đơn hàng', error: err });
    }
};

exports.getOrdersByUserId = async (req, res) => {
    const { user_id } = req.query;

    if (!user_id) {
        return res.status(400).json({ message: 'Thiếu user_id' });
    }

    try {
        const [results] = await db.query(
            `SELECT * FROM orders WHERE user_id = ? ORDER BY updated_at ASC`,
            [user_id]
        );

        if (results.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng cho người dùng này' });
        }

        res.json({
            message: 'Lấy danh sách đơn hàng thành công',
            orders: results.map(order => new Order(
                order.id,
                order.user_id,
                order.total_amount,
                order.payment_method,
                order.status,
                order.payment_amount,
                order.address,
                order.phone_number,
                order.note,
                order.created_at,
                order.updated_at
            ))
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách đơn hàng', error: err });
    }
};

