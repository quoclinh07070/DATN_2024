const db = require('../config/db');
const Voucher = require('../models/voucher');

// Lấy tất cả vouchers
exports.getAllVouchers = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM vouchers');
        res.json({
            message: 'Lấy voucher thành công',
            vouchers: results.map(voucher => new Voucher(
                voucher.id,
                voucher.price,
                voucher.discount_percent,
                voucher.status,
                voucher.created_at,
                voucher.updated_at
            ))
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy voucher', error: err });
    }
};

// Lấy voucher theo ID
exports.getVoucherById = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await db.query('SELECT * FROM vouchers WHERE id = ?', [id]);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy voucher' });
        }
        const voucher = results[0];
        res.json({
            message: 'Lấy voucher thành công',
            voucher: new Voucher(
                voucher.id,
                voucher.price,
                voucher.discount_percent,
                voucher.status,
                voucher.created_at,
                voucher.updated_at
            )
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy voucher', error: err });
    }
};

// Tạo voucher mới
exports.createVoucher = async (req, res) => {
    const { price, discount_percent, status } = req.body;
    try {
        const [results] = await db.query(
            'INSERT INTO vouchers (price, discount_percent, status) VALUES (?, ?, ?)',
            [price, discount_percent, status]
        );
        res.status(201).json({
            message: 'Tạo voucher thành công',
            voucher: new Voucher(
                results.insertId,
                price,
                discount_percent,
                status,
                new Date(),
                new Date()
            )
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi tạo voucher', error: err });
    }
};

// Cập nhật voucher
exports.updateVoucher = async (req, res) => {
    const { id } = req.params;
    const { price, discount_percent, status } = req.body;
    try {
        await db.query(
            'UPDATE vouchers SET price = ?, discount_percent = ?, status = ? WHERE id = ?',
            [price, discount_percent, status, id]
        );
        res.json({
            message: 'Cập nhật voucher thành công',
            voucher: new Voucher(
                id,
                price,
                discount_percent,
                status,
                null, // giữ nguyên ngày tạo khi cập nhật
                new Date()
            )
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi cập nhật voucher', error: err });
    }
};

// Xóa voucher
exports.deleteVoucher = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM vouchers WHERE id = ?', [id]);
        res.status(200).json({ message: 'Xóa voucher thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi xóa voucher', error: err });
    }
};
