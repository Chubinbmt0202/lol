USE ebest;

CREATE TABLE nguoidung (
    idnguoidung INT PRIMARY KEY AUTO_INCREMENT,
    hoTen VARCHAR(100) NOT NULL,
    userName VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    matkhau VARCHAR(100) NOT NULL,
    sdt VARCHAR(15),
    diachi VARCHAR(255),
    vaitro VARCHAR(50),
    trangthai VARCHAR(50),
    ngaydangki TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE giaovien (
    idgiaovien INT PRIMARY KEY AUTO_INCREMENT,
    idnguoidung INT NOT NULL,
    monhoc VARCHAR(100),
    trangthai VARCHAR(50),
    ngaythamgia TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idnguoidung) REFERENCES nguoidung(idnguoidung) ON DELETE CASCADE,
    INDEX (idnguoidung)
);

CREATE TABLE giaovu (
    idgiaovu INT PRIMARY KEY AUTO_INCREMENT,
    idnguoidung INT NOT NULL,
    phongban VARCHAR(100),
    trangthai VARCHAR(50),
    ngaythamgia TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idnguoidung) REFERENCES nguoidung(idnguoidung) ON DELETE CASCADE,
    INDEX (idnguoidung)
);

CREATE TABLE hocvien (
    idhocvien INT PRIMARY KEY AUTO_INCREMENT,
    idnguoidung INT NOT NULL,
    lop VARCHAR(100),
    trangthai VARCHAR(50),
    ngaydangki TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idnguoidung) REFERENCES nguoidung(idnguoidung) ON DELETE CASCADE,
    INDEX (idnguoidung)
);

CREATE TABLE khoahoc (
    idKhoaHoc INT PRIMARY KEY AUTO_INCREMENT,
    tenKhoaHoc VARCHAR(100) NOT NULL,
    mota TEXT,
    hocPhi DECIMAL(10, 2),
    soLuongLop int,
    ngayTao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE lop (
    idLop INT PRIMARY KEY AUTO_INCREMENT,  -- Mã lớp học
    tenLop VARCHAR(100) NOT NULL,  -- Tên lớp học
    soLuongHocVien INT,  -- Số lượng học viên
    ngayMoLop DATE,  -- Ngày mở lớp
    ngayKetThuc DATE,  -- Ngày kết thúc lớp
    phongHoc VARCHAR(100),  -- Phòng học
    idGiaoVien INT,  -- Liên kết với bảng giaovien
    idKhoaHoc INT,  -- Liên kết với bảng khoahoc
    ngayTao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Thời gian tạo lớp học
    FOREIGN KEY (idGiaoVien) REFERENCES giaovien(idgiaovien),  -- Khóa ngoại liên kết với bảng giaovien
    FOREIGN KEY (idKhoaHoc) REFERENCES khoahoc(idKhoaHoc)  -- Khóa ngoại liên kết với bảng khoahoc
);

CREATE TABLE lop_lichhoc (
    idLichHoc INT PRIMARY KEY AUTO_INCREMENT,  -- Mã lịch học
    idLop INT,  -- Liên kết với bảng lop
    ngayHoc VARCHAR(10),  -- Ngày học trong tuần (ví dụ: 'Thứ 2', 'Thứ 3', ...)
    gioHoc TIME,  -- Giờ bắt đầu lớp học
    gioKetThuc TIME,  -- Giờ kết thúc lớp học
    FOREIGN KEY (idLop) REFERENCES lop(idLop)  -- Khóa ngoại liên kết với bảng lop
);


CREATE TABLE chuong (
    idChuong INT PRIMARY KEY AUTO_INCREMENT,
    idLop INT,  -- Liên kết với bảng lop
    tenChuong VARCHAR(100) NOT NULL,
    moTa TEXT,
    idKhoaHoc INT,  -- Liên kết với bảng khoahoc
    FOREIGN KEY (idLop) REFERENCES lop(idLop),
    FOREIGN KEY (idKhoaHoc) REFERENCES khoahoc(idKhoaHoc)  -- Liên kết với khóa học
);


CREATE TABLE baihoc (
    idBaiHoc INT PRIMARY KEY AUTO_INCREMENT,
    idChuong INT NOT NULL,
    tenBaiHoc VARCHAR(100) NOT NULL,
    moTa TEXT,
    FOREIGN KEY (idChuong) REFERENCES chuong(idChuong)
);

CREATE TABLE cauhoi (
    idCauHoi INT PRIMARY KEY AUTO_INCREMENT,
    idBaiHoc INT NOT NULL,
    imageCauHoi VARCHAR(255),
    tenCauHoi VARCHAR(255) NOT NULL,
    audio VARCHAR(255),
    tagCauHoi VARCHAR(255),
    luaChon TEXT NOT NULL,
    dapAnDung TEXT NOT NULL,
    diem DECIMAL(5, 2),
    FOREIGN KEY (idBaiHoc) REFERENCES baihoc(idBaiHoc)
);

CREATE TABLE dapanhocvien (
    idDapAnHocVien INT PRIMARY KEY AUTO_INCREMENT,
    idCauHoi INT NOT NULL,
    idNguoiDung INT NOT NULL,
    luaChon TEXT NOT NULL,
    FOREIGN KEY (idCauHoi) REFERENCES cauhoi(idCauHoi),
    FOREIGN KEY (idNguoiDung) REFERENCES nguoidung(idnguoidung)
);

CREATE TABLE bode (
    idBoDe INT PRIMARY KEY AUTO_INCREMENT,
    idCauHoi INT NOT NULL,
    ngayTao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    idNguoiDung INT NOT NULL,
    FOREIGN KEY (idCauHoi) REFERENCES cauhoi(idCauHoi),
    FOREIGN KEY (idNguoiDung) REFERENCES nguoidung(idnguoidung)
);

CREATE TABLE thithu (
    idBaithi INT PRIMARY KEY AUTO_INCREMENT,
    idNguoiDung INT NOT NULL,
    idBoDe INT NOT NULL,
    diem DECIMAL(5, 2),
    thoigianBatDau TIMESTAMP,
    thoigianKetThuc TIMESTAMP,
    ngayTao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idNguoiDung) REFERENCES nguoidung(idnguoidung),
    FOREIGN KEY (idBoDe) REFERENCES bode(idBoDe)
);

CREATE TABLE dangkykhoahoc (
    idDangKy INT AUTO_INCREMENT PRIMARY KEY,
    idNguoiDung INT NOT NULL,
    idKhoaHoc INT NOT NULL,
    idLop INT NOT NULL,
    thoiGianDangKy DATETIME NOT NULL,
    trangThaiThanhToan VARCHAR(50) NOT NULL,
    FOREIGN KEY (idNguoiDung) REFERENCES nguoidung(idnguoidung),
    FOREIGN KEY (idKhoaHoc) REFERENCES khoahoc(idKhoaHoc),
    FOREIGN KEY (idLop) REFERENCES lop(idLop)
);