const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    console.log(
      "data coming in create controller",
      username,
      email,
      phone,
      password,
    );
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(500).json({
        success: false,
        message: "Email Already Register!!",
      });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const response = await User.create({
      username,
      email,
      phone,
      password: hashpassword,
    });
    
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(500).json({
        success: false,
        message: "User Not Register!!",
      });
    }
    console.log("existUser", existUser);
    const passwordcheck = await bcrypt.compare(password, existUser.password);
    console.log("passwordcheck", passwordcheck);
    if (!passwordcheck) {
      return res.status(500).json({
        success: false,
        message: "Password does not match!!",
      });
    }
    // console.log("login data coming", email, password);
    const token = jwt.sign({ username: existUser.username, email: existUser.email }, process.env.JWT_SECRET_KEY);

    res.status(200).json({
      success: true,
      message: "User Login successfully",
      token,
      user: existUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateUser = (req, res) => {};
const deleteUser = (req, res) => {};
module.exports = {
  // getUser,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
};
