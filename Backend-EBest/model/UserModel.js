const { get } = require("mongoose");
const { pool } = require("../config/db");

async function getAllUsers() {
  try {
    const query =
      "SELECT * FROM NguoiDung WHERE vaitro IN ('Admin', 'giaovien')";
    const [rows] = await pool.promise().query(query);
    console.log("Query results:", rows);

    return {
      success: 1,
      data: rows,
      message: "Query successfully",
    };
  } catch (err) {
    console.error("Database query error:", err);
    return {
      error: 1,
      success: 0,
      message: "Database query failed with error: " + err.message,
    };
  }
}

/**
 * Get a user by ID.
 * @param {number} id - User ID.
 * @returns {Promise<{ success: number, data: any, message: string }>}
 */
async function getUserById(id) {
  try {
    const [results] = await pool
      .promise()
      .query("SELECT * FROM NguoiDung WHERE idNguoiDung = ?", [id]);
    return {
      success: 1,
      data: results,
      message: "Query successfully",
    };
  } catch (err) {
    console.error("Database query error:", err);
    return {
      error: 1,
      success: 0,
      message: "Database query failed with error: " + err.message,
    };
  }
}

async function createUser(data) {
  try {
    console.log("Data ở model", data);

    // Bắt đầu giao dịch
    await pool.promise().query("START TRANSACTION");

    // Thêm người dùng mới vào bảng nguoidung
    const queryNguoiDung = `INSERT INTO nguoidung (idnguoidung, hoTen, userName, email, matkhau, sdt, diachi, vaitro, trangthai) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const resultNguoiDung = await pool.promise().query(queryNguoiDung, [
      data.id, // idnguoidung từ dữ liệu truyền vào
      data.name, // hoTen
      data.userName, // userName
      data.email, // email
      data.password, // matkhau
      data.phone, // sdt
      data.address || "diachi", // diachi (sử dụng "diachi" nếu data.address không có)
      "hocvien", // vaitro
      data.statusLearn, // trangthai
    ]);

    const idNguoiDung = data.id;
    console.log("ID nguoi dung", idNguoiDung);

    // Kiểm tra giá trị idKhoaHoc
    const queryCheckKhoaHoc = `SELECT * FROM khoahoc WHERE idKhoaHoc = ?`;
    const [resultCheckKhoaHoc] = await pool
      .promise()
      .query(queryCheckKhoaHoc, [data.course]);

    if (resultCheckKhoaHoc.length === 0) {
      // Thêm khóa học nếu chưa tồn tại
      const queryInsertKhoaHoc = `INSERT INTO khoahoc (idKhoaHoc, tenKhoaHoc) VALUES (?, ?)`;
      await pool
        .promise()
        .query(queryInsertKhoaHoc, [data.course, "Tên khóa học"]); // Bạn có thể thay 'Tên khóa học' bằng giá trị phù hợp
    }

    // Thêm thông tin học viên vào bảng hocvien
    const queryHocVien = `INSERT INTO hocvien (idnguoidung, lop, trangthai) VALUES (?, ?, ?)`;
    const resultHocVien = await pool.promise().query(queryHocVien, [
      idNguoiDung,
      data.course, // Khoá học
      data.statusLearn, // Trạng thái học viên
    ]);

    // Thêm thông tin đăng ký khóa học vào bảng dangkykhoahoc
    const queryDangKyKhoaHoc = `INSERT INTO dangkykhoahoc (idNguoiDung, idKhoaHoc, thoiGianDangKy, trangThaiThanhToan) VALUES (?, ?, NOW(), ?)`;
    const resultDangKyKhoaHoc = await pool.promise().query(queryDangKyKhoaHoc, [
      idNguoiDung,
      data.course, // ID khóa học
      "chua thanh toan", // Trạng thái thanh toán
    ]);

    // Kết thúc giao dịch
    await pool.promise().query("COMMIT");

    return {
      success: 1,
      data: {
        nguoiDung: resultNguoiDung,
        hocVien: resultHocVien,
        dangKyKhoaHoc: resultDangKyKhoaHoc,
      },
      message: "Thêm học viên thành công ",
    };
  } catch (err) {
    // Rollback giao dịch nếu có lỗi
    await pool.promise().query("ROLLBACK");
    console.error("Database query error:", err);
    return {
      error: 1,
      success: 0,
      message: "Database query failed with error: " + err.message,
    };
  }
}

async function getStudentplaces() {
  const query = `
      SELECT 
          hv.idhocvien, 
          nd.hoTen, 
          nd.email, 
          hv.lop, 
          hv.trangthai, 
          hv.ngaydangki,
          kh.tenKhoaHoc,
          kh.hocPhi,
          dk.trangThaiThanhToan
      FROM 
          hocvien hv
      JOIN 
          nguoidung nd ON hv.idnguoidung = nd.idnguoidung
      JOIN 
          dangkykhoahoc dk ON nd.idnguoidung = dk.idnguoidung
      JOIN 
          khoahoc kh ON dk.idKhoaHoc = kh.idKhoaHoc
      WHERE 
          hv.trangthai = 'chờ xếp lớp';
  `;

  try {
      const [rows, fields] = await pool.promise().query(query);
      console.log('Query Result:', rows); // Log the result for debugging
      return rows;
  } catch (error) {
      console.error('Error executing query', error);
      throw error;
  }
}

/**
 * Log in as an admin user.
 * @param {Object} data - Login credentials.
 * @param {string} data.email - Admin email.
 * @param {string} data.matKhau - Admin password.
 * @returns {Promise<{ success: number, data: any, message: string }>}
 */
async function login(userName, matKhau, vaiTro) {
  console.log("Dữ liệu ở model", userName, matKhau, vaiTro);
  try {
    if (!userName || !matKhau) {
      throw new Error("Thiếu thông tin: userName hoặc matKhau");
    }

    const queryStartTime = Date.now();
    const query =
      "SELECT * FROM nguoidung WHERE userName = ? AND matKhau = ? AND vaiTro = ?";
    
    // Sử dụng pool.query trực tiếp từ mysql2/promise
    const [rows] = await pool.promise().query(query, [userName, matKhau, vaiTro]);

    console.log("Kết quả truy vấn", rows);

    if (rows.length === 0) {
      return {
        success: 0,
        message: "Không tìm thấy người dùng phù hợp",
      };
    } else {
      return {
        success: 1,
        data: rows[0], // Trả về thông tin của người dùng đầu tiên tìm thấy
        message: "Đăng nhập thành công",
      };
    }
  } catch (err) {
    console.error("Lỗi truy vấn cơ sở dữ liệu:", err);
    return {
      error: 1,
      success: 0,
      message: "Lỗi truy vấn cơ sở dữ liệu: " + err.message,
    };
  }
}



module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  login,
  getStudentplaces,
};
