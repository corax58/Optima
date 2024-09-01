const express = require("express");

//import controllers
const {
  loginUser,
  signupUser,
  searchUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");

const router = express.Router();

//login router
router.post("/login", loginUser);

//singup router
router.post("/signup", signupUser);

router.post("/search", searchUser);

module.exports = router;
