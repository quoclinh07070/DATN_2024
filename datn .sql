-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th12 03, 2024 lúc 05:10 AM
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
-- Cấu trúc bảng cho bảng `category`
--

CREATE TABLE `category` (
  `id` int NOT NULL,
  `category_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `images` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_general_ci DEFAULT 'active',
  `description` text COLLATE utf8mb4_general_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `category`
--

INSERT INTO `category` (`id`, `category_name`, `images`, `status`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Sofa và Ghế', 'special-3.jpg', 'active', '2024-10-21T04:15:16.000Z', '2024-10-21 11:15:16', '2024-12-03 11:47:32'),
(2, 'Bàn và Ghế Ăn', 'special-2.jpg', 'active', 'Phòng ngủ là nơi để thư giãn và tái tạo năng lượng sau một ngày dài. Danh mục này mang đến những sản phẩm giúp biến không gian nghỉ ngơi của bạn trở nên ấm cúng và tiện nghi hơn. Từ giường ngủ được thiết kế tinh tế, tủ quần áo đa năng, đến đèn ngủ và rèm cửa mềm mại, mỗi sản phẩm đều được thiết kế để mang lại sự thoải mái và phong cách riêng biệt. Bạn có thể dễ dàng phối hợp các sản phẩm trong danh mục để tạo ra một không gian ngủ lý tưởng, nơi mọi căng thẳng đều được xua tan.', '2024-10-21 11:15:16', '2024-12-03 11:44:44'),
(3, 'Giường Ngủ', 'special-1.jpg', 'active', 'Một không gian làm việc hiệu quả không chỉ cần sự tiện nghi mà còn phải truyền cảm hứng sáng tạo. Danh mục nội thất văn phòng cung cấp các sản phẩm như bàn làm việc hiện đại, ghế công thái học, kệ sách đa năng và các món đồ trang trí văn phòng đẹp mắt. Tất cả đều được thiết kế để tối ưu hóa không gian, đảm bảo công năng và tạo sự thoải mái trong quá trình làm việc. Bất kể bạn làm việc tại nhà hay trong văn phòng chuyên nghiệp, những sản phẩm trong danh mục này sẽ giúp bạn xây dựng môi trường làm việc lý tưởng.', '2024-10-21 11:15:16', '2024-12-03 11:45:58'),
(4, 'Đồ Trang Trí', 'special-4.jpg', 'active', 'Danh mục này là nơi hội tụ những sản phẩm trang trí độc đáo giúp làm nổi bật không gian sống của bạn. Từ các loại đèn chùm, tranh treo tường, gương trang trí, đến chậu cây cảnh hoặc thảm trải sàn đầy phong cách, chúng tôi cung cấp các giải pháp để tạo điểm nhấn cho từng góc nhà. Dù bạn muốn làm mới không gian hiện có hay tạo ra một phong cách hoàn toàn mới, các sản phẩm trong danh mục này sẽ mang đến sự khác biệt và thể hiện cá tính của bạn một cách rõ nét.', '2024-10-21 11:15:16', '2024-12-03 11:46:06');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `key_token`
--

CREATE TABLE `key_token` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `public_key` text COLLATE utf8mb4_general_ci NOT NULL,
  `private_key` text COLLATE utf8mb4_general_ci NOT NULL,
  `refresh_tokens_used` text COLLATE utf8mb4_general_ci,
  `refresh_token` text COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `key_token`
--

INSERT INTO `key_token` (`id`, `user_id`, `public_key`, `private_key`, `refresh_tokens_used`, `refresh_token`, `created_at`, `updated_at`) VALUES
(16, 26, '87c4c624285146618bb84a71a0d026fa6e2cc67da0edb95ba7eba5a1c1a7dc9402a70e4f76785e330e156b0e70fc05878dd0aa600a12ca5b26487bd455ce990f', '055a10732e91a80731ae25bc29cc99f5f510f41e7bbc880af049aa5a7b0aa60708ab51284d2d4f7862d85229db66543d0cf7160822b015dae72e84dc9e84fa80', '[]', '', '2024-11-23 12:27:39', '2024-11-23 12:27:39'),
(32, 27, '1e7de95669051048f7a56d6052d9dd9cd1bfa3330406758334fdcc571306f4cd789118fe65980e701409b2d3e8ad53df3edf799f810262a971f5ebbd54b5815e', '40ba39dd2d261123bbf8328760d3618635d5c43f49e2bb2235cd937a9309d476ababb6e3aa6622f514ee5ad7935c4fae1d14691e89158fcb72bad9d7338787c4', '[]', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI3LCJlbWFpbCI6IjFAMSIsInVzZXJSb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzMxMTE5MzcsImV4cCI6MTczMzcxNjczN30.EozFxsV1o6de82H7QqpdCn4vQFcHF-1oTJp-DMlkSSo', '2024-11-28 05:54:33', '2024-12-02 03:58:57'),
(33, 24, 'cfebe23ed2e835f7d07de3ca86026267d99da0ab452be92dd275e3a691d59cfd7c9d9b6433699ec0a5d98fd75b6893ca821e42de8aa0828ff51d90ccccacfe6f', '5185afdbd1bfc357e9f8f1c538e1a1793151062246f4218188ae03409db8ccc627ff0435361f7eace22629bb40a494f8d30280504e9f0f1a3aeea301674c7d2a', '[]', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI0LCJlbWFpbCI6ImxhbW5oYXQ1MDlAZ21haWwuY29tIiwidXNlclJvbGUiOiJhZG1pbiIsImlhdCI6MTczMjk0MTc1MSwiZXhwIjoxNzMzNTQ2NTUxfQ.uggsj2f3utUfNODhI07f0zWJJy6jsRdaw7iowMQqVE0', '2024-11-30 04:42:31', '2024-11-30 04:42:31'),
(34, 28, '8cca78fd94bafe6c610303cc92d168a1bef6e83799fa5df15de4f557ca511b135868ac1e00addee9f35ffa994d8cf09de5364f9d1ab5d298b01fbcb8ac00a08f', '7ec0e502a82ed0f142c26f8d7ef0aac40fdbd5db887d2eedcd2a16be22551271b78974853040123712d9483f338d1c2d9ffabd576d76714cc9fe5a694ec53c61', '[]', '', '2024-12-02 06:30:03', '2024-12-02 06:30:03');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `payment_method` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `status` enum('processing','canceled','delivering','completed') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'processing',
  `address` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `phone_number` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `note` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `voucher_code` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `voucher_discount` decimal(10,2) DEFAULT NULL,
  `voucher_id` int DEFAULT NULL,
  `transIdMomo` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `orderId` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `total_amount`, `payment_method`, `status`, `address`, `phone_number`, `note`, `created_at`, `updated_at`, `voucher_code`, `voucher_discount`, `voucher_id`, `transIdMomo`, `orderId`) VALUES
(112, 27, 850000.00, 'momo', 'delivering', '12321, Phường Thới Hòa, Thị xã Bến Cát, Tỉnh Bình Dương', '0991122325', NULL, '2024-12-01 19:40:15', '2024-12-02 13:28:06', NULL, NULL, NULL, '4251551872', 'ORD-1733056812959'),
(113, 27, 990000.00, 'cod', 'processing', '12321, Phường Thới Hòa, Thị xã Bến Cát, Tỉnh Bình Dương', '0991122325', NULL, '2024-12-02 10:59:44', '2024-12-02 10:59:44', NULL, NULL, NULL, NULL, ''),
(114, 28, 1840000.00, 'cod', 'processing', '12321, Phường Thới Hòa, Thị xã Bến Cát, Tỉnh Bình Dương, Xã Thái Sơn, Huyện Hiệp Hòa, Tỉnh Bắc Giang', '0991122325', 'gbtrhtr', '2024-12-02 21:54:49', '2024-12-02 21:54:49', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_details`
--

CREATE TABLE `order_details` (
  `id` int NOT NULL,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `product_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `quantity` int NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `voucher_code` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `voucher_discount` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `order_details`
--

INSERT INTO `order_details` (`id`, `order_id`, `product_id`, `product_name`, `quantity`, `unit_price`, `total_price`, `created_at`, `updated_at`, `voucher_code`, `voucher_discount`) VALUES
(59, 112, 2, 'Armchair Mây Mode', 1, 850000.00, 850000.00, '2024-12-01 19:40:15', '2024-12-01 19:40:15', NULL, 0.00),
(60, 113, 1, 'Armchair Curio 104', 1, 990000.00, 990000.00, '2024-12-02 10:59:44', '2024-12-02 10:59:44', NULL, 0.00),
(61, 114, 2, 'Armchair Mây Mode', 1, 850000.00, 850000.00, '2024-12-02 21:54:49', '2024-12-02 21:54:49', NULL, 0.00),
(62, 114, 1, 'Armchair Curio 104', 1, 990000.00, 990000.00, '2024-12-02 21:54:49', '2024-12-02 21:54:49', NULL, 0.00);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `postcategory`
--

CREATE TABLE `postcategory` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `image_url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `postcategory`
--

INSERT INTO `postcategory` (`id`, `name`, `created_at`, `updated_at`, `image_url`) VALUES
(1, 'new.jpg', '2024-10-21 11:18:48', '2024-12-03 12:02:08', 'armchair-may-moi-mau-xanh-768x511.jpg'),
(2, 'Lời Khuyên Trang Trí Nội Thất', '2024-10-21 11:18:48', '2024-11-24 20:07:16', 'new.jpg'),
(3, 'Cách Sắp Xếp Nội Thất Thông Minh', '2024-10-21 11:18:48', '2024-11-24 20:07:23', 'new.jpg'),
(4, 'Nội Thất Cho Không Gian Nhỏ', '2024-10-21 11:18:48', '2024-11-24 20:07:28', 'new.jpg'),
(6, 'Phối Màu Nội Thất Hoàn Hảo', '2024-11-01 13:48:45', '2024-11-24 20:07:34', 'new.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `posts`
--

CREATE TABLE `posts` (
  `id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `content` text COLLATE utf8mb4_general_ci NOT NULL,
  `post_category_id` int DEFAULT NULL,
  `status` enum('draft','published') COLLATE utf8mb4_general_ci DEFAULT 'draft',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `image_url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `posts`
--

INSERT INTO `posts` (`id`, `title`, `content`, `post_category_id`, `status`, `created_at`, `updated_at`, `image_url`) VALUES
(1, 'Xu Hướng Trang Trí Nội Thất Mới Nhất Năm [năm hiện tại]', 'Bài viết này sẽ dẫn bạn qua những xu hướng nổi bật trong trang trí nội thất năm nay, từ thiết kế tối giản, sử dụng vật liệu tự nhiên, đến các tông màu nổi bật như xanh rêu, cam đất, hay vàng mù tạt. Độc giả sẽ khám phá cách các phong cách như Scandinavian, Industrial hay phong cách Japandi kết hợp giữa Nhật Bản và Bắc Âu đang dần chiếm lĩnh thị trường nội thất. Kèm theo đó là các gợi ý cụ thể để ứng dụng các xu hướng này vào không gian sống mà không mất nhiều chi phí.', 1, 'published', '2024-11-20 13:14:17', '2024-12-03 11:37:48', 'blog-post-1.jpg'),
(2, 'Bí Quyết Biến Không Gian Nhỏ Thành Tổ Ấm Lý Tưởng', 'Với không gian sống ngày càng thu nhỏ, việc tối ưu hóa diện tích trở thành một trong những thách thức lớn nhất. Bài viết này hướng dẫn cách tận dụng ánh sáng tự nhiên, chọn nội thất thông minh và sắp xếp bố cục hợp lý để không gian nhỏ trở nên thoải mái hơn. Độc giả sẽ học cách sử dụng tủ âm tường, ghế gấp hoặc bàn kéo dài để tiết kiệm diện tích mà vẫn đảm bảo tiện nghi và thẩm mỹ.', 2, 'published', '2024-10-25 13:15:17', '2024-12-03 11:38:13', 'blog-post-2.jpg'),
(3, 'Top 10 Món Đồ Trang Trí Nội Thất Được Ưa Chuộng Nhất', 'Khám phá danh sách những sản phẩm nội thất \"hot\" nhất, từ đèn chùm độc đáo, thảm trải sàn họa tiết, đến gương trang trí hiện đại. Bài viết cung cấp đánh giá chi tiết về từng món đồ, tại sao chúng trở nên phổ biến và cách lựa chọn chúng phù hợp với phong cách của từng căn phòng. Ngoài ra, bài viết còn đưa ra các mẹo phối hợp các món đồ này để tạo điểm nhấn ấn tượng.', 3, 'published', '2024-10-25 13:16:17', '2024-12-03 11:38:38', 'blog-post-3.jpg'),
(4, 'Cách Lựa Chọn Đồ Nội Thất Hài Hòa Với Màu Sắc Không Gian', 'Màu sắc đóng vai trò quan trọng trong việc tạo nên cảm giác và phong cách cho ngôi nhà. Bài viết này tập trung vào cách phối màu sao cho hài hòa giữa đồ nội thất và tổng thể không gian. Từ việc chọn gam màu trung tính cho cảm giác thanh lịch, đến phối hợp các tông màu nổi bật như vàng hoặc xanh để tạo ấn tượng mạnh mẽ. Độc giả sẽ nhận được các công thức phối màu cụ thể để áp dụng vào phòng khách, phòng ngủ, hoặc bếp.\r\n', 4, 'published', '2024-10-25 13:17:17', '2024-12-03 11:39:04', 'blog-post-4.jpg'),
(5, 'Đèn Trang Trí: Điểm Nhấn Tinh Tế Cho Mỗi Căn Phòng', 'Ánh sáng không chỉ phục vụ nhu cầu chiếu sáng mà còn là yếu tố trang trí quan trọng. Bài viết này giới thiệu các loại đèn trang trí như đèn thả trần, đèn đứng hoặc đèn bàn và cách chúng có thể làm nổi bật phong cách nội thất. Ngoài ra, bài viết cũng chia sẻ mẹo chọn đèn phù hợp với từng không gian như phòng khách, phòng ngủ hoặc góc làm việc.\r\n\r\n', 1, 'published', '2024-10-25 13:18:17', '2024-12-03 11:39:29', 'blog-single-1.jpg'),
(6, 'Tầm Quan Trọng Của Trang Trí Nội Thất Trong Việc Nâng Cao Chất Lượng Sống', 'Trang trí nội thất không chỉ mang tính thẩm mỹ mà còn ảnh hưởng sâu sắc đến cảm xúc và sức khỏe của con người. Bài viết này phân tích cách một không gian đẹp, hài hòa có thể cải thiện tâm trạng, giảm căng thẳng và tăng sự sáng tạo. Đồng thời, bài viết cung cấp các lời khuyên thực tiễn để tạo một không gian sống cân bằng, từ việc chọn màu sắc, ánh sáng đến bài trí nội thất.', 2, 'published', '2024-10-25 13:19:17', '2024-12-03 11:39:59', 'blog-post-1.jpg'),
(7, 'Gợi Ý Thiết Kế Phòng Khách Hiện Đại Với Đồ Nội Thất Đa Năng', 'Phòng khách là nơi thể hiện rõ nhất phong cách của gia chủ. Bài viết này tập trung vào các món đồ nội thất đa năng như sofa giường, bàn trà có ngăn kéo, hoặc kệ sách tích hợp tivi. Độc giả sẽ được hướng dẫn cách bố trí những món đồ này sao cho vừa tiết kiệm không gian vừa tăng tính tiện ích và thẩm mỹ cho phòng khách.\r\n\r\n', 3, 'published', '2024-10-25 13:20:17', '2024-12-03 11:40:44', 'blog-post-2.jpg'),
(8, 'Làm Mới Không Gian Sống Với Phụ Kiện Trang Trí Độc Đáo', 'Các phụ kiện nhỏ như tranh treo tường, gối tựa lưng, hoặc chậu cây cảnh có thể thay đổi hoàn toàn diện mạo không gian sống. Bài viết này hướng dẫn cách chọn phụ kiện phù hợp với từng phong cách nội thất và các mẹo phối hợp để làm nổi bật không gian. Đồng thời, độc giả sẽ tìm thấy các xu hướng phụ kiện trang trí mới nhất hiện nay.\r\n\r\n', 4, 'published', '2024-10-25 13:21:17', '2024-12-03 11:41:39', 'blog-post-3.jpg'),
(9, ' Hướng Dẫn Chọn Nội Thất Thân Thiện Với Môi Trường', 'Sử dụng nội thất thân thiện với môi trường không chỉ giúp bảo vệ hành tinh mà còn mang lại vẻ đẹp tự nhiên và an toàn cho không gian sống. Bài viết này giới thiệu các vật liệu bền vững như gỗ tái chế, tre, hoặc mây và cách chọn đồ nội thất từ các thương hiệu cam kết bảo vệ môi trường. Đồng thời, bài viết cũng chia sẻ lợi ích sức khỏe từ việc sử dụng các sản phẩm nội thất không chứa hóa chất độc hại.', 1, 'published', '2024-10-25 13:22:17', '2024-12-03 11:41:50', 'blog-post-4.jpg'),
(10, 'Kinh Nghiệm Mua Sắm Nội Thất Trực Tuyến An Toàn Và Tiết Kiệm', 'Mua sắm nội thất trực tuyến mang lại sự tiện lợi nhưng cũng tiềm ẩn nhiều rủi ro. Bài viết này cung cấp các bí quyết để chọn được sản phẩm chất lượng, từ việc kiểm tra thông tin sản phẩm, đánh giá cửa hàng, đến cách so sánh giá cả. Ngoài ra, độc giả sẽ tìm thấy các mẹo săn ưu đãi và tận dụng chương trình giảm giá để tiết kiệm chi phí.', 2, 'published', '2024-10-25 13:23:17', '2024-12-03 11:42:08', 'blog-post-5.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `discount` decimal(5,0) DEFAULT '0',
  `quantity` int NOT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_general_ci DEFAULT 'active',
  `categories_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ProductID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `image`, `description`, `discount`, `quantity`, `status`, `categories_id`, `created_at`, `updated_at`, `ProductID`) VALUES
(1, 'Armchair Curio 104', 3540000, 'pr1.2.jpg', 'Sofa góc hiện đại là sự lựa chọn hoàn hảo cho những ai yêu thích phong cách tinh tế và tiện nghi. Với thiết kế dạng chữ L, sản phẩm này không chỉ tối ưu hóa không gian mà còn mang đến vẻ đẹp hiện đại, sang trọng cho phòng khách. Khung ghế được làm từ gỗ tự nhiên chắc chắn, đảm bảo độ bền cao. Phần đệm ghế sử dụng mút cao cấp kết hợp vải bọc mềm mại, chống thấm nước và dễ dàng vệ sinh.\r\n\r\nSản phẩm còn có khả năng tùy chỉnh linh hoạt: bạn có thể tháo rời hoặc thay đổi vị trí các phần ghế để phù hợp với diện tích phòng. Điểm nhấn đặc biệt là màu sắc trung tính như xám, xanh dương hoặc be, dễ dàng phối hợp với các đồ nội thất khác. Sofa góc hiện đại không chỉ là nơi nghỉ ngơi, thư giãn mà còn là tâm điểm thu hút ánh nhìn trong không gian sống của bạn.', 10, 50, 'active', 1, '2024-10-21 11:16:52', '2024-12-03 11:50:44', NULL),
(2, 'Armchair Mây Mode', 4200000, 'pr1.3.jpg', 'Bàn trà gỗ tự nhiên mang lại cảm giác ấm áp và gần gũi, thích hợp cho mọi phong cách nội thất. Sản phẩm được chế tác từ gỗ sồi cao cấp, nổi bật với các đường vân gỗ tự nhiên đẹp mắt. Thiết kế tối giản nhưng tinh tế với mặt bàn rộng rãi, phù hợp để đặt tách trà, sách báo hoặc các phụ kiện trang trí khác.\r\n\r\nChân bàn được gia công tỉ mỉ, đảm bảo độ cân bằng và độ bền cao. Ngoài ra, bề mặt gỗ được phủ lớp sơn bảo vệ chống trầy xước và ẩm mốc, giúp sản phẩm giữ được vẻ đẹp lâu dài. Với bàn trà gỗ tự nhiên, không gian phòng khách của bạn sẽ trở nên thân thiện và ấm cúng hơn bao giờ hết.', 15, 20, 'active', 1, '2024-10-21 11:16:52', '2024-12-03 11:51:14', NULL),
(3, 'Armchair Mây mới', 2900000, 'armchair-may-moi-mau-xanh-768x511.jpg', 'Sofa Da Cao Cấp Luxe, có mặt tại Nội thất In7, là một sản phẩm đỉnh cao trong thiết kế nội thất hiện đại. Được làm từ chất liệu da thật cao cấp, sản phẩm này mang đến không gian sống sang trọng và tinh tế. Chất liệu da không chỉ mang lại vẻ đẹp mịn màng mà còn rất bền, dễ dàng vệ sinh và duy trì vẻ đẹp trong thời gian dài.\r\n\r\nVới thiết kế hiện đại, phần tựa lưng của ghế sofa được làm cao, giúp hỗ trợ tối ưu cho lưng và cổ, giảm thiểu căng thẳng sau một ngày dài làm việc. Đệm mút bên trong sofa là loại cao cấp, giúp tạo cảm giác êm ái và thoải mái khi ngồi. Chân ghế được làm từ gỗ tự nhiên, chắc chắn, bền bỉ theo thời gian.\r\n\r\nSản phẩm này không chỉ đơn thuần là một món đồ nội thất mà còn là một điểm nhấn phong cách trong không gian phòng khách của bạn. Kết hợp với các phụ kiện trang trí như gối ôm, thảm trải sàn, Nội thất In7 mang đến cho bạn một không gian sống sang trọng và đầy phong cách.', 5, 100, 'active', 2, '2024-10-21 11:16:52', '2024-12-03 11:54:12', NULL),
(4, 'Armchair Nancy 04 vải màu cam', 5950000, 'armchair-vai-mau-vang-sf044j.ids_-768x511.jpg', 'Tại Nội thất In7, chúng tôi tự hào giới thiệu mẫu ghế sofa vải mềm Elegant, một lựa chọn lý tưởng cho không gian sống hiện đại. Với chất liệu vải mềm mại và thông thoáng, ghế sofa Elegant mang lại cảm giác thoải mái, dễ chịu, đặc biệt vào những ngày hè nóng bức.\r\n\r\nGhế có thiết kế đơn giản nhưng vô cùng tinh tế, phần đệm mút dày, không chỉ giúp tạo sự êm ái mà còn nâng đỡ cơ thể tốt khi ngồi. Tựa lưng thấp, giúp bạn có thể thư giãn một cách thoải mái. Đặc biệt, chất liệu vải bọc của ghế rất dễ vệ sinh, giữ cho sản phẩm luôn mới mẻ và sạch sẽ.\r\n\r\nVới sự kết hợp giữa màu sắc trang nhã và kiểu dáng hiện đại, ghế sofa Elegant sẽ là lựa chọn hoàn hảo cho những không gian phòng khách nhỏ gọn, tạo nên một không gian thoải mái và đầy tính thẩm mỹ.', 20, 30, 'active', 3, '2024-10-21 11:16:52', '2024-12-03 11:54:39', NULL),
(5, 'Armchair Panhome vải', 7050000, 'pr5.jpg', 'Ghế sofa lưới thư giãn Comfort là một lựa chọn tuyệt vời cho những ai yêu thích sự thoải mái và tiện nghi. Với thiết kế đặc biệt, phần tựa lưng và đệm ghế sử dụng chất liệu lưới, giúp tăng khả năng thoáng khí và mang đến cảm giác mát mẻ cho người sử dụng, đặc biệt vào mùa hè.\r\n\r\nKhung ghế được làm từ thép sơn tĩnh điện, bền bỉ, chịu lực tốt. Ghế có thể điều chỉnh độ ngả lưng theo ý muốn, cho phép bạn thư giãn tối đa khi đọc sách, xem TV hay nghỉ ngơi. Dù thiết kế đơn giản, Comfort Sofa vẫn mang lại vẻ đẹp hiện đại và thanh lịch, phù hợp với mọi không gian từ căn hộ cho đến phòng khách lớn.', 0, 200, 'active', 4, '2024-10-21 11:16:52', '2024-12-03 11:55:31', NULL),
(26, 'Armchair Oriental vact10389', 5100000, 'pr5.1.jpg', 'Sofa Bed Sleepy là lựa chọn lý tưởng cho những ngôi nhà có diện tích nhỏ nhưng vẫn cần một chiếc sofa tiện dụng, dễ dàng chuyển đổi thành giường ngủ khi cần thiết. Được thiết kế thông minh, ghế sofa này có thể gập lại thành một chiếc giường thoải mái để bạn ngủ qua đêm hoặc tiếp đón khách đến chơi.\r\n\r\nChất liệu vải mềm mại kết hợp với đệm mút cao cấp giúp mang lại cảm giác êm ái, dễ chịu cho người sử dụng. Khung ghế làm từ gỗ tự nhiên chắc chắn, hỗ trợ bền lâu. Sofa Bed Sleepy phù hợp cho các không gian nhỏ gọn như căn hộ, phòng khách hay phòng ngủ.', 10, 50, 'active', 1, '2024-10-21 11:15:33', '2024-12-03 11:56:04', NULL),
(27, 'Armchair Ogami vải vact10504', 3730000, 'pr4.jpg', 'Sofa Góc L Eo E là một sự kết hợp hoàn hảo giữa thiết kế góc và sự tiện nghi, giúp tối ưu hóa không gian trong các phòng khách có diện tích nhỏ đến vừa. Với kiểu dáng góc L, sản phẩm mang lại không gian ngồi rộng rãi và thoải mái cho gia đình hoặc khách mời.\r\n\r\nĐệm sofa sử dụng mút cao cấp, giúp người ngồi cảm thấy êm ái, hỗ trợ tốt cho cơ thể. Phần tựa lưng cao giúp nâng đỡ lưng và cổ, giảm căng thẳng sau một ngày dài làm việc. Chất liệu vải bền đẹp, chống nhăn, dễ dàng vệ sinh, làm cho sofa Góc L Eo E là lựa chọn lý tưởng cho gia đình hiện đại.\r\n\r\n', 15, 20, 'active', 1, '2024-10-21 11:15:33', '2024-12-03 11:56:28', NULL),
(28, 'Armchair Stan 75', 4760000, 'pr4.4.jpg', 'Ghế sofa mini Tidy là lựa chọn lý tưởng cho những không gian nhỏ gọn như phòng làm việc, phòng ngủ hoặc các căn hộ studio. Mặc dù nhỏ gọn, Tidy Sofa không hề thiếu tính tiện dụng và thẩm mỹ. Ghế có thiết kế đơn giản nhưng hiện đại, với phần tựa lưng thấp và đệm mút dày dặn, giúp nâng đỡ cơ thể tốt.\r\n\r\nChất liệu vải cao cấp chống bám bụi, dễ dàng vệ sinh, giúp giữ cho ghế luôn mới mẻ. Đặc biệt, ghế có nhiều màu sắc trang nhã, dễ dàng phối hợp với các đồ nội thất khác, mang lại vẻ đẹp tinh tế cho không gian sống của bạn.', 5, 100, 'active', 2, '2024-10-21 11:15:33', '2024-12-03 11:56:56', NULL),
(29, 'Armchair Saka P100 vải vact10498', 5990000, 'pr4.3.jpg', 'Ghế sofa Madison là sản phẩm cao cấp với thiết kế sang trọng, lý tưởng cho những không gian phòng khách rộng. Với chiều dài lớn, ghế có thể dễ dàng chứa được nhiều người, thích hợp cho các buổi tiệc gia đình, gặp gỡ bạn bè hay những buổi xem phim.\r\n\r\nĐệm sofa sử dụng mút nguyên khối kết hợp với lớp vải bọc cao cấp, tạo sự thoải mái và dễ chịu. Phần tựa lưng cao và mềm mại giúp hỗ trợ tối đa cho người sử dụng. Chân ghế làm từ gỗ tự nhiên, chắc chắn và bền bỉ, tạo nên sự kết hợp hoàn hảo với phần đệm êm ái.', 20, 30, 'active', 3, '2024-10-21 11:15:33', '2024-12-03 11:57:33', NULL),
(30, 'Sofa Lông Mềm', 9950000, 'armchair-mau-trang-768x511.jpg', 'Ghế sofa đơn Relax là một lựa chọn tuyệt vời cho những không gian nhỏ hoặc phòng làm việc cá nhân. Với thiết kế gọn gàng, không chiếm nhiều diện tích, sofa này mang lại sự thoải mái tối đa nhờ vào đệm mút dày dặn và phần tựa lưng êm ái.\r\n\r\nSản phẩm sử dụng chất liệu vải chống nhăn và dễ dàng vệ sinh, giúp ghế luôn mới mẻ. Chân ghế được làm từ gỗ tự nhiên, mang lại sự ổn định và độ bền cao. Ghế sofa Relax sẽ là điểm nhấn tuyệt vời cho bất kỳ không gian nào, tạo nên vẻ đẹp tinh tế và sang trọng.', 11, 100, 'active', 4, '2024-11-30 11:53:29', '2024-12-03 11:58:43', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `productsubimages`
--

CREATE TABLE `productsubimages` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `refund_log`
--

CREATE TABLE `refund_log` (
  `id` int NOT NULL,
  `order_id` int DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `status` enum('completed','pending') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reviews`
--

CREATE TABLE `reviews` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `user_id` int NOT NULL,
  `rating` tinyint DEFAULT NULL,
  `reviews_text` text COLLATE utf8mb4_general_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` tinyint DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `reviews`
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
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `fullname` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `phone_number` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `role` varchar(255) COLLATE utf8mb4_general_ci DEFAULT 'user',
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_general_ci DEFAULT 'active',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `reset_token` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `reset_expires` datetime DEFAULT NULL,
  `profile_picture` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `fullname`, `password`, `phone_number`, `address`, `role`, `email`, `status`, `created_at`, `updated_at`, `reset_token`, `reset_expires`, `profile_picture`) VALUES
(24, 'lamnhat', '$2a$10$Ph9BiLIehXjxcdc4yqp1sOLzvy4ng23akDz8iLB/qk2N6ALOdXtWi', '0913321123', 'Can Tho, Phường Bùi Hữu Nghĩa, Quận Bình Thuỷ, Thành phố Cần Thơ', 'admin', 'lamnhat509@gmail.com', 'active', '2024-11-22 18:15:43', '2024-11-25 14:56:04', NULL, NULL, '/uploads/Screenshot 2024-07-17 234118.png'),
(25, 'lamnhat', '$2a$10$v6DqL6sc/ZKv8BuViAWLUem.GRYyQB/2MLVDl5kcrXJwpRZ65LB/.', '0913634651', 'Can Tho, Phường Tân Phú, Quận Cái Răng, Thành phố Cần Thơ', 'user', 'nhat123321@gmail.com', 'active', '2024-11-22 18:41:26', '2024-11-25 04:50:05', 'bbb7fbdd5af1369fe27f73a2d31ec8240f92616c0421d655848d230de89bd336', '2024-11-25 05:50:05', '/uploads/Screenshot 2024-07-17 234118.png'),
(26, 'lamnhat', '$2b$10$g6HPx3LfgP3.iWr/6my.c.BM.8l7qK6NLL.fwPIoLY22yhfooiPCK', '0913634651', '', 'admin', 'nhat123456@gmail.com', 'active', '2024-11-23 19:27:39', '2024-11-25 09:40:11', NULL, NULL, NULL),
(27, '1', '$2b$10$Usy.7S1/9IZfu.7FPoB2..W25VHYkpwJAlnMmnm4ZeCV5PZ1pHqPC', '0991122325', '12321, Phường Thới Hòa, Thị xã Bến Cát, Tỉnh Bình Dương', 'admin', '1@1', 'active', '2024-11-27 11:43:51', '2024-11-28 12:50:27', NULL, NULL, NULL),
(28, 'linh', '$2b$10$3qZ5kjijwOF8lZ6FCPE8hOLEogBosGC2cFc5j.DgkthoAEd5KDXte', '0991122325', '12321, Phường Thới Hòa, Thị xã Bến Cát, Tỉnh Bình Dương, Xã Thái Sơn, Huyện Hiệp Hòa, Tỉnh Bắc Giang', 'admin', 'nhu11234@gmail.com', 'active', '2024-12-02 13:30:03', '2024-12-02 21:54:49', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `vouchers`
--

CREATE TABLE `vouchers` (
  `id` int NOT NULL,
  `voucher_code` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `discount_percent` decimal(5,0) DEFAULT NULL,
  `valid_from` date NOT NULL,
  `valid_to` date NOT NULL,
  `status` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `quantity` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `vouchers`
--

INSERT INTO `vouchers` (`id`, `voucher_code`, `price`, `discount_percent`, `valid_from`, `valid_to`, `status`, `created_at`, `updated_at`, `quantity`) VALUES
(12, 'DISCOUNT100', 100.00, 10, '2024-11-26', '2024-11-30', 'active', '2024-11-01 10:00:00', '2024-11-24 19:52:06', 0),
(13, 'DISCOUNT20', 200.00, 20, '2024-11-01', '2024-12-15', 'active', '2024-11-01 10:30:00', '2024-11-01 10:30:00', 0),
(14, 'DISCOUNT30', 300.00, 30, '2024-11-05', '2024-12-20', 'active', '2024-11-05 11:00:00', '2024-12-02 11:29:07', 0),
(15, 'NEWYEAR50', 500.00, 50, '2024-12-01', '2025-01-01', 'active', '2024-12-01 12:00:00', '2024-12-01 12:00:00', 0),
(16, 'FLASH25', 150.00, 25, '2024-11-10', '2024-11-25', 'active', '2024-11-10 09:00:00', '2024-11-27 14:01:48', 0);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `category_name` (`category_name`);

--
-- Chỉ mục cho bảng `key_token`
--
ALTER TABLE `key_token`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `fk_voucher_id` (`voucher_id`);

--
-- Chỉ mục cho bảng `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Chỉ mục cho bảng `postcategory`
--
ALTER TABLE `postcategory`
  ADD PRIMARY KEY (`id`);

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
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `categories_id` (`categories_id`);

--
-- Chỉ mục cho bảng `productsubimages`
--
ALTER TABLE `productsubimages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `refund_log`
--
ALTER TABLE `refund_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Chỉ mục cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone_number` (`phone_number`,`email`);

--
-- Chỉ mục cho bảng `vouchers`
--
ALTER TABLE `vouchers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `key_token`
--
ALTER TABLE `key_token`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;

--
-- AUTO_INCREMENT cho bảng `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT cho bảng `postcategory`
--
ALTER TABLE `postcategory`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT cho bảng `productsubimages`
--
ALTER TABLE `productsubimages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `refund_log`
--
ALTER TABLE `refund_log`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT cho bảng `vouchers`
--
ALTER TABLE `vouchers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `key_token`
--
ALTER TABLE `key_token`
  ADD CONSTRAINT `key_token_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_voucher_id` FOREIGN KEY (`voucher_id`) REFERENCES `vouchers` (`id`),
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

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
-- Các ràng buộc cho bảng `refund_log`
--
ALTER TABLE `refund_log`
  ADD CONSTRAINT `refund_log_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Các ràng buộc cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
