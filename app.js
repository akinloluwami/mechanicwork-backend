const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const db = mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.then(() => console.log("Connected to MongoDB"));

const userRoute = require("./src/routes/user");
const publicProfileRoute = require("./src/routes/publicProfile");
app.use("/auth", userRoute);
app.use("/profile/:username", publicProfileRoute);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
