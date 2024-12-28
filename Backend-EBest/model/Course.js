const { pool } = require('../config/db');

const CourseModel = {
    registerCourse: (data, callback) => {
        const { idNguoiDung, idKhoaHoc, trangThaiThanhToan, idLop } = data;
        const thoiGianDangKy = new Date().toISOString().slice(0, 19).replace("T", " ");  // Chuyển đổi sang định dạng 'YYYY-MM-DD HH:MM:SS'
    
        // Debugging: Log the values and types of the parameters
        console.log('idNguoiDung:', idNguoiDung, typeof idNguoiDung);
        console.log('idKhoaHoc:', idKhoaHoc, typeof idKhoaHoc);
        console.log('trangThaiThanhToan:', trangThaiThanhToan, typeof trangThaiThanhToan);
        console.log('idLop:', idLop, typeof idLop);
        console.log('thoiGianDangKy:', thoiGianDangKy, typeof thoiGianDangKy);
    
        try {
            pool.query(
                'INSERT INTO dangkykhoahoc (idNguoiDung, idKhoaHoc, trangThaiThanhToan, idLop, thoiGianDangKy) VALUES (?, ?, ?, ?, ?)',
                [idNguoiDung, idKhoaHoc, trangThaiThanhToan, idLop, thoiGianDangKy],
                (err, results) => {
                    if (err) {
                        console.error('Database query error:', err);
                        return callback({ error: 1, success: 0, message: 'Database query failed', error: err });
                    }
                    return callback(null, { success: 1, message: 'Course registration successful', idDangKy: results.insertId });
                }
            );
        } catch (error) {
            console.error('Database query error:', error);
            return callback({ error: 1, success: 0, message: 'Database query failed', error: error });
        }
    },
    

    createCourse: (data, callback) => {
        const { tenKhoaHoc, mota, hocPhi, soLuongLop } = data;
        console.log('tenKhoaHoc:', tenKhoaHoc, typeof tenKhoaHoc);
        console.log('moTa:', mota, typeof mota);
        console.log('hocPhi:', hocPhi, typeof hocPhi);
        console.log('soLuongLop:', soLuongLop, typeof soLuongLop);

        try {
            pool.query(
                'INSERT INTO khoahoc (tenKhoaHoc, moTa, hocPhi, soLuongLop) VALUES (?, ?, ?, ?)',
                [tenKhoaHoc, mota, hocPhi, soLuongLop],
                (err, results) => {
                    if (err) {
                        console.error('Database query error:', err);
                        return callback({ error: 1, success: 0, message: 'Database query failed', error: err });
                    }
                    return callback(null, { success: 1, message: 'Course created successfully', idKhoaHoc: results.insertId });
                }
            );
        }
        catch (error) {
            console.error('Database query error:', error);
            return callback({ error: 1, success: 0, message: 'Database query failed', error: error });
        }
    },

    getAllCourse: (callback) => {
        try
        {
            pool.query(
                'SELECT * FROM khoahoc',
                (err, results) => {
                    if (err) {
                        console.error('Database query error:', err);
                        return callback({ error: 1, success: 0, message: 'Database query failed', error: err });
                    }
                    return callback(null, { success: 1, message: 'Course created successfully', data: results });
                }
            );
        }
        catch (error) {
            console.error('Database query error:', error);
            return callback({ error: 1, success: 0, message: 'Database query failed', error: error });
        }
    },

    getCourseById: (idKhoaHoc, callback) => {
        try {
            pool.query(
                `SELECT
                    k.idKhoaHoc,
                    k.tenKhoaHoc,
                    k.mota AS moTaKhoaHoc,
                    k.hocPhi,
                    l.idLop,
                    l.tenLop,
                    l.soLuongHocVien,
                    l.ngayMoLop,
                    l.ngayKetThuc,
                    l.phongHoc,
                    g.idgiaovien,
                    n.hoTen AS tenGiaoVien, -- Lấy tên giáo viên từ nguoidung
                    g.trangthai AS trangThaiGiaoVien,
                    lh.ngayHoc,
                    lh.gioHoc,
                    lh.gioKetThuc
                FROM
                    khoahoc k
                LEFT JOIN
                    lop l ON k.idKhoaHoc = l.idKhoaHoc
                LEFT JOIN
                    giaovien g ON l.idGiaoVien = g.idgiaovien
                LEFT JOIN
                    nguoidung n ON g.idnguoidung = n.idnguoidung
                LEFT JOIN
                    lop_lichhoc lh ON l.idLop = lh.idLop
                WHERE
                    k.idKhoaHoc = ?`,
                [idKhoaHoc],
                (err, results) => {
                    if (err) {
                        console.error('Database query error:', err);
                        return callback({ error: 1, success: 0, message: 'Database query failed', error: err });
                    }
    
                    // Kiểm tra nếu không có kết quả
                    if (results.length === 0) {
                        return callback(null, { success: 0, message: 'Course not found' });
                    }
    
                    // Tạo một cấu trúc dữ liệu để nhóm các lớp học theo khóa học
                    const courseDetails = {
                        ...results[0], // Thông tin khóa học
                        classes: []     // Mảng chứa thông tin các lớp học
                    };
    
                    // Lặp qua các kết quả và phân loại theo lớp học
                    results.forEach(result => {
                        const classData = {
                            idLop: result.idLop,
                            tenLop: result.tenLop,
                            soLuongHocVien: result.soLuongHocVien,
                            ngayMoLop: result.ngayMoLop,
                            ngayKetThuc: result.ngayKetThuc,
                            phongHoc: result.phongHoc,
                            tenGiaoVien: result.tenGiaoVien,
                            trangThaiGiaoVien: result.trangThaiGiaoVien,
                            ngayHoc: result.ngayHoc,
                            gioHoc: result.gioHoc,
                            gioKetThuc: result.gioKetThuc,
                        };
    
                        // Thêm lớp vào mảng các lớp của khóa học
                        courseDetails.classes.push(classData);
                    });
    
                    // Trả về thông tin khóa học và các lớp
                    return callback(null, { success: 1, message: 'Course details retrieved successfully', data: courseDetails });
                }
            );
        } catch (error) {
            console.error('Database query error:', error);
            return callback({ error: 1, success: 0, message: 'Database query failed', error: error });
        }
    }
    
};

module.exports = CourseModel;