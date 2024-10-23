// const Category = require('../models/category');

// // Lấy tất cả danh mục
// const getCategories = async (req, res) => {
//   try {
//     const categories = await Category.findAll();
//     res.json(categories);
//   } catch (error) {
//     res.status(500).json({ message: 'Lỗi lấy danh mục' });
//   }
// };

// // Lấy 1 danh mục theo ID
// const getCategory = async (req, res) => {
//   try {
//     const category = await Category.findByPk(req.params.id);
//     if (category) {
//       res.json(category);
//     } else {
//       res.status(404).json({ message: 'Không tìm thấy danh mục' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Lỗi lấy danh mục' });
//   }
// };

// // Thêm mới danh mục
// const createCategory = async (req, res) => {
//   try {
//     const { category_name, images, parent_categoryID, status, description } = req.body;
//     const newCategory = await Category.create({
//       category_name,
//       images,
//       parent_categoryID,
//       status,
//       description,
//     });
//     res.status(201).json(newCategory);
//   } catch (error) {
//     res.status(500).json({ message: 'Lỗi thêm danh mục' });
//   }
// };

// // Cập nhật danh mục
// const updateCategory = async (req, res) => {
//   try {
//     const { category_name, images, parent_categoryID, status, description } = req.body;
//     const category = await Category.findByPk(req.params.id);
//     if (category) {
//       category.category_name = category_name;
//       category.images = images;
//       category.parent_categoryID = parent_categoryID;
//       category.status = status;
//       category.description = description;
//       await category.save();
//       res.json(category);
//     } else {
//       res.status(404).json({ message: 'Không tìm thấy danh mục' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Lỗi cập nhật danh mục' });
//   }
// };

// // Xóa danh mục
// // const deleteCategory = async (req, res) => {
// //   try {
// //     const category = await Category.findByPk(req.params.id);
// //     if (category) {
// //       await category.destroy();
// //       res.json({ message: 'Xóa danh mục thành công' });
// //     } else {
// //       res.status(404).json({ message: 'Không tìm thấy danh mục' });
// //     }
// //   } catch (error) {
// //     res.status(500).json({ message: 'Lỗi xóa danh mục' });
// //   }
// // };

// // module.exports = {
// //   getCategories,
// //   getCategory,
// //   createCategory,
// //   updateCategory,
// //   deleteCategory,
// // };
