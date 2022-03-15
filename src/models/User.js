const { is } = require("express/lib/request");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
  socials: {
    type: Object,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
  posts: [
    {
      type: Array,
    },
  ],
  rank: {
    type: String,
    default: "Rookie",
  },
  gigPoints: {
    type: Number,
    default: 0,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  lastLoginIp: {
    type: String,
  },
  lastLoginBrowser: {
    type: String,
  },
  lastLoginDevice: {
    type: String,
  },
  lastLoginOs: {
    type: String,
  },
  totalLogins: {
    type: Number,
    default: 0,
  },
  lastActivity: {
    type: Date,
    default: Date.now,
  },
  isActice: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", UserSchema);
