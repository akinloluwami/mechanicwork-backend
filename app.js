const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.json());

app.use(cors());

const db = mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.then(() => console.log("Connected to MongoDB"));

const userRoute = require("./src/routes/user");
const publicProfileRoute = require("./src/routes/publicProfile");
const postRoute = require("./src/routes/post");
const loginRoute = require("./src/routes/login");
const signupRoute = require("./src/routes/signup");

app.use("/auth", userRoute);
app.use("/profile/:username", publicProfileRoute);
app.use("/post", postRoute);
app.use("/login", loginRoute);
app.use("/signup", signupRoute);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
