USE ebest;

-- Thêm dữ liệu vào bảng nguoidung
INSERT INTO nguoidung (hoTen,userName, email, matkhau, sdt, diachi, vaitro, trangthai) VALUES
('Nguyen Van A','trunganh114', 'nguyenvana@example.com', 'password123', '0123456789', '123 ABC Street', 'hocvien', 'active'),
('Tran Thi B', 'trunganh114','tranthib@example.com', 'password123', '0987654321', '456 DEF Street', 'giaovien', 'active'),
('Le Van C', 'trunganh114','levanc@example.com', 'password123', '0123987654', '789 GHI Street', 'giaovu', 'active');

-- Thêm dữ liệu vào bảng giaovien
INSERT INTO giaovien (idnguoidung, monhoc) VALUES
(2, 'Tieng Anh Co Ban'),
(2, 'Tieng Anh Nang Cao');

-- Thêm dữ liệu vào bảng giaovu
INSERT INTO giaovu (idnguoidung, phongban) VALUES
(3, 'Phong Dao Tao'),
(3, 'Phong Quan Ly');

-- Thêm dữ liệu vào bảng hocvien
INSERT INTO hocvien (idnguoidung, lop) VALUES
(1, 'Lop A1'),
(1, 'Lop B1');

-- Thêm dữ liệu vào bảng khoahoc
INSERT INTO khoahoc (tenKhoaHoc, mota, hocPhi) VALUES
('Tieng Anh Co Ban', 'Khoa hoc danh cho nguoi moi bat dau.', 5000000),
('Tieng Anh Nang Cao', 'Khoa hoc danh cho nguoi da co kien thuc co ban.', 7000000);

-- Thêm dữ liệu vào bảng lop
INSERT INTO lop (tenLop, soLuongHocVien, idKhoaHoc) VALUES
('Lop A1', 30, 1),
('Lop B1', 25, 2);

-- Thêm dữ liệu vào bảng chuong
INSERT INTO chuong (idLop, tenChuong) VALUES
(1, 'Chuong 1: Nhap mon'),
(2, 'Chuong 2: Nghe noi');

-- Thêm dữ liệu vào bảng baihoc
INSERT INTO baihoc (idChuong, tenBaiHoc) VALUES
(1, 'Bai Hoc 1: Phat am'),
(2, 'Bai Hoc 2: Tu vung');

-- Thêm dữ liệu vào bảng cauhoi
INSERT INTO cauhoi (idBaiHoc, imageCauHoi, tenCauHoi, audio, tagCauHoi, luaChon, dapAnDung, diem) VALUES
(1, NULL, 'Cau hoi 1: Phat am tu "cat"', NULL, NULL, '[A] Cat [B] Bat [C] Mat [D] Sat', '[A]', 10),
(2, NULL, 'Cau hoi 2: Nghia cua tu "dog"', NULL, NULL, '[A] Cho [B] Meo [C] Ga [D] Vit', '[A]', 10);

-- Thêm dữ liệu vào bảng dapanhocvien
INSERT INTO dapanhocvien (idCauHoi, idNguoiDung, luaChon) VALUES
(1, 1, '[A]'),
(2, 1, '[A]');

-- Thêm dữ liệu vào bảng bode
INSERT INTO bode (idCauHoi, ngayTao, idNguoiDung) VALUES
(1, '2023-01-01 00:00:00', 1),
(2, '2023-01-01 00:00:00', 1);

-- Thêm dữ liệu vào bảng thithu
INSERT INTO thithu (idNguoiDung, idBoDe, diem, thoigianBatDau, thoigianKetThuc, ngayTao) VALUES
(1, 1, 9.5, '2023-01-01 08:00:00', '2023-01-01 10:00:00', '2023-01-01 00:00:00'),
(1, 2, 8.0, '2023-01-02 08:00:00', '2023-01-02 10:00:00', '2023-01-02 00:00:00');