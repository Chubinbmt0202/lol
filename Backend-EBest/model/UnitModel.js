const { pool } = require("../config/db");

const UnitModel = {
    getChuongByCourseAndClass: (courseId, classId, callback) => {
        const query = `
            SELECT chuong.*, lop.tenLop, khoahoc.tenKhoaHoc
            FROM chuong
            JOIN lop ON chuong.idLop = lop.idLop
            JOIN khoahoc ON lop.idKhoaHoc = khoahoc.idKhoaHoc
            WHERE khoahoc.idKhoaHoc = ? AND lop.idLop = ?;
        `;
        
        pool.query(query, [courseId, classId], (err, results) => {
            if (err) {
                console.error("Database query error:", err); // Log lỗi cụ thể
                return callback({
                    error: 1,
                    success: 0,
                    message: "Lỗi khi truy vấn dữ liệu: " + err,
                });
            }
            callback(null, results);
        });
    },

    addUnit: (idLop, tenChuong, moTa, idKhoaHoc, callback) => {
        console.log("idLop:", idLop);   
        console.log("tenChuong:", tenChuong);
        console.log("moTa:", moTa);
        console.log("idKhoaHoc:", idKhoaHoc);
        const query = `
            INSERT INTO chuong (idLop, tenChuong, moTa, idKhoaHoc)
            VALUES (?, ?, ?, ?);
        `;

        pool.query(query, [idLop, tenChuong, moTa, idKhoaHoc], (err, results) => {
            if (err) {
                console.error("Lỗi khi thêm chương:", err);
                return callback(err);  // Trả trực tiếp err (không bọc thêm error, success)
            }
            callback(null, {  // Nếu không có lỗi, err là null
                error: 0,
                success: 1,
                message: "Thêm chương thành công",
                data: results,
            });
        });
        
        
        
    }
    
}

module.exports = UnitModel;