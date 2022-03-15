const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.post("/:username", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  const { title, content } = req.body;
  const userPosts = user.posts;

  const post = new Post({
    title: title,
    content: content,
    username: user.username,
    displayName: user.displayName,
    date: Date.now(),
  });
  if (!title || !content) {
    return res.status(400).json({
      message: "Please enter all fields",
    });
  }
  userPosts.push(post);
  user.posts = userPosts;
  await post.save();
  await user.save();
  res.status(201).json({
    message: "Post created successfully",
  });
});

module.exports = router;
