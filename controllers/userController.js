const asynchandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//@desc Register the user
//@route Post /api/users/register
//@access public

const registerUser = asynchandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already exist !");
  }
  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  console.log(`user created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.id });
  } else {
    res.status(400);
    throw new Error("User data is not valid !");
  }
});

//@desc login the user
//@route Post /api/users/login
//@access public

const loginUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const user = await User.findOne({ email });

  // compare password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "2m" }
    );
    res.status(200).json({ accessToken });
  }else{
    res.status(401);
    throw new Error("Email Or Password is incorrect");
  }
  
});

//@desc Current user info
//@route Get /api/users/current
//@access public

const currentUser = asynchandler(async (req, res) => {
  res.json({ message: "current user info" });
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
