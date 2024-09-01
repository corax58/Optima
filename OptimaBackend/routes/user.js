const express = require("express");

//import controllers
const { loginUser, signupUser, verifyEmail, forgotPassword, resetPassword } =
  require("../controllers/userController").default;

const router = express.Router();

//login router
router.post("/login", loginUser);

//singup router
router.post("/signup", signupUser);

//email verification router
// router.get("/verify-email", verifyEmail);

// router.post("/forgot-password", forgotPassword);

// router.post("/reset-password", resetPassword);

module.exports = router;
