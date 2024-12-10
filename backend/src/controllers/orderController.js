const db = require('../config/db');
const Order = require('../models/order');
const Orderdetails = require('../models/orderdetails');
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
                order.address,
                order.phone_number,
                order.note,
                order.voucher_code,
                order.voucher_discount,
                order.voucher_id,
                order.transIdMomo,
                order.orderId,
                order.created_at,
                order.updated_at,
            ))
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy đơn hàng', error: err });
    }
};

// Lấy danh sách đơn hàng
exports.getOrderdetailsByOrderid = async (req, res) => {
    const { id } = req.params;

    try {
        const [results] = await db.query('SELECT * FROM order_details where order_id=?', [id]);
        res.json({
            message: 'Lấy chi tiết đơn hàng thành công',
            orders: results.map(order_details => new Orderdetails(
                order_details.id,
                order_details.order_id,
                order_details.product_id,
                order_details.product_name,
                order_details.quantity,
                order_details.unit_price,
                order_details.total_price,
                order_details.voucher_code,
                order_details.voucher_discount,
                order_details.created_at,
                order_details.updated_at,
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
                order.address,
                order.phone_number,
                order.note,
                order.voucher_code,
                order.voucher_discount,
                order.voucher_id,
                order.transIdMomo,
                order.orderId,
                order.created_at,
                order.updated_at,
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
                order.address,
                order.phone_number,
                order.note,
                order.voucher_code,
                order.voucher_discount,
                order.voucher_id,
                order.transIdMomo,
                order.orderId,
                order.created_at,
                order.updated_at,
            ))
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách đơn hàng', error: err });
    }
};

