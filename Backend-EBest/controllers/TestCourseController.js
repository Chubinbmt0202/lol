const TestCourseModel = require("../model/TestCourseModel");

const TestCourseController = async (req, res) => {
  console.log("Dữ liệu bộ đề khóa học ở controller: ", req.body);

  try {
    await TestCourseModel.addCourseTest(req.body);
    res.status(200).send("Thêm bộ đề thành công");
  } catch (error) {
    console.log(error);
    res.status(500).send("Lỗi khi thêm bộ đề");
  }
};

const getBoDeInfoByCourseController = async (req, res) => {
  const { boDeId, khoaHocId } = req.body; // Lấy id của bộ đề và id của khóa học từ request params

  try {
    const boDeInfo = await TestCourseModel.getBoDeInfoByCourse(
      boDeId,
      khoaHocId
    );
    res.status(200).json(boDeInfo);
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi khi lấy thông tin bộ đề");
  }
};

const getAllTest = async (req, res) => {
  const { khoaHocId } = req.params; // Lấy id của bộ đề và id của khóa học từ request params
  console.log("Khoa hoc id: ", khoaHocId);
  //parse int khoaHocId
  const khoaHocIdInt = parseInt(khoaHocId);
  try {
    const boDeInfo = await TestCourseModel.getAllTest(khoaHocIdInt);
    res.status(200).json(boDeInfo);
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi khi lấy thông tin bộ đề");
  }
};

const KiemtraController = async (req, res) => {
  try {
    const data = req.body;
    // Kiểm tra dữ liệu đầu vào
    console.log("Data: ", data);
    if (
      !data.idBoDe ||
      !data.title ||
      !data.duration ||
      !data.idNguoiDung ||
      !data.idKhoaHoc || 
      !data.idClass
    ) {
      return res
        .status(400)
        .json({ message: "Vui lòng cung cấp đầy đủ thông tin." });
    }

    const result = await TestCourseModel.createKiemTra(data);
    res.status(201).json({
      message: "Tạo bài kiểm tra thành công.",
      idKiemTra: result.insertId,
    });
  } catch (error) {
    res.status(500).json({
      message: "Đã xảy ra lỗi khi tạo bài kiểm tra.",
      error: error.message,
    });
  }
};

const LayCauHoiController = async (req, res) => {
  const { idKiemTra } = req.params;
  console.log("idKiemTra ", idKiemTra);
  try {
    const cauHoi = await TestCourseModel.getCauHoi(idKiemTra);
    res.status(200).json(cauHoi);
  } catch (error) {
    console.error(error);
    res.status(500).send("L��i khi lấy câu h��i");
  }
};

const LayBaiKiemtra = async (req, res) => {
  try {
    const baiKiemtra = await TestCourseModel.getBaiKiemtra();
    res.status(200).json({
      message: "Lấy bài kiểm tra thành công",
      data: baiKiemtra,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi khi lấy bài kiểm tra");
  }
};

const layBaiKiemTraTheoIDCourse = async (req, res) => {
  const { idKhoahoc, idClass } = req.body
  console.log("idKhoahoc ", idKhoahoc);
  console.log("idClass ", idClass);
  try {
    const baiKiemtra = await TestCourseModel.getBaiKiemtraTheoIDCourse(idKhoahoc, idClass);
    res.status(200).json({
      message: "Lấy bài kiểm tra thành công",
      data: baiKiemtra,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi khi lấy bài kiểm tra");
  }
};

module.exports = {
  TestCourseController,
  getBoDeInfoByCourseController,
  getAllTest,
  KiemtraController,
  LayCauHoiController,
  LayBaiKiemtra,
  layBaiKiemTraTheoIDCourse,
};
