const { pool } = require('../config/db');

const ExcerciseModel = {
    createExercise: async (exercise) => {
        console.log('Dữ liệu ở model bài tập:', exercise);
        const connection = await pool.promise().getConnection();
    
        try {
            // Bắt đầu transaction
            await connection.beginTransaction();
    
            // Bước 1: Thêm bài học mới vào bảng baihoc
            const baihocQuery = 'INSERT INTO baihoc (idChuong, tenBaiHoc, moTa, ngayNopBai) VALUES (?, ?, ?, ?)';
            const [baihocResult] = await connection.query(baihocQuery, [exercise.idChuong, exercise.name, '', exercise.ngayNopBai]);
            const idBaiHoc = baihocResult.insertId;
    
            // Bước 2: Thêm câu hỏi vào bảng cauhoi
            const cauhoiQuery = 'INSERT INTO cauhoi (idBaiHoc, tenCauHoi, luaChon, dapAnDung, diem) VALUES (?, ?, ?, ?, ?)';
            for (const question of exercise.questions) {
                const luaChon = JSON.stringify(question.options);
                const dapAnDung = question.options[question.correctOption];
                await connection.query(cauhoiQuery, [idBaiHoc, question.content, luaChon, dapAnDung, question.points]);
            }
    
            // Commit transaction
            await connection.commit();
    
            console.log('Exercise created successfully');
        } catch (error) {
            // Rollback transaction nếu có lỗi
            await connection.rollback();
            console.error('Failed to create exercise:', error);
            throw error;
        } finally {
            // Giải phóng kết nối
            connection.release();
        }
    },

    // lấy tất cả câu hỏi 
    getAllQuestions: async (idKhoaHoc, idLop, idChuong) => {
        try {
            const [rows] = await pool.promise().query(`
                SELECT 
                    c.idCauHoi,
                    c.tenCauHoi,
                    c.luaChon,
                    c.dapAnDung,
                    bh.tenBaiHoc,
                    ch.tenChuong,
                    l.tenLop,
                    kh.tenKhoaHoc
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
                WHERE 
                    kh.idKhoaHoc = ?
                    AND l.idLop = ?
                    AND ch.idChuong = ?
            `, [idKhoaHoc, idLop, idChuong]);
            return rows;
        } catch (error) {
            console.error('Failed to get questions:', error);
            throw error;
        }
    }
};

module.exports = ExcerciseModel;