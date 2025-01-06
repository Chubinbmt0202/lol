const { pool } = require("../config/db");

const ExcerciseModel = {
  createExercise: async (exercise) => {
    console.log("Dữ liệu ở model bài tập:", exercise);
    const connection = await pool.promise().getConnection();

    try {
      // Bắt đầu transaction
      await connection.beginTransaction();

      // Bước 1: Thêm bài học mới vào bảng baihoc
      const baihocQuery =
        "INSERT INTO baihoc (idChuong, tenBaiHoc, moTa, ngayNopBai) VALUES (?, ?, ?, ?)";
      const [baihocResult] = await connection.query(baihocQuery, [
        exercise.idChuong,
        exercise.name,
        "",
        exercise.ngayNopBai,
      ]);
      const idBaiHoc = baihocResult.insertId;

      // Bước 2: Thêm câu hỏi vào bảng cauhoi
      const cauhoiQuery =
        "INSERT INTO cauhoi (idBaiHoc, tenCauHoi, luaChon, dapAnDung, diem) VALUES (?, ?, ?, ?, ?)";
      for (const question of exercise.questions) {
        const luaChon = JSON.stringify(question.options);
        const dapAnDung = question.options[question.correctOption];
        await connection.query(cauhoiQuery, [
          idBaiHoc,
          question.content,
          luaChon,
          dapAnDung,
          question.points,
        ]);
      }

      // Commit transaction
      await connection.commit();

      console.log("Exercise created successfully");
    } catch (error) {
      // Rollback transaction nếu có lỗi
      await connection.rollback();
      console.error("Failed to create exercise:", error);
      throw error;
    } finally {
      // Giải phóng kết nối
      connection.release();
    }
  },

  // lấy tất cả câu hỏi
  getAllQuestions: async (idKhoaHoc, idLop, idChuong) => {
    try {
      const [rows] = await pool.promise().query(
        `
        SELECT 
            c.idCauHoi,
            c.tenCauHoi,
            c.luaChon,
            c.dapAnDung,
            c.diem, -- Include the score of each question
            bh.tenBaiHoc,
            bh.ngayNopBai, -- Include the submission time of each lesson
            nb.trangThai, -- Include the submission status of each lesson
            dhv.luaChon AS luaChonHocVien, -- Include the student's answer
            ch.tenChuong,
            l.tenLop,
            kh.tenKhoaHoc,
            nd.hoTen AS tenHocVien -- Include the student's name
        FROM 
            cauhoi c
        JOIN 
            baihoc bh ON c.idBaiHoc = bh.idBaiHoc
        JOIN 
            chuong ch ON bh.idChuong = ch.idChuong
        JOIN 
            lop l ON ch.idLop = l.idLop
        JOIN 
            khoahoc kh ON l.idKhoaHoc = kh.idKhoaHoc
        LEFT JOIN 
            nopbai nb ON bh.idBaiHoc = nb.idBaiHoc
        LEFT JOIN 
            dapanhocvien dhv ON c.idCauHoi = dhv.idCauHoi AND nb.idNguoiDung = dhv.idNguoiDung -- Join to get the student's answer
        LEFT JOIN 
            nguoidung nd ON nb.idNguoiDung = nd.idnguoidung -- Join to get the student's name
        WHERE 
            kh.idKhoaHoc = ?
            AND l.idLop = ?
            AND ch.idChuong = ?
            `,
        [idKhoaHoc, idLop, idChuong]
      );
      return rows;
    } catch (error) {
      console.error("Failed to get questions:", error);
      throw error;
    }
  },

  // nộp bài tập
  submitExercise: async (submissionDetails) => {
    console.log("Dữ liệu ở model submit:", submissionDetails);
    const connection = await pool.promise().getConnection();

    try {
      // Bắt đầu giao dịch
      await connection.beginTransaction();

      // Chèn dữ liệu vào bảng nopbai
      const [result] = await connection.execute(
        `INSERT INTO nopbai (idBaiHoc, idNguoiDung, trangThai, thoiGianNopBai)
             VALUES (?, ?, ?, ?)`,
        [
          submissionDetails.exerciseId, // idBaiHoc
          submissionDetails.userId, // idNguoiDung
          "Đã nộp", // trangThai
          submissionDetails.submissionDate, // thoiGianNopBai
        ]
      );

      const idNopBai = result.insertId;

      // Chèn dữ liệu vào bảng dapanhocvien
      for (const question of submissionDetails.questions) {
        await connection.execute(
          `INSERT INTO dapanhocvien (idCauHoi, idNguoiDung, luaChon)
               VALUES (?, ?, ?)`,
          [
            question.questionId, // idCauHoi
            submissionDetails.userId, // idNguoiDung
            question.userAnswer, // luaChon
          ]
        );
      }

      // Xác nhận giao dịch
      await connection.commit();

      console.log("Dữ liệu đã được chèn thành công");
    } catch (error) {
      // Quay lại giao dịch nếu có lỗi
      await connection.rollback();
      console.error("Có lỗi xảy ra khi chèn dữ liệu:", error);
      throw error;
    } finally {
      // Đóng kết nối
      connection.release();
    }
  },

    // lấy các bài tập đã nộp
    getExercisesByChuongUserCourseClass: async (idChuong, idNguoiDung, idKhoaHoc, idLop) => {
        try {
          const [rows] = await pool.promise().query(
            `
            SELECT 
              baihoc.idBaiHoc,
              baihoc.tenBaiHoc,
              baihoc.ngayNopBai,
              COALESCE(nopbai.trangThai, 'Chưa nộp') AS trangThai
            FROM 
              baihoc
            LEFT JOIN 
              nopbai ON baihoc.idBaiHoc = nopbai.idBaiHoc AND nopbai.idNguoiDung = ?
            JOIN 
              chuong ON baihoc.idChuong = chuong.idChuong
            JOIN 
              lop ON chuong.idLop = lop.idLop
            JOIN 
              khoahoc ON lop.idKhoaHoc = khoahoc.idKhoaHoc
            WHERE 
              baihoc.idChuong = ?
              AND lop.idLop = ?
              AND khoahoc.idKhoaHoc = ?;
            `,
            [idNguoiDung, idChuong, idLop, idKhoaHoc]
          );
          return rows;
        } catch (error) {
          console.error("Failed to get exercises by chuong, user, course, and class:", error);
          throw error;
        }
      }
};

module.exports = ExcerciseModel;
