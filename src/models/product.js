const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  count: {
    type: String,
  },
});

exports.Product = mongoose.model("Product", productSchema);
