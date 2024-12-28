const UserModel = require("../model/UserModel");

const getAllUsers = async (req, res) => {
    try {
      const result = await UserModel.getAllUsers();
      console.log("Result", result);
  
      if (result.success === 0) {
        return res.status(400).json(result);
      }
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({
        error: 1,
        success: 0,
        message: "Failed to get users with error: " + err.message,
      });
    }
  };

const getUserById = (req, res) => {
  const userId = req.headers["user-id"]; // Get user ID from headers
  console.log(userId);
  UserModel.getUserById(userId, (err, result) => {
    if (err) {
      return res.status(500).json({
        error: 1,
        success: 0,
        message: err,
      });
    }
    return res.status(200).json({
      success: 1,
      data: result,
    });
  });
};

const createUser = async (req, res) => {
  const data = req.body;
  console.log("data ở controller:", data);
  try {
    const result = await UserModel.createUser(data);
    console.log("Result", result);

    if (result.success === 0) {
      return res.status(400).json(result);
    }

    return res.status(200).json({
      success: 1,
      data: result,
      message: "User created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: 1,
      success: 0,
      message: "User creation failed with error: " + err.message,
    });
  }
};

module.exports = { getAllUsers, getUserById, createUser };
