-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 09, 2023 at 07:12 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_activities`
--

INSERT INTO `tbl_activities` (`id`, `details`, `title`, `reminder_time`, `priority`, `assignee`, `created_by`, `color`, `reminder_sent`, `created_at`, `updated_at`) VALUES
(7, NULL, 'titlel', '2023-11-07 09:05:00', 'HIGH', 4, 1, '#000000', 'NOT_SENT', '2023-11-07 07:05:31', '2023-11-07 07:05:31');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_configs`
--

INSERT INTO `tbl_configs` (`id`, `config_key`, `value`, `created_at`, `updated_at`) VALUES
(1, 'system_name', 'NAFACO', '2022-04-14 06:04:13', '2023-11-07 06:46:25'),
(36, 'copyright_text', 'All right reserved.', '2022-04-14 06:04:13', '2023-10-05 08:33:41'),
(37, 'logo', '1695809724208-bee_fit.png', '2022-04-14 06:04:13', '2023-09-27 10:15:24'),
(38, 'favicon', '1695819928810-bee_fit.png', '2022-04-14 06:04:13', '2023-09-27 13:05:28'),
(39, 'allow_edit_before_hours', '25', '2022-04-14 06:04:13', '2023-11-09 11:14:13');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_customers`
--

INSERT INTO `tbl_customers` (`id`, `id_no`, `phone`, `first_name`, `last_name`, `about`, `location`, `created_at`, `updated_at`) VALUES
(2, '678689jh', '07844444', 'John', 'Doe', '', 'Kigali', '2023-10-02 14:01:12', '2023-11-09 10:17:00'),
(3, '-', '0788665', 'Classic', 'Hotel', '', 'Kicukiro', '2023-10-16 16:40:58', '2023-11-09 10:16:45'),
(4, '56456464', '0784354460', 'Test Sae', '', '', 'Kigali , Rwanda', '2023-11-09 10:37:47', '2023-11-09 10:37:47');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_debts`
--

INSERT INTO `tbl_debts` (`id`, `customer_id`, `sale_id`, `purchase_id`, `debited_amount`, `note`, `paid`, `created_at`, `updated_at`) VALUES
(7, 2, 9, NULL, 180000, 'SADSDA', 'NO', '2023-11-09 10:44:27', '2023-11-09 10:44:27');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_departments`
--

CREATE TABLE `tbl_departments` (
  `id` int(11) NOT NULL,
  `title` varchar(512) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_departments`
--

INSERT INTO `tbl_departments` (`id`, `title`, `created_at`, `updated_at`) VALUES
(2, 'Finance', '0000-00-00 00:00:00', '2023-09-25 08:48:19'),
(4, 'Sales & Marketing', '2023-09-17 04:51:51', '2023-09-25 08:41:52'),
(5, 'Information Technology', '2023-09-25 08:56:40', '2023-09-25 08:57:08'),
(7, 'Audit', '2023-09-25 11:52:34', '2023-09-25 11:52:34'),
(9, 'Milling', '2023-10-16 16:20:14', '2023-10-16 16:20:14');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_expenses`
--

INSERT INTO `tbl_expenses` (`id`, `description`, `amount`, `sender`, `note`, `created_at`, `updated_at`) VALUES
(1, 'Desc title', 1200, 4, 'Noted & rec', '2023-10-18 13:40:50', '2023-10-18 13:40:50'),
(2, 'Desc title two', 200, 5, 'd', '2023-10-18 13:41:18', '2023-10-18 13:41:18');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_inventory`
--

INSERT INTO `tbl_inventory` (`id`, `item_name`, `description`, `type`, `user_id`, `note`, `created_at`, `updated_at`) VALUES
(1, 'Laptop', 'Laptop-gh', 'DAILY', 1, 'Not about w', '2023-10-02 19:33:22', '2023-11-07 14:33:37'),
(3, 'Office Chairs', 'New dscription', 'Chair', 1, 'Noted', '2023-10-02 19:36:06', '2023-10-16 06:51:46'),
(5, 'Laptopu', 'Asset', 'DAILY', 4, 'noted', '2023-10-16 16:24:15', '2023-11-07 14:35:30');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_milling`
--

CREATE TABLE `tbl_milling` (
  `id` int(11) NOT NULL,
  `milled_at` date NOT NULL,
  `technician_id` int(11) NOT NULL COMMENT 'workforce id',
  `input_kg` double NOT NULL,
  `output_kg_flour` double NOT NULL,
  `output_kg_branda` double NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_milling`
--

