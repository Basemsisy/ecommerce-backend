const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
  color: {
    type: String,
  },
  image: {
    type: String,
    default: "",
  },
});

exports.Category = mongoose.model("Category", categorySchema);
