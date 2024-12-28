USE ebest;

CREATE TABLE nguoidung (
    idnguoidung INT PRIMARY KEY AUTO_INCREMENT,
    hoTen VARCHAR(100) NOT NULL,
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
    ngayTao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE lop (
    idLop INT PRIMARY KEY AUTO_INCREMENT,
    tenLop VARCHAR(100) NOT NULL,
    soLuongHocVien INT,
    idChuong INT,
    idKhoaHoc INT,
    gioHoc TIME,
    gioKetThuc TIME,
    ngayTao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idKhoaHoc) REFERENCES khoahoc(idKhoaHoc)
);

CREATE TABLE chuong (
    idChuong INT PRIMARY KEY AUTO_INCREMENT,
    idLop INT,
    tenChuong VARCHAR(100) NOT NULL,
    moTa TEXT,
    FOREIGN KEY (idLop) REFERENCES lop(idLop)
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
    thoiGianDangKy DATETIME NOT NULL,
    trangThaiThanhToan VARCHAR(50) NOT NULL,
    FOREIGN KEY (idNguoiDung) REFERENCES nguoidung(idnguoidung),
    FOREIGN KEY (idKhoaHoc) REFERENCES khoahoc(idKhoaHoc)
);