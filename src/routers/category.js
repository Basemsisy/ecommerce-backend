const router = require("express").Router();
const { Category } = require("../models/category");

router.get("/", async (req, res) => {
  try {
    const categoriesList = await Category.find();
    res.send(categoriesList);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
