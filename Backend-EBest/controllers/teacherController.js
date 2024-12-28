const TeacherModel = require('../model/TeacherModel');

const GetAllTeachers = (req, res) => {
    TeacherModel.getAllTeachers((err, result) => {
        if (err) {
            return res.status(500).json({
                error: 1,
                success: 0,
                message: err
            });
        }
        return res.status(200).json({
            success: 1,
            data: result
        });
    });
}
module.exports = GetAllTeachers;