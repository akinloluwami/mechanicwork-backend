const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({
    $or: [{ username: username }, { email: email }],
  });
  if (!user) {
    return res.status(400).json({
      message: "Username or password is incorrect",
    });
  }
  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    return res.status(400).json({
      message: "Username or password is incorrect",
    });
  }
  const lastLoginBrowser = req.headers["user-agent"];
  const totalLogins = user.totalLogins + 1;
  const loginAttempts = user.loginAttempts + 1;
  const lastLogin = Date.now();
  const lastLoginLocation = req.headers["x-forwarded-for"];
  const lastLoginIp = req.connection.remoteAddress;
  user.lastLoginBrowser = lastLoginBrowser;
  user.totalLogins = totalLogins;
  user.lastLogin = lastLogin;
  user.loginAttempts = loginAttempts;
  user.lastLoginLocation = lastLoginLocation;
  user.lastLoginIp = lastLoginIp;
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.status(200).json({
    message: "User logged in successfully",
    token: token,
    posts: user.posts,
  });
});

module.exports = router;
