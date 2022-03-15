const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
  const { username, displayName, email, password, confirmPassword } = req.body;
  const user = new User({
    username: username,
    displayName: displayName,
    email: email,
    password: bcrypt.hashSync(password, 10),
    confirmPassword: bcrypt.hashSync(confirmPassword, 10),
  });
  const emailExists = await User.findOne({ email: email });
  const usernameExists = await User.findOne({ username: username });
  const passwordStrength = password.length >= 8;
  const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    email
  );
  const passwordsMatch = password === confirmPassword;
  if (!user) {
    res.status(400).json({
      message: "Please enter all fields",
    });
  }
  const validUsername =
    /^[a-zA-Z0-9]+$/.test(username) &&
    username.length >= 2 &&
    username.length <= 15;
  const validPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    ) && passwordStrength;

  if (emailExists) {
    return res.status(400).json({
      message: "Email already exists",
    });
  } else if (!passwordsMatch) {
    return res.status(400).json({
      message: "Passwords do not match",
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
  await user.save();
  res.status(201).json({
    message: "User created successfully",
  });
});

module.exports = router;
