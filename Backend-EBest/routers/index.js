const express = require('express');
const GetAllTeachers = require('../controllers/teacherController');
const {login } = require('../controllers/AuthController');
const { getAllUsers, getUserById, createUser } = require('../controllers/UserController');
const {createClass, getClassByStudentController, getClassByTeacherController} = require('../controllers/ClassController');
const {getStudentplaces, getStudentplacess} = require('../controllers/StudentController');
const {createCourseController, getAllCoursesController, getCourseByIdController, registerCourseController} = require('../controllers/CourseController');
const { createCourse, registerCourse, getAllCourse } = require('../model/Course');
const { getClassByCourses } = require('../controllers/ClassController');
const { getChuongByCourseAndClass, addUnitController } = require('../controllers/UnitController');
const { createExcerciseController, getAllExcercisesController } = require('../controllers/ExcerciseController');
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

module.exports = router;