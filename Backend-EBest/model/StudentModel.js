const { pool } = require('../config/db');
const bcrypt = require('bcrypt'); // Sử dụng bcrypt để mã hóa mật khẩu

const StudentModel = {
    loginStudent: async (email, password, callback) => {
        try {
            // Thực hiện truy vấn cơ sở dữ liệu
            const [results] = await pool.promise().query('SELECT * FROM nguoidung WHERE email = ? AND vaitro = "hocvien"', [email]);
    
            if (results.length === 0) {
                return callback(null, { success: 0, message: 'Invalid email or password' });
            }
    
            const user = results[0];
    
            // So sánh mật khẩu sử dụng bcrypt
            const match = await bcrypt.compare(password, user.matkhau);
            if (!match) {
                return callback(null, { success: 0, message: 'Invalid email or password' });
            }
    
            // Đăng nhập thành công
            return callback(null, {
                success: 1,
                message: 'Login successful',
                user: {
                    id: user.idnguoidung,
                    hoTen: user.hoTen,
                    email: user.email,
                    vaitro: user.vaitro
                }
            });
        } catch (err) {
            console.error('Database query error:', err);
            return callback({ error: 1, success: 0, message: 'Database query failed with error: ' + err });
        }
    },

    getStudentplaces: async () => {

        const sqlQuery = `
            SELECT
                nd.hoTen AS 'Họ Tên Học Viên',
                hv.lop AS 'Lớp',
                dk.trangThaiThanhToan AS 'Tình Trạng Học Phí',
                hv.trangthai AS 'Tình Trạng Học',
                nd.sdt AS 'Số Điện Thoại'
            FROM
                hocvien hv
            JOIN
                nguoidung nd ON hv.idnguoidung = nd.idnguoidung
            LEFT JOIN
                dangkykhoahoc dk ON dk.idNguoiDung = nd.idnguoidung
            ORDER BY
                nd.hoTen;
        `;

        try {
            const [results] = await pool.promise().query(sqlQuery);
            if (results.length === 0) {
                return { success: 0, message: 'Không có học viên nào' };
            } else {
                return { success: 1, data: results };
            }
        } catch (error) {
            return { error: 1, success: 0, message: 'Database query failed with error: ' + error.message };
        }
    },

    getAllStudent: async () => {
        const sqlQuery = `
            SELECT 
                nd.idnguoidung,
                nd.hoTen AS ho_va_ten,
                nd.userName AS ten_dang_nhap,
                nd.email,
                nd.ngaySinh AS ngay_sinh,
                nd.matkhau AS mat_khau,
                nd.sdt AS so_dien_thoai,
                nd.diachi AS dia_chi,
                nd.vaitro AS vai_tro,
                nd.gioiTinh AS gioi_tinh,
                hv.lop AS lop_hoc_dang_ky,
                hv.trangthai AS trang_thai_hoc_vien,
                hv.congViec AS cong_viec,
                hv.mucDichHoc AS muc_dich_hoc,
                hv.ngaydangki AS ngay_dang_ky
            FROM 
                nguoidung nd
            JOIN 
                hocvien hv ON nd.idnguoidung = hv.idnguoidung
            WHERE 
                nd.vaitro = 'hocvien';
        `;
        try {
            const [results] = await pool.promise().query(sqlQuery);
            if (results.length === 0) {
                return { success: 0, message: 'Không có học viên nào' };
            } else {
                return { success: 1, data: results };
            }
        } catch (error) {
            return { error: 1, success: 0, message: 'Database query failed with error: ' + error.message };
        }
    },

    addStudent: async (data) => {
        const { name, userName, email  , birthdate, password, phone, sex, job, mucdichHoc, statusSalary } = data;
        console.log("Data học viên", data);
        const connection = await pool.promise().getConnection();
        try {
            await connection.beginTransaction();

            // Thêm người dùng vào bảng nguoidung
            const [userResult] = await connection.query(
                `INSERT INTO nguoidung (hoTen, userName, email, ngaySinh, matkhau, sdt, vaitro, gioiTinh) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [name, userName, email, birthdate, password, phone, "hocvien", sex]
            );

            const idnguoidung = userResult.insertId;

            // Thêm học viên vào bảng hocvien
            await connection.query(
                `INSERT INTO hocvien (idnguoidung, lop, trangthai, congViec, mucDichHoc, ngaydangki) 
                VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
                [idnguoidung, '', statusSalary, job, mucdichHoc]
            );

            await connection.commit();

            return { success: 1, message: 'Student added successfully', idnguoidung };
        } catch (error) {
            await connection.rollback();
            return { error: 1, success: 0, message: 'Failed to add student with error: ' + error.message };
        } finally {
            connection.release();
        }
    },

    getStudentById: async (id) => {
        const sqlQuery = `
            SELECT 
                nd.idnguoidung,
                nd.hoTen AS ho_va_ten,
                nd.userName AS ten_dang_nhap,
                nd.email,
                nd.ngaySinh AS ngay_sinh,
                nd.matkhau AS mat_khau,
                nd.sdt AS so_dien_thoai,
                nd.diachi AS dia_chi,
                nd.vaitro AS vai_tro,
                nd.gioiTinh AS gioi_tinh,
                hv.lop AS lop_hoc_dang_ky,
                hv.trangthai AS trang_thai_hoc_vien,
                hv.congViec AS cong_viec,
                hv.mucDichHoc AS muc_dich_hoc,
                hv.ngaydangki AS ngay_dang_ky
            FROM 
                nguoidung nd
            JOIN 
                hocvien hv ON nd.idnguoidung = hv.idnguoidung
            WHERE 
                nd.idnguoidung = ?;
        `;
        try {
            const [results] = await pool.promise().query(sqlQuery, [id]);
            if (results.length === 0) {
                return { success: 0, message: 'Không tìm thấy học viên' };
            } else {
                return { success: 1, data: results[0] };
            }
        } catch (error) {
            return { error: 1, success: 0, message: 'Database query failed with error: ' + error.message };
        }
    },

    deleteStudent: async (id) => {
        console.log("ID học viên", id);
        const connection = await pool.promise().getConnection();
        try {
            await connection.beginTransaction();

            // Xóa học viên trong bảng hocvien
            await connection.query(`
                    DELETE FROM nguoidung 
                    WHERE idnguoidung = (SELECT idnguoidung FROM hocvien WHERE idhocvien = ?);
                `, [id]);

            await connection.commit();

            return { success: 1, message: 'Student deleted successfully' };
        } catch (error) {
            await connection.rollback();
            return { error: 1, success: 0, message: 'Failed to delete student with error: ' + error.message };
        } finally {
            connection.release();
        }
    }
        
};

module.exports = StudentModel;