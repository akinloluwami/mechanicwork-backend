const router = require("express").Router();
const User = require("../models/User");

router.get("/:username", async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  res.send(user);
});

exports = module.exports = router;
