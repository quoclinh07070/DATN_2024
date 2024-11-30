-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Nov 30, 2024 at 01:56 PM
-- Server version: 5.7.39
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `datn`
--

-- --------------------------------------------------------

--
-- Table structure for table `cartitems`
--

CREATE TABLE `cartitems` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cartitems`
--

INSERT INTO `cartitems` (`id`, `user_id`, `product_id`, `quantity`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, '2024-10-21 11:20:26', '2024-10-21 11:20:26'),
(2, 2, 2, 1, '2024-10-21 11:20:26', '2024-10-21 11:20:26'),
(3, 3, 3, 1, '2024-10-21 11:20:26', '2024-10-21 11:20:26'),
(4, 4, 4, 1, '2024-10-21 11:20:26', '2024-10-21 11:20:26'),
(5, 5, 5, 1, '2024-10-21 11:20:26', '2024-10-21 11:20:26');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `images` varchar(255) DEFAULT NULL,
  `parent_categoryID` int(11) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `description` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `category_name`, `images`, `parent_categoryID`, `status`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Sofa và Ghế', 'special-3.jpg', 1, 'inactive', 'Sofa và Ghế', '2024-10-21 11:15:16', '2024-11-30 11:51:25'),
(2, 'Bàn và Ghế Ăn', 'special-2.jpg', 2, 'inactive', 'Bàn và Ghế Ăn', '2024-10-21 11:15:16', '2024-11-30 11:51:31'),
(3, 'Giường Ngủ', 'special-1.jpg', 2, 'inactive', 'Giường Ngủ', '2024-10-21 11:15:16', '2024-11-30 11:51:36'),
(4, 'Đồ Trang Trí', 'special-4.jpg', 2, 'active', 'Đồ Trang Trí\r\n', '2024-10-21 11:15:16', '2024-11-24 19:59:27');

-- --------------------------------------------------------

--
-- Table structure for table `commentpost`
--

CREATE TABLE `commentpost` (
  `id` int(11) NOT NULL,
  `posts_id` int(11) NOT NULL,
  `users_id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `status` enum('visible','hidden') DEFAULT 'visible',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `commentpost`
--

