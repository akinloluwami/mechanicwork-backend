const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/profile", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);

  res.status(200).json({
    message: "User profile",
    data: {
      username: user.username,
      displayName: user.displayName,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      isVerified: user.isVerified,
    },
  });

  //Not catching errors coz we are fetching data from token
});

// router.get("/:username", async (req, res) => {
//   const user = await User.findOne({ username: req.params.username });
//   if (!user) {
//     return res.status(400).json({
//       message: "User not found",
//     });
//   }
//   res.status(200).json({
//     message: "User profile",
//     data: {
//       username: user.username,
//       displayName: user.displayName,
//     },
//   });
// });

module.exports = router;
