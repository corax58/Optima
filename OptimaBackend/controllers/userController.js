const prisma = require("../prisma/prismaClient");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const createToken =(id)=>{
    return jwt.sign({id},process.env.SECRET,{expiresIn:'1w'})
}

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
      },
    });

    if (!user) {
      throw Error("Incorrect email or password ");
    }

    const match = await bcrypt.compare(password, user.hashedPassword);

    if (!match) {
      throw Error("Incorrect email or password");
    }

const token = createToken(user.id);

    res.status(200).json({
        email:user.email,
        token
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

    const emailExists = await prisma.user.findFirst({
      where: { email: email },
    });

    if (emailExists) {
      throw Error("Email already in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash("" + password, salt);

    const user = await prisma.user.create({
      data: {
        email: email,
        hashedPassword: hash,
      },
    });

    const token = createToken(user.id)
    res.status(200).json({
        email:user.email,
        token
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