INSERT INTO `tbl_milling` (`id`, `milled_at`, `technician_id`, `input_kg`, `output_kg_flour`, `output_kg_branda`, `created_at`, `updated_at`) VALUES
(4, '2023-10-06', 3, 420, 350, 50, '2023-10-05 09:38:47', '2023-10-16 05:58:39'),
(6, '2023-10-15', 3, 1000, 670, 300, '2023-10-16 16:14:21', '2023-10-16 16:16:21');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_payments`
--

INSERT INTO `tbl_payments` (`id`, `customer_id`, `sale_id`, `amount_paid`, `method_of_payment`, `user_id`, `note`, `created_at`, `updated_at`) VALUES
(1, 2, 9, 180000, 8, 5, '', '2023-10-19 09:09:02', '2023-10-19 09:09:02'),
(2, 2, 9, 180000, 8, 5, '', '2023-10-19 09:09:03', '2023-10-19 09:09:03'),
(3, 2, 5, 3864, 5, 3, '', '2023-11-09 08:14:26', '2023-11-09 08:14:26'),
(4, 2, 5, 3864, 4, 3, '', '2023-11-09 08:18:44', '2023-11-09 08:18:44'),
(7, 2, 10, 9600, 5, 5, '', '2023-11-09 11:50:28', '2023-11-09 11:50:28');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_payments_methods`
--

INSERT INTO `tbl_payments_methods` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Mobile Money', 'ACTIVE', '2023-09-23 07:39:02', '2023-09-23 10:49:24'),
(2, 'Cheque', 'ACTIVE', '2023-09-23 07:39:28', '2023-09-23 08:51:10'),
(4, 'Credit/Debit Card	', 'ACTIVE', '2023-09-23 10:56:20', '2023-09-23 10:57:30'),
(5, 'Bank Transfer', 'ACTIVE', '2023-09-23 10:56:45', '2023-09-23 10:56:45'),
(8, 'Cash', 'ACTIVE', '2023-10-16 16:33:46', '2023-11-09 07:55:13');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `other_cost` double NOT NULL,
  `place_of_purchase` varchar(512) DEFAULT NULL,
  `seller` varchar(512) NOT NULL,
  `payment_method_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_purchases`
--

INSERT INTO `tbl_purchases` (`id`, `type`, `item_name`, `description`, `note`, `unit_price`, `quantity`, `total_price`, `transport_cost`, `other_cost`, `place_of_purchase`, `seller`, `payment_method_id`, `created_at`, `updated_at`) VALUES
(8, 'maize', 'qweq2', '', '', 123, 12, 1496, 10, 0, 'kgl', '3', 5, '2023-11-07 09:05:30', '2023-11-07 09:22:20');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_sales`
--

INSERT INTO `tbl_sales` (`id`, `product_type`, `unit_price`, `total_quantity`, `seller_id`, `customer_id`, `payment_method_id`, `paid_or_debt`, `amount_paid`, `amount_debited`, `discount`, `note`, `created_at`, `updated_at`, `kg_5`, `kg_10`, `kg_20`, `kg_25`, `kg_custom`) VALUES
(6, 'FLOUR', 180, 50, 3, 2, '5', 'PAID', 9000, 0, 0, '', '2023-10-16 16:31:04', '2023-11-09 10:44:17', 10, 0, 0, 0, 20),
(7, 'FLOUR', 900, 200, 3, 2, 'debt', 'DEBT', 0, 180000, 0, 'ok', '2023-10-16 16:39:47', '2023-11-09 10:44:17', 0, 0, 10, 0, 0),
(8, 'FLOUR', 900, 200, 5, 3, 'debt', 'DEBT', 0, 180000, 0, '78ds', '2023-10-16 16:42:41', '2023-11-09 10:44:17', 0, 0, 10, 0, 0),
(9, 'FLOUR', 19500, 10, 5, 2, 'debt', 'DEBT', 0, 180000, 0, 'SADSDA', '2023-10-19 07:21:01', '2023-11-09 10:44:27', 0, 0, 0, 0, 0),
(10, 'BRANDA', 100, 120, 5, 2, '5', 'PAID', 9600, 0, 20, '', '2023-11-09 10:59:25', '2023-11-09 11:50:28', 0, 0, 0, 0, 0);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_sellers`
--

INSERT INTO `tbl_sellers` (`id`, `id_no`, `phone`, `first_name`, `last_name`, `about`, `location`, `created_at`, `updated_at`) VALUES
(2, '678689jh', '07844444', 'John', 'Doe The Seller', 'jhjklh', 'kjakj', '2023-10-02 14:01:12', '2023-11-07 09:29:10');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_stock_branda`
--

CREATE TABLE `tbl_stock_branda` (
  `id` int(11) NOT NULL,
  `quantity` double NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_stock_branda`
--

INSERT INTO `tbl_stock_branda` (`id`, `quantity`, `updated_at`) VALUES
(1, 602, '2023-11-09 11:50:28');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_stock_flour`
--

CREATE TABLE `tbl_stock_flour` (
  `id` int(11) NOT NULL,
  `quantity` double NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_stock_flour`
--

