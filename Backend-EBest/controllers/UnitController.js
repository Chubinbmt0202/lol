const Unit = require('../model/UnitModel.js');


const getChuongByCourseAndClass = (req, res) => {
    const { courseId, classId } = req.params;
    Unit.getChuongByCourseAndClass(courseId, classId, (err, result) => {
        if (err) {
            return res.status(500).json({
                error: 1,
                success: 0,
                message: err
            });
        }
        return res.status(200).json({
            error: 0,
            success: 1,
            message: 'Get chuong successfully',
            data: result
        });
    });
};

const addUnitController = (req, res) => {
    const {idLop, tenChuong, moTa, idKhoaHoc } = req.body;
    console.log("req.body unit:", req.body);
    Unit.addUnit(idLop, tenChuong, moTa, idKhoaHoc, (err, result) => {
        if (err) {
            console.error("Error from addUnit:", err);
            return res.status(500).json({
                error: 1,
                success: 0,
                message: "Lỗi khi thêm chương: " + err.sqlMessage
            });
        }
        return res.status(200).json(result);  // Trả về result trực tiếp
    });
    
}

module.exports = {
    getChuongByCourseAndClass,
    addUnitController
};