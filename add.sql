-- Thêm dữ liệu vào bảng nguoidung
INSERT INTO nguoidung (hoTen, userName, email, matkhau, sdt, diachi, vaitro, trangthai) VALUES
('Nguyen Thi D', 'nguyenthid', 'nguyenthid@example.com', 'password123', '0912345678', '123 XYZ Street', 'hocvien', 'active'),
('Pham Minh E', 'phaminhe', 'phaminhe@example.com', 'password123', '0923456789', '456 LMN Street', 'giaovien', 'active'),
('Nguyen Hoang F', 'nguyenhoangf', 'nguyenhoangf@example.com', 'password123', '0934567890', '789 OPQ Street', 'giaovu', 'active');

-- Thêm dữ liệu vào bảng giaovien
INSERT INTO giaovien (idnguoidung, monhoc) VALUES
(2, 'Tieng Anh Co Ban'),
(2, 'Tieng Anh Nang Cao'),
(2, 'Toan Cao Cap');

-- Thêm dữ liệu vào bảng giaovu
INSERT INTO giaovu (idnguoidung, phongban) VALUES
(3, 'Phong Dao Tao'),
(3, 'Phong Quan Ly');

-- Thêm dữ liệu vào bảng hocvien
INSERT INTO hocvien (idnguoidung, lop) VALUES
(1, 'Lop A1'),
(1, 'Lop C1'),
(1, 'Lop B1');

-- Thêm dữ liệu vào bảng khoahoc
INSERT INTO khoahoc (tenKhoaHoc, mota, hocPhi) VALUES
('Tieng Anh Co Ban', 'Khoa hoc danh cho nguoi moi bat dau.', 5000000),
('Tieng Anh Nang Cao', 'Khoa hoc danh cho nguoi da co kien thuc co ban.', 7000000),
('Toan Cao Cap', 'Khoa hoc danh cho sinh vien dai hoc.', 8000000);

-- Thêm dữ liệu vào bảng lop
INSERT INTO lop (tenLop, soLuongHocVien, ngayMoLop, ngayKetThuc, phongHoc, idGiaoVien, idKhoaHoc) VALUES 
('Lớp học Tiếng Anh', 30, '2024-01-01', '2024-06-30', 'Phòng 101', 1, 1),
('Lớp học Tiếng Anh', 30, '2024-01-01', '2024-06-30', 'Phòng 101', 1, 1),
('Lớp học Tiếng Anh', 30, '2024-01-01', '2024-06-30', 'Phòng 101', 2, 2);

INSERT INTO lop_lichhoc (idLop, ngayHoc, gioHoc, gioKetThuc)
VALUES (1, 'Thứ 2', '09:00:00', '11:00:00');

-- Thêm dữ liệu vào bảng chuong
INSERT INTO chuong (idLop, tenChuong) VALUES
(1, 'Chuong 1: Nhap mon'),
(2, 'Chuong 2: Nghe noi'),
(3, 'Chuong 3: Toan cao cap');

-- Thêm dữ liệu vào bảng baihoc
INSERT INTO baihoc (idChuong, tenBaiHoc) VALUES
(1, 'Bai Hoc 1: Phat am'),
(2, 'Bai Hoc 2: Tu vung'),
(3, 'Bai Hoc 3: Tich phan');

-- Thêm dữ liệu vào bảng cauhoi
INSERT INTO cauhoi (idBaiHoc, imageCauHoi, tenCauHoi, audio, tagCauHoi, luaChon, dapAnDung, diem) VALUES
(1, NULL, 'Cau hoi 1: Phat am tu "cat"', NULL, NULL, '[A] Cat [B] Bat [C] Mat [D] Sat', '[A]', 10),
(2, NULL, 'Cau hoi 2: Nghia cua tu "dog"', NULL, NULL, '[A] Cho [B] Meo [C] Ga [D] Vit', '[A]', 10),
(3, NULL, 'Cau hoi 3: Tich phan cua x^2', NULL, NULL, '[A] 2 [B] 3 [C] 4 [D] 5', '[C]', 15);

-- Thêm dữ liệu vào bảng dapanhocvien
INSERT INTO dapanhocvien (idCauHoi, idNguoiDung, luaChon) VALUES
(1, 1, '[A]'),
(2, 1, '[A]'),
(3, 1, '[C]');

-- Thêm dữ liệu vào bảng bode
INSERT INTO bode (idCauHoi, ngayTao, idNguoiDung) VALUES
(1, '2023-01-01 00:00:00', 1),
(2, '2023-01-01 00:00:00', 1),
(3, '2023-01-01 00:00:00', 1);

-- Thêm dữ liệu vào bảng thithu
INSERT INTO thithu (idNguoiDung, idBoDe, diem, thoigianBatDau, thoigianKetThuc, ngayTao) VALUES
(1, 1, 9.5, '2023-01-01 08:00:00', '2023-01-01 10:00:00', '2023-01-01 00:00:00'),
(1, 2, 8.0, '2023-01-02 08:00:00', '2023-01-02 10:00:00', '2023-01-02 00:00:00'),
(1, 3, 12.5, '2023-01-03 08:00:00', '2023-01-03 10:00:00', '2023-01-03 00:00:00');

-- Thêm dữ liệu vào bảng dangkykhoahoc
-- Thêm dữ liệu vào bảng dangkykhoahoc
INSERT INTO dangkykhoahoc (idNguoiDung, idKhoaHoc, idLop, thoiGianDangKy, trangThaiThanhToan) VALUES
(1, 1, 1, '2023-01-01 08:00:00', 'Chua Thanh Toan'),
(1, 2, 1, '2023-01-02 09:00:00', 'Chua Thanh Toan'),
(1, 3, 1,'2023-01-03 10:00:00', 'Da Thanh Toan');


-- Thêm dữ liệu vào bảng lop
INSERT INTO lop (tenLop, soLuongHocVien, idKhoaHoc) VALUES
('Lop A1', 30, 1),
('Lop B1', 25, 2),
('Lop C1', 20, 3);
