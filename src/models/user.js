const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({});

exports.User = mongoose.model("User", userSchema);
