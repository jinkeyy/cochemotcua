-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 08, 2021 lúc 02:45 PM
-- Phiên bản máy phục vụ: 10.4.18-MariaDB
-- Phiên bản PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `cochemotcua`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `t_department`
--

CREATE TABLE `t_department` (
  `id` int(10) NOT NULL,
  `tenPhongBan` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `t_department`
--

INSERT INTO `t_department` (`id`, `tenPhongBan`) VALUES
(1, 'Công tác sinh viên'),
(2, 'Đào tạo'),
(3, 'Cơ sở vật chất'),
(4, 'Tài chính'),
(5, 'Y tế');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `t_file`
--

CREATE TABLE `t_file` (
  `id` int(10) NOT NULL,
  `tenFile` varchar(255) NOT NULL,
  `urlFile` varchar(255) NOT NULL,
  `ghiChu` text NOT NULL,
  `id_phongban` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `t_file`
--

INSERT INTO `t_file` (`id`, `tenFile`, `urlFile`, `ghiChu`, `id_phongban`) VALUES
(1, 'Giấy xác nhận không nợ', 'https://dt.hunre.edu.vn/attachment/dt/news/2020/05/12/142406_1.%20Gi%E1%BA%A5y%20x%C3%A1c%20nh%E1%BA%ADn%20kh%C3%B4ng%20n%E1%BB%A3.docx', 'Giấy xác nhận không nợ', 2),
(2, 'Đơn xin đăng kí học vượt', 'https://dt.hunre.edu.vn/attachment/dt/news/2020/05/12/142445_5.%20%C4%90%C6%A1n%20%C4%91%C4%83ng%20k%C3%BD%20h%E1%BB%8Dc%20v%C6%B0%E1%BB%A3t.docx', '', 2),
(3, 'Phiếu đánh giá điểm rèn luyện', 'https://ctsv.hunre.edu.vn/attachment/ctsv/2020/05/15/PHI%E1%BA%BEU%20%C4%90%C3%81NH%20GI%C3%81%20K%E1%BA%BET%20QU%E1%BA%A2%20R%C3%88N%20LUY%E1%BB%86N%20SINH%20VI%C3%8AN_0838.docx', '', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `t_request`
--

CREATE TABLE `t_request` (
  `id_request` int(10) NOT NULL,
  `tenYeuCau` varchar(255) NOT NULL,
  `id_nguoiGui` int(10) NOT NULL,
  `id_trangThai` int(10) NOT NULL,
  `tgGui` varchar(150) NOT NULL,
  `tgHoanThanh` varchar(150) NOT NULL,
  `ghiChuSV` text NOT NULL,
  `ghiChuCBMC` text NOT NULL,
  `ghiChuCBPB` text NOT NULL,
  `urlFile` varchar(255) NOT NULL,
  `phongTiepNhan` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `t_request`
--

INSERT INTO `t_request` (`id_request`, `tenYeuCau`, `id_nguoiGui`, `id_trangThai`, `tgGui`, `tgHoanThanh`, `ghiChuSV`, `ghiChuCBMC`, `ghiChuCBPB`, `urlFile`, `phongTiepNhan`) VALUES
(21, 'Phiếu đánh giá điểm rèn luyện', 1, 1, '1622626838278', '', '<p>test</p>\n', '', '', '1622626838278_test.pdf', 1),
(22, 'Phiếu đánh giá điểm rèn luyện', 1, 3, '1622652459154', '', '', '', '', '1622652459154_test.pdf', 1),
(23, 'Giấy xác nhận không nợ', 1, 2, '1622742363147', '6/6/2021', '', 'Đơn đạt yêu cầu ', 'Đã in và đóng dấu', '1622742363147_142406_1. Giấy xác nhận không nợ.pdf', 2),
(24, 'Giấy xác nhận không nợ', 1, 10, '1622813757190', '', '<p>Thầy c&ocirc; xem hộ em đơn n&agrave;y với, em đang cần gấp ạ. Em xin cảm ơn</p>\n', '', '', '1622813757190_142406_1. Giấy xác nhận không nợ.pdf', 2),
(25, 'Phiếu đánh giá điểm rèn luyện', 1, 3, '1622887407904', '', '<p>Thầy c&ocirc; gi&uacute;p em với ạ</p>\n', '', '', '1622887407904_test.pdf', 1),
(26, 'Phiếu đánh giá điểm rèn luyện', 1, 1, '1622913441162', '', '<p>12312321321</p>\n', '', '', '1622913441162_test.pdf', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `t_status`
--

CREATE TABLE `t_status` (
  `id` int(10) NOT NULL,
  `tenTrangThai` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `t_status`
--

INSERT INTO `t_status` (`id`, `tenTrangThai`) VALUES
(1, 'Sinh viên gửi yêu cầu lên cán bộ một cửa\r\n'),
(2, 'Đã Hoàn Thành'),
(3, 'Không Được Duyệt'),
(4, 'Đơn Gửi Lên Phòng Công Tác Sinh Viên'),
(5, 'Đơn gửi lên phòng Đào Tạo'),
(6, 'Đơn gửi lên phòng Cơ Sở Vật Chất'),
(7, 'Đơn gửi lên phòng Tài Chính'),
(8, 'Đơn gửi lên phòng Y Tế\r\n'),
(9, 'Phòng Công Tác Sinh Viên trả kết quả'),
(10, 'Phòng Đào Tạo trả kết quả'),
(11, 'Phòng Cơ Sở Vật Chất trả kết quả'),
(12, 'Phòng Tài Chính trả kết quả'),
(13, 'Phòng Y Tế trả kết quả\r\n');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `t_user`
--

CREATE TABLE `t_user` (
  `id` int(10) NOT NULL,
  `ma` varchar(10) NOT NULL,
  `tenUser` varchar(255) NOT NULL,
  `email` varchar(150) NOT NULL,
  `matKhau` varchar(150) NOT NULL,
  `quyen` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `t_user`
--

INSERT INTO `t_user` (`id`, `ma`, `tenUser`, `email`, `matKhau`, `quyen`) VALUES
(1, '1811060606', 'Nguyễn Văn A', 'nguyenvana@gmail.com', '1', 'Sinh Viên'),
(2, 'CBMC000001', 'Nguyễn Bá X', 'nguyenbax@gmail.com', '1', 'Cán Bộ Một Cửa'),
(3, 'CBPB000001', 'Le Van A', 'levana@gmail.com', '1', 'Đào tạo');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `t_department`
--
ALTER TABLE `t_department`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `t_file`
--
ALTER TABLE `t_file`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kn_phongban` (`id_phongban`);

--
-- Chỉ mục cho bảng `t_request`
--
ALTER TABLE `t_request`
  ADD PRIMARY KEY (`id_request`),
  ADD KEY `kn_idNguoiGui_id_user` (`id_nguoiGui`),
  ADD KEY `kn_trangThai` (`id_trangThai`),
  ADD KEY `kn_phongtiepnhan` (`phongTiepNhan`);

--
-- Chỉ mục cho bảng `t_status`
--
ALTER TABLE `t_status`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `t_user`
--
ALTER TABLE `t_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ma` (`ma`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `t_department`
--
ALTER TABLE `t_department`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `t_file`
--
ALTER TABLE `t_file`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `t_request`
--
ALTER TABLE `t_request`
  MODIFY `id_request` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT cho bảng `t_user`
--
ALTER TABLE `t_user`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `t_file`
--
ALTER TABLE `t_file`
  ADD CONSTRAINT `kn_phongban` FOREIGN KEY (`id_phongban`) REFERENCES `t_department` (`id`);

--
-- Các ràng buộc cho bảng `t_request`
--
ALTER TABLE `t_request`
  ADD CONSTRAINT `kn_idNguoiGui_id_user` FOREIGN KEY (`id_nguoiGui`) REFERENCES `t_user` (`id`),
  ADD CONSTRAINT `kn_phongtiepnhan` FOREIGN KEY (`phongTiepNhan`) REFERENCES `t_department` (`id`),
  ADD CONSTRAINT `kn_trangThai` FOREIGN KEY (`id_trangThai`) REFERENCES `t_status` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
