const StudentModel = require('../model/StudentModel');
const UserModel = require('../model/UserModel');

const getStudentplaces = async (req, res) => {
    try {
        const result = await StudentModel.getStudentplaces();
        console.log("Result", result);

        if (result.success === 0) {
            return res.status(400).json(result);
        }
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({
            error: 1,
            success: 0,
            message: "Failed to get students with error: " + err.message,
        });
    }
}

const getStudentplacess = async (req, res) => {
    try {
        const result = await UserModel.getStudentplaces();
        console.log("Result", result);

        if (!result || result.length === 0) {
            return res.status(400).json({
                success: 0,
                message: "No student places found"
            });
        }
        return res.status(200).json({
            success: 1,
            data: result
        });
    } catch (err) {
        return res.status(500).json({
            error: 1,
            success: 0,
            message: "Failed to get students with error: " + err.message,
        });
    }
}

const getAllStudent = async (req, res) => {
    try {
        const result = await StudentModel.getAllStudent();
        console.log("Result", result);
        if (result.success === 0) {
            return res.status(400).json(result);
        }
        return res.status(200).json(result);
        
    } catch (err) {
        return res.status(500).json({
            error: 1,
            success: 0,
            message: "Failed to get students with error: " + err.message,
        });
    }
}

const addStudent = async (req, res) => {
    try {
        console.log("Req.body học viên", req.body);
        const result = await StudentModel.addStudent(req.body);

        if (result.success === 0) {
            return res.status(400).json(result);
        }
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({
            error: 1,
            success: 0,
            message: "Failed to add student with error: " + err.message,
        });
    }
};

const getStudentbyID = async (req, res) => {
    console.log("ID học viên", req.params.id);
    try {
        const result = await StudentModel.getStudentById(req.params.id);
        console.log("Result", result);
        if (result.success === 0) {
            return res.status(400).json(result);
        }
        return res.status(200).json(result);
    }
    catch (err) {
        return res.status(500).json({
            error: 1,
            success: 0,
            message: "Failed to get student with error: " + err.message,
        });
    }
}

const deleteStudent = async (req, res) => {
    console.log("ID học viên", req.params.id);
    try {
        const result = await StudentModel.deleteStudent(req.params.id);
        console.log("Result", result);
        if (result.success === 0) {
            return res.status(400).json(result);
        }
        return res.status(200).json(result);
    }
    catch (err) {
        return res.status(500).json({
            error: 1,
            success: 0,
            message: "Failed to delete student with error: " + err.message,
        });
    }
}

module.exports = {
    getStudentplaces,
    getStudentplacess,
    getAllStudent,
    addStudent,
    getStudentbyID,
    deleteStudent
};