INSERT INTO `commentpost` (`id`, `posts_id`, `users_id`, `comment`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Giường ngủ: MOHO thiết kế giường ngủ với phong cách tối giản', 'visible', '2024-11-18 08:12:28', '2024-11-24 13:08:12'),
(2, 2, 3, 'Bình luận 2', 'hidden', '2024-11-18 08:12:28', '2024-11-20 07:41:50'),
(3, 3, 4, 'Bình luận 3', 'visible', '2024-11-18 08:12:28', '2024-11-20 07:41:50'),
(4, 4, 2, 'Bình luận 4', 'hidden', '2024-11-18 08:12:28', '2024-11-20 07:41:50'),
(5, 5, 3, 'Bình luận 5', 'visible', '2024-11-18 08:12:28', '2024-11-20 07:41:50'),
(6, 2, 3, 'Bình luận 2', 'hidden', '2024-11-25 05:05:20', '2024-11-25 05:05:20'),
(7, 1, 21, 'vèwfewfwe', NULL, '2024-11-25 05:05:34', '2024-11-25 05:05:34'),
(8, 1, 21, 'feverv', NULL, '2024-11-25 05:10:56', '2024-11-25 05:10:56'),
(9, 1, 21, 'vưevw', NULL, '2024-11-25 05:12:03', '2024-11-25 05:12:03'),
(10, 1, 21, 'vrevergre', NULL, '2024-11-25 05:12:51', '2024-11-25 05:12:51'),
(11, 2, 3, 'Bình luận 2', 'hidden', '2024-11-25 05:14:28', '2024-11-25 05:14:28'),
(12, 1, 21, 'ggrwgr', NULL, '2024-11-25 05:18:01', '2024-11-25 05:18:01'),
(13, 1, 21, 'rggrwgr', NULL, '2024-11-25 05:20:55', '2024-11-25 05:20:55'),
(14, 1, 21, 'ethteh', NULL, '2024-11-25 05:22:01', '2024-11-25 05:22:01'),
(15, 1, 21, 'grrwgwrg', NULL, '2024-11-25 05:26:30', '2024-11-25 05:26:30'),
(16, 1, 21, 'tru66u', NULL, '2024-11-25 05:41:00', '2024-11-25 05:41:00');

-- --------------------------------------------------------

--
-- Table structure for table `contactmessages`
--

CREATE TABLE `contactmessages` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `status` enum('pending','resolved') DEFAULT 'pending',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contactmessages`
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
-- Table structure for table `key_token`
--

CREATE TABLE `key_token` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `public_key` text NOT NULL,
  `private_key` text NOT NULL,
  `refresh_tokens_used` text,
  `refresh_token` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `key_token`
--

INSERT INTO `key_token` (`id`, `user_id`, `public_key`, `private_key`, `refresh_tokens_used`, `refresh_token`, `created_at`, `updated_at`) VALUES
(16, 26, '87c4c624285146618bb84a71a0d026fa6e2cc67da0edb95ba7eba5a1c1a7dc9402a70e4f76785e330e156b0e70fc05878dd0aa600a12ca5b26487bd455ce990f', '055a10732e91a80731ae25bc29cc99f5f510f41e7bbc880af049aa5a7b0aa60708ab51284d2d4f7862d85229db66543d0cf7160822b015dae72e84dc9e84fa80', '[]', '', '2024-11-23 12:27:39', '2024-11-23 12:27:39'),
(32, 27, '90aa6d88eca3a10a5e42486727a1e1766bddf6152da0d84dbe5a9ec78d8e920f3b1a22b046c6d9f47b9f17d26934789231ac4a049564d71d6d13361b2497066e', '6701e96b47a8d59856bd2e356e4b48785cef75103bcb72d5ea25345ba00eecb018d5d88947d9f5e8d760071bd00a3f54c875bb09d4e21ba252e01d5c9a793f2f', '[]', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI3LCJlbWFpbCI6IjFAMSIsInVzZXJSb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzI4NzcyMjMsImV4cCI6MTczMzQ4MjAyM30.kFswMxpCnS8npv2IWkaasowhzbLv3mvWY_Ax8rONWYo', '2024-11-28 05:54:33', '2024-11-29 10:47:03'),
(33, 24, 'cfebe23ed2e835f7d07de3ca86026267d99da0ab452be92dd275e3a691d59cfd7c9d9b6433699ec0a5d98fd75b6893ca821e42de8aa0828ff51d90ccccacfe6f', '5185afdbd1bfc357e9f8f1c538e1a1793151062246f4218188ae03409db8ccc627ff0435361f7eace22629bb40a494f8d30280504e9f0f1a3aeea301674c7d2a', '[]', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI0LCJlbWFpbCI6ImxhbW5oYXQ1MDlAZ21haWwuY29tIiwidXNlclJvbGUiOiJhZG1pbiIsImlhdCI6MTczMjk0MTc1MSwiZXhwIjoxNzMzNTQ2NTUxfQ.uggsj2f3utUfNODhI07f0zWJJy6jsRdaw7iowMQqVE0', '2024-11-30 04:42:31', '2024-11-30 04:42:31');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `message`, `created_at`, `updated_at`) VALUES
(1, 1, 'Your order has been shipped.', '2024-10-21 11:18:38', '2024-10-21 11:18:38'),
(2, 2, 'Your order has been delivered.', '2024-10-21 11:18:38', '2024-10-21 11:18:38'),
(3, 3, 'Your voucher has been applied.', '2024-10-21 11:18:38', '2024-10-21 11:18:38'),
(4, 4, 'Your order has been cancelled.', '2024-10-21 11:18:38', '2024-10-21 11:18:38'),
(5, 5, 'Your review has been posted.', '2024-10-21 11:18:38', '2024-10-21 11:18:38');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `status` enum('processing','canceled','delivering','completed') NOT NULL DEFAULT 'processing',
  `payment_amount` decimal(10,2) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `total_amount`, `payment_method`, `status`, `payment_amount`, `address`, `phone_number`, `note`, `created_at`, `updated_at`) VALUES
(34, 27, '990000.00', 'momo', 'canceled', '990000.00', '12321, Phường Thới Hòa, Thị xã Bến Cát, Tỉnh Bình Dương', '0991122325', NULL, '2024-11-28 19:40:33', '2024-11-29 18:58:40'),
(35, 27, '891000.00', 'momo', 'delivering', '891000.00', '12321, Phường Thới Hòa, Thị xã Bến Cát, Tỉnh Bình Dương', '0991122325', NULL, '2024-11-28 20:04:31', '2024-11-29 20:34:28'),
(55, 27, '3312036.00', 'momo', '', '3312036.00', '12321, Phường Thới Hòa, Thị xã Bến Cát, Tỉnh Bình Dương', '0991122325', NULL, '2024-11-29 00:18:25', '2024-11-29 20:38:17'),
(56, 27, '3312036.00', 'momo', 'delivering', '3312036.00', '12321, Phường Thới Hòa, Thị xã Bến Cát, Tỉnh Bình Dương', '0991122325', NULL, '2024-11-29 00:20:15', '2024-11-30 11:59:06'),
(57, 27, '3312036.00', 'momo', 'canceled', '3312036.00', '12321, Phường Thới Hòa, Thị xã Bến Cát, Tỉnh Bình Dương', '0991122325', NULL, '2024-11-29 00:21:26', '2024-11-29 20:07:46'),
(58, 27, '3312036.00', 'momo', 'canceled', '3312036.00', '12321, Phường Thới Hòa, Thị xã Bến Cát, Tỉnh Bình Dương', '0991122325', NULL, '2024-11-29 00:26:09', '2024-11-29 20:07:44'),
(59, 27, '3312036.00', 'momo', 'canceled', '3312036.00', '12321, Phường Thới Hòa, Thị xã Bến Cát, Tỉnh Bình Dương', '0991122325', NULL, '2024-11-29 00:27:55', '2024-11-29 20:07:30'),
(60, 27, '3312036.00', 'momo', 'delivering', '3312036.00', '12321, Phường Thới Hòa, Thị xã Bến Cát, Tỉnh Bình Dương', '0991122325', NULL, '2024-11-29 00:28:39', '2024-11-29 20:06:12'),
(61, 27, '3312036.00', 'momo', 'canceled', '3312036.00', '12321, Phường Thới Hòa, Thị xã Bến Cát, Tỉnh Bình Dương', '0991122325', NULL, '2024-11-29 00:32:58', '2024-11-29 20:05:54'),
(62, 27, '3312036.00', 'momo', 'canceled', '3312036.00', '12321, Phường Thới Hòa, Thị xã Bến Cát, Tỉnh Bình Dương', '0991122325', NULL, '2024-11-29 00:33:24', '2024-11-29 20:03:58'),
(63, 27, '3312036.00', 'momo', 'canceled', '3312036.00', '12321, Phường Thới Hòa, Thị xã Bến Cát, Tỉnh Bình Dương', '0991122325', NULL, '2024-11-29 00:34:19', '2024-11-29 20:03:55'),
(64, 27, '1840120.00', 'cod', 'canceled', '1840120.00', '12321, Phường Thới Hòa, Thị xã Bến Cát, Tỉnh Bình Dương', '0991122325', NULL, '2024-11-29 00:44:26', '2024-11-29 19:55:25'),
(65, 27, '3186000.00', 'cod', 'canceled', '3186000.00', '12321, Phường Thới Hòa, Thị xã Bến Cát, Tỉnh Bình Dương', '0991122325', NULL, '2024-11-29 17:55:02', '2024-11-29 19:55:22'),
(66, 27, '990000.00', 'cod', 'canceled', '990000.00', '12321, Phường Thới Hòa, Thị xã Bến Cát, Tỉnh Bình Dương', '0991122325', NULL, '2024-11-29 18:07:33', '2024-11-29 19:53:46'),
(67, 27, '850000.00', 'cod', 'canceled', '850000.00', '12321, Phường Thới Hòa, Thị xã Bến Cát, Tỉnh Bình Dương', '0991122325', NULL, '2024-11-29 18:10:30', '2024-11-29 19:52:34'),
(68, 27, '990000.00', 'cod', 'canceled', '990000.00', '12321, Phường Thới Hòa, Thị xã Bến Cát, Tỉnh Bình Dương', '0991122325', NULL, '2024-11-29 18:14:11', '2024-11-29 19:52:05'),
(69, 27, '850000.00', 'cod', 'completed', '850000.00', '12321, Phường Thới Hòa, Thị xã Bến Cát, Tỉnh Bình Dương', '0991122325', NULL, '2024-11-29 18:16:13', '2024-11-29 20:14:30'),
(70, 27, '850000.00', 'cod', 'completed', '850000.00', '12321, Phường Thới Hòa, Thị xã Bến Cát, Tỉnh Bình Dương', '0991122325', '12321', '2024-11-29 18:18:54', '2024-11-29 20:33:38'),
(71, 27, '850000.00', 'cod', 'processing', '850000.00', '12321, Phường Thới Hòa, Thị xã Bến Cát, Tỉnh Bình Dương', '0991122325', NULL, '2024-11-29 18:19:26', '2024-11-29 20:14:20'),
(72, 24, '1472000.00', 'cod', 'processing', '1472000.00', 'Can Tho, Phường Bùi Hữu Nghĩa, Quận Bình Thuỷ, Thành phố Cần Thơ', '0913321123', NULL, '2024-11-30 11:06:57', '2024-11-30 11:06:57'),
(73, 24, '3056000.00', 'momo', 'processing', '3056000.00', 'Can Tho, Phường Bùi Hữu Nghĩa, Quận Bình Thuỷ, Thành phố Cần Thơ', '0913321123', NULL, '2024-11-30 11:42:51', '2024-11-30 11:42:51'),
(74, 24, '1840000.00', 'momo', 'processing', '1840000.00', 'Can Tho, Phường Bùi Hữu Nghĩa, Quận Bình Thuỷ, Thành phố Cần Thơ', '0913321123', NULL, '2024-11-30 11:44:10', '2024-11-30 11:44:10');

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `voucher_code` varchar(255) DEFAULT NULL,
  `voucher_discount` decimal(10,2) DEFAULT '0.00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`id`, `order_id`, `product_id`, `product_name`, `quantity`, `unit_price`, `total_price`, `created_at`, `updated_at`, `voucher_code`, `voucher_discount`) VALUES
(1, 63, 1, 'Armchair Curio 104', 2, '990000.00', '1980000.00', '2024-11-29 00:34:19', '2024-11-29 00:34:19', 'DISCOUNT100', '10.00'),
(2, 63, 5, 'Armchair Panhome vải', 2, '20.00', '40.00', '2024-11-29 00:34:19', '2024-11-29 00:34:19', 'DISCOUNT100', '10.00'),
(3, 63, 2, 'Armchair Mây Mode', 2, '850000.00', '1700000.00', '2024-11-29 00:34:19', '2024-11-29 00:34:19', 'DISCOUNT100', '10.00'),
(4, 64, 1, 'Armchair Curio 104', 1, '990000.00', '990000.00', '2024-11-29 00:44:26', '2024-11-29 00:44:26', NULL, '0.00'),
(5, 64, 2, 'Armchair Mây Mode', 1, '850000.00', '850000.00', '2024-11-29 00:44:26', '2024-11-29 00:44:26', NULL, '0.00'),
(6, 64, 4, 'Armchair Nancy 04 vải màu cam', 1, '120.00', '120.00', '2024-11-29 00:44:26', '2024-11-29 00:44:26', NULL, '0.00'),
(7, 65, 1, 'Armchair Curio 104', 1, '990000.00', '990000.00', '2024-11-29 17:55:03', '2024-11-29 17:55:03', 'DISCOUNT100', '10.00'),
(8, 65, 2, 'Armchair Mây Mode', 3, '850000.00', '2550000.00', '2024-11-29 17:55:03', '2024-11-29 17:55:03', 'DISCOUNT100', '10.00'),
(9, 66, 1, 'Armchair Curio 104', 1, '990000.00', '990000.00', '2024-11-29 18:07:33', '2024-11-29 18:07:33', NULL, '0.00'),
(10, 67, 2, 'Armchair Mây Mode', 1, '850000.00', '850000.00', '2024-11-29 18:10:30', '2024-11-29 18:10:30', NULL, '0.00'),
(11, 68, 1, 'Armchair Curio 104', 1, '990000.00', '990000.00', '2024-11-29 18:14:11', '2024-11-29 18:14:11', NULL, '0.00'),
(12, 69, 2, 'Armchair Mây Mode', 1, '850000.00', '850000.00', '2024-11-29 18:16:13', '2024-11-29 18:16:13', NULL, '0.00'),
(13, 70, 2, 'Armchair Mây Mode', 1, '850000.00', '850000.00', '2024-11-29 18:18:54', '2024-11-29 18:18:54', NULL, '0.00'),
(14, 71, 2, 'Armchair Mây Mode', 1, '850000.00', '850000.00', '2024-11-29 18:19:26', '2024-11-29 18:19:26', NULL, '0.00'),
(15, 72, 1, 'Armchair Curio 104', 1, '990000.00', '990000.00', '2024-11-30 11:06:57', '2024-11-30 11:06:57', 'DISCOUNT20', '20.00'),
(16, 72, 2, 'Armchair Mây Mode', 1, '850000.00', '850000.00', '2024-11-30 11:06:57', '2024-11-30 11:06:57', 'DISCOUNT20', '20.00'),
(17, 73, 2, 'Armchair Mây Mode', 1, '850000.00', '850000.00', '2024-11-30 11:42:51', '2024-11-30 11:42:51', 'DISCOUNT20', '20.00'),
(18, 73, 1, 'Armchair Curio 104', 3, '990000.00', '2970000.00', '2024-11-30 11:42:51', '2024-11-30 11:42:51', 'DISCOUNT20', '20.00'),
(19, 74, 2, 'Armchair Mây Mode', 1, '850000.00', '850000.00', '2024-11-30 11:44:10', '2024-11-30 11:44:10', NULL, '0.00'),
(20, 74, 1, 'Armchair Curio 104', 1, '990000.00', '990000.00', '2024-11-30 11:44:10', '2024-11-30 11:44:10', NULL, '0.00');

-- --------------------------------------------------------

--
-- Table structure for table `postcategory`
--

CREATE TABLE `postcategory` (
  `id` int(11) NOT NULL,
  `parentCategoryID` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `postcategory`
--

INSERT INTO `postcategory` (`id`, `parentCategoryID`, `name`, `created_at`, `updated_at`, `image_url`) VALUES
(1, 1, 'Bí Quyết Duy Trì Nội Thất Bền Lâu', '2024-10-21 11:18:48', '2024-11-24 20:07:11', 'new.jpg'),
(2, 2, 'Lời Khuyên Trang Trí Nội Thất', '2024-10-21 11:18:48', '2024-11-24 20:07:16', 'new.jpg'),
(3, 1, 'Cách Sắp Xếp Nội Thất Thông Minh', '2024-10-21 11:18:48', '2024-11-24 20:07:23', 'new.jpg'),
(4, 1, 'Nội Thất Cho Không Gian Nhỏ', '2024-10-21 11:18:48', '2024-11-24 20:07:28', 'new.jpg'),
(6, 1, 'Phối Màu Nội Thất Hoàn Hảo', '2024-11-01 13:48:45', '2024-11-24 20:07:34', 'new.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `post_category_id` int(11) DEFAULT NULL,
  `status` enum('draft','published') DEFAULT 'draft',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `content`, `post_category_id`, `status`, `created_at`, `updated_at`, `image_url`) VALUES
(1, 'Nội thất căn hộ Vinhome Bason hiện đại', 'Giường ngủ: MOHO thiết kế giường ngủ với phong cách tối giản, sử dụng chất liệu gỗ tự nhiên và gỗ công nghiệp đạt chuẩn quốc tế. Có nhiều mẫu mã cho bạn lựa chọn, không chỉ đáp ứng nhu cầu sử dụng mà còn tăng tính thẩm mỹ cho căn phòng. \r\n\r\nTủ quần áo: Sản phẩm ở đây đa dạng về kích thước và kiểu dáng, chẳng hạn như tủ quần áo 1 cánh, 2 cánh, 3 cánh, 4 cánh,... Tại đây, các mẫu tủ quần áo đều có thiết kế thông minh, đa công năng, màu sắc hiện đại và trang nhã.\r\n\r\nBàn trang điểm: Bàn trang điểm của MOHO kết hợp giữa chức năng và thẩm mỹ, phù hợp với nhiều phong cách nội thất. Sản phẩm có màu gỗ tự nhiên, thiết kế nhỏ gọn giúp cho bạn thêm tự tin làm đẹp mỗi ngày.\r\n\r\nKệ đầu giường: Sản phẩm được cửa hàng thiết kế với tiêu chí tiện lợi và dễ phối hợp cùng với các loại giường khác. Tại đây, bạn sẽ có nhiều lựa chọn về màu sắc, kiểu dáng, dễ dàng kết hợp với giường ngủ, bàn trang điểm và tủ quần áo.', 1, 'published', '2024-11-20 13:14:17', '2024-11-18 13:47:32', 'blog-post-1.jpg'),
(2, 'Nội thất của căn hộ mang truyền thống', 'Phòng khách là nơi gia đình quây quần và dùng để đón tiếp khách khi ghé đến nhà. Vì vậy, không gian này cần được chăm chút tỉ mỉ với các sản phẩm đẹp. Cùng xem một vài danh mục tại cửa hàng đồ nội thất MOHO như dưới đây:\r\n\r\nSofa: Cửa hàng đang có đủ loại, từ sofa đơn, sofa chữ I, sofa chữ L. Sản phẩm có chất liệu chính là gỗ cao su, gỗ tràm tự nhiên. Về màu sắc, bạn cũng có nhiều lựa chọn như màu nâu đậm, nâu tự nhiên, trắng hay xám phù hợp với phong cách của gia đình.\r\n\r\nBàn trà: Sản phẩm sở hữu thiết kế đa dạng với 1 tầng, 2 tầng đều có đủ. Bên cạnh đó, bạn có thể tìm được mẫu bàn có phong cách khác nhau, như phong cách Viking, phong cách Industrial, phong cách Bắc Âu, phong cách tối giản,... Bàn trà tại MOHO dễ dàng phối hợp với kiểu ghế ngồi sofa để tạo nên một không gian phòng khách lý tưởng.\r\n\r\nKệ tivi: Không chỉ dùng để đặt tivi, kệ còn có nhiều ngăn thông minh khác giúp lưu trữ đồ đạc gọn gàng. Chúng được làm từ gỗ tràm, gỗ công nghiệp chất lượng với nhiều màu sắc cho bạn lựa chọn.', 2, 'published', '2024-10-25 13:15:17', '2024-11-11 16:05:10', 'blog-post-2.jpg'),
(3, 'Nhà Xinh gợi ý quà tặng 20/10 ý nghĩa', 'Nội dung bài viết 3', 3, 'published', '2024-10-25 13:16:17', '2024-11-11 15:12:37', 'blog-post-3.jpg'),
(4, 'Gợi ý setup ngôi nhà mùa thu', 'Nội dung bài viết 4', 4, 'published', '2024-10-25 13:17:17', '2024-11-11 16:04:57', 'blog-post-4.jpg'),
(5, 'Nội thất cho phòng khách nhỏ gọn có gì?', 'Nội dung bài viết 5', 1, 'published', '2024-10-25 13:18:17', '2024-11-11 12:31:39', 'blog-single-1.jpg'),
(6, 'Nội thất Mây – Mang hơi thở thiên nhiên', 'pHÒNG kHÁCH TỐI GIẢN, HIỆN ĐẠI CHO NGƯỜI TRẺ', 2, 'published', '2024-10-25 13:19:17', '2024-11-11 16:05:24', 'blog-post-1.jpg'),
(7, 'Xu thế hướng đến tân cổ điển', 'Nội dung bài viết 7', 3, 'published', '2024-10-25 13:20:17', '2024-11-25 14:18:54', 'blog-post-2.jpg'),
(8, 'Ngôi nhà hiện đại dành cho giới trẻ.', 'Nội dung bài viết 8', 4, 'published', '2024-10-25 13:21:17', '2024-11-25 14:19:00', 'blog-post-3.jpg'),
(9, 'Không gian hài hòa với giường ngủ.', 'Không gian hài hòa với giường ngủ.', 1, 'published', '2024-10-25 13:22:17', '2024-11-25 14:19:05', 'blog-post-4.jpg'),
(10, 'Giường ngủ Pio hiện đại và thoải mái', 'Giường ngủ Pio hiện đại và thoải mái', 2, 'published', '2024-10-25 13:23:17', '2024-11-25 14:19:10', 'blog-post-5.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text,
  `discount` decimal(5,0) DEFAULT '0',
  `quantity` int(11) NOT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `categories_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ProductID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `image`, `description`, `discount`, `quantity`, `status`, `categories_id`, `created_at`, `updated_at`, `ProductID`) VALUES
