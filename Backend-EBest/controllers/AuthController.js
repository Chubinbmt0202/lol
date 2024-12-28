const TeacherModel = require("../model/TeacherModel");
const StudentModel = require("../model/StudentModel");
const UserModel = require("../model/UserModel");
const AuthController = {

  loginStudent: (req, res) => {
    console.log("Login Student");
    const { email, password } = req.body;
    console.log("Email", email, password);
    StudentModel.loginStudent(email, password, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (result.success === 0) {
        return res.status(401).json(result);
      }

      return res.status(200).json(result);
    });
  },

  login: async (req, res) => {
    try {
        const { userName, matKhau, vaiTro } = req.body;
        console.log("data", req.body);
        
        // Await the result of the loginAdmin function
        const result = await UserModel.login(userName, matKhau, vaiTro);
        
        console.log("Result", result.data);
        
        if (result.success === 0) {
            return res.status(401).json(result);
        }
        
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error in loginAdmin:", error);
        return res.status(500).json({ message: "An unexpected error occurred", error });
    }
},

  createUser: async (req, res) => {
    try {
        const { hoTen, userName, email, matKhau, sdt, diachi, vaiTro, trangthai } = req.body;
        console.log("data", req.body);  

        const result = await UserModel.createUser({ hoTen, userName, email, matKhau, sdt, diachi, vaiTro, trangthai });
        console.log("Result", result.data);
        
        if (result.success === 0) {s
            return res.status(400).json(result);
        }
        
        return res.status(201).json(result);

    } catch {
      console.error("Error in createUser:", error);
      return res.status(500).json({ message: "An unexpected error occurred", error });
    }
        

  }
};

module.exports = AuthController;
