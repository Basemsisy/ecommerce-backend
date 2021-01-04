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

router.post("/", async (req, res) => {
  try {
    let category = new Category(req.body);
    category = await category.save();
    res.send(category);
  } catch (err) {
    res.send(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      res.status(404).json({ success: false, message: "category not found" });
    }
    res.send({
      success: true,
      message: "category deleted successfully",
    });
  } catch (err) {
    res.send({ success: false, error: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404).json({
        success: false,
        message: "not found category by given id",
        category,
      });
    }
    res.send({ success: true, category });
  } catch (err) {
    res.send(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category) res.status(404).json({ message: "not found category" });
    res.send(category);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