(1, 'Armchair Curio 104', '1100000', 'pr1.2.jpg', 'Latest smartphone with great features', '10', 50, 'active', 1, '2024-10-21 11:16:52', '2024-11-29 11:03:16', NULL),
(2, 'Armchair Mây Mode', '1000000', 'pr1.3.jpg', 'High-performance laptop', '15', 20, 'active', 1, '2024-10-21 11:16:52', '2024-11-27 14:00:15', NULL),
(3, 'Armchair Mây mới', '80', 'armchair-may-moi-mau-xanh-768x511.jpg', 'Stylish winter jacket', '5', 100, 'active', 2, '2024-10-21 11:16:52', '2024-11-04 13:08:27', NULL),
(4, 'Armchair Nancy 04 vải màu cam', '150', 'armchair-vai-mau-vang-sf044j.ids_-768x511.jpg', 'High-efficiency microwave oven', '20', 30, 'active', 3, '2024-10-21 11:16:52', '2024-11-24 20:01:54', NULL),
(5, 'Armchair Panhome vải', '20', 'pr5.jpg', 'Bestselling novel', '0', 200, 'active', 4, '2024-10-21 11:16:52', '2024-11-24 20:02:31', NULL),
(26, 'Armchair Oriental vact10389', '300', 'pr5.1.jpg', 'Latest smartphone with great features', '10', 50, 'active', 1, '2024-10-21 11:15:33', '2024-11-24 20:02:40', NULL),
(27, 'Armchair Ogami vải vact10504', '1000', 'pr4.jpg', 'High-performance laptop', '15', 20, 'active', 1, '2024-10-21 11:15:33', '2024-11-24 20:02:48', NULL),
(28, 'Armchair Stan 75', '80', 'pr4.4.jpg', 'Stylish winter jacket', '5', 100, 'active', 2, '2024-10-21 11:15:33', '2024-11-24 20:03:11', NULL),
(29, 'Armchair Saka P100 vải vact10498', '150', 'pr4.3.jpg', 'High-efficiency microwave oven', '20', 30, 'active', 3, '2024-10-21 11:15:33', '2024-11-24 20:03:20', NULL),
(30, 'Smartphone', '1000000', '1.7.jpg', 'abc', '100', 100, 'active', 4, '2024-11-30 11:53:29', '2024-11-30 11:53:29', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `productsubimages`
--

CREATE TABLE `productsubimages` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `productsubimages`
--

INSERT INTO `productsubimages` (`id`, `product_id`, `image`, `created_at`, `updated_at`) VALUES
(1, 1, 'smartphone_side.jpg', '2024-10-21 11:19:32', '2024-10-21 11:19:32'),
(2, 2, 'laptop_back.jpg', '2024-10-21 11:19:32', '2024-10-21 11:19:32'),
(3, 3, 'jacket_detail.jpg', '2024-10-21 11:19:32', '2024-10-21 11:19:32'),
(4, 4, 'microwave_inside.jpg', '2024-10-21 11:19:32', '2024-10-21 11:19:32'),
(5, 5, 'novel_cover.jpg', '2024-10-21 11:19:32', '2024-10-21 11:19:32');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rating` tinyint(4) DEFAULT NULL,
  `reviews_text` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` tinyint(4) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `product_id`, `user_id`, `rating`, `reviews_text`, `created_at`, `updated_at`, `status`) VALUES
