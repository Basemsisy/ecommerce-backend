const router = require("express").Router();
const { Category } = require("../models/category");
const response = require("../helpers/response");

// get all categories
router.get("/", async (req, res) => {
  try {
    const categoriesList = await Category.find();
    response(res, categoriesList, "done get categories", true);
  } catch (err) {
    res.send(err);
  }
});

// add new category
router.post("/", async (req, res) => {
  try {
    let category = new Category(req.body);
    category = await category.save();
    response(res, category, "done create new category", true);
  } catch (err) {
    res.send(err);
  }
});

// delete category
router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return response(res, undefined, "not found category by given id", false);
    }
    response(res, undefined, "category deleted successfully", true);
  } catch (err) {
    res.send(err);
  }
});

// get category by id
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return response(res, null, "not found category by given id", false);
    }
    response(res, category, "done get the category", true);
  } catch (err) {
    res.send(err);
  }
});

// update category
router.put("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category)
      response(res, undefined, "not found category by given id ", false);
    response(res, category, "done update this category", true);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
