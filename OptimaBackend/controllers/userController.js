const newLocal = "../prisma/prismaClient";
const prisma = require(newLocal);
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (id, userName) => {
  return jwt.sign({ id, userName }, process.env.SECRET, { expiresIn: "1w" });
};

const loginUser = async (req, res) => {
  const { userName, password } = req.body;

  try {
    if (!userName || !password) {
      throw Error("All fields must be filled");
    }

    const user = await prisma.user.findFirst({
      where: {
        userName: userName,
      },
    });

    if (!user) {
      throw Error("Incorrect Username or password ");
    }

    const match = await bcrypt.compare(password, user.hashedPassword);

    if (!match) {
      throw Error("Incorrect Username or password");
    }

    const token = createToken(user.userId);

    res.status(200).json({
      userName: user.userName,
      token,
      userId: user.userId,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { userName, password } = req.body;

  try {
    if (!userName || !password) {
      throw Error("All fields must be filled");
    }

    const userNameExists = await prisma.user.findFirst({
      where: { userName: userName },
    });

    if (userNameExists) {
      throw Error("Username already in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash("" + password, salt);

    const user = await prisma.user.create({
      data: {
        userName: userName,
        hashedPassword: hash,
      },
    });

    const token = createToken(user.userId, user.userName);

    res.status(200).json({
      userName: user.userName,
      token,
      userId: user.userId,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const searchUser = async (req, res) => {
  const { userName } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: { userName: userName },
      select: { userName: true },
    });
    if (!user) {
      res.status(200).json({});
      return;
    }
    res.status(200).json({ userName: user.userName });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
  searchUser,
};