(6, 1, 24, 5, 'Great product! Totally worth the price.', '2024-10-21 11:17:28', '2024-11-28 15:08:31', 0),
(8, 3, 25, 3, 'Average product, not bad.', '2024-10-21 11:17:28', '2024-10-21 11:17:28', 1),
(9, 4, 26, 4, 'Good product but delivery was slow.', '2024-10-21 11:17:28', '2024-10-21 11:17:28', 1),
(10, 5, 27, 5, 'Loved this book, highly recommend it!', '2024-10-21 11:17:28', '2024-11-29 00:33:02', 1),
(12, 5, 24, 4, 'Sản phẩm rất tuyệt vời, nhưng giao hàng hơi chậm.', '2024-11-23 19:29:44', '2024-11-28 15:04:16', 0),
(17, 1, 24, 3, 'okokoko', '2024-11-30 11:09:47', '2024-11-30 11:09:47', 1);

-- --------------------------------------------------------

--
-- Table structure for table `shippings`
--

CREATE TABLE `shippings` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `shipping_method` varchar(50) NOT NULL,
  `shipping_cost` decimal(10,2) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shippings`
--

INSERT INTO `shippings` (`id`, `order_id`, `shipping_method`, `shipping_cost`, `created_at`, `updated_at`) VALUES
(1, 1, 'Standard', '10.00', '2024-10-21 11:19:24', '2024-11-25 09:46:23'),
(2, 1, 'Express', '15.00', '2024-10-21 11:19:24', '2024-11-25 09:46:26'),
(3, 1, 'Standard', '5.00', '2024-10-21 11:19:24', '2024-11-25 09:46:30'),
(4, 1, 'Overnight', '20.00', '2024-10-21 11:19:24', '2024-11-25 09:46:33'),
(5, 1, 'Standard', '0.00', '2024-10-21 11:19:24', '2024-11-25 09:46:39');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT 'user',
  `email` varchar(255) NOT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_expires` datetime DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullname`, `password`, `phone_number`, `address`, `role`, `email`, `status`, `created_at`, `updated_at`, `reset_token`, `reset_expires`, `profile_picture`) VALUES
(24, 'lamnhat', '$2a$10$Ph9BiLIehXjxcdc4yqp1sOLzvy4ng23akDz8iLB/qk2N6ALOdXtWi', '0913321123', 'Can Tho, Phường Bùi Hữu Nghĩa, Quận Bình Thuỷ, Thành phố Cần Thơ', 'admin', 'lamnhat509@gmail.com', 'active', '2024-11-22 18:15:43', '2024-11-25 14:56:04', NULL, NULL, '/uploads/Screenshot 2024-07-17 234118.png'),
(25, 'lamnhat', '$2a$10$v6DqL6sc/ZKv8BuViAWLUem.GRYyQB/2MLVDl5kcrXJwpRZ65LB/.', '0913634651', 'Can Tho, Phường Tân Phú, Quận Cái Răng, Thành phố Cần Thơ', 'user', 'nhat123321@gmail.com', 'active', '2024-11-22 18:41:26', '2024-11-25 04:50:05', 'bbb7fbdd5af1369fe27f73a2d31ec8240f92616c0421d655848d230de89bd336', '2024-11-25 05:50:05', '/uploads/Screenshot 2024-07-17 234118.png'),
(26, 'lamnhat', '$2b$10$g6HPx3LfgP3.iWr/6my.c.BM.8l7qK6NLL.fwPIoLY22yhfooiPCK', '0913634651', '', 'admin', 'nhat123456@gmail.com', 'active', '2024-11-23 19:27:39', '2024-11-25 09:40:11', NULL, NULL, NULL),
(27, '1', '$2b$10$Usy.7S1/9IZfu.7FPoB2..W25VHYkpwJAlnMmnm4ZeCV5PZ1pHqPC', '0991122325', '12321, Phường Thới Hòa, Thị xã Bến Cát, Tỉnh Bình Dương', 'admin', '1@1', 'active', '2024-11-27 11:43:51', '2024-11-28 12:50:27', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vouchers`
--

