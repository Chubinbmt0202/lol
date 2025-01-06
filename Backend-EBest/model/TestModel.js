const { pool } = require("../config/db");

const TestModel = {
    addBode: async (tenBoDe, idCauHoiArray, idNguoiDung = 3) => { // Mặc định idNguoiDung là 3
        const connection = await pool.promise().getConnection();
        let idBoDe;
        try {
            // Bắt đầu giao dịch
            await connection.beginTransaction();

            // Thêm bộ đề vào bảng bode
            const queryBoDe = `
                INSERT INTO bode (tenBoDe, idNguoiDung) VALUES (?, ?);
            `;
            const [results] = await connection.query(queryBoDe, [tenBoDe, idNguoiDung]);
            idBoDe = results.insertId;

            // Thực hiện các câu lệnh SQL cho mỗi idCauHoi trong mảng
            for (const idCauHoi of idCauHoiArray) {
                const queryBodeCauHoi = `
                    INSERT INTO bode_cauhoi (idBoDe, idCauHoi) VALUES (?, ?);
                `;
                await connection.query(queryBodeCauHoi, [idBoDe, idCauHoi]);
            }

            // Commit giao dịch
            await connection.commit();
            console.log('Bode và câu hỏi đã được thêm thành công');
        } catch (error) {
            // Rollback nếu có lỗi
            await connection.rollback();
            console.error('Lỗi khi thêm bode:', error);
            throw error;
        } finally {
            // Cuối cùng, giải phóng kết nối
            connection.release();
        }
    },

    getAllBode: async () => {
        const query = `
            SELECT * FROM bode;
        `;
        const [results] = await pool.promise().query(query);
        return results;
    },

    // lấy câu hỏi theo bộ đề
    getQuestionsByBoDe: async (idBoDe) => {
        const query = `
           SELECT 
                ch.idCauHoi,
                ch.tenCauHoi,
                ch.imageCauHoi,
                ch.audio,
                ch.tagCauHoi,
                ch.luaChon,
                ch.dapAnDung,
                ch.diem,
                ch.loaiCauHoi
            FROM 
                bode AS bd
            JOIN 
                bode_cauhoi AS bc ON bd.idBoDe = bc.idBoDe
            JOIN 
                cauhoi AS ch ON bc.idCauHoi = ch.idCauHoi
            WHERE 
                bd.idBoDe = ?;
        `;
        const [results] = await pool.promise().query(query, [idBoDe]);
        return results;
    }
}

module.exports = TestModel;