const CourseModel = require('../model/Course');

const registerCourseController = (req, res) => {
    const data = req.body;
    console.log('Data:', data);
    CourseModel.registerCourse(data, (err, result) => {
        if (err) {
            return res.status(500).json({
                error: 1,
                success: 0,
                message: "Course registration failed with error: " + err
            });
        }
        return res.status(200).json({
            success: 1,
            message: "Course registered successfully",
            data: result
        });
    });
};

const createCourseController = (req, res) => {
    const data = req.body;
    console.log('Data:', data);
    CourseModel.createCourse(data, (err, result) => {
        if (err) {
            return res.status(500).json({
                error: 1,
                success: 0,
                message: "Course creation failed with error: " + err
            });
        }
        return res.status(200).json({
            success: 1,
            message: "Course created successfully",
            data: result
        });
    });
}

const getAllCoursesController = (req, res) => {
    CourseModel.getAllCourse((err, result) => {
        if (err) {
            return res.status(500).json({
                error: 1,
                success: 0,
                message: "Course retrieval failed with error: " + err
            });
        }
        return res.status(200).json({
            success: 1,
            message: "Courses retrieved successfully",
            data: result
        });
    });
}

const getCourseByIdController = (req, res) => {
    const id = req.params.id;
    console.log('ID:', id);
    CourseModel.getCourseById(id, (err, result) => {
        if (err) {
            return res.status(500).json({
                error: 1,
                success: 0,
                message: "Course retrieval failed with error: " + err
            });
        }
        return res.status(200).json({
            success: 1,
            message: "Course retrieved successfully",
            data: result
        });
    });
}

module.exports = {
    registerCourseController,
    createCourseController,
    getAllCoursesController,
    getCourseByIdController
}