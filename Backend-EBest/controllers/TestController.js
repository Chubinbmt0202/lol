// controllers/TestController.js
const TestModel = require('../model/TestModel');

const addBodeController = async (req, res) => {
    const {tenBoDe, idCauHoiArray } = req.body; // Lấy mảng idCauHoi từ request body

    try {
        await TestModel.addBode(tenBoDe,idCauHoiArray); // Gọi hàm addBode từ model
        res.status(200).json({ message: 'Bode đã được thêm thành công' }); // Trả về kết quả thành công
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi thêm bode', error: error.message }); // Trả về lỗi nếu có
    }
}

const getAllBodeController = async (req, res) => {
    try {
        const results = await TestModel.getAllBode(); // Gọi hàm getAllBode từ model
        res.status(200).json(results); // Trả về kết quả thành công
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách bode', error: error.message }); // Trả về lỗi nếu có
    }
}
// lấy câu hỏi theo bộ đề
const LayCauHoiTheoBoDe = async (req, res) => {
    const { idBoDe } = req.body; // Lấy idBoDe từ request params

    try {
        const results = await TestModel.getQuestionsByBoDe(idBoDe); // Gọi hàm getCauHoiTheoBoDe từ model
        res.status(200).json(results); // Trả về kết quả thành công
    } catch (error) {
        res.status(500).json({ message: 'L��i khi lấy danh sách câu h��i theo bộ đ��', error: error.message }); // Trả về l��i nếu có
    }
}

module.exports = { addBodeController, getAllBodeController, LayCauHoiTheoBoDe };