INSERT INTO `tbl_stock_flour` (`id`, `quantity`, `updated_at`) VALUES
(1, 820, '2023-10-16 16:16:55');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_stock_maize`
--

CREATE TABLE `tbl_stock_maize` (
  `id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_stock_maize`
--

INSERT INTO `tbl_stock_maize` (`id`, `quantity`, `updated_at`) VALUES
(1, 312, '2023-11-07 09:22:20');

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
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`id`, `first_name`, `last_name`, `username`, `email`, `password`, `active`, `role`, `created_at`, `updated_at`) VALUES
(1, 'Anaclet', 'Ahishakiye', 'anaclet', 'anaclet@example.com', '$2b$08$eYVJvIYeID3YKOqh6tQQu.Xqqg.SN7X46Q4u1ldSmbq5eQQ4ZX4Na', 'Y', 'admin', '2023-09-17 01:35:18', '2023-09-27 10:55:39'),
(2, 'John', 'Doe', 'root', 'a.anaclet920@gmail.com', '$2b$08$eYVJvIYeID3YKOqh6tQQu.Xqqg.SN7X46Q4u1ldSmbq5eQQ4ZX4Na', 'Y', 'technician', '2023-09-27 11:19:12', '2023-11-09 17:13:52'),
(4, 'Anaclet', 'Ahishakiye', 'uiuioiu', 'kisaie920@gmail.com', '$2b$08$GffcbRC3vKyNChW01UAtvunRiBSO1A45N9v82PgBJyme4zYAltwD2', 'Y', 'manager', '2023-11-09 16:59:18', '2023-11-09 16:59:18');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_vehicles`
--

CREATE TABLE `tbl_vehicles` (
  `id` int(11) NOT NULL,
  `plate_number` varchar(50) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `driver_id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `capacity` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_vehicles`
--

INSERT INTO `tbl_vehicles` (`id`, `plate_number`, `owner`, `driver_id`, `type`, `capacity`, `created_at`, `updated_at`) VALUES
(1, 'RAA 252 AJ', 'Kalisa Doe', 0, 'SUV', '8 Persons', '2023-09-23 10:37:24', '2023-11-09 14:11:11'),
(3, 'RAA 253 A', 'John DOe', 0, 'Van', '8 Persons', '2023-09-23 11:09:59', '2023-09-23 11:09:59');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_vehicles_report`
--

INSERT INTO `tbl_vehicles_report` (`id`, `date_time`, `vehicle_id`, `status`, `expense_amount`, `expense_receiver`, `note`, `created_at`, `updated_at`) VALUES
(2, '2023-10-24T16:34', 3, 'Good', 1500, '5', 'dgfg', '2023-11-09 14:30:39', '2023-11-09 14:35:01');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_workforce`
--

INSERT INTO `tbl_workforce` (`id`, `type`, `first_name`, `last_name`, `gender`, `date_of_birth`, `nid`, `phone`, `department_id`, `position`, `note`, `hired_date`, `end_date`, `contract`, `picture`, `username`, `password`, `active`, `created_at`, `updated_at`) VALUES
(1, 'DAILY', 'Anaclet', 'Ahishakiye', 'M', '2023-08-31', '119738004194403443', '0784354460', 2, 'Vice Chairman', 'Not about w', '2023-09-12', '2023-09-21', '1695636666053-get_turikumwe_moto-2022-06-23.pdf', '1697486016127-931316.jpg', 'ifvikoyq', '$2b$08$kOBesJ9PTbozorUx7nls3e7Yx84JElTHyWzMkCLXrMWJ/Q722Z8Wq', 'Y', '2023-09-25 10:11:06', '2023-10-16 19:53:43'),
(4, 'DAILY', 'Rose', 'Doe', 'F', '2000-01-01', '1195280110295062', '+250739539101', 4, 'Secretary', '', '2023-10-08', '', '', '1699366391032-logo-icon-2.png', 'rosedoe', '$2b$08$0NmfRLddr4X0dCh6BosjYuCJUM.GBxVe.aIXTGq7bxLNyJpKeG7n.', 'Y', '2023-10-16 17:11:04', '2023-11-07 14:13:11'),
(5, 'PERMANENT', 'Anaclet', 'Ahishakiye', 'F', '2023-10-16', '1197380041944034', '0784354460', 7, 'Chairman', '', '2023-10-23', 'N/A', '', '1699366290551-bee_fit.png', 'uiuioiu', '$2b$08$My88u3617dckk44d5RlNDe4PQlBqRL1u2gYUHEZBmxzNUbBfAFoYO', 'Y', '2023-10-16 17:33:55', '2023-11-07 14:11:30');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tbl_departments`
--
ALTER TABLE `tbl_departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tbl_expenses`
--
ALTER TABLE `tbl_expenses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_forgot_password`
--
ALTER TABLE `tbl_forgot_password`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_inventory`
--
ALTER TABLE `tbl_inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_milling`
--
ALTER TABLE `tbl_milling`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_payments`
--
ALTER TABLE `tbl_payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tbl_payments_methods`
--
ALTER TABLE `tbl_payments_methods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
-- AUTO_INCREMENT for table `tbl_sales`
--
ALTER TABLE `tbl_sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tbl_sellers`
--
ALTER TABLE `tbl_sellers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
-- AUTO_INCREMENT for table `tbl_stock_maize`
--
ALTER TABLE `tbl_stock_maize`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_vehicles`
--
ALTER TABLE `tbl_vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_vehicles_report`
--
ALTER TABLE `tbl_vehicles_report`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_warehouse`
--
ALTER TABLE `tbl_warehouse`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_workforce`
--
ALTER TABLE `tbl_workforce`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
