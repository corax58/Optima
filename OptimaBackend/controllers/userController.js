const prisma = require("../prisma/prismaClient");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "1w" });
};

const generateVerificationToken = (userId, email) => {
  return jwt.sign({ userId, email }, process.env.SECRET, { expiresIn: "1h" });
};

const sendVerificationEmail = async (email, token) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    // log to console
  });

  const verificationLink = `http://localhost:5173/verify-email?token=${token}`;

  let mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Email Verification",
    html: `<p>Please verify your email by clicking the following link: <a href="${verificationLink}">Verify Email</a></p>`,
  };

  console.log("mail option: ", mailOptions);

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw Error("All fields must be filled");
    }
    if (!validator.isEmail(email)) {
      throw Error("Invalid email");
    }

    const user = await prisma.user.findFirst({
      where: {
        email: email,
        emailVerified: true,
      },
    });

    if (!user) {
      throw Error("Incorrect email or password ");
    }

    const match = await bcrypt.compare(password, user.hashedPassword);

    if (!match) {
      throw Error("Incorrect email or password");
    }

    const token = createToken(user.userId);

    res.status(200).json({
      email: user.email,
      token,
      userId: user.userId,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw Error("All fields must be filled");
    }

    if (!validator.isEmail(email)) {
      throw Error("Invalid email");
    }

    const VerifiedEmailExists = await prisma.user.findFirst({
      where: { email: email, emailVerified: true },
    });

    if (VerifiedEmailExists) {
      throw Error("Email already in use");
    }
    const unVerifiedEmailExists = await prisma.user.findFirst({
      where: { email: email, emailVerified: false },
    });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash("" + password, salt);

    let user;

    if (unVerifiedEmailExists) {
      user = await prisma.user.update({
        where: {
          userId: unVerifiedEmailExists.userId,
        },
        data: {
          hashedPassword: hash,
        },
      });
    } else {
      user = await prisma.user.create({
        data: {
          email: email,
          hashedPassword: hash,
        },
      });
    }

    const token = generateVerificationToken(user.userId, user.email);
    await prisma.user.update({
      where: {
        userId: user.userId,
      },
      data: {
        VerificationToken: token,
      },
    });

    await sendVerificationEmail(email, token);

    res
      .status(201)
      .send("User registered. Please check your email for verification link.");
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};

const verifyEmail = async (req, res) => {
  console.log("verver");
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const userId = decoded.userId;

    await prisma.user.update({
      where: {
        userId: userId,
      },
      data: {
        emailVerified: true,
        VerificationToken: null,
      },
    });

    res.status(200).send("Email verified. You can now login.");
  } catch (e) {
    res.status(400).send("Invalid token");
  }
};

const generateForgotPasswordToken = (userId) => {
  return jwt.sign({ userId }, process.env.SECRET, { expiresIn: "1h" });
};

const sendResetPasswordEmail = ({ email, token }) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    // log to console
  });

  const verificationLink = `http://localhost:5173/reset-password?token=${token}`;

  let mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Reset Password",
    html: `<p>Please click the following link to reset your password: <a href="${verificationLink}">Reset password</a></p>`,
  };

  console.log("mail option: ", mailOptions);

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const forgotPassword = async (req, res) => {
  console.log("hello");
  const { email } = req.body;
  try {
    if (email == "") {
      throw Error("All fields must be filled");
    }

    const EmailExists = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!EmailExists) {
      throw Error("Email does not exist");
    }

    const token = generateForgotPasswordToken(EmailExists.userId);
    const resetpw = await prisma.forgotPassword.create({
      data: {
        verificationToken: token,
        userUserId: EmailExists.userId,
      },
    });

    sendResetPasswordEmail({ email: EmailExists.email, token });
    res.status(200).json({ messsage: "check your email" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.query;

  const { newPassword } = req.body;
  try {
    if (newPassword == "") {
      throw Error("All fields must be filled");
    }
    const decoded = jwt.verify(token, process.env.SECRET);
    if (!decoded) {
      throw Error("Invalid");
    }
    const userId = decoded.userId;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash("" + newPassword, salt);

    const user = await prisma.user.update({
      where: {
        userId: userId,
      },
      data: {
        hashedPassword: hash,
      },
    });

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (e) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
