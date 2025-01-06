const { pool } = require("../config/db");

const TestCourseModel = {
    addCourseTest: async (data) => {
        const connection = await pool.promise().getConnection();
        try {
          await connection.beginTransaction();
      
          // Thêm khóa học nếu chưa tồn tại
          let [courseResult] = await connection.query(
            `SELECT idKhoaHoc FROM khoahoc WHERE idKhoaHoc = ?`,
            [data.course]
          );
      
          let courseId;
          if (courseResult.length === 0) {
            let [insertCourseResult] = await connection.query(
              `INSERT INTO khoahoc (tenKhoaHoc) VALUES (?)`,
              [data.courseName]
            );
            courseId = insertCourseResult.insertId;
          } else {
            courseId = courseResult[0].idKhoaHoc;
          }
      
          // Thêm bộ đề
          let [insertBoDeResult] = await connection.query(
            `INSERT INTO bode (tenBoDe, idKhoaHoc, idNguoiDung) VALUES (?, ?, ?)`,
            [data.setName, courseId, 3] // Giả sử idNguoiDung = 3, bạn cần thay đổi theo logic của bạn
          );
          let boDeId = insertBoDeResult.insertId;
      
          // Thêm câu hỏi và đáp án
          for (let question of data.questions) {
            let [insertCauHoiResult] = await connection.query(
              `INSERT INTO cauhoi (tenCauHoi, diem, loaiCauHoi, luaChon, dapAnDung) VALUES (?, ?, ?, ?, ?)`,
              [
                question.title,
                question.points,
                question.type,
                JSON.stringify(question.answers.map((answer) => answer.text)),
                JSON.stringify(
                  question.answers
                    .filter((answer) => answer.isCorrect)
                    .map((answer) => answer.text)
                ),
              ]
            );
            let cauHoiId = insertCauHoiResult.insertId;
      
            // Thêm đáp án cho câu hỏi
            for (let answer of question.answers) {
              await connection.query(
                `INSERT INTO dapancauhoi (idCauHoi, noiDungDapAn, laDapAnDung) VALUES (?, ?, ?)`,
                [cauHoiId, answer.text, answer.isCorrect]
              );
            }
      
            // Liên kết câu hỏi với bộ đề
            await connection.query(
              `INSERT INTO bode_cauhoi (idBoDe, idCauHoi) VALUES (?, ?)`,
              [boDeId, cauHoiId]
            );
          }
          await connection.commit();
          return { message: "Thêm bộ đ�� thành công" };
        } catch (error) {
          await connection.rollback();
          throw error;
        } finally {
          connection.release();
        }
      },

  getBoDeInfoByCourse: async (boDeId, khoaHocId) => {
    const connection = await pool.promise().getConnection();
    try {
      const [rows] = await connection.query(
        `
            SELECT 
                cauhoi.idCauHoi,
                cauhoi.tenCauHoi,
                cauhoi.imageCauHoi,
                cauhoi.audio,
                cauhoi.tagCauHoi,
                cauhoi.luaChon,
                cauhoi.dapAnDung,
                cauhoi.diem,
                cauhoi.loaiCauHoi,
                cauhoi_toeic.phan
            FROM 
                bode
            JOIN 
                bode_cauhoi ON bode.idBoDe = bode_cauhoi.idBoDe
            JOIN 
                cauhoi ON bode_cauhoi.idCauHoi = cauhoi.idCauHoi
            LEFT JOIN
                cauhoi_toeic ON cauhoi.idCauHoi = cauhoi_toeic.idCauHoi
            WHERE 
                bode.idKhoaHoc = ? AND bode.idBoDe = ?;
        `,
        [khoaHocId, boDeId]
      );

      return rows;
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    }
  },

  getAllTest: async (khoaHocId) => {
    const connection = await pool.promise().getConnection();
    try {
      const [rows] = await connection.query(
        `
            SELECT * FROM bode
            WHERE idKhoaHoc = ?;
        `,
        [khoaHocId]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },

  createKiemTra: async (data) => {
    const connection = await pool.promise().getConnection();
    console.log("Data tạo bài kiểm tra: ", data);
    try {
      await connection.beginTransaction();

      const { idBoDe, title, duration, idNguoiDung, idKhoaHoc, idClass } = data;
      console.log("Data tạo bài kiểm tra: ", data);
      const parseID = parseInt(idClass)

      // Thêm bài kiểm tra
      const query = `
        INSERT INTO kiemtra (idBoDe, title, duration, idNguoiDung, idKhoaHoc, idLop)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      const [result] = await connection.execute(query, [
        idBoDe,
        title,
        duration,
        idNguoiDung,
        idKhoaHoc,
        parseID
      ]);

      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback();
      throw error;
    }
  },

  getCauHoi: async (idKiemTra) => {
    const connection = await pool.promise().getConnection();
    try {
      const [rows] = await connection.query(
        `
        SELECT 
            kt.idKiemTra,
            kt.title AS ExamTitle,
            kt.duration AS ExamDuration,
            kt.ngayTao AS ExamCreationDate,
            bd.tenBoDe AS QuestionSetTitle,
            ch.idCauHoi,
            ch.tenCauHoi,
            ch.deBai,
            ch.imageCauHoi,
            ch.audio,
            ch.tagCauHoi,
            ch.luaChon,
            ch.dapAnDung,
            ch.diem,
            ch.loaiCauHoi,
            ch.phan,
            ch.cauHoiCon
        FROM 
            kiemtra kt
        JOIN 
            bode bd ON kt.idBoDe = bd.idBoDe
        JOIN 
            bode_cauhoi bc ON bd.idBoDe = bc.idBoDe
        JOIN 
            cauhoi_toeic ch ON bc.idCauHoi = ch.idCauHoi
        WHERE 
            kt.idKiemTra = ?;
        `,
        [idKiemTra]
      );

      return rows;
    } catch (error) {
      throw error;
    }
  },

  getBaiKiemtra: async () => {
    const connection = await pool.promise().getConnection();
    try {
      const [rows] = await connection.query(
        `
            SELECT 
                kiemtra.idKiemTra,
                kiemtra.title,
                kiemtra.duration,
                kiemtra.ngayTao,
                bode.tenBoDe,
                khoahoc.tenKhoaHoc,
                nguoidung.hoTen AS nguoiTao
            FROM 
                kiemtra
            JOIN 
                bode ON kiemtra.idBoDe = bode.idBoDe
            JOIN 
                khoahoc ON kiemtra.idKhoaHoc = khoahoc.idKhoaHoc
            JOIN 
                nguoidung ON kiemtra.idNguoiDung = nguoidung.idnguoidung;
        `
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },

  getBaiKiemtraTheoIDCourse: async (idKhoahoc, idClass) => {
    console.log("idKhoahoc ", idKhoahoc);
    console.log("idClass ", idClass);
    // parse idclass to int
    idClassParse = parseInt(idClass);
    const connection = await pool.promise().getConnection();
    try {
      const [rows] = await connection.query(
        `
        SELECT
            kt.idKiemTra,
            kt.title,
            kt.duration,
            kt.ngayTao,
            kt.idNguoiDung,
            nd.hoTen AS tenNguoiDung,
            kh.tenKhoaHoc,
            l.tenLop
        FROM
            kiemtra kt
            JOIN bode bd ON kt.idBoDe = bd.idBoDe
            JOIN khoahoc kh ON kt.idKhoaHoc = kh.idKhoaHoc
            JOIN lop l ON l.idKhoaHoc = kh.idKhoaHoc
            JOIN nguoidung nd ON kt.idNguoiDung = nd.idnguoidung
        WHERE
            kt.idKhoaHoc = ? AND l.idLop = ?
        `,
        [idKhoahoc, idClassParse]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = TestCourseModel;
