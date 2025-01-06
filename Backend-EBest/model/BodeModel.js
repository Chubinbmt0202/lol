const { pool } = require("../config/db");

const BodeModel = {
    addBodeThuCong: async (data) => {
        try {
            
            // Insert into bode table
            const bodeInsertQuery = `
                INSERT INTO bode (tenBoDe, idKhoaHoc, idNguoiDung)
                VALUES (?, ?, ?)
            `;
            const [bodeResult] = await pool.promise().execute(bodeInsertQuery, [
                data.tenBoDe || null,
                data.khoaHoc || null,
                null, // Assuming idNguoiDung is not provided
            ]);

            const newIdBoDe = bodeResult.insertId;

            // Insert into bode_cauhoi table
            const bodeCauHoiInsertQuery = `
                INSERT INTO bode_cauhoi (idBoDe, idCauHoi, tenBoDe, loaiDe)
                VALUES (?, ?, ?, ?)
            `;

            for (const question of data.cacCauHoi) {
                await pool.promise().execute(bodeCauHoiInsertQuery, [
                    newIdBoDe,
                    question.idCauHoi,
                    question.tenCauHoi,
                    data.loai,
                ]);
            }

            return { newIdBoDe };
        } catch (error) {
            throw error;
        } 
    },

    layBodeTheoIdCourse: async (id) => {
        try {
            const query = `
                SELECT * FROM bode
                WHERE idKhoaHoc = ?
            `;
            const [rows] = await pool.promise().execute(query, [id]);
            return rows;
        } catch (error) {
            throw error;
        }
    },
    
    layCauHoiTheoBode: async (id) => {
        console.log("Id bode:", id);
        try {
            const query = `
                SELECT 
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
                    cauhoi_toeic ch
                JOIN 
                    bode_cauhoi bc ON ch.idCauHoi = bc.idCauHoi
                WHERE 
                    bc.idBoDe = ?;
            `;
            const [rows] = await pool.promise().execute(query, [id]);
            return rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = BodeModel;