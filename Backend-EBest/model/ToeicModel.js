const { pool } = require("../config/db");

const ToeicModel = {
  ////// Listening
  // thêm câu hỏi mô tả tranh
  addListeningQuestion: async (
    content,
    answer,
    correctAnswer,
    type,
    image,
    audio,
    tag,
    phan
  ) => {
    // In ra các giá trị để kiểm tra (debugging)
    console.log("content:", content);
    console.log("answer:", answer);
    console.log("correctAnswer:", correctAnswer);
    console.log("type:", type);
    console.log("image:", image);
    console.log("audio:", audio);
    console.log("tag:", tag);
    console.log("phan:", phan);

    const query = `
            INSERT INTO cauhoi_toeic 
            (tenCauHoi, luaChon, dapAnDung, loaiCauHoi, imageCauHoi, audio, tagCauHoi, diem, phan) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;

    // Giá trị mặc định cho điểm (có thể thay đổi nếu cần)
    const diem = 5.0;

    // Chuyển mảng lựa chọn thành chuỗi JSON
    try {
      // Thực hiện câu lệnh SQL và chờ kết quả
      const [results] = await pool.promise().query(query, [
        content, // Tên câu hỏi
        JSON.stringify(answer), // Lựa chọn trả lời (dưới dạng JSON)
        correctAnswer, // Câu trả lời đúng
        type, // Loại câu hỏi (Listening)
        image, // URL của ảnh
        audio, // URL của âm thanh
        tag, // Thẻ của câu hỏi
        diem, // Điểm mặc định
        phan, // Phần của câu hỏi
      ]);

      // Trả về kết quả thành công
      return {
        error: 0,
        success: 1,
        message: "Thêm câu hỏi thành công",
        data: results,
      };
    } catch (error) {
      // Bắt lỗi và trả về đối tượng lỗi
      console.error("Lỗi khi thêm câu hỏi:", error);
      return {
        error: 1,
        success: 0,
        message: "Lỗi khi thêm câu hỏi: " + error.message,
      };
    }
  },
  // chỉnh sửa câu hỏi mô tả tranh
  editListeningQuestion: async (
    id,
    content,
    answer,
    correctAnswer,
    type,
    image,
    audio,
    tag,
    phan
  ) => {
    const query = `
      UPDATE cauhoi_toeic
      SET tenCauHoi =?, luaChon =?, dapAnDung =?, loaiCauHoi =?, imageCauHoi =?, audio =?, tagCauHoi =?, diem =?, phan =?
      WHERE idCauHoi =?;
    `;
    const diem = 5.0;
    try {
      const [results] = await pool
        .promise()
        .query(query, [
          content,
          JSON.stringify(answer),
          correctAnswer,
          type,
          image,
          audio,
          tag,
          diem,
          phan,
          id,
        ]);
      return {
        error: 0,
        success: 1,
        message: "Sửa câu hỏi thành công",
        data: results,
      };
    } catch (error) {
      console.error("Lỗi khi sửa câu hỏi:", error);
      return {
        error: 1,
        success: 0,
        message: "Lỗi khi sửa câu hỏi: " + error.message,
      };
    }
  },
  deleteListeningQuestion: async (id) => {
    const query = `
            DELETE FROM cauhoi_toeic
            WHERE idCauHoi = ?;
        `;
    try {
      const [results] = await pool.promise().query(query, [id]);
      return {
        error: 0,
        success: 1,
        message: "Xóa câu hỏi thành công",
        data: results,
      };
    } catch (error) {
      console.error("Lỗi khi xóa câu hỏi:", error);
      return {
        error: 1,
        success: 0,
        message: "Lỗi khi xóa câu hỏi: " + error.message,
      };
    }
  },
  // // Xem danh sách câu h��i mô tả tranh
  getListeningQuestions: async () => {
    const query = `
            SELECT * FROM cauhoi_toeic
            WHERE phan = 'Mô tả tranh'
        `;
    try {
      const [results] = await pool.promise().query(query);
      return {
        error: 0,
        success: 1,
        message: "Lấy danh sách câu hỏi thành công",
        data: results,
      };
    } catch (error) {
      console.error("Lỗi khi lấy danh sách câu hỏi:", error);
      return {
        error: 1,
        success: 0,
        message: "Lỗi khi lấy danh sách câu hỏi: " + error.message,
      };
    }
  },
  // thêm danh sách tất cả câu hỏi
  addMultipleCauHoi: async (cauHoiList) => {
    const query = `
        INSERT INTO cauhoi_toeic (imageCauHoi, tenCauHoi, deBai, audio, tagCauHoi, luaChon, dapAnDung, diem, loaiCauHoi, phan)
        VALUES ?
    `;

    const values = cauHoiList.map((cauHoi) => [
      cauHoi.imageCauHoi,
      cauHoi.tenCauHoi,
      cauHoi.deBai,
      cauHoi.audio,
      cauHoi.tagCauHoi,
      JSON.stringify(cauHoi.luaChon), // Chuyển đổi luaChon thành chuỗi JSON
      cauHoi.dapAnDung,
      cauHoi.diem,
      cauHoi.loaiCauHoi,
      cauHoi.phan,
    ]);

    try {
      const [results] = await pool.promise().query(query, [values]);
      return {
        error: 0,
        success: 1,
        message: "Thêm nhiều câu hỏi thành công",
        data: results,
      };
    } catch (error) {
      console.error("Lỗi khi thêm nhiều câu hỏi:", error);
      return {
        error: 1,
        success: 0,
        message: "Lỗi khi thêm nhiều câu hỏi: " + error.message,
      };
    }
  },
  getAllQuestionToeic: async () => {
    const query = `
        SELECT * FROM cauhoi_toeic
    `;
    try {
      const [results] = await pool.promise().query(query);
      return {
        error: 0,
        success: 1,
        message: "Lấy danh sách câu hỏi thành công",
        data: results,
      };
    } catch (error) {
      console.error("Lỗi khi lấy danh sách câu hỏi:", error);
      return {
        error: 1,
        success: 0,
        message: "Lỗi khi lấy danh sách câu hỏi: " + error.message,
      };
    }
  },

  /// Thêm câu hỏi phần hỏi đáp
  addTalkQuestion: async (newQuestionSent) => {
    console.log("data in model:", newQuestionSent);
    const query = `
            INSERT INTO cauhoi_toeic 
            (tenCauHoi, luaChon, dapAnDung, audio, tagCauHoi, loaiCauHoi, diem, phan) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `;

    const diem = 5.0;
    try {
      const [results] = await pool
        .promise()
        .query(query, [
          newQuestionSent.content,
          JSON.stringify(newQuestionSent.answer),
          newQuestionSent.correctAnswer,
          newQuestionSent.audioLinkUrls,
          newQuestionSent.tag,
          newQuestionSent.type,
          diem,
          newQuestionSent.phan,
        ]);
      return {
        error: 0,
        success: 1,
        message: "Thêm câu hỏi phần hỏi đáp thành công",
        data: results,
      };
    } catch (error) {
      console.error("Lỗi khi thêm câu hỏi:", error);
      return {
        error: 1,
        success: 0,
        message: "Lỗi khi thêm câu hỏi: " + error.message,
      };
    }
  },
  // lấy tất cả câu hỏi hỏi đáp
  getAllTalkQuestions: async () => {
    const query = `
        SELECT * FROM cauhoi_toeic
        WHERE phan = 'Hỏi đáp'
    `;
    try {
      const [results] = await pool.promise().query(query);
      return {
        error: 0,
        success: 1,
        message: "Lấy danh sách câu hỏi thành công",
        data: results,
      };
    } catch (error) {
      console.error("Lỗi khi lấy danh sách câu hỏi:", error);
      return {
        error: 1,
        success: 0,
        message: "Lỗi khi lấy danh sách câu hỏi: " + error.message,
      };
    }
  },
  // Xóa câu h��i phần h��i đáp
  deleteTalkQuestion: async (id) => {
    const query = `
            DELETE FROM cauhoi_toeic
            WHERE idCauHoi = ?;
        `;
    try {
      const [results] = await pool.promise().query(query, [id]);
      return {
        error: 0,
        success: 1,
        message: "Xóa câu hỏi thành công",
        data: results,
      };
    } catch (error) {
      console.error("Lỗi khi xóa câu hỏi:", error);
      return {
        error: 1,
        success: 0,
        message: "Lỗi khi xóa câu hỏi: " + error.message,
      };
    }
  },
  // thêm câu hỏi phần hội thoại ngắn
  addShortTalkQuestion: async (
    newQuestionSent,
    audioFiles,
    content,
    tag,
    luaChon,
    dapAnDung,
    loai,
    phan,
    cauHoiCon
  ) => {
    console.log(
      "data in model:",
      newQuestionSent,
      content,
      tag,
      luaChon,
      dapAnDung,
      loai,
      phan,
      cauHoiCon
    );
    const query = `
            INSERT INTO cauhoi_toeic 
            (imageCauHoi, tenCauHoi,deBai,audio,tagCauHoi, luaChon, dapAnDung, diem,  loaiCauHoi,  phan, cauHoiCon) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?);
        `;
    const diem = 5.0;
    try {
      const [results] = await pool
        .promise()
        .query(query, [
          newQuestionSent,
          content,
          "",
          audioFiles,
          tag,
          "",
          "",
          diem,
          loai,
          phan,
          cauHoiCon,
        ]);
      return {
        error: 0,
        success: 1,
        message: "Thêm câu hỏi phần hỏi đáp thành công",
        data: results,
      };
    } catch (error) {
      console.error("Lỗi khi thêm câu hỏi:", error);
      return {
        error: 1,
        success: 0,
        message: "Lỗi khi thêm câu hỏi: " + error.message,
      };
    }
  },
  // // lấy tất cả câu hỏi hỏi đáp ngắn
  getAllTalkShortQuestions: async () => {
    const query = `
        SELECT * FROM cauhoi_toeic
        WHERE phan = 'Hội thoại ngắn'
    `;
    try {
      const [results] = await pool.promise().query(query);
      return {
        error: 0,
        success: 1,
        message: "Lấy danh sách câu h��i thành công",
        data: results,
      };
    } catch (error) {
      console.error("Lỗi khi lấy danh sách câu hỏi:", error);
      return {
        error: 1,
        success: 0,
        message: "Lỗi khi lấy danh sách câu hỏi: " + error.message,
      };
    }
  },

  addQuestionChuyenNgan: async (
    newQuestionSent,
    audioFiles,
    content,
    tag,
    luaChon,
    dapAnDung,
    loai,
    phan,
    cauHoiCon
  ) => {
    console.log(
      "data in model:",
      newQuestionSent,
      content,
      tag,
      luaChon,
      dapAnDung,
      loai,
      phan,
      cauHoiCon
    );
    const query = `
            INSERT INTO cauhoi_toeic 
            (imageCauHoi, tenCauHoi,deBai,audio,tagCauHoi, luaChon, dapAnDung, diem,  loaiCauHoi,  phan, cauHoiCon) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?);
        `;
    const diem = 5.0;
    try {
      const [results] = await pool
        .promise()
        .query(query, [
          newQuestionSent,
          content,
          "",
          audioFiles,
          tag,
          "",
          "",
          diem,
          loai,
          phan,
          cauHoiCon,
        ]);
      return {
        error: 0,
        success: 1,
        message: "Thêm câu hỏi phần hỏi đáp thành công",
        data: results,
      };
    } catch (error) {
      console.error("Lỗi khi thêm câu hỏi:", error);
      return {
        error: 1,
        success: 0,
        message: "Lỗi khi thêm câu hỏi: " + error.message,
      };
    }
  },

  getAllChuyenNganQuestions: async () => {
    const query = `
        SELECT * FROM cauhoi_toeic
        WHERE phan = 'Chuyện ngắn'
    `;
    try {
      const [results] = await pool.promise().query(query);
      return {
        error: 0,
        success: 1,
        message: "Lấy danh sách câu h��i thành công",
        data: results,
      };
    } catch (error) {
      console.error("Lỗi khi lấy danh sách câu hỏi:", error);
      return {
        error: 1,
        success: 0,
        message: "Lỗi khi lấy danh sách câu hỏi: " + error.message,
      };
    }
  },

  //// phần điền vào câu
  addQuestionDienVaoCau: async (
    content,
    answers,
    correctAnswer,
    parentName,
    tag,
    phan,
    loai
  ) => {
    console.log("data in model điền vào câu:");
    console.log("content:", content);
    console.log("answers:", answers);
    console.log("correctAnswer:", correctAnswer);
    console.log("parentName:", parentName);
    console.log("tag:", tag);
    console.log("phan:", phan);
    console.log("loai:", loai);

    const query = `
        INSERT INTO cauhoi_toeic 
        (tenCauHoi, tagCauHoi, luaChon, dapAnDung, diem, loaiCauHoi, phan) 
        VALUES (?, ?, ?, ?, ?, ?, ?);
    `;
    try {
      const [results] = await pool
        .promise()
        .query(query, [
          content,
          tag,
          JSON.stringify(answers),
          correctAnswer,
          5,
          loai,
          phan,
        ]);
      return {
        error: 0,
        success: 1,
        message: "Thêm câu hỏi phần hỏi đáp thành công",
        data: results,
      };
    } catch (error) {
      console.error("Lỗi khi thêm câu hỏi:", error);
      return {
        error: 1,
        success: 0,
        message: "Lỗi khi thêm câu hỏi: " + error.message,
      };
    }
  },
  // lấy tất cả câu hỏi phần điền vào câu
  getAllQuestionDienVaoCau: async () => {
    const query = `
        SELECT * FROM cauhoi_toeic
        WHERE phan = 'Điền vào câu'
    `;
    try {
      const [results] = await pool.promise().query(query);
      return {
        error: 0,
        success: 1,
        message: "Lấy danh sách câu hỏi thành công",
        data: results,
      };
    } catch (error) {
      console.error("Lỗi khi lấy danh sách câu hỏi:", error);
      return {
        error: 1,
        success: 0,
        message: "Lỗi khi lấy danh sách câu hỏi: " + error.message,
      };
    }
  },

  // Phần điền vào đoạn
  addQuestionDienVaoDoan: async (CauHoi, Tag, DeBai, phan, loai, CauHoiCon) => {
    console.log(
      "data in model điền vào đoạn:",
      CauHoi,
      Tag,
      DeBai,
      phan,
      loai,
      CauHoiCon
    );
    const query = `
        INSERT INTO cauhoi_toeic 
        (tenCauHoi,deBai, tagCauHoi, luaChon, dapAnDung, diem, loaiCauHoi, phan, cauHoiCon) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    try {
      const [results] = await pool.promise().query(query, [CauHoi,DeBai,Tag,"", "", 5, loai, phan, JSON.stringify(CauHoiCon)]);
      return {
        error: 0,
        success: 1,
        message: "Thêm câu hỏi phần hỏi đáp thành công",
        data: results,
      };
    } catch (error) {
      console.error("Lỗi khi thêm câu hỏi:", error);
      return {
        error: 1,
        success: 0,
        message: "Lỗi khi thêm câu hỏi: " + error.message,
      };
    }
  },

  // lấy tất cả câu hỏi phần điền vào đoạn
  getAllQuestionDienVaoDoan: async () => {
    const query = `
        SELECT * FROM cauhoi_toeic
        WHERE phan = 'Điền vào đoạn'
    `;
    try {
      const [results] = await pool.promise().query(query);
      return {
        error: 0,
        success: 1,
        message: "Lấy danh sách câu hỏi thành công",
        data: results,
      };
    } catch (error) {
      console.error("Lỗi khi lấy danh sách câu hỏi:", error);
      return {
        error: 1,
        success: 0,
        message: "Lỗi khi lấy danh sách câu hỏi: " + error.message,
      };
    }
  },

  addQuestionDocHieu: async (CauHoi, Tag, DeBai, phan, loai, CauHoiCon) => {
    console.log(
      "data in model đọc hiểu:",
      CauHoi,
      Tag,
      DeBai,
      phan,
      loai,
      CauHoiCon
    );
    const query = `
        INSERT INTO cauhoi_toeic 
        (tenCauHoi,deBai, tagCauHoi, luaChon, dapAnDung, diem, loaiCauHoi, phan, cauHoiCon) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    try {
      const [results] = await pool.promise().query(query, [CauHoi,DeBai,Tag,"", "", 5, loai, phan, JSON.stringify(CauHoiCon)]);
      return {
        error: 0,
        success: 1,
        message: "Thêm câu hỏi phần hỏi đáp thành công",
        data: results,
      };
    } catch (error) {
      console.error("Lỗi khi thêm câu hỏi:", error);
      return {
        error: 1,
        success: 0,
        message: "Lỗi khi thêm câu hỏi: " + error.message,
      };
    }
  },

  // lấy tất cả câu hỏi phần điền vào đoạn
  getAllQuestionDocHieu: async () => {
    const query = `
        SELECT * FROM cauhoi_toeic
        WHERE phan = 'Đọc hiểu'
    `;
    try {
      const [results] = await pool.promise().query(query);
      return {
        error: 0,
        success: 1,
        message: "Lấy danh sách câu hỏi thành công",
        data: results,
      };
    } catch (error) {
      console.error("Lỗi khi lấy danh sách câu hỏi:", error);
      return {
        error: 1,
        success: 0,
        message: "Lỗi khi lấy danh sách câu hỏi: " + error.message,
      };
    }
  },

  // lấy tất cả câu hỏi
  getAllQuestion: async () => {
    const query = `
        SELECT * FROM cauhoi_toeic
    `;
    try {
      const [results] = await pool.promise().query(query);
      return {
        error: 0,
        success: 1,
        message: "Lấy danh sách câu h��i thành công",
        data: results,
      };
    } catch (error) {
      console.error("L��i khi lấy danh sách câu h��i:", error);
      return {
        error: 1,
        success: 0,
        message: "L��i khi lấy danh sách câu h��i: " + error.message,
      };
    }
  },

};

module.exports = ToeicModel;
