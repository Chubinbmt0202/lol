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
    }
};

module.exports = StudentModel;