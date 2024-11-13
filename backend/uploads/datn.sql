-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th10 01, 2024 lúc 05:58 AM
-- Phiên bản máy phục vụ: 8.0.31
-- Phiên bản PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `datn`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cartitems`
--

CREATE TABLE `cartitems` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `cartitems`
--

INSERT INTO `cartitems` (`id`, `user_id`, `product_id`, `quantity`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, '2024-10-21 11:20:26', '2024-10-21 11:20:26'),
(2, 2, 2, 1, '2024-10-21 11:20:26', '2024-10-21 11:20:26'),
(3, 3, 3, 1, '2024-10-21 11:20:26', '2024-10-21 11:20:26'),
(4, 4, 4, 1, '2024-10-21 11:20:26', '2024-10-21 11:20:26'),
(5, 5, 5, 1, '2024-10-21 11:20:26', '2024-10-21 11:20:26');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

CREATE TABLE `category` (
  `id` int NOT NULL,
  `category_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `images` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `parent_categoryID` int DEFAULT NULL,
  `status` enum('active','inactive') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'active',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `category`
--

INSERT INTO `category` (`id`, `category_name`, `images`, `parent_categoryID`, `status`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Electronicsdvfwfewf', 'Snaptik.app_74275274260260160184.jpg', 1, 'active', 'All kinds of electronics', '2024-10-21 11:15:16', '2024-10-31 18:22:37'),
(2, 'Fashion', 'fashion.jpg', 2, 'active', 'Latest fashion trends', '2024-10-21 11:15:16', '2024-11-01 12:20:11'),
(3, 'Home Appliances', 'home_appliances.jpg', 2, 'inactive', 'Appliances for home use', '2024-10-21 11:15:16', '2024-11-01 12:20:20'),
(4, 'Books', 'books.jpg', NULL, 'active', 'All genres of books', '2024-10-21 11:15:16', '2024-10-21 11:15:16'),
(5, 'Toys', 'toys.jpg', NULL, 'active', 'Toys for all ages', '2024-10-21 11:15:16', '2024-10-21 11:15:16'),
(6, 'Fashionefefef111', 'Snaptik.app_74295948987785904823.jpg', 1, 'inactive', 'ccewfewfewfewf', '2024-10-31 18:29:52', '2024-10-31 18:29:52');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `contactmessages`
--

CREATE TABLE `contactmessages` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `subject` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status` enum('pending','resolved') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'pending',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `contactmessages`
--

INSERT INTO `contactmessages` (`id`, `user_id`, `subject`, `message`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Shipping Inquiry', 'When will my order be shipped?', 'pending', '2024-10-21 11:19:08', '2024-10-21 11:19:08'),
(2, 2, 'Order Cancel', 'Please cancel my order.', 'resolved', '2024-10-21 11:19:08', '2024-10-21 11:19:08'),
(3, 3, 'Voucher Problem', 'My voucher code is not working.', 'pending', '2024-10-21 11:19:08', '2024-10-21 11:19:08'),
(4, 4, 'Product Review', 'How do I post a review?', 'resolved', '2024-10-21 11:19:08', '2024-10-21 11:19:08'),
(5, 5, 'Payment Issue', 'I was charged twice.', 'pending', '2024-10-21 11:19:08', '2024-10-21 11:19:08'),
(6, 1, 'Shipping Inquiry', 'When will my order be shipped?', 'pending', '2024-10-21 11:19:16', '2024-10-21 11:19:16'),
(7, 2, 'Order Cancel', 'Please cancel my order.', 'resolved', '2024-10-21 11:19:16', '2024-10-21 11:19:16'),
(8, 3, 'Voucher Problem', 'My voucher code is not working.', 'pending', '2024-10-21 11:19:16', '2024-10-21 11:19:16'),
(9, 4, 'Product Review', 'How do I post a review?', 'resolved', '2024-10-21 11:19:16', '2024-10-21 11:19:16'),
(10, 5, 'Payment Issue', 'I was charged twice.', 'pending', '2024-10-21 11:19:16', '2024-10-21 11:19:16');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `key_token`
--

CREATE TABLE `key_token` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `public_key` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `private_key` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `refresh_tokens_used` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `refresh_token` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `notifications`
--

CREATE TABLE `notifications` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `message`, `created_at`, `updated_at`) VALUES
(1, 1, 'Your order has been shipped.', '2024-10-21 11:18:38', '2024-10-21 11:18:38'),
(2, 2, 'Your order has been delivered.', '2024-10-21 11:18:38', '2024-10-21 11:18:38'),
(3, 3, 'Your voucher has been applied.', '2024-10-21 11:18:38', '2024-10-21 11:18:38'),
(4, 4, 'Your order has been cancelled.', '2024-10-21 11:18:38', '2024-10-21 11:18:38'),
(5, 5, 'Your review has been posted.', '2024-10-21 11:18:38', '2024-10-21 11:18:38');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orderdetails`
--

CREATE TABLE `orderdetails` (
  `id` int NOT NULL,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount` int DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `orderdetails`
--

INSERT INTO `orderdetails` (`id`, `order_id`, `product_id`, `quantity`, `price`, `discount`, `created_at`, `updated_at`) VALUES
(11, 1, 1, 1, 299.99, 10, '2024-10-21 11:17:12', '2024-10-21 11:17:12'),
(12, 2, 2, 1, 999.99, 15, '2024-10-21 11:17:12', '2024-10-21 11:17:12'),
(13, 3, 3, 1, 79.99, 5, '2024-10-21 11:17:12', '2024-10-21 11:17:12'),
(14, 4, 4, 1, 150.00, 20, '2024-10-21 11:17:12', '2024-10-21 11:17:12'),
(15, 5, 5, 1, 19.99, 0, '2024-10-21 11:17:12', '2024-10-21 11:17:12');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `payment_method` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status` enum('shipped','delivered','cancelled') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'shipped',
  `payment_amount` decimal(10,2) NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone_number` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `voucher_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `total_amount`, `payment_method`, `status`, `payment_amount`, `address`, `phone_number`, `voucher_id`, `created_at`, `updated_at`) VALUES
(1, 1, 319.99, 'credit_card', 'shipped', 299.99, '123 Main St', '0123456789', NULL, '2024-10-21 11:15:42', '2024-10-21 11:15:42'),
(2, 2, 1019.99, 'paypal', 'delivered', 999.99, '456 Market St', '0987654321', NULL, '2024-10-21 11:15:42', '2024-10-21 11:15:42'),
(3, 3, 94.99, 'credit_card', 'shipped', 79.99, '789 Oak St', '0123123123', 1, '2024-10-21 11:15:42', '2024-10-21 11:15:42'),
(4, 4, 180.00, 'debit_card', 'cancelled', 150.00, '321 Maple St', '0912312312', 2, '2024-10-21 11:15:42', '2024-10-21 11:15:42'),
(5, 5, 19.99, 'cash', 'delivered', 19.99, '654 Pine St', '0987123123', NULL, '2024-10-21 11:15:42', '2024-10-21 11:15:42');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `postcategory`
--

CREATE TABLE `postcategory` (
  `id` int NOT NULL,
  `parentCategoryID` int DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `image_url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `postcategory`
--

INSERT INTO `postcategory` (`id`, `parentCategoryID`, `name`, `created_at`, `updated_at`, `image_url`) VALUES
(1, 1, 'Tech', '2024-10-21 11:18:48', '2024-10-31 18:30:26', 'https://example.com/image.jpg'),
(2, 2, 'Lifestyle', '2024-10-21 11:18:48', '2024-10-31 18:30:37', 'https://example.com/image.jpg'),
(3, NULL, 'Health', '2024-10-21 11:18:48', '2024-10-31 08:01:34', 'https://example.com/image.jpg'),
(4, NULL, 'Entertainment', '2024-10-21 11:18:48', '2024-10-31 08:01:34', 'https://example.com/image.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `posts`
--

CREATE TABLE `posts` (
  `id` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `post_category_id` int DEFAULT NULL,
  `status` enum('draft','published') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'draft',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `posts`
--

INSERT INTO `posts` (`id`, `title`, `content`, `post_category_id`, `status`, `created_at`, `updated_at`, `image_url`) VALUES
(1, 'Bài viết1', 'Nội dung bài viết 1', 1, 'published', '2024-10-25 13:14:17', '2024-10-31 08:14:01', 'Snaptik.app_74295948987785904823.jpg'),
(2, 'Bài viết 2', 'Nội dung bài viết 2', 2, 'draft', '2024-10-25 13:15:17', '2024-10-25 13:15:17', 'images/image2.jpg'),
(3, 'Bài viết 3', 'Nội dung bài viết 3', 3, 'published', '2024-10-25 13:16:17', '2024-10-25 13:16:17', 'images/image3.jpg'),
(4, 'Bài viết 4', 'Nội dung bài viết 4', 4, 'draft', '2024-10-25 13:17:17', '2024-10-25 13:17:17', 'images/image4.jpg'),
(5, 'Bài viết 5', 'Nội dung bài viết 5', 1, 'published', '2024-10-25 13:18:17', '2024-10-25 13:18:17', 'images/image5.jpg'),
(6, 'Bài viết 6', 'Nội dung bài viết 6', 2, 'draft', '2024-10-25 13:19:17', '2024-10-25 13:19:17', 'images/image6.jpg'),
(7, 'Bài viết 7', 'Nội dung bài viết 7', 3, 'published', '2024-10-25 13:20:17', '2024-10-25 13:20:17', 'images/image7.jpg'),
(8, 'Bài viết 8', 'Nội dung bài viết 8', 4, 'draft', '2024-10-25 13:21:17', '2024-10-25 13:21:17', 'images/image8.jpg'),
(9, 'Bài viết 9', 'Nội dung bài viết 9', 1, 'published', '2024-10-25 13:22:17', '2024-10-25 13:22:17', 'images/image9.jpg'),
(10, 'Bài viết 10', 'Nội dung bài viết 10', 2, 'draft', '2024-10-25 13:23:17', '2024-10-25 13:23:17', 'images/image10.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `discount` decimal(5,2) DEFAULT '0.00',
  `quantity` int NOT NULL,
  `status` enum('active','inactive') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'active',
  `categories_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ProductID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `image`, `description`, `discount`, `quantity`, `status`, `categories_id`, `created_at`, `updated_at`, `ProductID`) VALUES
(1, 'Smartphoneefefef', 299.99, 'Snaptik.app_74295948987785904823.jpg', 'Latest smartphone with great features', 10.00, 50, 'active', 1, '2024-10-21 11:16:52', '2024-10-29 13:20:15', NULL),
(2, 'Laptop', 999.99, 'laptop.jpg', 'High-performance laptop', 15.00, 20, 'active', 1, '2024-10-21 11:16:52', '2024-10-21 11:16:52', NULL),
(3, 'Jacket', 79.99, 'jacket.jpg', 'Stylish winter jacket', 5.00, 100, 'active', 2, '2024-10-21 11:16:52', '2024-10-21 11:16:52', NULL),
(4, 'Microwave Oven', 150.00, 'microwave.jpg', 'High-efficiency microwave oven', 20.00, 30, 'inactive', 3, '2024-10-21 11:16:52', '2024-10-21 11:16:52', NULL),
(5, 'Novel', 19.99, 'novel.jpg', 'Bestselling novel', 0.00, 200, 'active', 4, '2024-10-21 11:16:52', '2024-10-21 11:16:52', NULL),
(26, 'Smartphone', 299.99, 'smartphone.jpg', 'Latest smartphone with great features', 10.00, 50, 'active', 1, '2024-10-21 11:15:33', '2024-10-21 11:15:33', NULL),
(27, 'Laptop', 999.99, 'laptop.jpg', 'High-performance laptop', 15.00, 20, 'active', 1, '2024-10-21 11:15:33', '2024-10-21 11:15:33', NULL),
(28, 'Jacket', 79.99, 'jacket.jpg', 'Stylish winter jacket', 5.00, 100, 'active', 2, '2024-10-21 11:15:33', '2024-10-21 11:15:33', NULL),
(29, 'Microwave Oven111', 150.00, 'microwave.jpg', 'High-efficiency microwave oven', 20.00, 30, 'inactive', 3, '2024-10-21 11:15:33', '2024-10-25 15:20:40', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `productsubimages`
--

CREATE TABLE `productsubimages` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `productsubimages`
--

INSERT INTO `productsubimages` (`id`, `product_id`, `image`, `created_at`, `updated_at`) VALUES
(1, 1, 'smartphone_side.jpg', '2024-10-21 11:19:32', '2024-10-21 11:19:32'),
(2, 2, 'laptop_back.jpg', '2024-10-21 11:19:32', '2024-10-21 11:19:32'),
(3, 3, 'jacket_detail.jpg', '2024-10-21 11:19:32', '2024-10-21 11:19:32'),
(4, 4, 'microwave_inside.jpg', '2024-10-21 11:19:32', '2024-10-21 11:19:32'),
(5, 5, 'novel_cover.jpg', '2024-10-21 11:19:32', '2024-10-21 11:19:32');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reviews`
--

CREATE TABLE `reviews` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `user_id` int NOT NULL,
  `rating` tinyint DEFAULT NULL,
  `reviews_text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `reviews`
--

INSERT INTO `reviews` (`id`, `product_id`, `user_id`, `rating`, `reviews_text`, `created_at`, `updated_at`) VALUES
(6, 1, 1, 5, 'Great product! Totally worth the price.', '2024-10-21 11:17:28', '2024-10-21 11:17:28'),
(7, 2, 2, 4, 'Very good performance but slightly overpriced.', '2024-10-21 11:17:28', '2024-10-21 11:17:28'),
(8, 3, 3, 3, 'Average product, not bad.', '2024-10-21 11:17:28', '2024-10-21 11:17:28'),
(9, 4, 4, 4, 'Good product but delivery was slow.', '2024-10-21 11:17:28', '2024-10-21 11:17:28'),
(10, 5, 5, 5, 'Loved this book, highly recommend it!', '2024-10-21 11:17:28', '2024-10-21 11:17:28');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `shippings`
--

CREATE TABLE `shippings` (
  `id` int NOT NULL,
  `order_id` int NOT NULL,
  `shipping_method` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `shipping_cost` decimal(10,2) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `shippings`
--

INSERT INTO `shippings` (`id`, `order_id`, `shipping_method`, `shipping_cost`, `created_at`, `updated_at`) VALUES
(1, 1, 'Standard', 10.00, '2024-10-21 11:19:24', '2024-10-21 11:19:24'),
(2, 2, 'Express', 15.00, '2024-10-21 11:19:24', '2024-10-21 11:19:24'),
(3, 3, 'Standard', 5.00, '2024-10-21 11:19:24', '2024-10-21 11:19:24'),
(4, 4, 'Overnight', 20.00, '2024-10-21 11:19:24', '2024-10-21 11:19:24'),
(5, 5, 'Standard', 0.00, '2024-10-21 11:19:24', '2024-10-21 11:19:24');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `fullname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone_number` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `role` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'user',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status` enum('active','inactive') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'active',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `fullname`, `password`, `phone_number`, `role`, `email`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Nguyen Van A', 'password123', '0123456789', 'customer', 'a@gmail.com', 'active', '2024-10-21 11:09:24', '2024-10-21 11:09:24'),
(2, 'Le Thi B', 'password456', '0987654321', 'admin', 'b@gmail.com', 'active', '2024-10-21 11:09:24', '2024-10-21 11:09:24'),
(3, 'Tran Van C', 'password789', '0111222333', 'customer', 'c@gmail.com', 'inactive', '2024-10-21 11:09:24', '2024-10-21 11:09:24'),
(4, 'Hoang Thi D', 'passwordabc', '0345566778', 'seller', 'd@gmail.com', 'active', '2024-10-21 11:09:24', '2024-10-21 11:09:24'),
(5, 'Pham Van E', 'passwordxyz', '0567890123', 'customer', 'e@gmail.com', 'active', '2024-10-21 11:09:24', '2024-10-21 11:09:24'),
(16, 'Nguyen Van A', 'password123', '0123456789', 'customer', 'nguyenvana@gmail.com', 'active', '2024-10-21 11:10:39', '2024-10-21 11:10:39'),
(17, 'Le Thi B', 'password456', '0987654321', 'admin', 'lethib@gmail.com', 'active', '2024-10-21 11:10:39', '2024-10-21 11:10:39'),
(18, 'Tran Van C', 'password789', '0111222333', 'customer', 'tranvanc@gmail.com', 'inactive', '2024-10-21 11:10:39', '2024-10-21 11:10:39'),
(19, 'Hoang Thi D', 'passwordabc', '0345566778', 'seller', 'hoangthid@gmail.com', 'active', '2024-10-21 11:10:39', '2024-10-21 11:10:39'),
(20, 'Pham Van E', 'passwordxyz', '0567890123', 'customer', 'phamvane@gmail.com', 'active', '2024-10-21 11:10:39', '2024-10-21 11:10:39');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `vouchers`
--

CREATE TABLE `vouchers` (
  `id` int NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `discount_percent` decimal(5,2) DEFAULT NULL,
  `status` enum('active','inactive') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'active',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `vouchers`
--

INSERT INTO `vouchers` (`id`, `price`, `discount_percent`, `status`, `created_at`, `updated_at`) VALUES
(1, 50.00, 10.00, 'inactive', '2024-10-21 11:18:11', '2024-10-26 21:50:18'),
(2, 30.00, 5.00, 'active', '2024-10-21 11:18:11', '2024-10-21 11:18:11'),
(3, 20.00, 15.00, 'inactive', '2024-10-21 11:18:11', '2024-10-21 11:18:11'),
(4, 100.00, 20.00, 'active', '2024-10-21 11:18:11', '2024-10-21 11:18:11'),
(5, 75.00, 25.00, 'active', '2024-10-21 11:18:11', '2024-10-21 11:18:11'),
(6, 4444444.00, 400.00, 'active', '2024-10-26 21:45:42', '2024-10-26 21:50:08');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `wishlistitems`
--

CREATE TABLE `wishlistitems` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `wishlistitems`
--

INSERT INTO `wishlistitems` (`id`, `user_id`, `product_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2024-10-21 11:18:22', '2024-10-21 11:18:22'),
(2, 2, 2, '2024-10-21 11:18:22', '2024-10-21 11:18:22'),
(3, 3, 3, '2024-10-21 11:18:22', '2024-10-21 11:18:22'),
(4, 4, 4, '2024-10-21 11:18:22', '2024-10-21 11:18:22'),
(5, 5, 5, '2024-10-21 11:18:22', '2024-10-21 11:18:22'),
(6, 1, 1, '2024-10-21 11:18:31', '2024-10-21 11:18:31'),
(7, 2, 2, '2024-10-21 11:18:31', '2024-10-21 11:18:31'),
(8, 3, 3, '2024-10-21 11:18:31', '2024-10-21 11:18:31'),
(9, 4, 4, '2024-10-21 11:18:31', '2024-10-21 11:18:31'),
(10, 5, 5, '2024-10-21 11:18:31', '2024-10-21 11:18:31');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `cartitems`
--
ALTER TABLE `cartitems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_categoryID` (`parent_categoryID`);

--
-- Chỉ mục cho bảng `contactmessages`
--
ALTER TABLE `contactmessages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `key_token`
--
ALTER TABLE `key_token`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `postcategory`
--
ALTER TABLE `postcategory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parentCategoryID` (`parentCategoryID`);

--
-- Chỉ mục cho bảng `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_category_id` (`post_category_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categories_id` (`categories_id`);

--
-- Chỉ mục cho bảng `productsubimages`
--
ALTER TABLE `productsubimages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `shippings`
--
ALTER TABLE `shippings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Chỉ mục cho bảng `vouchers`
--
ALTER TABLE `vouchers`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `wishlistitems`
--
ALTER TABLE `wishlistitems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `cartitems`
--
ALTER TABLE `cartitems`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `contactmessages`
--
ALTER TABLE `contactmessages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `key_token`
--
ALTER TABLE `key_token`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `postcategory`
--
ALTER TABLE `postcategory`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT cho bảng `productsubimages`
--
ALTER TABLE `productsubimages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `shippings`
--
ALTER TABLE `shippings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `vouchers`
--
ALTER TABLE `vouchers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `wishlistitems`
--
ALTER TABLE `wishlistitems`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `cartitems`
--
ALTER TABLE `cartitems`
  ADD CONSTRAINT `cartitems_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `cartitems_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `category_ibfk_1` FOREIGN KEY (`parent_categoryID`) REFERENCES `category` (`id`);

--
-- Các ràng buộc cho bảng `contactmessages`
--
ALTER TABLE `contactmessages`
  ADD CONSTRAINT `contactmessages_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `key_token`
--
ALTER TABLE `key_token`
  ADD CONSTRAINT `key_token_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `postcategory`
--
ALTER TABLE `postcategory`
  ADD CONSTRAINT `postcategory_ibfk_1` FOREIGN KEY (`parentCategoryID`) REFERENCES `postcategory` (`id`);

--
-- Các ràng buộc cho bảng `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`post_category_id`) REFERENCES `postcategory` (`id`);

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categories_id`) REFERENCES `category` (`id`);

--
-- Các ràng buộc cho bảng `productsubimages`
--
ALTER TABLE `productsubimages`
  ADD CONSTRAINT `productsubimages_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `shippings`
--
ALTER TABLE `shippings`
  ADD CONSTRAINT `shippings_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Các ràng buộc cho bảng `wishlistitems`
--
ALTER TABLE `wishlistitems`
  ADD CONSTRAINT `wishlistitems_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `wishlistitems_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
