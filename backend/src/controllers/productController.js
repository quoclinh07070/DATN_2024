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

<<<<<<< HEAD

exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = 'SELECT * FROM products WHERE id = ?';
        const [results] = await db.query(sql, [id]);
        
=======
exports.getProductById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM products WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi lấy sản phẩm', error: err });
        }
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7
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
    const { name, price, description, discount, quantity, status, categories_id } = req.body;
    const image = req.file.filename; // Lấy đường dẫn hình ảnh
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

// exports.updateProduct = (req, res) => {
//     const { id } = req.params;
//     const { name, price, description, discount, quantity, status, categories_id } = req.body;
//     const image = req.file ? req.file.filename : null; // Lấy đường dẫn hình ảnh nếu có
    
//     const sql = 'UPDATE products SET name = ?, price = ?, image = ?, description = ?, discount = ?, quantity = ?, status = ?, categories_id = ? WHERE id = ?';
//     db.query(sql, [name, price, image, description, discount, quantity, status, categories_id, id], (err) => {
//         if (err) {
//             return res.status(500).json({ message: 'Lỗi khi cập nhật sản phẩm', error: err });
//         }
//         res.json({
//             message: 'Cập nhật sản phẩm thành công',
//             product: new Product(
//                 id,
//                 name,
//                 price,
//                 image,
//                 description,
//                 discount,
//                 quantity,
//                 status,
//                 categories_id,
//                 null, //ngay tao giu nguyen khi update
//                 new Date()
//             )
//         });
//     });
// };
exports.updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, price, description, discount, quantity, status, categories_id } = req.body;
    
    // Lấy hình ảnh mới nếu có, nếu không thì sẽ không thay đổi hình ảnh
    const image = req.file ? req.file.filename : null;

    // Lấy thông tin sản phẩm hiện tại từ DB để so sánh
    const selectSql = 'SELECT image FROM products WHERE id = ?';
    db.query(selectSql, [id], (selectErr, selectResults) => {
        if (selectErr) {
            return res.status(500).json({ message: 'Lỗi khi lấy sản phẩm', error: selectErr });
        }
        if (selectResults.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }
        
        // Nếu không có hình ảnh mới, giữ nguyên hình ảnh cũ
        const currentImage = selectResults[0].image;
        const updatedImage = image ? image : currentImage;

        const sql = 'UPDATE products SET name = ?, price = ?, image = ?, description = ?, discount = ?, quantity = ?, status = ?, categories_id = ? WHERE id = ?';
        db.query(sql, [name, price, updatedImage, description, discount, quantity, status, categories_id, id], (err) => {
            if (err) {
                return res.status(500).json({ message: 'Lỗi khi cập nhật sản phẩm', error: err });
            }
            res.json({
                message: 'Cập nhật sản phẩm thành công',
                product: new Product(
                    id,
                    name,
                    price,
                    updatedImage,
                    description,
                    discount,
                    quantity,
                    status,
                    categories_id,
                    null, // ngày tạo giữ nguyên khi update
                    new Date()
                )
            });
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
<<<<<<< HEAD
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi xóa sản phẩm', error: err });
    }

// Lấy tất cả danh mục sản phẩm
exports.getCategories = async (req, res) => {
    try {
      const [results] = await db.query('SELECT * FROM categories');
      res.json({
        message: 'Danh sách loại sản phẩm',
        categories: results
      });
    } catch (err) {
      res.status(500).json({ message: 'Lỗi khi lấy danh sách loại sản phẩm', error: err });
    }
  };
  
};



exports.searchProduct = async (req, res) => {
    try {
        const { value } = req.params;  // Lấy giá trị tìm kiếm từ route parameter

        // Kiểm tra nếu không có giá trị tìm kiếm
        if (!value) {
            return res.status(400).json({ message: 'Cần cung cấp giá trị tìm kiếm' });
        }

        // Xây dựng câu lệnh SQL với JOIN
        const sql = `
            SELECT p.* 
            FROM products p
            LEFT JOIN category c ON p.categories_id = c.id
            WHERE p.name LIKE ? OR c.category_name LIKE ?
        `;
        
        const [results] = await db.query(sql, [`%${value}%`, `%${value}%`]);

        if (results.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm nào' });
        }

        res.json({
            message: 'Tìm kiếm sản phẩm thành công',
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
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi tìm kiếm sản phẩm', error: err });
    }
};

exports.Admin = async (req, res) => {
    try {
        res.json({
            message: 'Accept access',
            status: 200
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred',
            status: 500
        });
    }
};

=======
    });
};
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7
