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

const submitExerciseController = async (req, res) => {
    const submissionDetails = req.body;
    console.log('Dữ liệu ở controller bài tập đã nộp:', submissionDetails);
    try {
      await ExcerciseModel.submitExercise(submissionDetails);
      res.status(201).json({ message: 'Submission created successfully' });
    } catch (error) {
      console.error('Error creating submission:', error);
      res.status(500).json({ message: 'Error creating submission' });
    }
  };

// lấy các bài tập đã nộp
const getExercisesByChuongUserCourseClassController = async (req, res) => {
    const idChuong = parseInt(req.body.idChuong);
    const idNguoiDung = parseInt(req.body.idNguoiDung);
    const idKhoaHoc = parseInt(req.body.idKhoaHoc);
    const idLop = parseInt(req.body.idLop);

    console.log('Giá trị:', idChuong, idNguoiDung, idKhoaHoc, idLop);

    // Kiểm tra idChuong, idNguoiDung, idKhoaHoc và idLop có hợp lệ không
    if (!idChuong || typeof idChuong !== 'number' || 
        !idNguoiDung || typeof idNguoiDung !== 'number' || 
        !idKhoaHoc || typeof idKhoaHoc !== 'number' || 
        !idLop || typeof idLop !== 'number') {
      return res.status(400).json({ message: 'Invalid idChuong, idNguoiDung, idKhoaHoc, or idLop' });
    }
  
    try {
      const exercises = await ExcerciseModel.getExercisesByChuongUserCourseClass(idChuong, idNguoiDung, idKhoaHoc, idLop);
      res.status(200).json({ 
        message: 'Exercises retrieved successfully',
        data: exercises
       });
    } catch (error) {
      console.error('Error getting exercises by chuong, user, course, and class:', error);
      res.status(500).json({ message: 'Error getting exercises by chuong, user, course, and class' });
    }
  };

module.exports = {
    createExcerciseController,
    getAllExcercisesController,
    submitExerciseController,
    getExercisesByChuongUserCourseClassController
};