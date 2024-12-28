const { pool } = require("../config/db");

const ClassModel = {
  getAllClasses: (callback) => {
    pool.query("SELECT * FROM lop", (err, results) => {
      if (err) {
        console.error("Database query error:", err); // Log lỗi cụ thể
        return callback({
          error: 1,
          success: 0,
          message: "Lỗi khi truy vấn dữ liệu: " + err,
        });
      }
      return callback(null, {
        success: 1,
        data: results,
        message: "Truy vấn thành công",
      });
    });
  },

  createClass: (classData, callback) => {
    const {
      tenLop,
      soLuongHocVien,
      ngayMoLop,
      ngayKetThuc,
      phongHoc,
      idGiaoVien,
      idKhoaHoc,
      gioHocTheoNgay,
    } = classData;
    console.log("classData in model:", classData);
    pool.query(
      `INSERT INTO lop (tenLop, soLuongHocVien, ngayMoLop, ngayKetThuc, phongHoc, idGiaoVien, idKhoaHoc) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        tenLop,
        soLuongHocVien,
        ngayMoLop,
        ngayKetThuc,
        phongHoc,
        idGiaoVien,
        idKhoaHoc,
      ],
      (err, results) => {
        if (err) {
          console.error("Lỗi khi thêm lớp học:", err);
          return callback({
            error: 1,
            success: 0,
            message: "Lỗi khi thêm lớp học: " + err,
          });
        }

        const idLop = results.insertId;

        const scheduleValues = gioHocTheoNgay.map((item) => [
          idLop,
          item.ngay,
          item.gioBatDau,
          item.gioKetThuc,
        ]);

        pool.query(
          `INSERT INTO lop_lichhoc (idLop, ngayHoc, gioHoc, gioKetThuc) VALUES ?`,
          [scheduleValues],
          (err) => {
            if (err) {
              console.error("Lỗi khi thêm lịch học:", err);
              return callback({
                error: 1,
                success: 0,
                message: "Lỗi khi thêm lịch học: " + err,
              });
            }
            return callback(null, {
              success: 1,
              message: "Tạo lớp và lịch học thành công",
            });
          }
        );
      }
    );
  },

  // Hàm truy vấn lớp học theo khóa học
  getClassByCourses: (courseId, callback) => {
    console.log("courseId:", courseId);
    pool.query(
      `SELECT 
                lop.idLop,
                lop.tenLop,
                lop.soLuongHocVien,
                lop.ngayMoLop,
                lop.ngayKetThuc,
                nguoidung.hoTen AS tenGiaoVien,
                khoahoc.tenKhoaHoc
            FROM 
                lop
            INNER JOIN 
                giaovien ON lop.idGiaoVien = giaovien.idgiaovien
            INNER JOIN 
                nguoidung ON giaovien.idnguoidung = nguoidung.idnguoidung
            INNER JOIN 
                khoahoc ON lop.idKhoaHoc = khoahoc.idKhoaHoc
            WHERE 
                lop.idKhoaHoc = ?;`,
      [courseId],
      (err, results) => {
        if (err) {
          return callback({
            error: 1,
            success: 0,
            message: err,
          });
        }
        return callback(null, {
          success: 1,
          data: results,
        });
      }
    );
  },

  getClassByStudent: (idnguoidung, callback) => {
    pool.query(
      `SELECT 
            dk.idDangKy,
            kh.idKhoaHoc,
            kh.tenKhoaHoc,
            kh.mota AS moTaKhoaHoc,
            kh.hocPhi,
            l.idLop,
            l.tenLop,
            l.ngayMoLop,
            l.ngayKetThuc,
            l.phongHoc,
            dk.thoiGianDangKy,
            dk.trangThaiThanhToan
        FROM 
            dangkykhoahoc dk
        JOIN 
            khoahoc kh ON dk.idKhoaHoc = kh.idKhoaHoc
        JOIN 
            lop l ON dk.idLop = l.idLop
        JOIN 
            nguoidung nd ON dk.idNguoiDung = nd.idnguoidung
        WHERE 
            dk.idNguoiDung = ?
            AND nd.vaitro = 'hocvien';
        `,
      [idnguoidung],
      (err, results) => {
        if (err) {
          return callback({
            error: 1,
            success: 0,
            message: err,
          });
        }
        return callback(null, {
          success: 1,
          data: results,
        });
      }
    );
  },

  getClassByIdTeacher: (idnguoidung, callback) => {
    console.log("idnguoidung giáo viên:", idnguoidung);
    pool.query(
      `SELECT 
          l.tenLop, 
          l.idLop,
          l.idKhoaHoc,  -- Thêm id của khóa học
          k.tenKhoaHoc,  -- Thêm tên khóa học
          nd.hoTen, 
          l.phongHoc,  -- Thêm thông tin phòng học
          l.ngayMoLop, -- Thêm ngày mở lớp
          l.ngayKetThuc, -- Thêm ngày kết thúc lớp
          l.soLuongHocVien -- Thêm số lượng học viên trong lớp
      FROM lop l
      JOIN giaovien gv ON l.idGiaoVien = gv.idgiaovien
      JOIN nguoidung nd ON gv.idnguoidung = nd.idnguoidung
      JOIN khoahoc k ON l.idKhoaHoc = k.idKhoaHoc  -- Thêm JOIN với bảng khoahoc
      WHERE nd.vaitro = 'giaovien' AND nd.idnguoidung = ?`,
      [idnguoidung],
      (err, results) => {
        if (err) {
          return callback({
            error: 1,
            success: 0,
            message: err.message,
          });
        }
        return callback(null, {
          success: 1,
          data: results,
        });
      }
    );
  }
};

module.exports = ClassModel;
