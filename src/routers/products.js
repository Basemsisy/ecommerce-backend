const router = require("express").Router();

const { Product } = require("../models/product");
const { Category } = require("../models/category");

router.get("/", async (req, res) => {
  try {
    const productList = await Product.find();
    res.send(productList);
  } catch (error) {
    res.send(error);
  }
});

router.post(`/`, async (req, res) => {
  try {
    const cat = await Category.findById(req.body.category);
    if (cat) {
      const newProduct = new Product(req.body);
      newProduct
        .save()
        .then((product) => {
          res.send(product);
        })
        .catch((err) => {
          res.send(err);
        });
    } else res.status(404).json({ message: "not found this category" });
  } catch (error) {
    res.send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else res.status(404).json({ message: "not found this product" });
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
