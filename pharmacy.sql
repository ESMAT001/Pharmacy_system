-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 16, 2021 at 11:56 AM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pharmacy`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer_p`
--

CREATE TABLE `customer_p` (
  `customer_id` int(11) NOT NULL,
  `customer_name` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `phone_no` int(20) DEFAULT NULL,
  `province` varchar(30) DEFAULT NULL,
  `user_id` int(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer_p`
--

INSERT INTO `customer_p` (`customer_id`, `customer_name`, `address`, `phone_no`, `province`, `user_id`) VALUES
(47, 'nawroz dar', 'kotesangi', 7866655, 'kbl', 1),
(48, 'kabir', 'khair khanan', 9282992, 'kabul', 1);

-- --------------------------------------------------------

--
-- Table structure for table `expense_p`
--

CREATE TABLE `expense_p` (
  `description` varchar(250) DEFAULT NULL,
  `amount` int(30) DEFAULT NULL,
  `expense_date` date DEFAULT NULL,
  `user_id` int(50) DEFAULT NULL,
  `expense_id` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `expense_p`
--

INSERT INTO `expense_p` (`description`, `amount`, `expense_date`, `user_id`, `expense_id`) VALUES
('water', 100, '2021-06-15', 1, 9);

-- --------------------------------------------------------

--
-- Table structure for table `expire_medicines_p`
--

CREATE TABLE `expire_medicines_p` (
  `expire_id` int(53) NOT NULL,
  `medicine_information_id` int(53) DEFAULT NULL,
  `medicine_id` int(53) DEFAULT NULL,
  `quantity` int(53) DEFAULT NULL,
  `transfer_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `expire_medicines_p`
--

INSERT INTO `expire_medicines_p` (`expire_id`, `medicine_information_id`, `medicine_id`, `quantity`, `transfer_date`) VALUES
(3, 46, 89, 4800, '2021-06-15');

-- --------------------------------------------------------

--
-- Table structure for table `invoice_medicine_list_p`
--

CREATE TABLE `invoice_medicine_list_p` (
  `invoice_medicine_list_id` int(30) NOT NULL,
  `medicine_id` int(30) DEFAULT NULL,
  `pack_quantity` int(30) DEFAULT NULL,
  `sell_price` float DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `invoice_id` int(30) DEFAULT NULL,
  `status` varchar(30) DEFAULT NULL,
  `loose_stock_id` int(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `invoice_medicine_list_p`
--

INSERT INTO `invoice_medicine_list_p` (`invoice_medicine_list_id`, `medicine_id`, `pack_quantity`, `sell_price`, `discount`, `invoice_id`, `status`, `loose_stock_id`) VALUES
(64, 89, 100, 80, 20, 83, 'sold', 95),
(65, 90, 190, 75, 20, 83, 'sold', 96),
(66, 93, 100, 55, 0, 84, 'sold', 99),
(67, 94, 100, 65, 0, 84, 'sold', 100),
(68, 93, 99, 55, 10, 85, 'sold', 101),
(69, 94, 100, 65, 0, 85, 'sold', 102);

-- --------------------------------------------------------

--
-- Table structure for table `invoice_p`
--

CREATE TABLE `invoice_p` (
  `invoice_id` int(30) NOT NULL,
  `customer_id` int(30) DEFAULT NULL,
  `book_page_no` varchar(50) DEFAULT NULL,
  `user_id` int(30) DEFAULT NULL,
  `visitor_id` int(30) DEFAULT NULL,
  `total_amount` int(50) DEFAULT NULL,
  `invoice_date` date DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `supplier_id` int(53) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `invoice_p`
--

INSERT INTO `invoice_p` (`invoice_id`, `customer_id`, `book_page_no`, `user_id`, `visitor_id`, `total_amount`, `invoice_date`, `status`, `supplier_id`) VALUES
(83, 47, 'qais 5', 1, 20, 300, '2021-06-15', 'sold', 19),
(84, 47, 'jhu', 1, 19, 200, '2021-06-15', 'sold', 21),
(85, 48, '899', 1, 19, 200, '2021-06-15', 'sold', 20);

-- --------------------------------------------------------

--
-- Table structure for table `ledger_previous`
--

CREATE TABLE `ledger_previous` (
  `ledger_id` int(53) NOT NULL,
  `visitor_id` int(53) DEFAULT NULL,
  `amount_received` int(53) DEFAULT NULL,
  `recipt_no` int(53) DEFAULT NULL,
  `customer_id` int(53) DEFAULT NULL,
  `recipt_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ledger_previous`
--

INSERT INTO `ledger_previous` (`ledger_id`, `visitor_id`, `amount_received`, `recipt_no`, `customer_id`, `recipt_date`) VALUES
(1, 20, 100, 112, 47, '2021-06-11'),
(2, 19, 100, 222, 48, '2021-06-16'),
(3, 19, 100, 123, 47, '2021-06-16'),
(4, 19, 100, 212, 48, '2021-06-16'),
(5, 21, 500, 123, 48, '2021-06-16'),
(6, 20, 100, 202, 48, '2021-06-16');

-- --------------------------------------------------------

--
-- Table structure for table `ledger_recipt_p`
--

CREATE TABLE `ledger_recipt_p` (
  `recipt_id` int(30) NOT NULL,
  `visitor_id` int(30) DEFAULT NULL,
  `amount_recieved` int(30) DEFAULT NULL,
  `recipt_no` int(30) DEFAULT NULL,
  `customer_id` int(30) DEFAULT NULL,
  `recipt_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ledger_recipt_p`
--

INSERT INTO `ledger_recipt_p` (`recipt_id`, `visitor_id`, `amount_recieved`, `recipt_no`, `customer_id`, `recipt_date`) VALUES
(20, 20, 100, 767, 47, '2021-06-15');

-- --------------------------------------------------------

--
-- Table structure for table `ledger_schedule_p`
--

CREATE TABLE `ledger_schedule_p` (
  `ledger_id` int(11) NOT NULL,
  `customer_id` int(50) DEFAULT NULL,
  `day` int(11) DEFAULT NULL,
  `visitor_id` int(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ledger_schedule_p`
--

INSERT INTO `ledger_schedule_p` (`ledger_id`, `customer_id`, `day`, `visitor_id`) VALUES
(29, 47, 1, 20),
(31, 48, 1, 20);

-- --------------------------------------------------------

--
-- Table structure for table `loose_stock_p`
--

CREATE TABLE `loose_stock_p` (
  `loose_stock_id` int(30) NOT NULL,
  `medicine_id` int(30) DEFAULT NULL,
  `quantity` int(30) DEFAULT NULL,
  `user_id` int(30) DEFAULT NULL,
  `loose_stock_date` date DEFAULT NULL,
  `status` varchar(40) DEFAULT NULL,
  `finish_date` date DEFAULT NULL,
  `sold_quantity` int(50) DEFAULT NULL,
  `medicine_information_id` int(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `loose_stock_p`
--

INSERT INTO `loose_stock_p` (`loose_stock_id`, `medicine_id`, `quantity`, `user_id`, `loose_stock_date`, `status`, `finish_date`, `sold_quantity`, `medicine_information_id`) VALUES
(95, 89, 100, 1, '2021-06-15', 'sold out', '2021-06-15', 100, 46),
(96, 90, 200, 1, '2021-06-15', 'sold out', '2021-06-15', 200, 47),
(97, 89, 100, 1, '2021-06-15', 'added', NULL, 0, 46),
(98, 90, 10, 1, '2021-06-15', 'added', NULL, 0, 47),
(99, 93, 100, 1, '2021-06-15', 'sold out', '2021-06-15', 100, 50),
(100, 94, 100, 1, '2021-06-15', 'sold out', '2021-06-15', 100, 51),
(101, 93, 100, 1, '2021-06-15', 'sold out', '2021-06-15', 100, 50),
(102, 94, 100, 1, '2021-06-15', 'sold out', '2021-06-15', 100, 51),
(103, 93, 1, 1, '2021-06-15', 'added', NULL, 0, 50);

-- --------------------------------------------------------

--
-- Table structure for table `medicine_information_p`
--

CREATE TABLE `medicine_information_p` (
  `medicine_info_id` int(50) NOT NULL,
  `batch_no` varchar(50) DEFAULT NULL,
  `mfg_date` date DEFAULT NULL,
  `expire_date` date DEFAULT NULL,
  `cost_price` int(50) DEFAULT NULL,
  `entry_date` date DEFAULT NULL,
  `packs_quantity` int(50) DEFAULT NULL,
  `per_packs` varchar(30) DEFAULT NULL,
  `medicine_id` int(50) DEFAULT NULL,
  `status` varchar(30) DEFAULT NULL,
  `sold_quantity` int(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `medicine_information_p`
--

INSERT INTO `medicine_information_p` (`medicine_info_id`, `batch_no`, `mfg_date`, `expire_date`, `cost_price`, `entry_date`, `packs_quantity`, `per_packs`, `medicine_id`, `status`, `sold_quantity`) VALUES
(46, 'ic20304002', '2019-01-02', '2021-01-02', 27, '2021-06-10', 5000, '1x1', 89, 'sold out', 5000),
(47, 'c50011802', '2018-05-12', '2021-04-01', 25, '2021-06-10', 7000, '2x10', 90, 'added', 200),
(48, 's20f013', '2020-06-01', '2023-05-12', 30, '2021-06-10', 9000, '1x1', 91, 'added', 0),
(50, '250092001', '2020-03-12', '2022-04-30', 30, '2021-06-15', 5500, '2x10', 93, 'added', 200),
(51, 'ex 0010620', '2020-06-01', '2022-05-31', 27, '2021-06-15', 6700, '1x', 94, 'added', 200);

-- --------------------------------------------------------

--
-- Table structure for table `medicine_p`
--

CREATE TABLE `medicine_p` (
  `medicine_id` int(50) NOT NULL,
  `product_name` varchar(250) DEFAULT NULL,
  `generic_name` varchar(250) DEFAULT NULL,
  `user_id` int(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `medicine_p`
--

INSERT INTO `medicine_p` (`medicine_id`, `product_name`, `generic_name`, `user_id`) VALUES
(89, 'atax 1g', 'ceftrioxone', 1),
(90, 'carato 20', 'atorvastatin calsium', 1),
(91, 'exicof plus', 'amonium chloride glycerine paracetamol', 1),
(93, 'zinvital', 'vitamin b complex', 1),
(94, 'amoxyn 250 syp', 'amoxicillin dry suspension', 1);

-- --------------------------------------------------------

--
-- Table structure for table `medicine_range_p`
--

CREATE TABLE `medicine_range_p` (
  `id` int(11) NOT NULL,
  `medicine_range_expire` int(11) DEFAULT NULL,
  `medicine_range_quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `medicine_range_p`
--

INSERT INTO `medicine_range_p` (`id`, `medicine_range_expire`, `medicine_range_quantity`) VALUES
(1, 1, 4000);

-- --------------------------------------------------------

--
-- Table structure for table `previous_account`
--

CREATE TABLE `previous_account` (
  `previos_account_id` int(11) NOT NULL,
  `customer_id` int(53) DEFAULT NULL,
  `amount` int(53) DEFAULT NULL,
  `entry_date` date DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `previous_account`
--

INSERT INTO `previous_account` (`previos_account_id`, `customer_id`, `amount`, `entry_date`, `description`) VALUES
(1, 48, 50000, '2021-06-16', 'For Previous Account'),
(2, 47, 100000, '2021-06-16', 'from previous');

-- --------------------------------------------------------

--
-- Table structure for table `return_medicine_p`
--

CREATE TABLE `return_medicine_p` (
  `return_id` int(11) NOT NULL,
  `medicine_id` int(53) DEFAULT NULL,
  `invoice_information_id` int(53) DEFAULT NULL,
  `return_quantity` int(53) DEFAULT NULL,
  `sell_price` int(53) DEFAULT NULL,
  `customer_id` int(53) DEFAULT NULL,
  `return_date` date DEFAULT NULL,
  `return_price` int(53) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `return_medicine_p`
--

INSERT INTO `return_medicine_p` (`return_id`, `medicine_id`, `invoice_information_id`, `return_quantity`, `sell_price`, `customer_id`, `return_date`, `return_price`) VALUES
(15, 90, 65, 10, 60, 47, '2021-06-15', 60),
(16, 93, 68, 1, 50, 48, '2021-06-15', 50);

-- --------------------------------------------------------

--
-- Table structure for table `sample_distribution_p`
--

CREATE TABLE `sample_distribution_p` (
  `dis_id` int(30) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `medicine_id` int(30) DEFAULT NULL,
  `quantity` int(30) DEFAULT NULL,
  `dis_date` date DEFAULT NULL,
  `total_amount` int(30) DEFAULT NULL,
  `medicine_information_id` int(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users_p`
--

CREATE TABLE `users_p` (
  `user_id` int(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users_p`
--

INSERT INTO `users_p` (`user_id`, `email`, `password`, `status`) VALUES
(1, 'admin@gmail.com', '21232f297a57a5a743894a0e4a801fc3', 'added');

-- --------------------------------------------------------

--
-- Table structure for table `visitor_p`
--

CREATE TABLE `visitor_p` (
  `visitor_id` int(30) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `phone_no` int(20) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `province` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `visitor_p`
--

INSERT INTO `visitor_p` (`visitor_id`, `name`, `last_name`, `phone_no`, `address`, `province`) VALUES
(19, 'firdous', 'najibi', 78890812, 'chehelsatoon', 'kbl'),
(20, 'qais ', 'najibi', 786665444, 'dokan haji', 'kbl'),
(21, 'shukurulla ', 'tawakuli', 787566587, 'barchi', 'kbl');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer_p`
--
ALTER TABLE `customer_p`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `expense_p`
--
ALTER TABLE `expense_p`
  ADD PRIMARY KEY (`expense_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `expire_medicines_p`
--
ALTER TABLE `expire_medicines_p`
  ADD PRIMARY KEY (`expire_id`),
  ADD KEY `medicine_information_id` (`medicine_information_id`),
  ADD KEY `medicine_id` (`medicine_id`);

--
-- Indexes for table `invoice_medicine_list_p`
--
ALTER TABLE `invoice_medicine_list_p`
  ADD PRIMARY KEY (`invoice_medicine_list_id`),
  ADD KEY `medicine_id` (`medicine_id`),
  ADD KEY `invoice_id` (`invoice_id`),
  ADD KEY `loose_stock_id` (`loose_stock_id`);

--
-- Indexes for table `invoice_p`
--
ALTER TABLE `invoice_p`
  ADD PRIMARY KEY (`invoice_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `visitor_id` (`visitor_id`),
  ADD KEY `supplier_id` (`supplier_id`);

--
-- Indexes for table `ledger_previous`
--
ALTER TABLE `ledger_previous`
  ADD PRIMARY KEY (`ledger_id`),
  ADD KEY `visitor_id` (`visitor_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `ledger_recipt_p`
--
ALTER TABLE `ledger_recipt_p`
  ADD PRIMARY KEY (`recipt_id`),
  ADD KEY `visitor_id` (`visitor_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `ledger_schedule_p`
--
ALTER TABLE `ledger_schedule_p`
  ADD PRIMARY KEY (`ledger_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `visitor_id` (`visitor_id`);

--
-- Indexes for table `loose_stock_p`
--
ALTER TABLE `loose_stock_p`
  ADD PRIMARY KEY (`loose_stock_id`),
  ADD KEY `medicine_id` (`medicine_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `FK_medicine_id` (`medicine_information_id`);

--
-- Indexes for table `medicine_information_p`
--
ALTER TABLE `medicine_information_p`
  ADD PRIMARY KEY (`medicine_info_id`),
  ADD KEY `medicine_id` (`medicine_id`);

--
-- Indexes for table `medicine_p`
--
ALTER TABLE `medicine_p`
  ADD PRIMARY KEY (`medicine_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `medicine_range_p`
--
ALTER TABLE `medicine_range_p`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `previous_account`
--
ALTER TABLE `previous_account`
  ADD PRIMARY KEY (`previos_account_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `return_medicine_p`
--
ALTER TABLE `return_medicine_p`
  ADD PRIMARY KEY (`return_id`),
  ADD KEY `medicine_id` (`medicine_id`),
  ADD KEY `invoice_information_id` (`invoice_information_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `sample_distribution_p`
--
ALTER TABLE `sample_distribution_p`
  ADD PRIMARY KEY (`dis_id`),
  ADD KEY `medicine_id` (`medicine_id`),
  ADD KEY `FK_sample` (`medicine_information_id`);

--
-- Indexes for table `users_p`
--
ALTER TABLE `users_p`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `visitor_p`
--
ALTER TABLE `visitor_p`
  ADD PRIMARY KEY (`visitor_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer_p`
--
ALTER TABLE `customer_p`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `expense_p`
--
ALTER TABLE `expense_p`
  MODIFY `expense_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `expire_medicines_p`
--
ALTER TABLE `expire_medicines_p`
  MODIFY `expire_id` int(53) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `invoice_medicine_list_p`
--
ALTER TABLE `invoice_medicine_list_p`
  MODIFY `invoice_medicine_list_id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `invoice_p`
--
ALTER TABLE `invoice_p`
  MODIFY `invoice_id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT for table `ledger_previous`
--
ALTER TABLE `ledger_previous`
  MODIFY `ledger_id` int(53) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `ledger_recipt_p`
--
ALTER TABLE `ledger_recipt_p`
  MODIFY `recipt_id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `ledger_schedule_p`
--
ALTER TABLE `ledger_schedule_p`
  MODIFY `ledger_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `loose_stock_p`
--
ALTER TABLE `loose_stock_p`
  MODIFY `loose_stock_id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT for table `medicine_information_p`
--
ALTER TABLE `medicine_information_p`
  MODIFY `medicine_info_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `medicine_p`
--
ALTER TABLE `medicine_p`
  MODIFY `medicine_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT for table `medicine_range_p`
--
ALTER TABLE `medicine_range_p`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `previous_account`
--
ALTER TABLE `previous_account`
  MODIFY `previos_account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `return_medicine_p`
--
ALTER TABLE `return_medicine_p`
  MODIFY `return_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `sample_distribution_p`
--
ALTER TABLE `sample_distribution_p`
  MODIFY `dis_id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users_p`
--
ALTER TABLE `users_p`
  MODIFY `user_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `visitor_p`
--
ALTER TABLE `visitor_p`
  MODIFY `visitor_id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `expense_p`
--
ALTER TABLE `expense_p`
  ADD CONSTRAINT `expense_p_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users_p` (`user_id`);

--
-- Constraints for table `expire_medicines_p`
--
ALTER TABLE `expire_medicines_p`
  ADD CONSTRAINT `expire_medicines_p_ibfk_1` FOREIGN KEY (`medicine_information_id`) REFERENCES `medicine_information_p` (`medicine_info_id`),
  ADD CONSTRAINT `expire_medicines_p_ibfk_2` FOREIGN KEY (`medicine_id`) REFERENCES `medicine_p` (`medicine_id`);

--
-- Constraints for table `invoice_medicine_list_p`
--
ALTER TABLE `invoice_medicine_list_p`
  ADD CONSTRAINT `invoice_medicine_list_p_ibfk_1` FOREIGN KEY (`medicine_id`) REFERENCES `medicine_p` (`medicine_id`),
  ADD CONSTRAINT `invoice_medicine_list_p_ibfk_2` FOREIGN KEY (`invoice_id`) REFERENCES `invoice_p` (`invoice_id`),
  ADD CONSTRAINT `invoice_medicine_list_p_ibfk_3` FOREIGN KEY (`loose_stock_id`) REFERENCES `loose_stock_p` (`loose_stock_id`);

--
-- Constraints for table `invoice_p`
--
ALTER TABLE `invoice_p`
  ADD CONSTRAINT `invoice_p_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer_p` (`customer_id`),
  ADD CONSTRAINT `invoice_p_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users_p` (`user_id`),
  ADD CONSTRAINT `invoice_p_ibfk_3` FOREIGN KEY (`visitor_id`) REFERENCES `visitor_p` (`visitor_id`),
  ADD CONSTRAINT `invoice_p_ibfk_4` FOREIGN KEY (`supplier_id`) REFERENCES `visitor_p` (`visitor_id`);

--
-- Constraints for table `ledger_previous`
--
ALTER TABLE `ledger_previous`
  ADD CONSTRAINT `ledger_previous_ibfk_1` FOREIGN KEY (`visitor_id`) REFERENCES `visitor_p` (`visitor_id`),
  ADD CONSTRAINT `ledger_previous_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customer_p` (`customer_id`);

--
-- Constraints for table `ledger_recipt_p`
--
ALTER TABLE `ledger_recipt_p`
  ADD CONSTRAINT `ledger_recipt_p_ibfk_1` FOREIGN KEY (`visitor_id`) REFERENCES `visitor_p` (`visitor_id`),
  ADD CONSTRAINT `ledger_recipt_p_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customer_p` (`customer_id`);

--
-- Constraints for table `ledger_schedule_p`
--
ALTER TABLE `ledger_schedule_p`
  ADD CONSTRAINT `ledger_schedule_p_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer_p` (`customer_id`),
  ADD CONSTRAINT `ledger_schedule_p_ibfk_2` FOREIGN KEY (`visitor_id`) REFERENCES `visitor_p` (`visitor_id`);

--
-- Constraints for table `loose_stock_p`
--
ALTER TABLE `loose_stock_p`
  ADD CONSTRAINT `FK_medicine_id` FOREIGN KEY (`medicine_information_id`) REFERENCES `medicine_information_p` (`medicine_info_id`),
  ADD CONSTRAINT `loose_stock_p_ibfk_1` FOREIGN KEY (`medicine_id`) REFERENCES `medicine_p` (`medicine_id`),
  ADD CONSTRAINT `loose_stock_p_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users_p` (`user_id`);

--
-- Constraints for table `medicine_information_p`
--
ALTER TABLE `medicine_information_p`
  ADD CONSTRAINT `medicine_information_p_ibfk_1` FOREIGN KEY (`medicine_id`) REFERENCES `medicine_p` (`medicine_id`);

--
-- Constraints for table `medicine_p`
--
ALTER TABLE `medicine_p`
  ADD CONSTRAINT `medicine_p_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users_p` (`user_id`);

--
-- Constraints for table `previous_account`
--
ALTER TABLE `previous_account`
  ADD CONSTRAINT `previous_account_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer_p` (`customer_id`);

--
-- Constraints for table `return_medicine_p`
--
ALTER TABLE `return_medicine_p`
  ADD CONSTRAINT `return_medicine_p_ibfk_1` FOREIGN KEY (`medicine_id`) REFERENCES `medicine_p` (`medicine_id`),
  ADD CONSTRAINT `return_medicine_p_ibfk_2` FOREIGN KEY (`invoice_information_id`) REFERENCES `invoice_medicine_list_p` (`invoice_medicine_list_id`),
  ADD CONSTRAINT `return_medicine_p_ibfk_3` FOREIGN KEY (`customer_id`) REFERENCES `customer_p` (`customer_id`);

--
-- Constraints for table `sample_distribution_p`
--
ALTER TABLE `sample_distribution_p`
  ADD CONSTRAINT `FK_sample` FOREIGN KEY (`medicine_information_id`) REFERENCES `medicine_information_p` (`medicine_info_id`),
  ADD CONSTRAINT `sample_distribution_p_ibfk_1` FOREIGN KEY (`medicine_id`) REFERENCES `medicine_p` (`medicine_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
