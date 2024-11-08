// const db = require('../config/db');
// const PostCategory = require('../models/postCategory');

// // Lấy tất cả danh mục
// exports.getAllPostCategories = async (req, res) => {
//     try {
//         const [results] = await db.query('SELECT * FROM postcategory');
//         res.json({
//             message: 'Lấy danh mục thành công',
//             postcategories: results.map(postcategory => new PostCategory(
//                 postcategory.id,
//                 postcategory.parentCategoryID,
//                 postcategory.name,
//                 postcategory.image_url,
//                 postcategory.created_at,
//                 postcategory.updated_at
//             ))
//         });
//     } catch (err) {
//         console.error("Error fetching categories:", err);  // Log chi tiết lỗi
//         res.status(500).json({ message: 'Lỗi khi lấy danh mục', error: err.message });
//     }
// };

// // Lấy danh mục theo ID
// exports.getPostCategoryById = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const [results] = await db.query('SELECT * FROM postcategory WHERE id = ?', [id]);
//         if (results.length === 0) {
//             return res.status(404).json({ message: 'Không tìm thấy danh mục' });
//         }
//         const postcategory = results[0];
//         res.json({
//             message: 'Lấy danh mục thành công',
//             postcategory: new PostCategory(
//                 postcategory.id,
//                 postcategory.parentCategoryID,
//                 postcategory.name,
//                 postcategory.image_url,
//                 postcategory.created_at,
//                 postcategory.updated_at
//             )
//         });
//     } catch (err) {
//         console.error(`Error fetching category by ID (${id}):`, err);
//         res.status(500).json({ message: 'Lỗi khi lấy danh mục', error: err.message });
//     }
// };

// // Tạo danh mục mới
// exports.createPostCategory = async (req, res) => {
//     const { parentCategoryID, name } = req.body;
//     const image_url = req.file ? req.file.filename : null;
//     try {
//         const [results] = await db.query(
//             'INSERT INTO postcategory (parentCategoryID, name, image_url) VALUES (?, ?, ?)',
//             [parentCategoryID, name, image_url]
//         );
//         res.status(201).json({
//             message: 'Tạo danh mục thành công',
//             postcategory: new PostCategory(
//                 results.insertId,
//                 parentCategoryID,
//                 name,
//                 image_url,
//                 new Date(),
//                 new Date()
//             )
//         });
//     } catch (err) {
//         if (err.code === 'ER_BAD_NULL_ERROR') {
//             console.error("Null value error in createPostCategory:", err);
//             return res.status(400).json({ message: 'Dữ liệu không hợp lệ', error: err.message });
//         }
//         console.error("Error creating category:", err);
//         res.status(500).json({ message: 'Lỗi khi tạo danh mục', error: err.message });
//     }
// };

// // Cập nhật danh mục
// exports.updatePostCategory = async (req, res) => {
//     const { id } = req.params;
//     const { parentCategoryID, name } = req.body;
//     const image_url = req.file ? req.file.filename : null;

//     try {
//         const [selectResults] = await db.query('SELECT image_url FROM postcategory WHERE id = ?', [id]);
//         if (selectResults.length === 0) {
//             return res.status(404).json({ message: 'Không tìm thấy danh mục' });
//         }
        
//         const currentImage = selectResults[0].image_url;
//         const updatedImage = image_url || currentImage;

//         await db.query(
//             'UPDATE postcategory SET parentCategoryID = ?, name = ?, image_url = ? WHERE id = ?',
//             [parentCategoryID, name, updatedImage, id]
//         );
//         res.json({
//             message: 'Cập nhật danh mục thành công',
//             postcategory: new PostCategory(
//                 id,
//                 parentCategoryID,
//                 name,
//                 updatedImage,
//                 null,
//                 new Date()
//             )
//         });
//     } catch (err) {
//         if (err.code === 'ER_BAD_FIELD_ERROR') {
//             console.error("Field error in updatePostCategory:", err);
//             return res.status(400).json({ message: 'Dữ liệu không hợp lệ', error: err.message });
//         }
//         console.error("Error updating category:", err);
//         res.status(500).json({ message: 'Lỗi khi cập nhật danh mục', error: err.message });
//     }
// };

