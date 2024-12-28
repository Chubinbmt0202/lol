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

module.exports = {
    getStudentplaces,
    getStudentplacess
};