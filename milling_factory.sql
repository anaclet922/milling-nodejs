-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 03, 2023 at 06:23 AM
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
  `details` text NOT NULL,
  `title` varchar(255) NOT NULL,
  `reminder_time` datetime NOT NULL,
  `priority` enum('HIGH','MEDIUM','LOW') NOT NULL,
  `assignee` int(11) NOT NULL,
  `color` varchar(50) NOT NULL,
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
(1, 'system_name', 'Sys', '2022-04-14 06:04:13', '2023-09-27 13:08:41'),
(36, 'copyright_text', 'postcopyrighttext', '2022-04-14 06:04:13', '2023-09-27 13:08:30'),
(37, 'logo', '1695809724208-bee_fit.png', '2022-04-14 06:04:13', '2023-09-27 10:15:24'),
(38, 'favicon', '1695819928810-bee_fit.png', '2022-04-14 06:04:13', '2023-09-27 13:05:28');

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
(2, '678689jh', '07844444', 'John', 'Doe', 'jhjklh', 'kjakj', '2023-10-02 14:01:12', '2023-10-02 14:13:33');

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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_debts`
--

INSERT INTO `tbl_debts` (`id`, `customer_id`, `sale_id`, `purchase_id`, `debited_amount`, `note`, `created_at`, `updated_at`) VALUES
(1, NULL, NULL, 3, 450000, '', '2023-10-02 18:23:55', '2023-10-02 18:23:55');

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
(2, 'Finance', '0000-00-00 00:00:00', '2023-09-25 08:48:19'),
(4, 'Sales & Marketing', '2023-09-17 04:51:51', '2023-09-25 08:41:52'),
(5, 'Information Technology', '2023-09-25 08:56:40', '2023-09-25 08:57:08'),
(7, 'Audit', '2023-09-25 11:52:34', '2023-09-25 11:52:34');

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
(1, 'Laptop', 'Laptop to use', 'Electronic', 1, 'Some notes', '2023-10-02 19:33:22', '2023-10-02 19:33:22'),
(2, 'Laptop', 'Lapto', 'Electronic', 2, 'Is new', '2023-10-02 19:35:05', '2023-10-02 19:35:05'),
(3, 'Office Chairs', '', 'Chair', 2, '', '2023-10-02 19:36:06', '2023-10-02 19:36:06');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_maize_stock`
--