CREATE TABLE `vouchers` (
  `id` int(11) NOT NULL,
  `voucher_code` varchar(50) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `discount_percent` decimal(5,0) DEFAULT NULL,
  `valid_from` date NOT NULL,
  `valid_to` date NOT NULL,
  `status` varchar(20) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vouchers`
--

INSERT INTO `vouchers` (`id`, `voucher_code`, `price`, `discount_percent`, `valid_from`, `valid_to`, `status`, `created_at`, `updated_at`) VALUES
(12, 'DISCOUNT100', '100.00', '10', '2024-11-26', '2024-11-30', 'active', '2024-11-01 10:00:00', '2024-11-24 19:52:06'),
(13, 'DISCOUNT20', '200.00', '20', '2024-11-01', '2024-12-15', 'active', '2024-11-01 10:30:00', '2024-11-01 10:30:00'),
(14, 'DISCOUNT30', '300.00', '30', '2024-11-05', '2024-12-20', 'inactive', '2024-11-05 11:00:00', '2024-11-05 11:00:00'),
(15, 'NEWYEAR50', '500.00', '50', '2024-12-01', '2025-01-01', 'active', '2024-12-01 12:00:00', '2024-12-01 12:00:00'),
(16, 'FLASH25', '150.00', '25', '2024-11-10', '2024-11-25', 'active', '2024-11-10 09:00:00', '2024-11-27 14:01:48');

-- --------------------------------------------------------

--
-- Table structure for table `wishlistitems`
--

CREATE TABLE `wishlistitems` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `wishlistitems`
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
-- Indexes for dumped tables
--

--
-- Indexes for table `cartitems`
--
ALTER TABLE `cartitems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_categoryID` (`parent_categoryID`);

--
-- Indexes for table `commentpost`
--
ALTER TABLE `commentpost`
  ADD PRIMARY KEY (`id`),
  ADD KEY `posts_id` (`posts_id`),
  ADD KEY `fk_users_commentpost` (`users_id`);

--
-- Indexes for table `contactmessages`
--
ALTER TABLE `contactmessages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `key_token`
--
ALTER TABLE `key_token`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `postcategory`
--
ALTER TABLE `postcategory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parentCategoryID` (`parentCategoryID`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_category_id` (`post_category_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categories_id` (`categories_id`);

--
-- Indexes for table `productsubimages`
--
ALTER TABLE `productsubimages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `shippings`
--
ALTER TABLE `shippings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `vouchers`
--
ALTER TABLE `vouchers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wishlistitems`
--
ALTER TABLE `wishlistitems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cartitems`
--
ALTER TABLE `cartitems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `commentpost`
--
ALTER TABLE `commentpost`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `contactmessages`
--
ALTER TABLE `contactmessages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `key_token`
--
ALTER TABLE `key_token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `postcategory`
--
ALTER TABLE `postcategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `productsubimages`
--
ALTER TABLE `productsubimages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `shippings`
--
ALTER TABLE `shippings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `vouchers`
--
ALTER TABLE `vouchers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `wishlistitems`
--
ALTER TABLE `wishlistitems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cartitems`
--
ALTER TABLE `cartitems`
  ADD CONSTRAINT `cartitems_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `cartitems_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `category_ibfk_1` FOREIGN KEY (`parent_categoryID`) REFERENCES `category` (`id`);

--
-- Constraints for table `commentpost`
--
ALTER TABLE `commentpost`
  ADD CONSTRAINT `commentpost_ibfk_1` FOREIGN KEY (`posts_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `commentpost_ibfk_2` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_users_commentpost` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `contactmessages`
--
ALTER TABLE `contactmessages`
  ADD CONSTRAINT `contactmessages_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `key_token`
--
ALTER TABLE `key_token`
  ADD CONSTRAINT `key_token_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `postcategory`
--
ALTER TABLE `postcategory`
  ADD CONSTRAINT `postcategory_ibfk_1` FOREIGN KEY (`parentCategoryID`) REFERENCES `postcategory` (`id`);

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`post_category_id`) REFERENCES `postcategory` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categories_id`) REFERENCES `category` (`id`);

--
-- Constraints for table `productsubimages`
--
ALTER TABLE `productsubimages`
  ADD CONSTRAINT `productsubimages_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `shippings`
--
ALTER TABLE `shippings`
  ADD CONSTRAINT `shippings_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Constraints for table `wishlistitems`
--
ALTER TABLE `wishlistitems`
  ADD CONSTRAINT `wishlistitems_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `wishlistitems_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
