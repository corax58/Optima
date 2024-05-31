const express = require("express");

//import controllers
const {
  loginUser,
  signupUser,
  verifyEmail,
} = require("../controllers/userController");

const router = express.Router();

//login router
router.post("/login", loginUser);

//singup router
router.post("/signup", signupUser);

//email verification router
router.get("/verify-email", verifyEmail);

module.exports = router;
