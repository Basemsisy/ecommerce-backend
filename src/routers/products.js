const router = require("express").Router();

const { Product } = require("../models/product");
const { Category } = require("../models/category");

router.get("/", async (req, res) => {
  try {
    const productList = await Product.find().populate("category");
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
    const product = await Product.findById(req.params.id).populate("category");
    if (product) {
      res.send(product);
    } else res.status(404).json({ message: "not found this product" });
  } catch (error) {
    res.send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const cat = await Category.findById(req.body.category);
    if (cat) {
      Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .then((product) => {
          if (!product)
            return res.status(404).json({ message: "not found this product" });
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

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findOneAndDelete(req.params.id);
    if (!product) {
      res.status(404).json({ success: false, message: "product not found" });
    } else
      res.send({
        success: true,
        message: "product deleted successfully",
      });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
