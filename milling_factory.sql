-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 05, 2024 at 05:33 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `milling_factory`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_activities`
--

CREATE TABLE `tbl_activities` (
  `id` int(11) NOT NULL,
  `details` text DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `reminder_time` datetime NOT NULL,
  `priority` enum('HIGH','MEDIUM','LOW') NOT NULL DEFAULT 'MEDIUM',
  `assignee` int(11) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `color` varchar(50) NOT NULL,
  `reminder_sent` enum('NOT_SENT','SENT') NOT NULL DEFAULT 'NOT_SENT',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_bills`
--

CREATE TABLE `tbl_bills` (
  `id` int(11) NOT NULL,
  `billy_type` varchar(255) NOT NULL,
  `amount` double NOT NULL,
  `month_paid` int(11) NOT NULL,
  `status` varchar(50) NOT NULL,
  `note` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_configs`
--

CREATE TABLE `tbl_configs` (
  `id` int(11) NOT NULL,
  `config_key` varchar(50) NOT NULL,
  `value` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_configs`
--

INSERT INTO `tbl_configs` (`id`, `config_key`, `value`, `created_at`, `updated_at`) VALUES
(1, 'system_name', 'ikayi ', '2022-04-14 06:04:13', '2023-12-06 16:51:59'),
(36, 'copyright_text', 'All right reserved.', '2022-04-14 06:04:13', '2023-10-05 08:33:41'),
(37, 'logo', '1701868633966-Ikigori 01.jpg', '2022-04-14 06:04:13', '2023-12-06 13:17:13'),
(38, 'favicon', '1701868656569-Ikigori 01.jpg', '2022-04-14 06:04:13', '2023-12-06 13:17:36'),
(39, 'allow_edit_before_hours', '1000', '2022-04-14 06:04:13', '2023-12-19 18:02:57');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_customers`
--

CREATE TABLE `tbl_customers` (
  `id` int(11) NOT NULL,
  `id_no` varchar(100) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `about` text NOT NULL,
  `location` varchar(512) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_customers`
--

INSERT INTO `tbl_customers` (`id`, `id_no`, `phone`, `first_name`, `last_name`, `about`, `location`, `created_at`, `updated_at`) VALUES
(1, '5656565', '9494949', 'Murenzi', '', '', 'Gicumbi', '2023-12-08 23:03:29', '2023-12-08 23:04:07'),
(3, '2345', '345678', 'Regis', '', '', 'Nyamata', '2023-12-08 23:16:04', '2023-12-08 23:16:04'),
(4, '234', '9999', 'Muramira', '', '', 'Kigali', '2023-12-08 23:45:45', '2023-12-08 23:45:45');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_debts`
--

CREATE TABLE `tbl_debts` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `sale_id` int(11) DEFAULT NULL,
  `purchase_id` int(11) DEFAULT NULL,
  `debited_amount` double NOT NULL,
  `note` text NOT NULL,
  `paid` varchar(10) NOT NULL DEFAULT 'NO',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_debts`
--

INSERT INTO `tbl_debts` (`id`, `customer_id`, `sale_id`, `purchase_id`, `debited_amount`, `note`, `paid`, `created_at`, `updated_at`) VALUES
(7, 2, 9, NULL, 180000, 'SADSDA', 'NO', '2023-11-09 10:44:27', '2023-11-22 20:48:52'),
(10, 8, 24, NULL, 225900, 'Paid in Equity Bank', 'NO', '2023-11-29 08:03:41', '2023-11-29 08:03:41'),
(11, 3, 28, NULL, 3000, '', 'YES', '2023-12-08 23:17:12', '2023-12-08 23:31:11');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_departments`
--

CREATE TABLE `tbl_departments` (
  `id` int(11) NOT NULL,
  `title` varchar(512) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_departments`
--

INSERT INTO `tbl_departments` (`id`, `title`, `created_at`, `updated_at`) VALUES
(4, 'Sales & Marketing', '2023-09-17 04:51:51', '2023-09-25 08:41:52'),
(9, 'Milling ', '2023-10-16 16:20:14', '2023-12-07 07:42:29'),
(10, 'Administration', '2023-12-07 07:38:18', '2023-12-07 07:38:18'),
(12, 'House Keeping', '2023-12-07 07:41:26', '2023-12-07 07:41:26'),
(13, 'Technical', '2023-12-07 07:42:42', '2023-12-07 07:42:42');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_expenses`
--

CREATE TABLE `tbl_expenses` (
  `id` int(11) NOT NULL,
  `description` text NOT NULL,
  `amount` double NOT NULL,
  `sender` int(11) NOT NULL,
  `note` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_expenses`
--

INSERT INTO `tbl_expenses` (`id`, `description`, `amount`, `sender`, `note`, `created_at`, `updated_at`) VALUES
(1, 'Desc title', 1200, 4, 'Noted & rec', '2023-10-18 13:40:50', '2023-10-18 13:40:50'),
(2, 'Desc title two', 200, 5, 'd', '2023-10-18 13:41:18', '2023-10-18 13:41:18'),
(3, 'mechanique', 12000, 1, 'Josue', '2023-11-22 20:53:48', '2023-11-22 20:53:48'),
(4, 'Amavuto yo guteka', 1000, 1, 'Ku ruganda', '2023-11-28 16:49:34', '2023-11-28 16:49:34'),
(5, 'Amazi 2', 1000, 8, 'Monthly payment', '2023-12-07 12:48:43', '2023-12-07 13:01:31'),
(6, 'Essence', 20000, 8, '', '2023-12-08 23:40:29', '2023-12-08 23:40:29'),
(7, 'Amazi', 3000, 8, '', '2023-12-09 13:39:02', '2023-12-09 13:39:02');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_forgot_password`
--

CREATE TABLE `tbl_forgot_password` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `verification_code` varchar(255) NOT NULL,
  `expire_at` datetime NOT NULL,
  `active` varchar(1) NOT NULL DEFAULT 'Y',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_inventory`
--

CREATE TABLE `tbl_inventory` (
  `id` int(11) NOT NULL,
  `item_name` varchar(512) NOT NULL,
  `description` text NOT NULL,
  `type` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `note` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_inventory`
--

INSERT INTO `tbl_inventory` (`id`, `item_name`, `description`, `type`, `user_id`, `note`, `created_at`, `updated_at`) VALUES
(8, 'Brush Amaro type', 'Cleaning', 'PERMANENT', 10, '', '2023-12-07 13:03:21', '2023-12-07 13:03:35'),
(10, 'Tea', '', 'Consumable', 8, '', '2023-12-08 22:59:34', '2023-12-08 22:59:34'),
(11, 'Coffee', '', 'Consumable', 8, '', '2023-12-08 23:00:07', '2023-12-08 23:00:07');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_milling`
--

CREATE TABLE `tbl_milling` (
  `id` int(11) NOT NULL,
  `milled_at` date NOT NULL,
  `technician_id` int(11) NOT NULL COMMENT 'workforce id',
  `input_kg` double NOT NULL,
  `output_5kg_flour` double NOT NULL,
  `output_10kg_flour` double NOT NULL,
  `output_25kg_flour` double NOT NULL,
  `output_kg_branda` double NOT NULL,
  `output_kg_ibitiritiri` double NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_milling`
--

INSERT INTO `tbl_milling` (`id`, `milled_at`, `technician_id`, `input_kg`, `output_5kg_flour`, `output_10kg_flour`, `output_25kg_flour`, `output_kg_branda`, `output_kg_ibitiritiri`, `created_at`, `updated_at`) VALUES
(1, '2023-12-06', 5, 16000, 100, 10, 5, 5600, 10.5, '2023-12-08 21:17:23', '2023-12-19 19:17:46'),
(2, '2023-11-28', 8, 50, 2, 2, 2, 10, 5, '2023-12-19 19:02:29', '2023-12-19 19:02:29'),
(3, '2023-12-19', 8, 100, 10, 5, 5, 17, 10, '2023-12-19 19:18:13', '2023-12-19 19:18:13'),
(4, '2023-12-22', 5, 120, 7, 19, 20, 20, 22, '2023-12-19 19:18:52', '2023-12-19 19:18:52');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_payments`
--

CREATE TABLE `tbl_payments` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `sale_id` int(11) NOT NULL,
  `amount_paid` double NOT NULL,
  `method_of_payment` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `note` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_payments`
--

INSERT INTO `tbl_payments` (`id`, `customer_id`, `sale_id`, `amount_paid`, `method_of_payment`, `user_id`, `note`, `created_at`, `updated_at`) VALUES
(1, 2, 9, 180000, 8, 5, 'Cancelled', '2023-10-19 09:09:02', '2023-11-22 20:48:52'),
(2, 2, 9, 180000, 8, 5, 'Cancelled', '2023-10-19 09:09:03', '2023-11-22 20:48:52'),
(3, 2, 5, 3864, 5, 3, '', '2023-11-09 08:14:26', '2023-11-09 08:14:26'),
(4, 2, 5, 3864, 4, 3, '', '2023-11-09 08:18:44', '2023-11-09 08:18:44'),
(7, 2, 10, 9600, 5, 5, '', '2023-11-09 11:50:28', '2023-11-09 11:50:28'),
(13, 7, 14, 700, 4, 2, '', '2023-11-22 17:14:37', '2023-11-22 17:14:37'),
(14, 4, 13, 20000, 4, 2, '', '2023-11-22 17:14:52', '2023-11-22 17:14:52'),
(15, 2, 9, 180000, 4, 5, 'Cancelled', '2023-11-22 17:17:25', '2023-11-22 20:48:52'),
(17, 2, 15, 7350, 5, 5, '', '2023-11-22 18:23:42', '2023-11-22 18:23:42'),
(18, 8, 16, 12000, 2, 5, 'Monday sale', '2023-11-27 07:03:19', '2023-11-27 07:03:19'),
(19, 9, 17, 12000, 4, 5, 'Me', '2023-11-27 07:07:03', '2023-11-27 07:07:03'),
(20, 9, 18, 0, 4, 5, '', '2023-11-27 07:08:41', '2023-11-27 07:08:41'),
(21, 9, 19, 13230, 2, 5, '', '2023-11-27 18:07:04', '2023-11-27 18:07:04'),
(22, 9, 20, 8125, 2, 5, '', '2023-11-27 18:07:59', '2023-11-27 18:07:59'),
(23, 10, 21, 3750, 2, 5, '', '2023-11-27 18:10:04', '2023-11-27 18:10:04'),
(24, 8, 22, 103500, 5, 5, '', '2023-11-28 16:39:46', '2023-11-28 16:39:46'),
(25, 7, 23, 8000, 2, 5, '', '2023-11-28 16:43:47', '2023-11-28 16:43:47'),
(26, 8, 24, 225000, 5, 5, '', '2023-11-28 16:47:14', '2023-11-28 16:47:14'),
(27, 8, 25, 54000, 4, 5, '', '2023-11-29 07:59:01', '2023-11-29 07:59:01'),
(28, 2, 26, 80100, 5, 5, '', '2023-12-08 23:12:04', '2023-12-08 23:12:04'),
(30, 1, 27, 3500, 5, 5, '', '2023-12-08 23:13:31', '2023-12-08 23:13:31'),
(31, 1, 29, 500, 4, 8, '', '2023-12-08 23:19:13', '2023-12-08 23:19:13'),
(32, 1, 30, 3500, 5, 8, '', '2023-12-08 23:20:04', '2023-12-08 23:20:04'),
(34, 1, 31, 3000, 7, 8, '', '2023-12-08 23:30:22', '2023-12-08 23:30:22'),
(35, 3, 28, 3000, 6, 8, '', '2023-12-08 23:31:11', '2023-12-08 23:31:11'),
(37, 1, 32, 9000, 6, 8, '', '2023-12-09 13:22:33', '2023-12-09 13:22:33'),
(38, 1, 33, 58500, 7, 8, '', '2023-12-09 13:24:03', '2023-12-09 13:24:03'),
(39, 4, 34, 1000, 6, 8, '', '2023-12-09 13:26:52', '2023-12-09 13:26:52');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_payments_methods`
--

CREATE TABLE `tbl_payments_methods` (
  `id` int(11) NOT NULL,
  `name` varchar(512) NOT NULL,
  `status` enum('ACTIVE','INACTIVE') NOT NULL DEFAULT 'ACTIVE',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_payments_methods`
--

INSERT INTO `tbl_payments_methods` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(6, 'Cash', 'ACTIVE', '2023-12-08 23:21:09', '2023-12-08 23:21:09'),
(7, 'MTN Mobile Money', 'ACTIVE', '2023-12-08 23:24:10', '2023-12-08 23:24:25'),
(8, 'Bank Transfer', 'ACTIVE', '2023-12-08 23:24:45', '2023-12-08 23:24:45'),
(9, 'Bank Check', 'ACTIVE', '2023-12-08 23:26:12', '2023-12-08 23:28:16');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_permisions`
--

CREATE TABLE `tbl_permisions` (
  `id` int(11) NOT NULL,
  `workforce_id` int(11) NOT NULL,
  `menu` int(11) NOT NULL,
  `allowed` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_purchases`
--

CREATE TABLE `tbl_purchases` (
  `id` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  `item_name` varchar(512) NOT NULL,
  `description` text NOT NULL,
  `note` text NOT NULL,
  `unit_price` double NOT NULL,
  `quantity` double NOT NULL,
  `total_price` double NOT NULL,
  `transport_cost` double NOT NULL,
  `other_cost` double NOT NULL DEFAULT 0,
  `place_of_purchase` varchar(512) DEFAULT NULL,
  `seller` varchar(512) NOT NULL,
  `payment_method_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_purchases`
--

INSERT INTO `tbl_purchases` (`id`, `type`, `item_name`, `description`, `note`, `unit_price`, `quantity`, `total_price`, `transport_cost`, `other_cost`, `place_of_purchase`, `seller`, `payment_method_id`, `created_at`, `updated_at`) VALUES
(1, 'maize', 'Ibigori', '', '', 380, 16000, 6080000, 0, 0, 'Bugesera', '1', 5, '2023-12-08 21:05:10', '2023-12-08 21:05:10'),
(2, 'inventory', 'Toilet paper', '', '', 200, 10, 2000, 0, 0, 'Nyamata', '2', 5, '2023-12-08 21:07:44', '2023-12-08 21:07:44'),
(3, 'Food', 'Imboga', '', '', 200, 6, 1300, 100, 0, 'Kanzenze', '2', 6, '2023-12-08 21:09:41', '2023-12-09 11:57:43'),
(4, 'maize', 'Ibigori', '', '', 1, 32000, 32000, 0, 0, 'Bugesera', '1', 5, '2023-12-08 21:12:10', '2023-12-08 21:12:10'),
(5, 'inventory', 'tea', '', '', 1700, 1, 1700, 0, 0, 'Bugesera', '2', 5, '2023-12-08 23:01:23', '2023-12-08 23:01:23'),
(6, 'maize', 'Maize', '', '', 310, 1000, 310000, 0, 0, 'Uganda', '3', 6, '2023-12-08 23:49:11', '2023-12-09 11:45:08'),
(7, 'maize', 'Ibigori', '', '', 330, 10000, 3300000, 0, 0, 'Uganda', '3', 6, '2023-12-09 11:44:38', '2023-12-09 11:57:25'),
(8, 'Food', 'Imiteja', '', '', 300, 5, 1500, 0, 0, 'Bugesera market', '2', 6, '2023-12-09 11:47:46', '2023-12-09 11:47:46');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_purchase_item_types`
--

CREATE TABLE `tbl_purchase_item_types` (
  `id` int(11) NOT NULL,
  `type` varchar(512) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_purchase_item_types`
--

INSERT INTO `tbl_purchase_item_types` (`id`, `type`, `created_at`, `updated_at`) VALUES
(5, 'Electronic', '2023-11-22 10:20:05', '2023-11-22 10:20:05'),
(10, 'Couvre-lit', '2023-11-22 20:07:57', '2023-11-22 20:07:57'),
(11, 'Food', '2023-12-08 21:08:53', '2023-12-08 21:08:53');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_sales`
--

CREATE TABLE `tbl_sales` (
  `id` int(11) NOT NULL,
  `product_type` enum('FLOUR','BRANDA') NOT NULL,
  `unit_price` double NOT NULL,
  `total_quantity` double NOT NULL,
  `seller_id` int(11) NOT NULL COMMENT 'workforce id',
  `customer_id` int(11) NOT NULL,
  `payment_method_id` varchar(100) DEFAULT NULL,
  `paid_or_debt` enum('PAID','DEBT') NOT NULL DEFAULT 'PAID',
  `amount_paid` double NOT NULL,
  `amount_debited` double NOT NULL DEFAULT 0,
  `discount` double NOT NULL DEFAULT 0,
  `note` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `kg_5` int(11) NOT NULL DEFAULT 0 COMMENT 'packaging id',
  `kg_10` int(11) NOT NULL DEFAULT 0,
  `kg_20` int(11) NOT NULL DEFAULT 0,
  `kg_25` int(11) NOT NULL DEFAULT 0,
  `kg_custom` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_sales`
--

INSERT INTO `tbl_sales` (`id`, `product_type`, `unit_price`, `total_quantity`, `seller_id`, `customer_id`, `payment_method_id`, `paid_or_debt`, `amount_paid`, `amount_debited`, `discount`, `note`, `created_at`, `updated_at`, `kg_5`, `kg_10`, `kg_20`, `kg_25`, `kg_custom`) VALUES
(6, 'FLOUR', 180, 50, 3, 2, '5', 'PAID', 9000, 0, 0, '', '2023-10-16 16:31:04', '2023-11-09 10:44:17', 10, 0, 0, 0, 20),
(7, 'FLOUR', 900, 200, 3, 2, 'debt', 'DEBT', 0, 180000, 0, 'ok', '2023-10-16 16:39:47', '2023-11-09 10:44:17', 0, 0, 10, 0, 0),
(8, 'FLOUR', 900, 200, 5, 3, 'debt', 'DEBT', 0, 180000, 0, '78ds', '2023-10-16 16:42:41', '2023-11-09 10:44:17', 0, 0, 10, 0, 0),
(9, 'FLOUR', 19500, 10, 5, 2, 'debt', 'DEBT', 0, 180000, 0, 'SADSDA', '2023-10-19 07:21:01', '2023-11-09 10:44:27', 0, 0, 0, 0, 0),
(10, 'BRANDA', 100, 120, 5, 2, '5', 'PAID', 9600, 0, 20, '', '2023-11-09 10:59:25', '2023-11-09 11:50:28', 0, 0, 0, 0, 0),
(13, 'FLOUR', 200, 130, 2, 4, '4', 'PAID', 20000, 0, 6000, '', '2023-11-22 11:45:58', '2023-11-22 17:14:52', 2, 0, 6, 0, 0),
(14, 'BRANDA', 89, 8, 2, 7, '4', 'PAID', 700, 0, 12, '', '2023-11-22 17:11:34', '2023-11-22 17:14:37', 0, 0, 0, 0, 0),
(15, 'FLOUR', 250, 35, 5, 2, '5', 'PAID', 7350, 0, 1400, '', '2023-11-22 18:23:33', '2023-11-22 18:23:42', 1, 3, 0, 0, 0),
(16, 'BRANDA', 120, 100, 5, 8, '2', 'PAID', 12000, 0, 0, 'Monday sale', '2023-11-27 07:03:19', '2023-11-27 07:03:19', 0, 0, 0, 0, 0),
(17, 'BRANDA', 120, 100, 5, 9, '4', 'PAID', 12000, 0, 0, 'Me', '2023-11-27 07:07:03', '2023-11-27 07:07:03', 0, 0, 0, 0, 0),
(18, 'FLOUR', 900, 100, 5, 9, '4', 'PAID', 0, 0, 0, '', '2023-11-27 07:08:41', '2023-11-27 07:08:41', 0, 10, 0, 0, 0),
(19, 'BRANDA', 1323, 10, 5, 9, '2', 'PAID', 13230, 0, 0, '', '2023-11-27 18:07:04', '2023-11-27 18:07:04', 0, 0, 0, 0, 0),
(20, 'FLOUR', 125, 65, 5, 9, '2', 'PAID', 8125, 0, 0, '', '2023-11-27 18:07:59', '2023-11-27 18:07:59', 2, 3, 0, 1, 0),
(21, 'FLOUR', 125, 30, 5, 10, '2', 'PAID', 3750, 0, 0, '', '2023-11-27 18:10:04', '2023-11-27 18:10:04', 2, 0, 1, 0, 0),
(22, 'FLOUR', 900, 115, 5, 8, '5', 'PAID', 103500, 0, 0, '', '2023-11-28 16:39:46', '2023-11-28 16:39:46', 10, 2, 1, 1, 0),
(23, 'FLOUR', 900, 10, 5, 7, '2', 'PAID', 8000, 0, 1000, '', '2023-11-28 16:43:47', '2023-11-28 16:43:47', 2, 0, 0, 0, 0),
(24, 'FLOUR', 900, 251, 5, 8, 'debt', 'DEBT', 0, 225900, 0, 'Paid in Equity Bank', '2023-11-28 16:46:42', '2023-11-29 08:03:41', 0, 20, 0, 2, 0),
(25, 'FLOUR', 900, 60, 5, 8, '4', 'PAID', 54000, 0, 0, '', '2023-11-29 07:59:01', '2023-11-29 07:59:01', 2, 0, 0, 2, 0),
(26, 'BRANDA', 900, 89, 5, 2, '5', 'PAID', 80100, 0, 0, '', '2023-12-08 23:12:04', '2023-12-08 23:12:04', 0, 0, 0, 0, 0),
(27, 'FLOUR', 100, 35, 5, 1, '5', 'PAID', 3500, 0, 0, '', '2023-12-08 23:13:02', '2023-12-08 23:13:31', 1, 1, 1, 0, 0),
(28, 'FLOUR', 100, 30, 8, 3, 'debt', 'DEBT', 0, 3000, 0, '', '2023-12-08 23:17:12', '2023-12-08 23:17:12', 2, 2, 0, 0, 0),
(29, 'FLOUR', 100, 5, 8, 1, '4', 'PAID', 500, 0, 0, '', '2023-12-08 23:19:13', '2023-12-08 23:19:13', 1, 0, 0, 0, 0),
(30, 'FLOUR', 100, 35, 8, 1, '5', 'PAID', 3500, 0, 0, '', '2023-12-08 23:20:04', '2023-12-08 23:20:04', 1, 1, 1, 0, 0),
(31, 'BRANDA', 300, 10, 8, 1, '7', 'PAID', 3000, 0, 0, '', '2023-12-08 23:29:22', '2023-12-08 23:30:22', 0, 0, 0, 0, 0),
(32, 'FLOUR', 900, 10, 8, 1, '6', 'PAID', 9000, 0, 0, '', '2023-12-09 13:22:17', '2023-12-09 13:22:17', 2, 0, 0, 0, 0),
(33, 'FLOUR', 900, 65, 8, 1, '7', 'PAID', 58500, 0, 0, '', '2023-12-09 13:24:03', '2023-12-09 13:24:03', 2, 1, 1, 1, 0),
(34, 'BRANDA', 50, 20, 8, 4, '6', 'PAID', 1000, 0, 0, '', '2023-12-09 13:26:52', '2023-12-09 13:26:52', 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_sellers`
--

CREATE TABLE `tbl_sellers` (
  `id` int(11) NOT NULL,
  `id_no` varchar(100) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `about` text NOT NULL,
  `location` varchar(512) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_sellers`
--

INSERT INTO `tbl_sellers` (`id`, `id_no`, `phone`, `first_name`, `last_name`, `about`, `location`, `created_at`, `updated_at`) VALUES
(1, '1111', '0789990000', 'Karege', '', '', 'Kigali', '2023-12-08 21:04:45', '2023-12-08 21:04:45'),
(2, '12345', '-', 'Random Shop', '', '', 'Nyamata', '2023-12-08 21:07:24', '2023-12-08 21:07:24'),
(3, '672', '324340', 'Jeannette', '', '', 'Kigali', '2023-12-08 23:48:06', '2023-12-08 23:48:06');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_stock_branda`
--

CREATE TABLE `tbl_stock_branda` (
  `id` int(11) NOT NULL,
  `quantity` double NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_stock_branda`
--

INSERT INTO `tbl_stock_branda` (`id`, `quantity`, `updated_at`) VALUES
(1, 900, '2023-12-20 02:30:01');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_stock_flour`
--

CREATE TABLE `tbl_stock_flour` (
  `id` int(11) NOT NULL,
  `quantity_5kg` double NOT NULL,
  `quantity_10kg` double NOT NULL,
  `quantity_25kg` double NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_stock_flour`
--

INSERT INTO `tbl_stock_flour` (`id`, `quantity_5kg`, `quantity_10kg`, `quantity_25kg`, `updated_at`) VALUES
(1, -21297, 56, 42, '2023-12-20 02:30:01');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_stock_ibitiritiri`
--

CREATE TABLE `tbl_stock_ibitiritiri` (
  `id` int(11) NOT NULL,
  `quantity` double NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_stock_ibitiritiri`
--

INSERT INTO `tbl_stock_ibitiritiri` (`id`, `quantity`, `updated_at`) VALUES
(1, 47, '2023-12-20 02:30:01');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_stock_maize`
--

CREATE TABLE `tbl_stock_maize` (
  `id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_stock_maize`
--

INSERT INTO `tbl_stock_maize` (`id`, `quantity`, `updated_at`) VALUES
(1, 4730, '2023-12-20 02:07:24');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `active` varchar(1) NOT NULL DEFAULT 'Y',
  `role` varchar(100) NOT NULL DEFAULT 'admin',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `workforce_id` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`id`, `first_name`, `last_name`, `username`, `email`, `password`, `active`, `role`, `created_at`, `updated_at`, `workforce_id`) VALUES
(1, 'Anaclet', 'Ahishakiye', 'anaclet', 'anaclet@example.com', '$2b$08$eYVJvIYeID3YKOqh6tQQu.Xqqg.SN7X46Q4u1ldSmbq5eQQ4ZX4Na', 'Y', 'admin', '2023-09-17 01:35:18', '2023-12-08 06:52:22', 5),
(12, 'Lorem', 'Doe', '93mt1eei', 'lorem@example.com', '$2b$08$jh/R4uzfx2HKwbfTaZPlUOa4L9rofD0r/9C8liHKOTkBAHZCr/H0y', 'Y', 'manager', '2023-12-08 07:20:19', '2023-12-08 09:21:41', 10);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_vehicles`
--

CREATE TABLE `tbl_vehicles` (
  `id` int(11) NOT NULL,
  `plate_number` varchar(50) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `driver_id` int(11) NOT NULL DEFAULT 0,
  `type` varchar(255) NOT NULL,
  `capacity` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_vehicles`
--

INSERT INTO `tbl_vehicles` (`id`, `plate_number`, `owner`, `phone`, `driver_id`, `type`, `capacity`, `created_at`, `updated_at`) VALUES
(1, 'RAA 252 AJ abdallah', 'Kalisa Doe', '', 0, 'SUV', '5000', '2023-09-23 10:37:24', '2023-12-09 13:31:07'),
(3, 'RAA 253 A', 'John DOe', '', 0, 'Van', '8 Persons', '2023-09-23 11:09:59', '2023-09-23 11:09:59');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_vehicles_report`
--

CREATE TABLE `tbl_vehicles_report` (
  `id` int(11) NOT NULL,
  `date_time` varchar(50) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `status` varchar(100) NOT NULL,
  `expense_amount` double NOT NULL,
  `expense_receiver` varchar(255) NOT NULL,
  `note` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_vehicles_report`
--

INSERT INTO `tbl_vehicles_report` (`id`, `date_time`, `vehicle_id`, `status`, `expense_amount`, `expense_receiver`, `note`, `created_at`, `updated_at`) VALUES
(2, '2023-12-09T15:35', 1, 'Bugesera - Ruhuha', 17000, '8', 'Driver transport\r\n', '2023-11-09 14:30:39', '2023-12-09 13:35:53'),
(3, '2023-12-09T15:35', 1, 'Bugesera - Ruhuha', 17000, '8', 'Driver transport\r\n', '2023-11-22 20:52:06', '2023-12-09 13:35:53'),
(4, '2023-12-09T15:35', 1, 'Bugesera - Ruhuha', 17000, '5', 'Driver transport\r\n', '2023-11-28 16:51:20', '2023-12-19 18:04:54'),
(5, '2023-12-09T15:35', 1, 'Bugesera - Ruhuha', 17000, '8', 'Driver transport\r\n', '2023-12-07 12:53:58', '2023-12-09 13:35:53'),
(6, '2023-12-09T15:35', 1, 'Bugesera - Ruhuha', 17000, '8', 'Driver transport\r\n', '2023-12-07 12:55:32', '2023-12-09 13:35:53'),
(7, '2023-12-09T15:35', 1, 'Bugesera - Ruhuha', 17000, '8', 'Driver transport\r\n', '2023-12-07 12:56:32', '2023-12-09 13:35:53'),
(8, '2023-12-09T15:35', 1, 'Bugesera - Ruhuha', 17000, '8', 'Driver transport\r\n', '2023-12-08 09:20:13', '2023-12-09 13:35:53'),
(9, '2023-12-09T15:35', 1, 'Bugesera - Ruhuha', 17000, '8', 'Driver transport\r\n', '2023-12-08 23:32:30', '2023-12-09 13:35:53'),
(10, '2023-12-09T15:35', 3, 'Gasabo - Kinyinya', 20000, '8', 'Driver transport\r\n', '2023-12-09 13:35:19', '2023-12-19 18:04:48');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_warehouse`
--

CREATE TABLE `tbl_warehouse` (
  `id` int(11) NOT NULL,
  `date_` date NOT NULL,
  `quantity` double NOT NULL,
  `action` enum('IN','OUT') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_workforce`
--

CREATE TABLE `tbl_workforce` (
  `id` int(11) NOT NULL,
  `type` enum('PERMANENT','DAILY') NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `gender` varchar(1) NOT NULL,
  `date_of_birth` varchar(50) NOT NULL,
  `nid` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `department_id` int(11) DEFAULT NULL,
  `position` varchar(512) NOT NULL,
  `note` text NOT NULL,
  `hired_date` date NOT NULL,
  `end_date` varchar(50) DEFAULT '',
  `contract` text NOT NULL,
  `picture` text NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `active` varchar(1) NOT NULL DEFAULT 'Y',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_workforce`
--

INSERT INTO `tbl_workforce` (`id`, `type`, `first_name`, `last_name`, `gender`, `date_of_birth`, `nid`, `phone`, `department_id`, `position`, `note`, `hired_date`, `end_date`, `contract`, `picture`, `username`, `password`, `active`, `created_at`, `updated_at`, `deleted_at`) VALUES
(5, 'PERMANENT', 'Anaclet', 'Ahishakiye', 'F', '2023-10-16', '1197380041944034', '0784354460', NULL, 'Chairman', '', '2023-10-23', 'N/A', '', '1699366290551-bee_fit.png', 'uiuioiu', '$2b$08$My88u3617dckk44d5RlNDe4PQlBqRL1u2gYUHEZBmxzNUbBfAFoYO', 'Y', '2023-10-16 17:33:55', '2023-12-07 07:36:46', NULL),
(8, 'PERMANENT', 'Philippe Neri', 'NAHIMANA MUHIRE', 'M', '1992-05-21', '1199280084696284', '0782894152', 10, 'Supervisor', '', '2023-12-07', 'N/A', '', '', 'philippetega', '$2b$08$cKwJY4oIr6bp9TaaesSMCugXoqCXmF3GDnyjs4NnGGpViYm7EFnSS', 'Y', '2023-12-07 08:04:19', '2023-12-19 19:44:05', '2023-12-19 21:44:05'),
(14, 'DAILY', 'Ahishakiye', 'Anaclet', 'M', '', '119798003555094', '+(250) 784 354 4460', 10, 'Accountant', '', '2023-12-04', '2023-12-21', '', '', 'kazungu920', '$2b$08$8yKU27MA2RPMjUqkQvs2AOyMnfap6whNHLCAyiia.byvXNCWECIA6', 'Y', '2023-12-19 19:47:41', '2023-12-19 19:47:46', '2023-12-19 21:47:46');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_activities`
--
ALTER TABLE `tbl_activities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_bills`
--
ALTER TABLE `tbl_bills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_configs`
--
ALTER TABLE `tbl_configs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_customers`
--
ALTER TABLE `tbl_customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_debts`
--
ALTER TABLE `tbl_debts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_departments`
--
ALTER TABLE `tbl_departments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_expenses`
--
ALTER TABLE `tbl_expenses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_forgot_password`
--
ALTER TABLE `tbl_forgot_password`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_inventory`
--
ALTER TABLE `tbl_inventory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_milling`
--
ALTER TABLE `tbl_milling`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_payments`
--
ALTER TABLE `tbl_payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_payments_methods`
--
ALTER TABLE `tbl_payments_methods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_permisions`
--
ALTER TABLE `tbl_permisions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_purchases`
--
ALTER TABLE `tbl_purchases`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_purchase_item_types`
--
ALTER TABLE `tbl_purchase_item_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_sales`
--
ALTER TABLE `tbl_sales`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_sellers`
--
ALTER TABLE `tbl_sellers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_stock_branda`
--
ALTER TABLE `tbl_stock_branda`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_stock_flour`
--
ALTER TABLE `tbl_stock_flour`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_stock_ibitiritiri`
--
ALTER TABLE `tbl_stock_ibitiritiri`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_stock_maize`
--
ALTER TABLE `tbl_stock_maize`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `tbl_vehicles`
--
ALTER TABLE `tbl_vehicles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_vehicles_report`
--
ALTER TABLE `tbl_vehicles_report`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_warehouse`
--
ALTER TABLE `tbl_warehouse`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_workforce`
--
ALTER TABLE `tbl_workforce`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_activities`
--
ALTER TABLE `tbl_activities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_bills`
--
ALTER TABLE `tbl_bills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_configs`
--
ALTER TABLE `tbl_configs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `tbl_customers`
--
ALTER TABLE `tbl_customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_debts`
--
ALTER TABLE `tbl_debts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tbl_departments`
--
ALTER TABLE `tbl_departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tbl_expenses`
--
ALTER TABLE `tbl_expenses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tbl_forgot_password`
--
ALTER TABLE `tbl_forgot_password`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_inventory`
--
ALTER TABLE `tbl_inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tbl_milling`
--
ALTER TABLE `tbl_milling`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_payments`
--
ALTER TABLE `tbl_payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `tbl_payments_methods`
--
ALTER TABLE `tbl_payments_methods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tbl_permisions`
--
ALTER TABLE `tbl_permisions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_purchases`
--
ALTER TABLE `tbl_purchases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tbl_purchase_item_types`
--
ALTER TABLE `tbl_purchase_item_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tbl_sales`
--
ALTER TABLE `tbl_sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `tbl_sellers`
--
ALTER TABLE `tbl_sellers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_stock_branda`
--
ALTER TABLE `tbl_stock_branda`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_stock_flour`
--
ALTER TABLE `tbl_stock_flour`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_stock_ibitiritiri`
--
ALTER TABLE `tbl_stock_ibitiritiri`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_stock_maize`
--
ALTER TABLE `tbl_stock_maize`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `tbl_vehicles`
--
ALTER TABLE `tbl_vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_vehicles_report`
--
ALTER TABLE `tbl_vehicles_report`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tbl_warehouse`
--
ALTER TABLE `tbl_warehouse`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_workforce`
--
ALTER TABLE `tbl_workforce`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
