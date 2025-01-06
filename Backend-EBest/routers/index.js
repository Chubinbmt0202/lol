const express = require('express');
const {addTeacher, GetAllTeachers} = require('../controllers/teacherController');
const {login } = require('../controllers/AuthController');
const { getAllUsers, getUserById, createUser } = require('../controllers/UserController');
const {createClass, getClassByStudentController, getClassByTeacherController} = require('../controllers/ClassController');
const {getStudentplaces, getStudentplacess, getAllStudent, addStudent, getStudentbyID, deleteStudent} = require('../controllers/StudentController');
const {createCourseController, getAllCoursesController, getCourseByIdController, registerCourseController} = require('../controllers/CourseController');
const { createCourse, registerCourse, getAllCourse } = require('../model/Course');
const { getClassByCourses } = require('../controllers/ClassController');
const { getChuongByCourseAndClass, addUnitController } = require('../controllers/UnitController');
const { createExcerciseController, getAllExcercisesController, submitExerciseController, getExercisesByChuongUserCourseClassController } = require('../controllers/ExcerciseController');
const { addListeningQuestion,getAllQuestionToeic ,getListeningQuestions, addMultipleCauHoi, updateListeningQuestion, deleteListeningQuestion, addTalkQuestion, getTalkQuestions, deleteQuestionTalkToeic, addQuestionShortTalk, getAllTalkShortQuestions, addQuestionChuyenNgan, getAllChuyenNganQuestions, addQuestionDienCau, getAllQuestionDienCau, addQuestionDienVaoDoan, getAllQuestionDienVaoDoan, addQuestionDocHieu, getAllQuestionDocHieu, getAllQuestion } = require('../controllers/ToeicController');
const { addBodeController, getAllBodeController, LayCauHoiTheoBoDe } = require('../controllers/TestController');
const { TestCourseController, getBoDeInfoByCourseController, getAllTest, KiemtraController, LayCauHoiController, LayBaiKiemtra, layBaiKiemTraTheoIDCourse } = require('../controllers/TestCourseController');
const { addBodeThuCong, layBodeTheoIdCourse, layCauHoiTheoBodes, layCauHoiTheoBodeController } = require('../controllers/BodeController');

const router = express.Router();

// Import other routers
router.get('/teachers', GetAllTeachers);

// user
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);

//admin login
router.post('/login', login)

// class
router.get('/classes', createClass);
router.post('/createClass', createClass);
router.post('/getClassByCourses', getClassByStudentController );
router.post('/getClassByIdTeacher', getClassByTeacherController)

//student
router.get("/studentplaces", getStudentplaces);
router.get("/studentplacess", getStudentplacess);
router.get("/getAllStudent", getAllStudent);
router.post("/addStudent", addStudent);
router.get("/getStudentByID/:id", getStudentbyID);
router.delete("/deleteStudent/:id", deleteStudent);

//teacher
// router.get("/getAllTeacher", GetAllTeachers);
router.post("/addTeacher", addTeacher);

// course
router.post('/course', registerCourseController);
router.post('/createCourse', createCourseController);
router.get('/getAllCourse', getAllCoursesController);
router.get('/getClassByCourses/:id', getClassByCourses);
router.get('/getDetailByCourseId/:id', getCourseByIdController);

// unit
router.get('/unit/:courseId/:classId', getChuongByCourseAndClass);
router.post('/addUnit', addUnitController);

// bài tập
router.post('/createExcercise', createExcerciseController);
router.post('/getAllExcercise', getAllExcercisesController);
router.post('/submitExercise', submitExerciseController);
router.post('/getAllExcerciseSubmited', getExercisesByChuongUserCourseClassController);

// Toeic
// phần mô tả tranh
router.post('/addListeningQuestion', addListeningQuestion);
router.get('/getAllListeningQuestions', getListeningQuestions);
router.post('/addListListeningQuestion', addMultipleCauHoi);
router.put('/updateListeningQuestion/:id', updateListeningQuestion);
router.delete('/deleteListeningQuestion/:id', deleteListeningQuestion);

// phần hỏi đáp
router.post('/addQuestionTalk', addTalkQuestion);
router.get('/getAllQuestionTalk', getTalkQuestions);
router.delete('/deleteQuestionTalk/:id', deleteQuestionTalkToeic);


// phần hỏi đáp ngắn
router.post('/addQuestionShortTalk', addQuestionShortTalk);
router.get('/getAllQuestionShortTalk', getAllTalkShortQuestions);

// phần chuyện ngắn
router.post('/addQuestionChuyenNgan', addQuestionChuyenNgan);
router.get('/getAllQuestionChuyenNgan', getAllChuyenNganQuestions);

// điền vào câu 
router.post('/addQuestionReadingDienCau', addQuestionDienCau);
router.get('/getAllQuestionReadingDienCau', getAllQuestionDienCau);

// Điền vào đoạn
router.post('/addQuestionReadingDienDoan', addQuestionDienVaoDoan);
router.get('/getAllQuestionsReadingDienDoan', getAllQuestionDienVaoDoan);

// phần đọc hiểu
router.post('/addQuestionReadingDocHieu', addQuestionDocHieu);
router.get('/getAllQuestionsReadingDocHieu', getAllQuestionDocHieu);

router.get('/getAllQuestion', getAllQuestionToeic);
router.post('/addBode', addBodeController);
router.get('/getAllBode', getAllBodeController);
router.get('/getAllBodeTheoIdCourse/:id', layBodeTheoIdCourse);
router.get('/LayCauHoiTheoBoDe/:id', layCauHoiTheoBodeController);


// tạo bộ đề cho chương
router.post('/addCourseTest', TestCourseController);
router.post('/getAllCourseTest', getBoDeInfoByCourseController);
router.post('/addAllCourse/:khoaHocId', getAllTest);
router.post('/createTest', KiemtraController);
router.get('/laycauhoi/:idKiemTra', LayCauHoiController);

// lấy bài
router.get('/LayBaiKiemTra', LayBaiKiemtra);
// lấy bài kiểm tra theo courseId
router.post('/LayBaiKiemTraTheoIdCourse', layBaiKiemTraTheoIDCourse);
// router.get('/LayCauHoiTheoBoDe/:id', layCauHoiTheoBodeController)

// tạo bộ đề thủ công
router.post('/addBodeThuCong', addBodeThuCong);

// lấy tất cả câu hỏi
router.get('/getAllQuestion', getAllQuestion);

module.exports = router;