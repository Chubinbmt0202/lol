const { pool } = require('../config/db');
const bcrypt = require('bcrypt'); // Sử dụng bcrypt để mã hóa mật khẩu

const TeacherModel = {
    getAllTeachers: (callback) => {
        // Truy vấn lấy thông tin giáo viên và tên của họ từ bảng nguoidung
        pool.query(
            `SELECT idnguoidung, hoTen
                FROM nguoidung
                WHERE vaitro = 'giaovien';`, 
            (err, results) => {
                if (err) {
                    console.error('Database query error:', err); // Log lỗi
                    return callback({
                        error: 1,
                        success: 0,
                        message: 'Database query failed with error: ' + err
                    });
                }
                return callback(null, {
                    success: 1,
                    data: results,
                    message: 'Query successfully executed'
                });
            }
        );
    },    

    loginTeacher: (email, password, callback) => {
        // Kiểm tra xem email có tồn tại trong bảng nguoidung và là giáo viên không
        pool.query('SELECT * FROM nguoidung WHERE email = ? AND vaitro = "giaovien"', [email], (err, results) => {
            if (err) {
                console.error('Database query error:', err);
                return callback({ error: 1, success: 0, message: 'Database query failed with error: ' + err });
            }
            if (results.length === 0) {
                return callback(null, { success: 0, message: 'Invalid email or password' });
            }
            const user = results[0];
            // So sánh mật khẩu trực tiếp
            if (password !== user.matkhau) {
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
        });
    }
};

module.exports = TeacherModel;