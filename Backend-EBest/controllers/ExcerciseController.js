const ExcerciseModel = require('../model/Excercise');

const createExcerciseController = async (req, res) => {
    const { name, idKhoaHoc, idLop, questions, ngayNopBai } = req.body; // Thêm dueDate
    console.log('Dữ liệu ở controller bài tập:', req.body);
    const exercise = {
        name,
        idChuong: idLop,  // Giả sử idChuong là idLop, bạn cần thay đổi theo dữ liệu thực tế hoặc logic của bạn
        questions,
        ngayNopBai // Thêm dueDate vào đối tượng exercise
    };

    try {
        await ExcerciseModel.createExercise(exercise);
        return res.status(201).json({
            error: 0,
            success: 1,
            message: "Exercise created successfully"
        });
    } catch (err) {
        console.error('Failed to create exercise:', err);
        return res.status(500).json({
            error: 1,
            success: 0,
            message: "Exercise creation failed with error: " + err.message
        });
    }
}

const getAllExcercisesController = async (req, res) => {
    const { idKhoaHoc, idLop, idChuong } = req.body;

    console.log('idKhoaHoc:', idKhoaHoc);
    console.log('idLop:', idLop);
    console.log('idChuong:', idChuong);
    try {
        const questions = await ExcerciseModel.getAllQuestions(idKhoaHoc, idLop, idChuong);
        return res.status(200).json({
            error: 0,
            success: 1,
            message: "Questions retrieved successfully",
            data: questions
        });
    } catch (err) {
        console.error('Failed to retrieve questions:', err);
        return res.status(500).json({
            error: 1,
            success: 0,
            message: "Questions retrieval failed with error: " + err.message
        });
    }
}


module.exports = {
    createExcerciseController,
    getAllExcercisesController
};