// // Xóa danh mục
// exports.deletePostCategory = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const [results] = await db.query('DELETE FROM postcategory WHERE id = ?', [id]);
//         if (results.affectedRows === 0) {
//             return res.status(404).json({ message: 'Không tìm thấy danh mục để xóa' });
//         }
//         res.status(200).json({ message: 'Xóa danh mục thành công' });
//     } catch (err) {
//         if (err.code === 'ER_ROW_IS_REFERENCED_2') {
//             console.error("Foreign key constraint error in deletePostCategory:", err);
//             return res.status(409).json({ message: 'Không thể xóa danh mục, danh mục đang được tham chiếu', error: err.message });
//         }
//         console.error("Error deleting category:", err);
//         res.status(500).json({ message: 'Lỗi khi xóa danh mục', error: err.message });
//     }
// };



















const db = require('../config/db');
const PostCategory = require('../models/postCategory');

// Lấy tất cả danh mục
exports.getAllPostCategories = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM postcategory');
        res.json({
            message: 'Lấy danh mục thành công',
            postcategories: results.map(postcategory => new PostCategory(
                postcategory.id,
                postcategory.parentCategoryID,
                postcategory.name,
                postcategory.image_url,
                postcategory.created_at,
                postcategory.updated_at
            ))
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy danh mục', error: err });
    }
};

// Lấy danh mục theo ID
exports.getPostCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await db.query('SELECT * FROM postcategory WHERE id = ?', [id]);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy danh mục' });
        }
        const postcategory = results[0];
        res.json({
            message: 'Lấy danh mục thành công',
            postcategory: new PostCategory(
                postcategory.id,
                postcategory.parentCategoryID,
                postcategory.name,
                postcategory.image_url,
                postcategory.created_at,
                postcategory.updated_at
            )
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy danh mục', error: err });
    }
};

// Tạo danh mục mới
exports.createPostCategory = async (req, res) => {
    const { parentCategoryID, name } = req.body;
    const image_url = req.file ? req.file.filename : null;
    try {
        const [results] = await db.query(
            'INSERT INTO postcategory (parentCategoryID, name, image_url) VALUES (?, ?, ?)',
            [parentCategoryID, name, image_url]
        );
        res.status(201).json({
            message: 'Tạo danh mục thành công',
            postcategory: new PostCategory(
                results.insertId,
                parentCategoryID,
                name,
                image_url,
                new Date(),
                new Date()
            )
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi tạo danh mục', error: err });
    }
};

// Cập nhật danh mục
exports.updatePostCategory = async (req, res) => {
    const { id } = req.params;
    const { parentCategoryID, name } = req.body;
    const image_url = req.file ? req.file.filename : null;

    try {
        const [selectResults] = await db.query('SELECT image_url FROM postcategory WHERE id = ?', [id]);
        if (selectResults.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy danh mục' });
        }
        
        const currentImage = selectResults[0].image_url;
        const updatedImage = image_url || currentImage;

        await db.query(
            'UPDATE postcategory SET parentCategoryID = ?, name = ?, image_url = ? WHERE id = ?',
            [parentCategoryID, name, updatedImage, id]
        );
        res.json({
            message: 'Cập nhật danh mục thành công',
            postcategory: new PostCategory(
                id,
                parentCategoryID,
                name,
                updatedImage,
                null,
                new Date()
            )
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi cập nhật danh mục', error: err });
    }
};

// Xóa danh mục
exports.deletePostCategory = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM postcategory WHERE id = ?', [id]);
        res.status(200).json({ message: 'Xóa danh mục thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi xóa danh mục', error: err });
    }
};
