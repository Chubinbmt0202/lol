const ClassModel = require('../model/ClassModel.js');

const getAllClass = (req, res) => {
    ClassModel.getAllClasses((err, result) => {
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

const createClass = (req, res) => {
    const { tenLop, soLuongHocVien, ngayMoLop, ngayKetThuc, phongHoc, idGiaoVien, idKhoaHoc, gioHocTheoNgay } = req.body;
    // Kiểm tra xem tất cả các trường có hợp lệ không
    if (!tenLop) {
        return res.status(400).json({
            error: 1,
            success: 0,
            message: 'Tên lớp không được để trống'
        });
    } else if (!soLuongHocVien) {
        return res.status(400).json({
            error: 1,
            success: 0,
            message: 'Số lượng học viên không được để trống'
        });
    } else if (!ngayMoLop) {
        return res.status(400).json({
            error: 1,
            success: 0,
            message: 'Ngày mở l��p không được để trống'
        });
    } else if (!ngayKetThuc) {
        return res.status(400).json({
            error: 1,
            success: 0,
            message: 'Ngày kết thúc không được để trống'
        });
    } else if (!phongHoc) {
        return res.status(400).json({
            error: 1,
            success: 0,
            message: 'Phòng học không được để trống'
        });
    } else if (!idGiaoVien) {
        return res.status(400).json({
            error: 1,
            success: 0,
            message: 'ID giáo viên không được để trống'
        });
    } else if (!idKhoaHoc) {
        return res.status(400).json({
            error: 1,
            success: 0,
            message: 'ID khóa học không được để trống'
        });
    } else if (!gioHocTheoNgay) {
        return res.status(400).json({
            error: 1,
            success: 0,
            message: 'Gi�� học theo ngày không được để trống'
        });
    }

    // Gọi model để tạo lớp học
    ClassModel.createClass({ tenLop, soLuongHocVien, ngayMoLop, ngayKetThuc, phongHoc, idGiaoVien, idKhoaHoc, gioHocTheoNgay }, (err, result) => {
        if (err) {
            console.error('Error creating class:', err);  // Log chi tiết lỗi
            return res.status(500).json({
                error: 1,
                success: 0,
                message: 'Lỗi khi tạo lớp học: ' + err
            });
        }

        return res.status(200).json({
            success: 1,
            message: 'Tạo lớp học thành công',
            data: result.data  // Trả về dữ liệu lớp học đã tạo
        });
    });
}

const getClassByCourses = ( req, res) => {
    console.log('req.body get class by course:', req.params.id);
    const id = req.params.id;
    ClassModel.getClassByCourses(id, (err, result) => {
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

const getClassByStudentController = (req, res) => {
    console.log('req.body get by student:', req.body);
    const idnguoidung = req.body.idnguoidung;
    ClassModel.getClassByStudent(idnguoidung, (err, result) => {
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

const getClassByTeacherController = (req, res) => {
    console.log('ID của giáo viên để lấy lớp đang giảng dạy:', req.body);
    const idnguoidung = req.body.idnguoidung;
    ClassModel.getClassByIdTeacher(idnguoidung, (err, result) => {
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

module.exports = {
    getAllClass,
    createClass,
    getClassByCourses,
    getClassByStudentController,
    getClassByTeacherController
};