CREATE TABLE `tbl_maize_stock` (
  `id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_maize_stock`
--

INSERT INTO `tbl_maize_stock` (`id`, `quantity`, `updated_at`) VALUES
(1, 3500, '2023-10-02 18:23:55');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_milling`
--

CREATE TABLE `tbl_milling` (
  `id` int(11) NOT NULL,
  `milled_at` date NOT NULL,
  `technician_id` int(11) NOT NULL COMMENT 'workforce id',
  `input_kg` double NOT NULL,
  `output_kg` double NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 'Mobile Money', 'ACTIVE', '2023-09-23 07:39:02', '2023-09-23 10:49:24'),
(2, 'Cheque', 'ACTIVE', '2023-09-23 07:39:28', '2023-09-23 08:51:10'),
(4, 'Credit/Debit Card	', 'ACTIVE', '2023-09-23 10:56:20', '2023-09-23 10:57:30'),
(5, 'Bank Transfer', 'ACTIVE', '2023-09-23 10:56:45', '2023-09-23 10:56:45');

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
  `place_of_purchase` varchar(512) NOT NULL,
  `seller` varchar(512) NOT NULL,
  `payment_method_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_purchases`
--

INSERT INTO `tbl_purchases` (`id`, `type`, `item_name`, `description`, `note`, `unit_price`, `quantity`, `total_price`, `transport_cost`, `place_of_purchase`, `seller`, `payment_method_id`, `created_at`, `updated_at`) VALUES
(1, 'maize', 'Maize', 'Maize for milling', '', 480, 2000, 1010000, 50000, 'Kigali', 'Maize Co.', 5, '2023-10-02 17:16:04', '2023-10-02 17:47:22'),
(2, 'maize', 'Maize Long Grain', 'Long grain maize', '', 520, 500, 275000, 15000, 'Kigali, Nyarugenge', 'Maize Co. ltd', 5, '2023-10-02 17:16:55', '2023-10-02 17:47:25'),
(3, 'maize', 'Maize', 'Not paid product', '', 430, 1000, 450000, 20000, 'Kigali, Nyarugenge', 'Maize Co. ltd', 0, '2023-10-02 18:23:55', '2023-10-02 18:23:55'),
(4, 'inventory', 'Laptop', 'Laptops', '', 500000, 2, 1000000, 0, 'Kigali, Nyarugenge', 'Dream Laptop ltd.', 2, '2023-10-02 18:57:47', '2023-10-02 18:57:47'),
(5, 'inventory', 'Office Chairs', '', '', 300000, 5, 1500000, 0, 'Kigali, Nyarugenge', 'Office Fun ltd.', 4, '2023-10-02 19:35:51', '2023-10-02 19:35:51');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_sales`
--

CREATE TABLE `tbl_sales` (
  `id` int(11) NOT NULL,
  `product_type` enum('FLUOR','BRANDA') NOT NULL,
  `quantity` double NOT NULL,
  `packaging_id` int(11) NOT NULL COMMENT 'packaging id',
  `number` double NOT NULL COMMENT 'how many bag',
  `total_quantity` double NOT NULL,
  `seller_id` int(11) NOT NULL COMMENT 'workforce id',
  `customer_id` int(11) NOT NULL,
  `paid_or_debt` enum('PAID','DEBT') NOT NULL DEFAULT 'PAID',
  `payment_method_id` varchar(100) DEFAULT NULL,
  `amount_paid` double NOT NULL,
  `amount_debited` double NOT NULL DEFAULT 0,
  `note` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`id`, `first_name`, `last_name`, `username`, `email`, `password`, `active`, `role`, `created_at`, `updated_at`) VALUES
(1, 'Anaclet', 'Ahishakiye', 'anaclet', 'anaclet@example.com', '$2b$08$eYVJvIYeID3YKOqh6tQQu.Xqqg.SN7X46Q4u1ldSmbq5eQQ4ZX4Na', 'Y', 'admin', '2023-09-17 01:35:18', '2023-09-27 10:55:39'),
(2, 'John', 'Doe', 'root', 'a.anaclet920@gmail.com', '$2b$08$4k1MM5TyY1ywgUmJIO/ffOt0SM/MLZaJvmxoDH7bOpqTkDIQGFLc2', 'N', 'admin', '2023-09-27 11:19:12', '2023-10-02 19:34:46');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_vehicles`
--

INSERT INTO `tbl_vehicles` (`id`, `plate_number`, `owner`, `driver_id`, `type`, `capacity`, `created_at`, `updated_at`) VALUES
(1, 'RAA 252 A', 'Kalisa Doe', 0, 'SUV', '6 Persons', '2023-09-23 10:37:24', '2023-09-23 11:09:37'),
(3, 'RAA 253 A', 'John DOe', 0, 'Van', '8 Persons', '2023-09-23 11:09:59', '2023-09-23 11:09:59'),
(5, 'RAA 2 A', 'Kalisa Doe', 0, 'Ranger', '2 Tones', '2023-09-23 11:23:38', '2023-09-23 11:24:11');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_vehicles_report`
--

CREATE TABLE `tbl_vehicles_report` (
  `id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `status` varchar(100) NOT NULL,
  `expense_amount` double NOT NULL,
  `expense_receiver` varchar(255) NOT NULL,
  `note` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_workforce`
--

INSERT INTO `tbl_workforce` (`id`, `type`, `first_name`, `last_name`, `gender`, `date_of_birth`, `nid`, `phone`, `department_id`, `position`, `note`, `hired_date`, `end_date`, `contract`, `picture`, `username`, `password`, `created_at`, `updated_at`) VALUES
(1, 'DAILY', 'Anaclet', 'Ahishakiye', 'M', '2023-08-31', '1197980034115066', '0784354460', 2, 'Vice Chairman', 'Not about w', '2023-09-15', '2023-09-21', '1695636666053-get_turikumwe_moto-2022-06-23.pdf', '1695636666053-get_turikumwe_moto-2022-06-23.pdf', 'ifvikoyq', '$2b$08$kOBesJ9PTbozorUx7nls3e7Yx84JElTHyWzMkCLXrMWJ/Q722Z8Wq', '2023-09-25 10:11:06', '2023-09-25 10:11:06'),
(3, 'PERMANENT', 'Anaclet', 'Ahishakiye', 'M', '2023-08-30', '1199680020158063', '0784354460', 2, 'Accountant', '', '2023-09-01', 'N/A', '1695641538798-get_turikumwe_moto-2022-06-23.pdf', '1695641538834-start_logo.png', '93mt1eei', '$2b$08$bsfEdD6FQr9p.l3QJ6BqwOKTEI4thXQopTT7bChC/9YyDYLRrkr4u', '2023-09-25 11:32:18', '2023-09-25 11:32:18');

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
-- Indexes for table `tbl_maize_stock`
--
ALTER TABLE `tbl_maize_stock`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_bills`
--
ALTER TABLE `tbl_bills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_configs`
--
ALTER TABLE `tbl_configs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `tbl_customers`
--
ALTER TABLE `tbl_customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_debts`
--
ALTER TABLE `tbl_debts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_departments`
--
ALTER TABLE `tbl_departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tbl_expenses`
--
ALTER TABLE `tbl_expenses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_forgot_password`
--
ALTER TABLE `tbl_forgot_password`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_inventory`
--
ALTER TABLE `tbl_inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_maize_stock`
--
ALTER TABLE `tbl_maize_stock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_milling`
--
ALTER TABLE `tbl_milling`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_payments`
--
ALTER TABLE `tbl_payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_payments_methods`
--
ALTER TABLE `tbl_payments_methods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_permisions`
--
ALTER TABLE `tbl_permisions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_purchases`
--
ALTER TABLE `tbl_purchases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_sales`
--
ALTER TABLE `tbl_sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_vehicles`
--
ALTER TABLE `tbl_vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_vehicles_report`
--
ALTER TABLE `tbl_vehicles_report`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_warehouse`
--
ALTER TABLE `tbl_warehouse`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_workforce`
--
ALTER TABLE `tbl_workforce`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
