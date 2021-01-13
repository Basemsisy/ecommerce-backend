const router = require("express").Router();
const { Product } = require("../models/product");
const { Category } = require("../models/category");
const response = require("../helpers/response");

// get all products
router.get("/", async (req, res) => {
  let filter = {};
  if (req.query.category) {
    filter["category"] = req.query.category.split(",");
  }
  try {
    const productList = await Product.find(filter).populate("category");
    response(res, productList, "done get products", true);
  } catch (error) {
    res.send(error);
  }
});

// add new product
router.post(`/`, async (req, res) => {
  try {
    const cat = await Category.findById(req.body.category);
    if (cat) {
      let newProduct = new Product(req.body);
      newProduct = await newProduct.save();
      response(res, newProduct, "done create product", true);
    } else response(res, undefined, "not found this category", false);
  } catch (error) {
    res.send(error);
  }
});

// get product by id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (product) {
      response(res, product, "done get product", true);
    } else response(res, null, "not found this product", false);
  } catch (error) {
    res.send(error);
  }
});

// update product
router.put("/:id", async (req, res) => {
  try {
    const cat = await Category.findById(req.body.category);
    if (cat) {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      if (!product) response(res, null, "not found this product", false);
      response(res, product, "done update this product", true);
    } else response(res, null, "not found this category", false);
  } catch (error) {
    res.send(error);
  }
});

// delete product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findOneAndDelete(req.params.id);
    if (!product) {
      return response(res, null, "not found this product", false);
    }
    response(res, null, "product deleted successfully", true);
  } catch (error) {
    res.send(error);
  }
});

// get featured products
router.get("/get/featured/:count?", async (req, res) => {
  try {
    const count = req.params.count || 0;
    const featuredProducts = await Product.find({ isFeatured: true }).limit(
      +count
    );
    response(res, featuredProducts, "done get featured products", true);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
