const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
router.post("/signup", async (req, res) => {
  const user = new User({
    username: req.body.username,
    displayName: req.body.displayName,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
  });
  const emailExists = await User.findOne({ email: req.body.email });
  const usernameExists = await User.findOne({ username: req.body.username });
  const passwordStrength = req.body.password.length >= 8;
  const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    req.body.email
  );
  const validUsername = /^[a-zA-Z0-9]+$/.test(req.body.username);
  const validPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      req.body.password
    ) && passwordStrength;
  if (emailExists) {
    return res.status(400).json({
      message: "Email already exists",
    });
  } else if (usernameExists) {
    return res.status(400).json({
      message: "Username already exists",
    });
  } else if (!validEmail) {
    return res.status(400).json({
      message: "Invalid email",
    });
  } else if (!validUsername) {
    return res.status(400).json({
      message: "Invalid username",
    });
  } else if (!validPassword) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters long and contain at least one number, one uppercase letter and one special character",
    });
  }
  user.save();

  res.send(user);
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  });
  if (!user) {
    return res.status(400).json({
      message: "Username or password is incorrect",
    });
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  if (!validPassword) {
    return res.status(400).json({
      message: "Username or password is incorrect",
    });
  }
  res.send(user.username + " " + token);
});

router.post("/changepassword", async (req, res) => {
  const token = req.body.token;
});

module.exports = router;
