const express = require("express");

//import controllers
const {
  loginUser,
  signupUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");

const router = express.Router();

//login router
router.post("/login", loginUser);

//singup router
router.post("/signup", signupUser);

module.exports = router;
